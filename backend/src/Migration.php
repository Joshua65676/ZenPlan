<?php

namespace App;

use PDO;

class Migration
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function run(): void
    {
        $this->createUsersTable();
        $this->createRememberMeTokensTable();
        $this->createWorkingHoursTable();
        $this->createEventsTable();
        $this->createTasksTable();
        $this->createRemindersTable();
    }

    private function createRememberMeTokensTable(): void
    {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS remember_me_tokens (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                token_hash CHAR(64) NOT NULL,
                expires_at DATETIME NOT NULL,
                last_used_at TIMESTAMP NULL DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_user (user_id),
                UNIQUE KEY unique_token_hash (token_hash)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    private function createUsersTable(): void
    {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                google_id VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                profile_picture VARCHAR(500),
                google_avatar VARCHAR(500),
                is_profile_setup BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    private function createWorkingHoursTable(): void
    {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS user_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                timezone VARCHAR(100) DEFAULT 'UTC',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_user (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $this->db->exec("
            CREATE TABLE IF NOT EXISTS working_hours (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                day VARCHAR(20) NOT NULL,
                start_time TIME,
                end_time TIME,
                is_available BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_user_day (user_id, day)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    private function createEventsTable(): void
    {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                meeting_type ENUM('group', '1-on-1') NOT NULL,
                event_date DATE NOT NULL,
                event_time TIME NOT NULL,
                notes TEXT,
                guest_email VARCHAR(255),
                share_token VARCHAR(64) UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }

    private function createTasksTable(): void
    {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                priority ENUM('low','medium','high') DEFAULT 'low',
                category ENUM('personal','work','health','finance','education','home','travel','shopping') DEFAULT 'personal',
                tags JSON,
                status ENUM('pending','completed','overdue') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $stmt = $this->db->prepare("SHOW COLUMNS FROM tasks LIKE 'status'");
        $stmt->execute();
        if ($stmt->rowCount() === 0) {
            $this->db->exec(
                "ALTER TABLE tasks ADD COLUMN status ENUM('pending','completed','overdue') DEFAULT 'pending' AFTER tags"
            );
        }
    }

    private function createRemindersTable(): void
    {
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS reminders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                reminder_date DATE NOT NULL,
                reminder_time TIME NOT NULL,
                notes TEXT,
                reminder ENUM('one-time only', 'daily', 'weekly', 'monthly') DEFAULT 'one-time only',
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $stmt = $this->db->prepare("SHOW COLUMNS FROM reminders LIKE 'is_active'");
        $stmt->execute();
        if ($stmt->rowCount() === 0) {
            $this->db->exec(
                "ALTER TABLE reminders ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE AFTER reminder"
            );
        }
    }
}
