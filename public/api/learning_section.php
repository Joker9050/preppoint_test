<?php
// File: public/api/learning_section.php

header('Content-Type: application/json');
require_once '../includes/base_api.php'; 

// Read raw POST input and decode
$input = json_decode(file_get_contents('php://input'), true);

// ✅ Validate input
if (!isset($input['category']) || !is_string($input['category'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid "category"']);
    exit;
}

$categoryName = $input['category'];
$response = [];

try {
    // 1. Get category ID
    $stmt = $pdo->prepare("SELECT id , name FROM categories WHERE name = ?");
    $stmt->execute([$categoryName]);
    $category = $stmt->fetch();

    if (!$category) {
        http_response_code(404);
        echo json_encode(['error' => 'Category not found']);
        exit;
    }

    // 2. Get subjects ordered by priority ASC (1 is highest)
    $stmtSubjects = $pdo->prepare("SELECT s.name FROM subjects s INNER JOIN subcategories sc ON s.subcategory_id = sc.id WHERE sc.category_id = ? ORDER BY s.priority ASC, s.name ASC");
    
    $stmtSubjects->execute([$category['id']]);
    $subjects = $stmtSubjects->fetchAll(PDO::FETCH_COLUMN);

    // 3. Add to response
    $response[$category['name']] = $subjects;

    echo json_encode($response, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
