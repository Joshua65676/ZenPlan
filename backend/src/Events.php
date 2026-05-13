<?php

namespace App;

use PDO;

class Events {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAllEvents(int $userId): array {
        $stmt = $this->db->prepare("
            SELECT * FROM events
            WHERE user_id = ?
            ORDER BY event_date ASC, event_time ASC
        ");
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public function getEventById(int $id, int $userId): ?array {
        $stmt = $this->db->prepare("
            SELECT * FROM events WHERE id = ? AND user_id = ?
        ");
        $stmt->execute([$id, $userId]);
        $event = $stmt->fetch();
        return $event ?: null;
    }

    public function getEventByShareToken(string $token): ?array {
        $stmt = $this->db->prepare("
            SELECT * FROM events WHERE share_token = ?
        ");
        $stmt->execute([$token]);
        $event = $stmt->fetch();
        return $event ?: null;
    }

    public function createEvent(
        int $userId,
        string $title,
        string $meetingType,
        string $eventDate,
        string $eventTime,
        ?string $notes,
        ?string $guestEmail
    ): array {
        // Validate guest email for 1-on-1
        if ($meetingType === '1-on-1' && empty($guestEmail)) {
            http_response_code(400);
            echo json_encode(['error' => 'Guest email is required for 1-on-1 meetings']);
            exit;
        }

        // Generate unique share token
        $shareToken = bin2hex(random_bytes(16));

        $stmt = $this->db->prepare("
            INSERT INTO events
                (user_id, title, meeting_type, event_date, event_time, notes, guest_email, share_token)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $userId,
            $title,
            $meetingType,
            $eventDate,
            $eventTime,
            $notes,
            $meetingType === '1-on-1' ? $guestEmail : null,
            $shareToken
        ]);

        $id = $this->db->lastInsertId();
        return $this->getEventById($id, $userId);
    }

    public function deleteEvent(int $id, int $userId): bool {
        $stmt = $this->db->prepare("
            DELETE FROM events WHERE id = ? AND user_id = ?
        ");
        $stmt->execute([$id, $userId]);
        return $stmt->rowCount() > 0;
    }
}