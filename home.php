<?php
include("./php/whaticket.php");

$lifetime=18000;

session_start();

setcookie(session_name(),session_id(),time()+$lifetime);

if (!isset($_SESSION['unitname'])) {
    header('Location: index.php');
    exit();
}

$query = $conn->query("SELECT id, name FROM Users ORDER BY name ASC");
$registros = $query->fetchAll(PDO::FETCH_ASSOC);

ob_start();

$page_content = file_get_contents('./templates/home.html');
$page_content = str_replace("{{registros}}", json_encode($registros), $page_content);
$page_content = str_replace("{{unit}}", $_SESSION["unitname"], $page_content);

echo $page_content;

ob_end_flush();
?>