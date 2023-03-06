<?php
include("connection.php");

$stmt = $conn->prepare("SELECT unit, xworkId, atendant, date, signature FROM delivered ORDER BY date DESC");
$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
?>