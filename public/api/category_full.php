<?php
// File: public/api/category_full.php

header('Content-Type: application/json');
ob_start();

require_once '../includes/base_api.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Only GET requests are allowed']);
    exit;
}
$response = [];

try {
    // Slug-keyed category metadata
    $categoryMeta = [
        'it' => [
            'title' => 'Information Technology',
            'description' => 'Master modern technologies and core computer science concepts',
            'mainIcon' => '💻',
            'bgColor' => 'bg-gradient-to-br from-blue-50 to-purple-50',
            'sections' => [
                ['color' => 'from-blue-400 to-purple-500', 'icon' => '💻'],
                ['color' => 'from-red-400 to-orange-500', 'icon' => '📚'],
            ]
        ],
        'government' => [
            'title' => 'Government Exams',
            'description' => 'Prepare for central and state government competitive examinations',
            'mainIcon' => '🏛️',
            'bgColor' => 'bg-gradient-to-br from-purple-50 to-indigo-50',
            'sections' => [
                ['color' => 'from-indigo-500 to-[#0a63b0]', 'icon' => '🏛️'],
                ['color' => 'from-purple-500 to-indigo-600', 'icon' => '🏢'],
            ]
        ],
        'bank' => [
            'title' => 'Banking Exams',
            'description' => 'Ace your banking sector competitive exams',
            'mainIcon' => '🏦',
            'bgColor' => 'bg-gradient-to-br from-green-50 to-teal-50',
            'sections' => [
                ['color' => 'from-green-500 to-teal-200', 'icon' => '']
            ]
        ]
    ];

    // Map display name to slug
    $nameToSlug = [
        'Information Technology' => 'it',
        'Government Exams' => 'government',
        'Banking Exams' => 'bank',
        'Banking Exams ' => 'bank' // for accidental space
    ];

    $stmtCat = $pdo->query("SELECT id, name FROM categories ORDER BY id ASC");
    $categories = $stmtCat->fetchAll();

    foreach ($categories as $category) {
        $name = trim($category['name']);
        $slug = $nameToSlug[$name] ?? strtolower(str_replace(' ', '_', $name));

        $meta = $categoryMeta[$slug] ?? [];

        $response[$slug] = [
            'title' => $meta['title'] ?? $name,
            'description' => $meta['description'] ?? '',
            'sections' => [],
            'mainIcon' => $meta['mainIcon'] ?? '',
            'bgColor' => $meta['bgColor'] ?? ''
        ];

        $stmtSub = $pdo->prepare("SELECT id, name FROM subcategories WHERE category_id = ?");
        $stmtSub->execute([$category['id']]);
        $subcategories = $stmtSub->fetchAll();

        if (empty($subcategories)) {
            $response[$slug]['sections'][] = [
                'title' => 'Coming Soon !!',
                'items' => [],
                'color' => $meta['sections'][0]['color'] ?? '',
                'icon' => $meta['sections'][0]['icon'] ?? ''
            ];
        } else {
            foreach ($subcategories as $index => $sub) {
                $stmtSubjects = $pdo->prepare("SELECT name FROM subjects WHERE subcategory_id = ? ORDER BY priority ASC, name ASC");
                $stmtSubjects->execute([$sub['id']]);
                $subjects = $stmtSubjects->fetchAll(PDO::FETCH_COLUMN);

                $response[$slug]['sections'][] = [
                    'title' => $sub['name'],
                    'items' => $subjects,
                    'color' => $meta['sections'][$index]['color'] ?? '',
                    'icon' => $meta['sections'][$index]['icon'] ?? ''
                ];
            }
        }
    }

    echo json_encode($response, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch data: ' . $e->getMessage()]);
    exit;
}
