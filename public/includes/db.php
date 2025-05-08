<?php
// public/includes/db.php

/**
 * Database Configuration and Connection Handler
 * 
 * This script establishes a secure PDO connection to MySQL with proper error handling.
 * It's designed to be included in other PHP files that need database access.
 */

// 1. Database Configuration Constants
define('DB_HOST', 'localhost');      // Database server (consider using IP in production)
define('DB_NAME', 'preppoint');      // Database name
define('DB_USER', 'root');           // Database username
define('DB_PASS', '');               // Database password (empty in this case)
define('DB_CHARSET', 'utf8mb4');     // Character encoding (supports full Unicode including emojis)

// 2. Data Source Name (DSN) Construction
$dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=%s',
    DB_HOST,
    DB_NAME,
    DB_CHARSET
);

// 3. PDO Connection Options
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Convert errors to exceptions
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Return arrays with column names as keys
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Use native prepared statements
    PDO::ATTR_STRINGIFY_FETCHES  => false,                  // Preserve data types
    PDO::ATTR_PERSISTENT         => false                   // Don't use persistent connections
];

// 4. Connection Establishment with Error Handling
try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    // Optional: Set timezone for database connection
    $pdo->exec("SET time_zone = '+00:00'"); // UTC
    
} catch (PDOException $e) {
    // Log the error (in production, log to file/system)
    error_log('Database connection failed: ' . $e->getMessage());
    
    // Return JSON error response for API or output for regular pages
    if (php_sapi_name() === 'cli') {
        exit('Database connection error: ' . $e->getMessage() . PHP_EOL);
    }
    
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Database connection failed',
        'message' => 'Please try again later',
        'code' => 500
    ]);
    exit;
}

// usage in api file - require_once '../../includes/db.php';