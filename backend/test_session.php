<?php

// Test session storage configuration
session_start();

// Test 1: Check session save path
echo "===== SESSION CONFIGURATION =====\n";
echo "Session Save Path: " . ini_get('session.save_path') . "\n";
echo "Session Handler: " . ini_get('session.save_handler') . "\n";
echo "Session Name: " . ini_get('session.name') . "\n";
echo "Session ID: " . session_id() . "\n";
echo "Session Cookie SameSite: " . ini_get('session.cookie_samesite') . "\n";
echo "Session Cookie Secure: " . ini_get('session.cookie_secure') . "\n";
echo "Session Cookie HttpOnly: " . ini_get('session.cookie_httponly') . "\n";

// Test 2: Store test data
$_SESSION['test_data'] = [
    'timestamp' => date('Y-m-d H:i:s'),
    'user' => 'test_user',
    'random' => bin2hex(random_bytes(16))
];

session_write_close();

echo "\n===== SESSION DATA STORED =====\n";
echo "Stored Data: " . json_encode($_SESSION) . "\n";

// Test 3: Check if session file was created
echo "\n===== SESSION FILE INFO =====\n";
$sessionPath = ini_get('session.save_path');
$sessionFile = $sessionPath . '/sess_' . session_id();
if (file_exists($sessionFile)) {
    echo "Session File Exists: Yes\n";
    echo "Session File Path: " . $sessionFile . "\n";
    echo "Session File Size: " . filesize($sessionFile) . " bytes\n";
    echo "Session File Readable: " . (is_readable($sessionFile) ? 'Yes' : 'No') . "\n";
    echo "Session File Writable: " . (is_writable($sessionFile) ? 'Yes' : 'No') . "\n";
    echo "Session File Contents:\n";
    echo file_get_contents($sessionFile) . "\n";
} else {
    echo "Session File Exists: No ❌\n";
    echo "Expected Path: " . $sessionFile . "\n";
}

// Test 4: Check directory permissions
echo "\n===== DIRECTORY PERMISSIONS =====\n";
if (is_dir($sessionPath)) {
    echo "Session Directory Exists: Yes\n";
    echo "Session Directory Path: " . $sessionPath . "\n";
    echo "Session Directory Writable: " . (is_writable($sessionPath) ? 'Yes' : 'No') . "\n";
    echo "Session Directory Permissions: " . substr(sprintf('%o', fileperms($sessionPath)), -4) . "\n";
} else {
    echo "Session Directory Exists: No ❌\n";
    echo "Expected Path: " . $sessionPath . "\n";
}

echo "\n===== RESPONSE HEADERS =====\n";
echo "Headers that will be sent:\n";
foreach (headers_list() as $header) {
    echo "  " . $header . "\n";
}

echo "\n✅ Test completed. Check if 'Set-Cookie' header is present above.\n";
