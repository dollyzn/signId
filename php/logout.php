<?php
  // Inicia a sessão
  session_start();

  // Destrói a sessão
  session_destroy();

  // Limpa as variáveis de sessão
  $_SESSION = array();

  // Redireciona o usuário para a página de login
  header("location: ../index.php");
  exit;
?>