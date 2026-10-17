# Sistema visual — Norte SI 1.10

## Intenção
Modo Operate: localizar uma área, entender a próxima ação e estudar sem competir com a navegação. Identidade Enlace e mascote Mochi preservados. A aparência serve tarefas reais; não é uma landing page. Dados, formatos de backup, ações de estudo e proteção da IA permanecem intactos.

## Referências consultadas
- Linear, A calmer interface for a product in motion: https://linear.app/now/behind-the-latest-design-refresh — hierarquia de barras, navegação discreta e posições previsíveis.
- Things: https://culturedcode.com/things/ — foco no dia e listas legíveis.
- Notion, Navigate with the sidebar: https://www.notion.com/help/navigate-with-the-sidebar — separação entre navegação e conteúdo.
São referências de organização; nenhum código ou ativo dessas interfaces foi copiado.

## Navegação
Doze destinos principais distribuídos entre Meu dia, Meus estudos, Assistência e progresso e Preferências. Provas, Entregues e Prioridades pertencem a Atividades e provas, com abas também nos detalhes de uma atividade. O destino principal continua marcado quando uma subárea está aberta. Faculdade e Sessões têm ferramentas relacionadas próximas ao conteúdo. Busca global e tutorial continuam acessíveis.

## Composição
Barra superior de 64 px, coluna lateral de 224 px e conteúdo com largura máxima de 1180 px. Títulos diretos e descrições do propósito. Orientações em três passos são opcionais, acionadas por Como usar esta página, sem novas chamadas de IA. Configuração guiada e conversa conservam seus próprios fluxos de orientação.

Hoje organiza saudação, decisão e prazos. Reflexão tem tipografia de citação e superfície quente; NORBIT tem autoria identificada e tom discreto. Ações permanecem controles reconhecíveis. Listas usam separação de linhas, evitando cartões dentro de cartões. Detalhes usam Mostrar/Ocultar sem setas giratórias.

## Componentes e temas
Claro usa branco e cinza neutro; escuro usa carvão e superfícies distintas. Índigo reservado a foco, seleção e ações. Formulários com labels, contornos e espaços consistentes. Filtros se empilham no celular; campos de busca reservam espaço para a lupa. Botões, tags, tabelas, estados vazios, diálogos, abas, leitura de respostas e listas partilham regras em workspace-design.css. Conteúdo e links longos podem quebrar; código e tabelas têm rolagem própria quando necessário.

## Movimento e acesso
Preservar movimentos finitos e interrompíveis, mascote original e preferência por movimento reduzido. Orientações abrem com transição breve. Foco visível e elementos nativos; atalhos não dependem de hover. Nenhum vidro, blur decorativo ou animação infinita adicionada.

## Verificação
Rotas verificadas em 1440, 390 e 320 px nos dois temas; fluxos de configuração, sessões, atividades/anexos, backups e IA simulada. Tutorial usa dados temporários e conserva seus alvos completos durante a demonstração. Esta revisão não garante ausência de defeitos em toda combinação possível de dados e navegador.
## Correções responsivas · 1.11

Dez destinos na navegação principal e Como usar/Ajustes fixos no rodapé lateral. Abas relacionadas têm rolagem horizontal local no celular. Hierarquia de títulos, descrições, botões e listas compactada; mantém temas claro e escuro opacos, identidade Enlace e movimentos existentes.

Percurso usa grade explícita para reservar espaço aos nomes e ao seletor de situação; no celular, empilha os controles. Corrigida a especificidade de uma regra genérica de formulários que deixava nomes com largura zero. Filtros do banco começam recolhidos, preservam sua abertura durante alterações e apresentam cadernos junto da organização. Coleção vazia não apresenta contadores redundantes.

Tutorial segue a mesma navegação da interface real. A caixa tem altura limitada, texto rolável e controles acessíveis; posicionamento evita sobrepor o destaque, inclusive em telas estreitas. Abre seções que contêm o alvo. Dados de demonstração continuam separados dos registros reais.

Referências adicionais: [NN/g, Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) para filtros secundários; [GOV.UK, Accordion](https://design-system.service.gov.uk/components/accordion/) para agrupamento e abertura de conteúdo relacionado.

Verificação: 33 áreas com detalhes abertos em quatro larguras; percurso, filtros e tutorial em cinco larguras e ambos os temas. Teste reproduzível em scripts/test-layout.mjs cobre nomes comprimidos, estado de filtros, geometria do tutorial e preservação dos registros.
