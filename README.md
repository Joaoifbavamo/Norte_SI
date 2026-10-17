# Norte SI

Plataforma independente para Sistemas de Informação do IFBA Vitória da Conquista e estudos livres. Base funcional Norte 4.1.0, armazenamento e backend separados. Não é um sistema oficial do IFBA.

**[Site](https://joaoifbavamo.github.io/Norte_SI/)** · **[Guia](docs/guia.md)** · **[Fontes e limites](docs/fontes.md)**

## Recursos

Semestre letivo e período do curso separados; matrícula escolhida por disciplina, com componentes de períodos diferentes; professores, turma, sala, situação e faltas informadas; histórico entre semestres e espaços arquivados. Estudos livres com todos os recursos de prática. Catálogos de referência de 2017 e 2024; percurso curricular informado pelo estudante.

Avaliações, pesos, notas e simulação de meta; horários de aula; rotinas aplicadas com prévia; planejamento considera aulas e outros espaços. Projetos com checklist, código como texto e referências; organização de TCC e estágio; atividades complementares com horas declaradas e validadas informadas. Calendário consolidado com importação ICS por prévia e exportação semanal com horários dos estudos e aulas. Referências de materiais podem ser copiadas explicitamente para outro espaço, sem duplicar resultados.

Sessão guiada com objetivo, tempo ativo pausável, rascunho local, uma questão por vez, correção e registro confirmado. Questões em branco não contam como erros; tempo fora da sessão não é contado. Planos por avaliação, assuntos do professor importados por lista, diário de presenças por data, compartilhamento da estrutura de disciplinas sem dados pessoais e importação de backups preservando espaços existentes. Laboratórios didáticos locais de rastreamento de variáveis e SELECT SQL. Explicações da NORBIT conferidas pelo estudante podem ser guardadas com fonte e data.

Recursos originais: foco, alarmes, minipainel e PiP quando disponível; início/fim e pausas; histórico, backups, questões e erros, banco multiformato, simulados, flashcards, revisões, notas, assuntos, sessões guiadas, busca global, evolução, chats NORBIT e cache local. Navegação compacta com áreas relacionadas, mascote discreto animado e tutorial com dados temporários.

## Desenvolvimento

Requer Node.js 22 ou posterior. Não há dependências de frontend.

```sh
npm run check
npm run build
npm run test:worker
```

Abra `index.html` ou sirva o projeto em um servidor estático. O arquivo é autossuficiente, com CSS, JavaScript e mascote incorporados. Recursos locais funcionam sem rede; IA e referências externas exigem conexão. `src/` é a fonte; `scripts/build.mjs` gera o HTML. Não edite apenas o HTML gerado.

## GitHub Pages

O workflow `.github/workflows/pages.yml` verifica, constrói e publica somente `index.html` e favicon. Configure Settings → Pages → Source → GitHub Actions. URL esperada: `https://joaoifbavamo.github.io/Norte_SI/`. Navegação por hash funciona no subdiretório e após recarregar. Não publique a pasta Worker como backend do Pages: ele é hospedado separadamente.

## IA independente

Configurada e testada com uma resposta real em 14/10/2026. O widget próprio usa verificação não interativa. Os passos abaixo documentam a configuração para manutenção ou uma nova instalação.

O Worker `norte-si-gemini` usa um Durable Object próprio para cota atômica: 200 pedidos globais/dia UTC, 100 por navegador/dia e limite de texto; valida entradas, referências, formatos e gabaritos. Endereços são armazenados como hash; nenhum texto de estudo é persistido pelo controle de cota. O cache de respostas fica no navegador e no espaço correspondente.

Cadastre uma **nova** `GEMINI_API_KEY` como Secret no Worker. Cadastre uma proteção Turnstile independente para `joaovitorgoncalvesdev.github.io`, action `study`, e coloque sua chave secreta em `TURNSTILE_SECRET`. A chave pública do widget deve preencher `AI_SITEKEY` em `src/ai.js`; depois reconstrua e publique. Não reutilize segredos do Norte original. Ajuste `GEMINI_MODEL` se o modelo da sua conta exigir outra configuração.

Deploy do backend com Wrangler oficial: `wrangler deploy` dentro de `worker/`. Use o painel do Cloudflare para inserir segredos; nunca os coloque no código. `.dev.vars`, `.env` e `.wrangler` são ignorados. Nenhum segredo deve estar em commit, log ou distribuição.

Até a configuração ser concluída, NORBIT mostra indisponibilidade clara. Chats existentes e recursos locais permanecem utilizáveis. Não há integração automática com SUAP, matrícula, autenticação institucional ou resultados oficiais.

## Dados

Namespace `norte.si.ifba.v1`; tutorial `norte.si.ifba.tour.v1`; cópias locais derivam do namespace exclusivo. Não há service worker compartilhado. O Norte original não é lido nem alterado. Exportação de backup e importação validada são manuais. Não há sincronização entre aparelhos. Limpar o navegador pode apagar dados locais; exporte backups.

## Design

Identidade Enlace, escolhida pelo usuário: símbolo original, nome em contornos vetoriais, índigo e temas revisados. Orientação Apple Design, Impeccable, Design Taste Frontend e Logo Design; Huashu exclui esta aplicação de produção. O personagem Mochi original do Coucou foi integrado à NORBIT em Canvas transparente, conforme pedido do usuário, com crédito a Louis-CFM e licença MIT em assets/mochi/LICENSE. Animações e reações finitas, sem vídeos ou página de galeria. Arquivos da marca e guia em [Identidade](docs/identidade.md).

## Assuntos do curso e reações contextuais

Catálogo de 933 assuntos organizado a partir das ementas dos PPCs 2017 (59 disciplinas) e 2024 (63), incluindo optativas reais, com fontes e páginas. As matrizes permanecem separadas. Estágio não possui ementa individual no catálogo consultado. Em Conteúdos ou Percurso, abra o catálogo, busque um assunto e filtre por período; adicione ao espaço atual. Disciplinas novas do catálogo recebem os assuntos; nas existentes, a primeira atualização acrescenta somente nomes faltantes, preservando IDs, notas, etapas e registros. A versão é marcada por disciplina para não repor assuntos que o usuário remover depois. Completar assuntos oferece uma prévia.

Mochi tem 34 poses/contextos: leitura, escrita, pensamento, planejamento, busca, cartões, lembrança, questões, incentivo, foco, pausa, retorno, alarme, conclusão, importação, exportação, salvamento, projetos, notas, calendário e conversa. O desenho permanece Canvas transparente, com reações finitas e pausadas fora da tela. Não há novos vídeos nem chamadas de IA por causa das animações.

## Melhorias 1.3

Planejamento dos assuntos até a prova com prévia e respeito à agenda; comparação do plano do professor com assuntos e ementa; mesclagem manual por registros e conflitos; ICS com recorrências, exceções, fusos e prévia de sobreposições; pacote com referências e questões selecionadas. Navegação preserva filtros e rolagem. Semestre tem contador e revisão final. Percurso mostra progresso por período.

Laboratórios de teste de mesa, previsão de saída e identificação de bugs; SQLite real em Worker isolado, com JOIN, GROUP BY, consultas e banco reiniciável. SQL.js 1.15.0 e ICAL.js 2.2.1 são servidos localmente e carregados sob demanda; licenças MIT em assets/vendor. A IA preserva fonte e página informada ao enviar, permite explicações fixadas por assunto com versões e consulta cota sem consumir geração.

O backend Cloudflare permanece na conta original e aceita ambos os domínios autorizados. Limites: 200 pedidos globais/dia, 100 por navegador/dia, 6 por navegador/minuto e 12 globais/minuto, com orçamento interno de 1.000.000 unidades estimadas. A cota do Google é independente. O identificador de navegador é local e anônimo; não é uma conta ou sincronização.

## Verificação de layout

Com Node.js e npm: execute `npm install`, `npx playwright install chromium`, `npm run build` e `npm run test:layout`. O teste usa dados temporários em um navegador isolado e verifica cinco larguras, ambos os temas, nomes do percurso, filtros e tutorial. Opcionalmente, `CHROME_PATH` indica um Chrome instalado e `PLAYWRIGHT_MODULE_PATH` indica uma instalação existente de Playwright.
