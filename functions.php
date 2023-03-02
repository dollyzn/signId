<?php
/**
 * Renderiza um template.
 *
 * @param string $template_name O nome do arquivo de template.
 * @param array $context Um array associativo com as variáveis a serem passadas para a
 *     renderização.
 */
function render_template($template_name, $context = []) {
    // Extrair as variáveis do contexto para o escopo local
    extract($context);

    // Incluir o arquivo de template
    require_once $template_name;
}