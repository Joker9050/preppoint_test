<?php
// File: public/api/learning_section.php

header('Content-Type: application/json');
require_once '../includes/base_api.php'; 

// Read raw POST input and decode
$input = json_decode(file_get_contents('php://input'), true);

// ✅ Validate input
if (!isset($input['page_name']) || !is_string($input['page_name'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid "page_name"']);
    exit;
}

$pageName = $input['page_name'];
$response = [];

try {
    // 1. Get category ID
    $stmt = $pdo->prepare("SELECT * FROM static_pages WHERE page_name  = ?");
    $stmt->execute([$pageName]);
    $page_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($page_data)) {
        http_response_code(404);
        echo json_encode(['error' => 'Page Name not found']);
        exit;
    }

    // 3. Add to response
    $response = $page_data;

    echo json_encode($response, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
