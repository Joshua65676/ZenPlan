<?php

namespace App;

use PDO;
use PDOException;

class Database {
    private static ?Database $instance = null;
    private PDO $connection;

    private function __construct() {
        $host = getenv('MYSQL_HOST') ?: 'db';
        $dbname = getenv('MYSQL_DATABASE') ?: 'zenplan';
        $user = getenv('MYSQL_USER') ?: 'user';
        $password = getenv('MYSQL_PASSWORD') ?: 'password';

        $maxRetries = 10;
        $retryDelay = 3;

        for ($attempt = 1; $attempt <= $maxRetries; $attempt++) {
            try {
                // Connect without database first
                $pdo = new PDO(
                    "mysql:host=$host;charset=utf8mb4",
                    $user,
                    $password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    ]
                );

                // Create database if not exists
                $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname`
                    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

                // Connect with database
                $this->connection = new PDO(
                    "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
                    $user,
                    $password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    ]
                );

                // Connection successful
                return;

            } catch (PDOException $e) {
                if ($attempt === $maxRetries) {
                    http_response_code(500);
                    echo json_encode([
                        'error' => 'Database connection failed after ' . $maxRetries . ' attempts: ' . $e->getMessage()
                    ]);
                    exit;
                }
                // Wait before retrying
                sleep($retryDelay);
            }
        }
    }

    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): PDO {
        return $this->connection;
    }
}