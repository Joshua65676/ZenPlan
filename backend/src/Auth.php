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
        $this->client = new Client();
        $this->client->setClientId(getenv('GOOGLE_CLIENT_ID'));
        $this->client->setClientSecret(getenv('GOOGLE_CLIENT_SECRET'));
        $this->client->setRedirectUri(getenv('GOOGLE_REDIRECT_URI'));
        $this->client->addScope('email');
        $this->client->addScope('profile');
    }

    public function getGoogleAuthUrl(): string
    {
        return $this->client->createAuthUrl();
    }

    public function handleGoogleCallback(string $code): array
    {
        try {
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
            error_log("DEBUG: User stored in session: " . json_encode($_SESSION['user'] ?? 'FAILED'));

            return $user;
        } catch (\Exception $e) {
            error_log("DEBUG: Error in handleGoogleCallback: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }
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
            return $stmt->fetch();
        } else {
            $stmt = $this->db->prepare("
                INSERT INTO users (google_id, email, name, google_avatar)
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$googleId, $email, $name, $avatar]);

            return [
                'id' => $this->db->lastInsertId(),
                'google_id' => $googleId,
                'email' => $email,
                'name' => $name,
                'google_avatar' => $avatar,
                'profile_picture' => null,
                'is_profile_setup' => false
            ];
        }
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
        $user = $stmt->fetch();

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
        return $user ?: null;
    }

    public function logout(): void
    {
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
        $_SESSION['user'] = [
            'id' => $user['id'],
            'google_id' => $user['google_id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'google_avatar' => $user['google_avatar'],
            'profile_picture' => $user['profile_picture'],
            'is_profile_setup' => $user['is_profile_setup']
        ];
        $_SESSION['logged_in'] = true;
    }
}
