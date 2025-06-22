<?php
// File: public/includes/auth.php

// Load from environment variable (fallback to default if not set)
$EXPECTED_API_KEY = getenv('PREPPOINT_API_KEY') ?: 'prep_2025_$trong_k3y';

// Trusted frontend origins
$ALLOWED_ORIGINS = [
    'http://localhost:8000',
    'http://localhost:5173',
    'https://preppoint.in', // Production site
];

// Step 1: CORS Handling
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!empty($origin) && in_array($origin, $ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, X-API-KEY");
    header("Access-Control-Max-Age: 86400");
}

// Step 2: OPTIONS Preflight Request Handling
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Step 3: Content-Type Check (for POST/PUT)
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    $contentType = $_SERVER["CONTENT_TYPE"] ?? '';
    if (stripos($contentType, 'application/json') === false) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid Content-Type. Expected application/json']);
        exit;
    }
}

// Step 4: API Key Validation
$providedKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
if ($providedKey !== $EXPECTED_API_KEY) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized - Invalid API key']);
    exit;
}

// ✅ By the time we reach here, request is CORS-approved + authenticated
