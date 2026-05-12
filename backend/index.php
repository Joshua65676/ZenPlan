<?php

// Session cookie settings for cross-origin
ini_set('session.cookie_samesite', 'Lax');
ini_set('session.cookie_secure', '0');
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
