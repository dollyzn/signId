<?php
include("connection.php");

$stmt = $conn->prepare('SELECT COUNT(*) FROM delivered WHERE unit = :unit AND xworkId = :xworkId');
$stmt->bindParam(':unit', $_POST['unit']);
$stmt->bindParam(':xworkId', $_POST['xworkId']);
$stmt->execute();
$count = $stmt->fetchColumn();

if ($count > 0) {
  $response = array(
    'status' => false,
    'message' => 'Já existe uma assinatura cadastrada com mesmo número nesta unidade'
  );
} else {
  $stmt = $conn->prepare('INSERT INTO delivered (unit, xworkId, date, atendant, signature) VALUES (:unit, :xworkId, :date, :atendant, :signature)');

  $stmt->bindParam(':unit', $_POST['unit']);
  $stmt->bindParam(':xworkId', $_POST['xworkId']);
  $stmt->bindParam(':date', $_POST['date']);
  $stmt->bindParam(':atendant', $_POST['atendant']);
  $stmt->bindParam(':signature', $_POST['signature']);

  if ($stmt->execute()) {
    $response = array(
      'status' => true,
      'message' => 'Valores do formulário foram inseridos no banco de dados com sucesso'
    );
  } else {
    $response = array(
      'status' => false,
      'message' => 'Ocorreu um erro ao inserir valores do formulário no banco de dados'
    );
  }
}

echo json_encode($response);
?>