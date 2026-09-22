<?php

namespace App;

use PDO;
use Google\Client;
use Google\Service\Oauth2;

class Auth
{
    private PDO $db;
    private Client $client;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->setupGoogleClient();
    }

    private function setupGoogleClient(): void
    {
        $clientId = getenv('GOOGLE_CLIENT_ID') ?: '';
        $clientSecret = getenv('GOOGLE_CLIENT_SECRET') ?: '';
        $redirectUri = getenv('GOOGLE_REDIRECT_URI') ?: 'https://zenplan.onrender.com/auth/google/callback';

        $this->client = new Client();
        $this->client->setClientId($clientId);
        $this->client->setClientSecret($clientSecret);
        $this->client->setRedirectUri($redirectUri);

        $this->client->addScope('openid');
        $this->client->addScope('https://www.googleapis.com/auth/userinfo.email');
        $this->client->addScope('https://www.googleapis.com/auth/userinfo.profile');
    }

    public function getGoogleAuthUrl(bool $rememberMe = false): string
    {
        $state = $rememberMe ? 'remember_me' : 'session_only';
        return $this->client->createAuthUrl(null, ['state' => $state]);
    }

    public function handleGoogleCallback(string $code): array
    {
        try {
            $rememberMe = false;
            $state = $_GET['state'] ?? null;

            if ($state === 'remember_me') {
                $rememberMe = true;
            }

            $token = $this->client->fetchAccessTokenWithAuthCode($code);

            if (isset($token['error'])) {
                throw new \Exception('Failed to get token');
            }

            $this->client->setAccessToken($token);

            $oauth2 = new Oauth2($this->client);
            $googleUser = $oauth2->userinfo->get();

            $user = $this->saveUser($googleUser);

            error_log("DEBUG: About to store user in session: " . json_encode($user));
            $this->storeUserInSession($user);

            if ($rememberMe) {
                $this->createRememberMeToken((int) $user['id']);
            } else {
                $stmt = $this->db->prepare("DELETE FROM remember_me_tokens WHERE user_id = ?");
                $stmt->execute([(int) $user['id']]);
                $this->clearRememberMeCookie();
            }

            error_log("DEBUG: User stored in session: " . json_encode($_SESSION['user'] ?? 'FAILED'));

            return $user;
        } catch (\Exception $e) {
            error_log("DEBUG: Error in handleGoogleCallback: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }
    }

    public function handleRememberMeLogin(): bool
    {
        if ($this->isLoggedIn()) {
            return true;
        }

        $token = $_COOKIE['remember_me'] ?? null;
        if (!$token) {
            return false;
        }

        $tokenHash = hash('sha256', $token);
        $stmt = $this->db->prepare("SELECT * FROM remember_me_tokens WHERE token_hash = ? AND expires_at > NOW() LIMIT 1");
        $stmt->execute([$tokenHash]);
        $rememberMeToken = $stmt->fetch();

        if (!$rememberMeToken) {
            $this->clearRememberMeCookie();
            return false;
        }

        $user = $this->getCurrentUser((int) $rememberMeToken['user_id']);
        if (!$user) {
            $this->clearRememberMeCookie();
            return false;
        }

        $this->storeUserInSession($user);
        $this->rotateRememberMeToken((int) $rememberMeToken['id']);

        return true;
    }

    public function createRememberMeToken(int $userId): void
    {
        $token = bin2hex(random_bytes(32));
        $expiresAt = time() + 2592000;
        $expiresAtDb = date('Y-m-d H:i:s', $expiresAt);

        $stmt = $this->db->prepare(
            "INSERT INTO remember_me_tokens (user_id, token_hash, expires_at, last_used_at)
            VALUES (?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE token_hash = VALUES(token_hash), expires_at = VALUES(expires_at), last_used_at = NOW(), updated_at = NOW()"
        );
        $stmt->execute([$userId, hash('sha256', $token), $expiresAtDb]);

        $this->setRememberMeCookie($token, $expiresAt);
    }

    private function rotateRememberMeToken(int $tokenId): void
    {
        $newToken = bin2hex(random_bytes(32));
        $expiresAt = time() + 2592000;
        $expiresAtDb = date('Y-m-d H:i:s', $expiresAt);

        $stmt = $this->db->prepare(
            "UPDATE remember_me_tokens
            SET token_hash = ?, expires_at = ?, last_used_at = NOW(), updated_at = NOW()
            WHERE id = ?"
        );
        $stmt->execute([hash('sha256', $newToken), $expiresAtDb, $tokenId]);

        $this->setRememberMeCookie($newToken, $expiresAt);
    }

    private function setRememberMeCookie(string $token, int $expiresAt): void
    {
        setcookie('remember_me', $token, [
            'expires' => $expiresAt,
            'path' => '/',
            'domain' => '',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
    }

    private function clearRememberMeCookie(): void
    {
        setcookie('remember_me', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'domain' => '',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
    }

    private function saveUser(mixed $googleUser): array
    {
        $googleId = $googleUser->getId();
        $email = $googleUser->getEmail();
        $name = $googleUser->getName();
        $avatar = $googleUser->getPicture();

        $stmt = $this->db->prepare("SELECT * FROM users WHERE google_id = ?");
        $stmt->execute([$googleId]);
        $existingUser = $stmt->fetch();

        if ($existingUser) {
            $stmt = $this->db->prepare("
                UPDATE users SET email = ?, name = ?, google_avatar = ?
                WHERE google_id = ?
            ");
            $stmt->execute([$email, $name, $avatar, $googleId]);

            $stmt = $this->db->prepare("SELECT * FROM users WHERE google_id = ?");
            $stmt->execute([$googleId]);
            $user = $stmt->fetch();
            return $this->normalizeUser($user);
        }

        $stmt = $this->db->prepare("
            INSERT INTO users (google_id, email, name, google_avatar)
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$googleId, $email, $name, $avatar]);

        return $this->normalizeUser([
            'id' => $this->db->lastInsertId(),
            'google_id' => $googleId,
            'email' => $email,
            'name' => $name,
            'google_avatar' => $avatar,
            'profile_picture' => null,
            'is_profile_setup' => false
        ]);
    }

    private function normalizeUser(?array $user): ?array
    {
        if (!$user) {
            return null;
        }

        $user['email'] = $user['email'] ?? $user['gmail'] ?? null;
        $user['gmail'] = $user['gmail'] ?? $user['email'] ?? null;
        return $user;
    }

    public function setupProfile(int $userId, ?string $profilePicture = null): array
    {
        // If no picture uploaded use null
        $picturePath = null;
        if ($profilePicture) {
            $picturePath = $this->saveProfilePicture($profilePicture, $userId);
        }

        $stmt = $this->db->prepare("
            UPDATE users
            SET profile_picture = ?, is_profile_setup = TRUE
            WHERE id = ?
        ");
        $stmt->execute([$picturePath, $userId]);

        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $this->normalizeUser($stmt->fetch());

        $this->storeUserInSession($user);

        return $user;
    }

    public function updateProfile(int $userId, string $name, string $email): array
    {
        $safeName = trim($name);
        $safeEmail = trim($email);

        if ($safeName === '') {
            throw new \InvalidArgumentException('Name is required');
        }

        if (!filter_var($safeEmail, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Valid email is required');
        }

        $stmt = $this->db->prepare("
            UPDATE users
            SET name = ?, email = ?
            WHERE id = ?
        ");
        $stmt->execute([$safeName, $safeEmail, $userId]);

        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $this->normalizeUser($stmt->fetch());

        if (!$user) {
            throw new \RuntimeException('User not found');
        }

        $this->storeUserInSession($user);

        return $user;
    }

    public function verifyToken(string $token): bool
    {
        return isset($_SESSION['auth_token']) && $_SESSION['auth_token'] === $token;
    }

    public function getUserByToken(string $token): ?array
    {
        if (!$this->verifyToken($token)) {
            return null;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) return null;

        return $this->getCurrentUser($userId);
    }

    private function saveProfilePicture(string $base64Image, int $userId): string
    {
        $uploadDir = __DIR__ . '/../../uploads/profiles/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $imageData = explode(',', $base64Image);
        $imageDecoded = base64_decode($imageData[1]);

        preg_match('/data:image\/(\w+);base64/', $base64Image, $matches);
        $extension = $matches[1] ?? 'jpg';

        $filename = 'profile_' . $userId . '_' . time() . '.' . $extension;
        $filePath = $uploadDir . $filename;

        file_put_contents($filePath, $imageDecoded);

        return '/uploads/profiles/' . $filename;
    }

    public function getCurrentUser(int $userId): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch();
        return $this->normalizeUser($user);
    }

    public function logout(): void
    {
        $userId = $this->getSessionUserId();
        if ($userId) {
            $stmt = $this->db->prepare("DELETE FROM remember_me_tokens WHERE user_id = ?");
            $stmt->execute([$userId]);
        }

        $this->clearRememberMeCookie();
        $_SESSION = [];
        session_destroy();
    }

    public function isLoggedIn(): bool
    {
        return isset($_SESSION['user']) && isset($_SESSION['user']['id']);
    }

    public function getSessionUserId(): ?int
    {
        return $_SESSION['user']['id'] ?? null;
    }

    public function getSessionUser(): ?array
    {
        return $_SESSION['user'] ?? null;
    }

    private function storeUserInSession(array $user): void
    {
        $normalizedUser = $this->normalizeUser($user);

        $_SESSION['user'] = [
            'id' => $normalizedUser['id'],
            'google_id' => $normalizedUser['google_id'],
            'email' => $normalizedUser['email'] ?? $normalizedUser['gmail'] ?? null,
            'gmail' => $normalizedUser['gmail'] ?? $normalizedUser['email'] ?? null,
            'name' => $normalizedUser['name'],
            'google_avatar' => $normalizedUser['google_avatar'],
            'profile_picture' => $normalizedUser['profile_picture'],
            'is_profile_setup' => $normalizedUser['is_profile_setup']
        ];
        $_SESSION['logged_in'] = true;
    }
}
