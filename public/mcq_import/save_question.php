<?php
header('Content-Type: application/json');

$uploadDir = 'uploads/';

// Create uploads directory if not exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Include database connection from includes/db.php
require_once '../includes/db.php';

// Assuming $pdo is the PDO connection object from db.php
if (!isset($pdo)) {
    echo json_encode(['success' => false, 'message' => 'Database connection not found.']);
    exit;
}

// Helper function to handle file upload
function handleFileUpload($fileInputName) {
    global $uploadDir;
    if (isset($_FILES[$fileInputName]) && $_FILES[$fileInputName]['error'] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES[$fileInputName]['tmp_name'];
        $fileName = basename($_FILES[$fileInputName]['name']);
        $ext = pathinfo($fileName, PATHINFO_EXTENSION);
        $newFileName = uniqid() . '.' . $ext;
        $destination = $uploadDir . $newFileName;
        if (move_uploaded_file($tmpName, $destination)) {
            return $destination;
        }
    }
    return '';
}

// Validate required fields
$requiredFields = ['question_no', 'question', 'correct_option', 'explanation', 'topic_id', 'subtopic_id'];
foreach ($requiredFields as $field) {
    if (!isset($_POST[$field]) || $_POST[$field] === '') {
        echo json_encode(['success' => false, 'message' => "Field '$field' is required."]);
        exit;
    }
}

// Collect and sanitize inputs
$question_no = intval($_POST['question_no']);
$question = $_POST['question'];
$question_code = $_POST['question_code'] ?? '';
$correct_option = $_POST['correct_option'];
$explanation = $_POST['explanation'];
$difficulty = $_POST['difficulty'] ?? 'medium';
$status = $_POST['status'] ?? 'active';
$topic_id = intval($_POST['topic_id']);
$subtopic_id = intval($_POST['subtopic_id']);

// Handle question image upload
$question_image = handleFileUpload('question_image');

// Collect options data
$options = [];
$optionKeys = ['A', 'B', 'C', 'D'];
foreach ($optionKeys as $key) {
    $text = $_POST['options'][$key]['text'] ?? '';
    $code = $_POST['options'][$key]['code'] ?? '';
    $image = '';
    if (isset($_FILES['options']['name'][$key]['image']) && $_FILES['options']['error'][$key]['image'] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES['options']['tmp_name'][$key]['image'];
        $fileName = basename($_FILES['options']['name'][$key]['image']);
        $ext = pathinfo($fileName, PATHINFO_EXTENSION);
        $newFileName = uniqid() . '.' . $ext;
        $destination = $uploadDir . $newFileName;
        if (move_uploaded_file($tmpName, $destination)) {
            $image = $destination;
        }
    }
    $options[$key] = [
        'text' => $text,
        'code' => $code,
        'image' => $image
    ];
}

// Encode options as JSON
$options_json = json_encode($options, JSON_UNESCAPED_UNICODE);

// Insert into database
try {
    $stmt = $pdo->prepare("INSERT INTO mcqs (question_no, topic_id, question, question_code, question_image, options, correct_option, explanation, difficulty, status, subtopic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $question_no,
        $topic_id,
        $question,
        $question_code,
        $question_image,
        $options_json,
        $correct_option,
        $explanation,
        $difficulty,
        $status,
        $subtopic_id
    ]);
    echo json_encode(['success' => true, 'message' => 'MCQ saved successfully.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database insert failed: ' . $e->getMessage()]);
}
?>
