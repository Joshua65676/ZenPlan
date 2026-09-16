<?php

namespace App;

use PDO;

class Reminder
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAllReminders(int $userId): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM reminders WHERE user_id = ? ORDER BY reminder_date ASC, reminder_time ASC"
        );
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public function getReminderById(int $id, int $userId): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM reminders WHERE id = ? AND user_id = ?"
        );
        $stmt->execute([$id, $userId]);
        $reminder = $stmt->fetch();
        return $reminder ?: null;
    }

    public function createReminder(
        int $userId,
        string $title,
        string $reminderDate,
        string $reminderTime,
        ?string $notes,
        string $reminder,
        bool $isActive
    ): array {
        $allowedReminders = ['one-time only', 'daily', 'weekly', 'monthly'];
        $reminder = strtolower(trim($reminder));
        $reminder = str_replace('one time only', 'one-time only', $reminder);

        if (!in_array($reminder, $allowedReminders, true)) {
            $reminder = 'one-time only';
        }

        $stmt = $this->db->prepare(
            "INSERT INTO reminders
                (user_id, title, reminder_date, reminder_time, notes, reminder, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $userId,
            $title,
            $reminderDate,
            $reminderTime,
            $notes,
            $reminder,
            $isActive ? 1 : 0
        ]);

        return $this->getReminderById((int)$this->db->lastInsertId(), $userId);
    }

    public function deleteReminder(int $id, int $userId): bool
    {
        $stmt = $this->db->prepare(
            "DELETE FROM reminders WHERE id = ? AND user_id = ?"
        );
        $stmt->execute([$id, $userId]);
        return $stmt->rowCount() > 0;
    }

    public function updateReminderStatus(int $id, int $userId, bool $isActive): ?array
    {
        $stmt = $this->db->prepare(
            "UPDATE reminders SET is_active = ? WHERE id = ? AND user_id = ?"
        );
        $stmt->execute([$isActive ? 1 : 0, $id, $userId]);

        return $this->getReminderById($id, $userId);
    }
}
