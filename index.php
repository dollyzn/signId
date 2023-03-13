<?php

$lifetime=18000;

session_start();

setcookie(session_name(),session_id(),time()+$lifetime);

if (isset($_SESSION['unitname'])) {
    header('Location: home.php');
    exit();
}

ob_start();

$page_content = file_get_contents('templates/index.html');
$page_content = str_replace("{{error}}", isset($_SESSION['error']) ? $_SESSION['error'] : "Inicie a sessão", $page_content);


echo $page_content;

ob_end_flush();
?>