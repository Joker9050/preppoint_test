<?php
// File: public/includes/auth.php

$EXPECTED_API_KEY = 'prep_2025_$trong_k3y'; // Keep this secret!
$ALLOWED_ORIGINS = [
    'http://localhost:3000',     // Dev frontend
    // 'https://preppoint.in',       // Production frontend url 
];

// Step 1: API Key Check
$providedKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
if ($providedKey !== $EXPECTED_API_KEY) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized - Invalid API key']);
    exit;
}

// Step 2: Origin Check (Optional but useful)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!empty($origin) && !in_array($origin, $ALLOWED_ORIGINS)) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden - Untrusted origin']);
    exit;
}
