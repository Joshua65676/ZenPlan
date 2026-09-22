<?php

$frontendUrl = getenv('FRONTEND_URL') ?: '';
$isRenderHttps = getenv('RENDER') !== false || (strpos($frontendUrl, 'https://') === 0);

// Session cookie settings for cross-origin and Render HTTPS deployments.
ini_set('session.cookie_samesite', $isRenderHttps ? 'None' : 'Lax');
ini_set('session.cookie_secure', $isRenderHttps ? '1' : '0');
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_domain', '');
session_start();

require_once __DIR__ . '/vendor/autoload.php';

use App\Router;
use App\Migration;

error_log("DEBUG: Session started. Session ID: " . session_id());
error_log("DEBUG: Session data: " . json_encode($_SESSION));

// Run migrations
$migration = new Migration();
$migration->run();

$router = new Router();
$router->handle();
