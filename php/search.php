<?php
include("connection.php");

$xworkId = $_POST['xworkId'];

$stmt = $conn->prepare("SELECT unit, xworkId, atendant, date, signature FROM delivered WHERE xworkId LIKE CONCAT('%', :xworkId, '%')");
$stmt->bindParam(':xworkId', $xworkId);
$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
?>