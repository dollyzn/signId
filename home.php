<?php
session_start();

// verifica se o usuário está logado
if (!isset($_SESSION['unityname'])) {
    header('Location: index.php');
    exit();
}

// abre o buffer de saída
ob_start();

// lê o conteúdo da página protegida
$page_content = file_get_contents('./templates/home.html');

// imprime o conteúdo na tela
echo $page_content;

// fecha o buffer de saída e imprime o conteúdo na tela
ob_end_flush();
?>