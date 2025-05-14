<?php
// File: public/api/topic-subtopic.php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Only POST requests are allowed']);
    exit;
}

require_once '../includes/base_api.php'; 

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['subcategory']) || !isset($input['subject'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Subcategory and Subject are required']);
        exit;
    }

    $subcategory = trim($input['subcategory']);
    $subject = trim($input['subject']);

    // 1. Get subcategory_id from subcategories table
    $stmtSubcategory = $pdo->prepare("SELECT id FROM subcategories WHERE name = ?");
    $stmtSubcategory->execute([$subcategory]);
    $subcategory_id = $stmtSubcategory->fetchColumn();

    if (!$subcategory_id) {
        http_response_code(404);
        echo json_encode(['error' => 'Subcategory not found']);
        exit;
    }

    // 2. Get subject_id and name from subjects table where subcategory_id matches
    $stmtSubject = $pdo->prepare("SELECT id, name FROM subjects WHERE name = ? AND subcategory_id = ?");
    $stmtSubject->execute([$subject, $subcategory_id]);
    $subjectData = $stmtSubject->fetch(PDO::FETCH_ASSOC);

    if (!$subjectData) {
        http_response_code(404);
        echo json_encode(['error' => 'Subject not found under given subcategory']);
        exit;
    }

    $subject_id = $subjectData['id'];
    $subject_name = $subjectData['name'];

    // 3. Get topics under this subject
    $stmtTopics = $pdo->prepare("SELECT id, name FROM topics WHERE subject_id = ?");
    $stmtTopics->execute([$subject_id]);
    $topics = $stmtTopics->fetchAll();

    $response = [$subject_name => []];

    foreach ($topics as $topic) {
        // 4. Get subtopics under each topic
        $stmtSubtopics = $pdo->prepare("SELECT name FROM subtopics WHERE topic_id = ?");
        $stmtSubtopics->execute([$topic['id']]);
        $subtopics = $stmtSubtopics->fetchAll(PDO::FETCH_COLUMN);

        $response[$subject_name][] = [
            'name' => $topic['name'],
            'subtopics' => $subtopics
        ];
    }

    echo json_encode($response, JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
