<?php
include("./php/whaticket.php");
session_start();

if (!isset($_SESSION['unitname'])) {
    header('Location: index.php');
    exit();
}

$query = $conn->query("SELECT id, name FROM Whatsapps ORDER BY id ASC");
$registros = $query->fetchAll(PDO::FETCH_ASSOC);

ob_start();

$page_content = file_get_contents('./templates/home.html');
$page_content = str_replace("{{registros}}", json_encode($registros), $page_content);
$page_content = str_replace("{{unit}}", $_SESSION["unitname"], $page_content);

echo $page_content;

ob_end_flush();
?>