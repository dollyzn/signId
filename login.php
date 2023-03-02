<?php
include("./includes/connection.php");

// Iniciar sessão
session_start();

// Verificar se o usuário já está logado
if (isset($_SESSION['unityname'])) {
    header('Location: home.php');
    exit();
}

// Verificar se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Preparar a consulta SQL
    $stmt = $conn->prepare("SELECT * FROM units WHERE unityname=:unityname AND password=:password");
    $unityname = $_POST['unityname'];
    $password = $_POST['password'];
    $stmt->bindParam(':unityname', $unityname);
    $stmt->bindParam(':password', $password);

    // Executar a consulta SQL
    $stmt->execute();

    // Verificar se as credenciais são válidas
    if ($stmt->rowCount() === 1) {
        // Credenciais válidas, criar uma sessão
        $_SESSION['unityname'] = $unityname;
        header('Location: home.php');
        exit();
    } else {
        // Credenciais inválidas, exibir mensagem de erro
        $error = 'Nome de usuário ou senha inválidos.';
    }

    // Fechar a conexão com o banco de dados
    $conn = null;
}

// Carregar o template e renderizá-lo
require_once 'functions.php';
render_template('index.php', ['error' => isset($error) ? $error : null]);
?>