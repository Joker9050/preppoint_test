<?php
session_start();
require '../../includes/db.php';

if (!isset($_POST['email']) || !isset($_POST['password'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit();
}

$email = $_POST['email'];
$password = $_POST['password'];

try {
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement.");
    }
    $stmt->execute([$email]);
    $admin = $stmt->fetch();

    if (!$admin || !password_verify($password, $admin['password'])) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
        exit();
    }

    $otp = rand(100000, 999999);
    $otp_hash = password_hash($otp, PASSWORD_DEFAULT);
    $expires_at = date("Y-m-d H:i:s", strtotime("+5 minutes"));

    // Rate limiting: max 3 attempts per 15 minutes
    $rate_limit_time = date("Y-m-d H:i:s", strtotime("-15 minutes"));
    $check_stmt = $pdo->prepare("SELECT SUM(attempts) as total_attempts FROM admin_otps WHERE admin_id = ? AND created_at > ?");
    if (!$check_stmt) {
        throw new Exception("Failed to prepare rate-limiting query.");
    }
    $check_stmt->execute([$admin['id'], $rate_limit_time]);
    $count_row = $check_stmt->fetch();
    $total_attempts = $count_row['total_attempts'] ?? 0;

    if ($total_attempts >= 3) {
        http_response_code(429);
        echo json_encode(["status" => "error", "message" => "Too many OTP attempts. Try again later."]);
        exit();
    }

    $insert = $pdo->prepare("INSERT INTO admin_otps (admin_id, otp, expires_at, attempts) VALUES (?, ?, ?, 0)");
    if (!$insert) {
        throw new Exception("Failed to prepare OTP insertion query.");
    }
    $insert->execute([$admin['id'], $otp_hash, $expires_at]);

    $_SESSION['admin_email'] = $email;
    $_SESSION['admin_id'] = $admin['id'];

    // Send OTP (via email or log)
    $subject = "Your One-Time Password (OTP) for PrepPoint Admin Login";

    // HTML email message
    $message = "
    <html>
    <head>
    <title>PrepPoint Admin Login OTP</title>
    <style>
        body { font-family: Arial, sans-serif; color: #333333; }
        .container { padding: 20px; border: 1px solid #dddddd; border-radius: 5px; }
        .otp { font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0; }
    </style>
    </head>
    <body>
    <div class='container'>
        <h2>PrepPoint Admin Login</h2>
        <p>Dear Admin,</p>
        <p>Your One-Time Password (OTP) to login is:</p>
        <p class='otp'>$otp</p>
        <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
        <br>
        <p>Regards,<br>PrepPoint Security Team</p>
    </div>
    </body>
    </html>
    ";

    // Set content-type header for HTML email
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // Additional headers
    $headers .= "From: PrepPoint <no-reply@preppoint.in>" . "\r\n";
    $headers .= "Reply-To: support@preppoint.in" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($email, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "OTP sent"]);
        exit();
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send OTP. Please try again."]);
        exit();
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    exit();
}
?>
