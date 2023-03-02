<?php
// Iniciar sessão
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['unityname'])) {
    header('Location: index.php');
    exit();
}

// Usuário autenticado, exibir conteúdo da página protegida
$unityname = $_SESSION['unityname'];

// Carregar o template e renderizá-lo
require_once 'functions.php';
render_template('home.php', ['unityname' => $unityname]);
?>
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Teste</h1>
    <div id="canvasDiv"></div>
    <a class="h1" href="#" >teste</a>
    <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <script src="./js/script.js"></script>
  </body>
</html>
