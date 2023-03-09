<?php
include("connection.php");

session_start();

if (isset($_SESSION['unitname'])) {
    header('Location: ../home.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $stmt = $conn->prepare("SELECT * FROM units WHERE BINARY unitname=:unitname AND password = SHA2(:password, 256)");
    $unitname = $_POST['unitname'];
    $password = $_POST['password'];
    $stmt->bindParam(':unitname', $unitname);
    $stmt->bindParam(':password', $password);
    
    $stmt->execute();

    if ($stmt->rowCount() === 1) {
        $_SESSION['unitname'] = $unitname;
        header('Location: ../home.php');
        exit();
    } else {
        $error = 'Unidade ou senha inválidos.';
        $_SESSION['error'] = $error;
    }
    $conn = null;
    header('Location: ../index.php');
}

?>