<?php

namespace App;

use PDO;
use PDOException;

class Database
{
    private static ?Database $instance = null;
    private PDO $connection;

    private function __construct()
    {
        $host = getenv('MYSQL_HOST') ?: 'db';
        $port = getenv('MYSQL_PORT') ?: '3306';
        $dbname = getenv('MYSQL_DATABASE') ?: 'zenplan';
        $user = getenv('MYSQL_USER') ?: 'user';
        $password = getenv('MYSQL_PASSWORD') ?: 'password';
        $sslCa = getenv('MYSQL_SSL_CA') ?: null;

        $maxRetries = 10;
        $retryDelay = 3;
        $useLocalBootstrap = in_array($host, ['db', 'localhost', '127.0.0.1'], true);

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];

        if ($sslCa && file_exists($sslCa)) {
            $options[PDO::MYSQL_ATTR_SSL_CA] = $sslCa;
            $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = true;
        }

        $baseDsn = "mysql:host=$host;port=$port;charset=utf8mb4";

        for ($attempt = 1; $attempt <= $maxRetries; $attempt++) {
            try {
                if ($useLocalBootstrap) {
                    // Local containers usually need the database created first.
                    $pdo = new PDO($baseDsn, $user, $password, $options);
                    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname`
                        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                }

                $this->connection = new PDO(
                    "$baseDsn;dbname=$dbname;charset=utf8mb4",
                    $user,
                    $password,
                    $options
                );

                return;
            } catch (PDOException $e) {
                if ($attempt === $maxRetries) {
                    http_response_code(500);
                    echo json_encode([
                        'error' => 'Database connection failed after ' . $maxRetries . ' attempts: ' . $e->getMessage()
                    ]);
                    exit;
                }
                sleep($retryDelay);
            }
        }
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}
