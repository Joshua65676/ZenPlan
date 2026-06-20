<?php

namespace App;

use PDO;

class Tasks
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAllTasks(int $userId): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC"
        );
        $stmt->execute([$userId]);
        $tasks = $stmt->fetchAll();
        return array_map(function ($t) {
            if (isset($t['tags']) && $t['tags']) {
                $t['tags'] = json_decode($t['tags'], true);
            } else {
                $t['tags'] = [];
            }
            return $t;
        }, $tasks);
    }

    public function getTaskById(int $id, int $userId): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM tasks WHERE id = ? AND user_id = ?");
        $stmt->execute([$id, $userId]);
        $task = $stmt->fetch();
        if (!$task) return null;
        $task['tags'] = $task['tags'] ? json_decode($task['tags'], true) : [];
        return $task;
    }

    public function createTask(int $userId, string $title, string $priority, string $category, array $tags): array
    {
        $allowedPriorities = ['low', 'medium', 'high'];
        $allowedCategories = ['personal', 'work', 'health', 'finance', 'education', 'home', 'travel', 'shopping'];

        if (!in_array($priority, $allowedPriorities, true)) {
            $priority = 'low';
        }

        if (!in_array($category, $allowedCategories, true)) {
            $category = 'personal';
        }

        $tagsJson = json_encode(array_values($tags));

        $stmt = $this->db->prepare(
            "INSERT INTO tasks (user_id, title, priority, category, tags) VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $userId,
            $title,
            $priority,
            $category,
            $tagsJson
        ]);

        $id = $this->db->lastInsertId();
        return $this->getTaskById($id, $userId);
    }

    public function deleteTask(int $id, int $userId): bool
    {
        $stmt = $this->db->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");
        $stmt->execute([$id, $userId]);
        return $stmt->rowCount() > 0;
    }
}
