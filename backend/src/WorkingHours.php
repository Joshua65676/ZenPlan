<?php

namespace App;

use PDO;

class WorkingHours {
    private PDO $db;

    private array $defaultHours = [
        ['day' => 'Monday',    'start_time' => '09:00', 'end_time' => '17:00', 'is_available' => true],
        ['day' => 'Tuesday',   'start_time' => '09:00', 'end_time' => '17:00', 'is_available' => true],
        ['day' => 'Wednesday', 'start_time' => '09:00', 'end_time' => '17:00', 'is_available' => true],
        ['day' => 'Thursday',  'start_time' => '09:00', 'end_time' => '17:00', 'is_available' => true],
        ['day' => 'Friday',    'start_time' => '09:00', 'end_time' => '17:00', 'is_available' => true],
        ['day' => 'Saturday',  'start_time' => null,    'end_time' => null,    'is_available' => false],
        ['day' => 'Sunday',    'start_time' => null,    'end_time' => null,    'is_available' => false],
    ];

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getSettings(int $userId): array {
        // Get timezone
        $stmt = $this->db->prepare("
            SELECT timezone FROM user_settings WHERE user_id = ?
        ");
        $stmt->execute([$userId]);
        $settings = $stmt->fetch();
        $timezone = $settings ? $settings['timezone'] : 'UTC';

        // Get working hours
        $stmt = $this->db->prepare("
            SELECT day, start_time, end_time, is_available
            FROM working_hours WHERE user_id = ?
            ORDER BY FIELD(day, 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')
        ");
        $stmt->execute([$userId]);
        $hours = $stmt->fetchAll();

        // If no hours saved yet return defaults
        if (empty($hours)) {
            return [
                'timezone' => $timezone,
                'workingHours' => $this->defaultHours
            ];
        }

        return [
            'timezone' => $timezone,
            'workingHours' => array_map(function($h) {
                return [
                    'day' => $h['day'],
                    'start_time' => $h['start_time'],
                    'end_time' => $h['end_time'],
                    'is_available' => (bool)$h['is_available']
                ];
            }, $hours)
        ];
    }

    public function saveSettings(int $userId, string $timezone, array $workingHours): array {
        // Save timezone
        $stmt = $this->db->prepare("
            INSERT INTO user_settings (user_id, timezone)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE timezone = VALUES(timezone)
        ");
        $stmt->execute([$userId, $timezone]);

        // Save each day
        foreach ($workingHours as $hour) {
            $day = $hour['day'];
            $startTime = $hour['is_available'] ? ($hour['start_time'] ?? '09:00') : null;
            $endTime = $hour['is_available'] ? ($hour['end_time'] ?? '17:00') : null;
            $isAvailable = $hour['is_available'] ? 1 : 0;

            $stmt = $this->db->prepare("
                INSERT INTO working_hours (user_id, day, start_time, end_time, is_available)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    start_time = VALUES(start_time),
                    end_time = VALUES(end_time),
                    is_available = VALUES(is_available)
            ");
            $stmt->execute([$userId, $day, $startTime, $endTime, $isAvailable]);
        }

        return $this->getSettings($userId);
    }
}