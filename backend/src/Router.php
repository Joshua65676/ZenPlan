<?php

namespace App;

class Router
{
    private Auth $auth;
    private WorkingHours $workingHours;

    public function __construct()
    {
        $this->auth = new Auth();
        $this->workingHours = new WorkingHours();
    }

    public function handle(): void
    {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];

        // CORS Headers
        header("Access-Control-Allow-Origin: " . getenv('FRONTEND_URL'));
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");
        header("Content-Type: application/json");

        error_log("DEBUG: Request - Method: $method, Path: $path");
        error_log("DEBUG: Frontend URL: " . getenv('FRONTEND_URL'));
        error_log("DEBUG: Cookies received: " . json_encode($_COOKIE));
        error_log("DEBUG: Session ID: " . session_id());
        error_log("DEBUG: Session data: " . json_encode($_SESSION));

        if ($method === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        switch ($path) {
            case '/auth/google':
                $this->googleLogin();
                break;

            case '/auth/google/callback':
                $this->googleCallback();
                break;

            case '/auth/setup-profile':
                $this->setupProfile();
                break;

            case '/auth/me':
                $this->getCurrentUser();
                break;

            case '/auth/logout':
                $this->logout();
                break;

            case '/migrate':
                $this->runMigration();
                break;

            case '/auth/session':
                $this->checkSession();
                break;

            case '/auth/verify-token':
                $this->verifyToken();
                break;
            case '/settings/working-hours':
                $this->handleWorkingHours($method);
                break;

            default:
                http_response_code(404);
                echo json_encode(['error' => 'Route not found']);
        }
    }

    private function googleLogin(): void
    {
        $url = $this->auth->getGoogleAuthUrl();
        echo json_encode(['url' => $url]);
    }

    private function handleWorkingHours(string $method): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $token = $data['token'] ?? $_GET['token'] ?? null;
        $user = null;

        if ($token) {
            $user = $this->auth->getUserByToken($token);
        }

        if (!$user && $this->auth->isLoggedIn()) {
            $user = $this->auth->getSessionUser();
        }

        if (!$user) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            return;
        }

        if ($method === 'GET') {
            $settings = $this->workingHours->getSettings($user['id']);
            echo json_encode(['success' => true, 'data' => $settings]);
        } elseif ($method === 'POST') {
            $timezone = $data['timezone'] ?? 'UTC';
            $hours = $data['workingHours'] ?? [];

            if (empty($hours)) {
                http_response_code(400);
                echo json_encode(['error' => 'Working hours are required']);
                return;
            }

            $settings = $this->workingHours->saveSettings($user['id'], $timezone, $hours);
            echo json_encode(['success' => true, 'data' => $settings]);
        }
    }

    private function runMigration(): void
    {
        $migration = new \App\Migration();
        $migration->run();
        echo json_encode(['success' => true, 'message' => 'Migration completed']);
    }

    private function googleCallback(): void
    {
        $code = $_GET['code'] ?? null;

        if (!$code) {
            http_response_code(400);
            echo json_encode(['error' => 'No code provided']);
            return;
        }

        error_log("DEBUG: Starting googleCallback with code: " . substr($code, 0, 20) . "...");

        $user = $this->auth->handleGoogleCallback($code);

        error_log("DEBUG: handleGoogleCallback returned user: " . json_encode($user));
        error_log("DEBUG: Session data before write_close: " . json_encode($_SESSION));

        session_write_close();

        error_log("DEBUG: Session written and closed");

        $frontendUrl = getenv('FRONTEND_URL');

        if (!$user['is_profile_setup']) {
            error_log("DEBUG: Redirecting to setup-profile");
            header("Location: $frontendUrl/setup-profile");
        } else {
            error_log("DEBUG: Redirecting to WorkingHoursPage");
            header("Location: $frontendUrl/working-hours");
        }
        exit;
    }

    private function verifyToken(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $token = $data['token'] ?? null;

        if (!$token) {
            http_response_code(400);
            echo json_encode(['error' => 'No token provided']);
            return;
        }

        $user = $this->auth->getUserByToken($token);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token']);
            return;
        }

        echo json_encode(['success' => true, 'user' => $user]);
    }

    private function checkSession(): void
    {
        echo json_encode([
            'is_logged_in' => $this->auth->isLoggedIn(),
            'user' => $this->auth->getSessionUser()
        ]);
    }

    private function setupProfile(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $profilePicture = $data['profilePicture'] ?? null;

        if (!$this->auth->isLoggedIn()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            return;
        }

        $userId = $this->auth->getSessionUserId();
        $updatedUser = $this->auth->setupProfile($userId, $profilePicture);
        session_write_close();

        echo json_encode(['success' => true, 'user' => $updatedUser]);
    }

    private function getCurrentUser(): void
    {
        if (!$this->auth->isLoggedIn()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            return;
        }

        $user = $this->auth->getSessionUser();

        if (!$user) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }

        echo json_encode(['user' => $user]);
    }

    private function logout(): void
    {
        $this->auth->logout();
        session_write_close();
        echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
    }
}
