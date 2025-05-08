<?php
// File: public/api/category.php

header('Content-Type: application/json');
require_once '../includes/base_api.php';
// require_once '../includes/db.php';  // for local testing 
$response = [];

try {
    // 1. Fetch all categories
    $stmtCat = $pdo->query("SELECT id, name FROM categories ORDER BY id ASC");
    $categories = $stmtCat->fetchAll();

    foreach ($categories as $category) {
        $catKey = $category['name'];
        $response[$catKey] = [
            'category_title' => ucwords(str_replace('_', ' ', $category['name'])),
        ];

        // 2. Fetch subcategories
        $stmtSub = $pdo->prepare("SELECT id, name FROM subcategories WHERE category_id = ?");
        $stmtSub->execute([$category['id']]);
        $subcategories = $stmtSub->fetchAll();

        $subcategory = [];

        if (empty($subcategories)) {
            // No subcategories → "Coming Soon"
            $subcategory[] = [
                'subcategory_title' => 'Coming Soon',
                'subjects' => ['Coming Soon'],
                'isScrollingFrame' => false
            ];
        } else {
            foreach ($subcategories as $sub) {
                $isScrollable  = true; // Default to true for scrolling frame

                // Fetch subjects under each subcategory
                $stmtSubjects = $pdo->prepare("SELECT name FROM subjects WHERE subcategory_id = ? ORDER BY priority ASC, name ASC");
                $stmtSubjects->execute([$sub['id']]);
                $subjects = $stmtSubjects->fetchAll(PDO::FETCH_COLUMN);
                
                if (empty($subjects)) {
                    $subjects = ['Coming Soon'];
                    $isScrollable  = false;
                } else {
                    $subjects[] = 'view more →';
                }

                $subcategory[] = [
                    'subcategory_title' => $sub['name'],
                    'subjects' => $subjects,
                    'isScrollingFrame' => $isScrollable // Set to false if no subjects found 
                ];
            }
        }

        $response[$catKey]['subcategory'] = $subcategory;
    }

    echo json_encode($response, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch data: ' . $e->getMessage()]);
    exit;
}

