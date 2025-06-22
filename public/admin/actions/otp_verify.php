<?php
session_start();
require '../../includes/db.php';

$entered_otp = $_POST['otp'];
$admin_id = $_SESSION['admin_id'];

if (!$admin_id || !$entered_otp || strlen($entered_otp) != 6) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

// Select the latest unused, unexpired OTP for the admin
$stmt = $pdo->prepare("
    SELECT * FROM admin_otps 
    WHERE admin_id = ? AND is_used = FALSE AND expires_at >= NOW()
    ORDER BY created_at DESC LIMIT 1
");
$stmt->execute([$admin_id]);
$record = $stmt->fetch();

if ($record) {
    // Debug output
    error_log("Entered OTP: " . $entered_otp);
    error_log("Stored OTP hash: " . $record['otp']);

    // Verify the entered OTP against the hashed OTP stored
    $isValid = password_verify($entered_otp, $record['otp']);
    if ($isValid) {
        // Mark OTP as used
        $update_stmt = $pdo->prepare("UPDATE admin_otps SET is_used = TRUE WHERE id = ?");
        $update_stmt->execute([$record['id']]);

        $_SESSION['admin_logged_in'] = true;
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "OTP verified"]);
        exit;
    } else {
        // Incorrect OTP: increment attempt count
        $update_attempts = $pdo->prepare("UPDATE admin_otps SET attempts = attempts + 1 WHERE id = ?");
        $update_attempts->execute([$record['id']]);

        // Optional: block user after 3 failed attempts
        $remaining = max(0, 2 - $record['attempts']); // since we're about to increment it
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid OTP. Remaining attempts: " . $remaining
        ]);
        exit;
    }
} else {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "OTP expired or not found"]);
    exit;
}
?>
