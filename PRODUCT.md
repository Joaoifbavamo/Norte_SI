# Norte SI

App independente para estudantes de Sistemas de Informação do IFBA Vitória da Conquista e aprendizado livre. Base Norte 4.1.0 preservada. O aluno escolhe ofertas por semestre letivo e informa separadamente o período do curso; repetir disciplinas cria novos registros em outro espaço. Sem contas ou sincronização automática. Dados locais e backup manual. Matrizes do hub são referência provisória; resultados, faltas e aproveitamentos são informados pelo usuário. Backend Gemini separado, configurado por segredo, sem reaproveitar cota ou credenciais do Norte.

## Atividades e leitura da NORBIT · 1.4.0

Atividades por disciplina e visão de pendências entre espaços ativos. Registros antigos de avaliações e prazos aparecem sem migração destrutiva; enriquecimento mantém o mesmo identificador e sincroniza os campos originais. Detalhes, links HTTP(S), checklist, esforço, peso, nota e estados de entrega. Avisos em Hoje a até 72 horas do prazo, incluindo atrasos. Horários locais. Prioridade local disponível offline; a análise opcional envia um resumo de até 12 pendências, não os arquivos, e guarda a explicação na própria área. Sugestões não alteram a agenda.

Anexos em IndexedDB, até 15 MB por arquivo, 10 por atividade e 100 MB armazenados no navegador. Não são sincronizados. O ZIP completo inclui registros e os anexos disponíveis; a restauração substitui os registros mediante confirmação. JSON comum e mesclagem de JSON incluem metadados, não os arquivos. Arquivos removidos da atividade são retidos localmente para preservar o desfazer. fflate é carregado somente ao usar ZIP, com licença incluída.

Leitura de mensagens novas e antigas com Markdown limitado, HTML escapado, listas, tabelas e blocos de código copiáveis. Mensagens longas do usuário podem ser expandidas. Movimento reduzido respeitado. Tutorial inclui os fluxos novos e usa dados temporários.

## Navegação de atividades · 1.4.1

Seção exclusiva Atividades e provas na barra lateral, com Pendentes, Provas, Entregues e Prioridades da NORBIT. Mesmos destinos na navegação do conteúdo para celular. Listas agrupadas por prazo, busca e disciplina visíveis; situação e espaço em filtros adicionais. Detalhes ocupam uma tela própria, com retorno mantendo os filtros. Cadastro mostra os campos essenciais primeiro e separa etapas, links e arquivos de esforço, situação e nota. Ao salvar, o registro abre para conferência. Ações rápidas permitem iniciar uma atividade, entregar ou marcar uma prova como realizada, com desfazer.

Prioridades locais e análise da NORBIT ficam no destino próprio. O envio usa uma prévia legível e uma orientação opcional do aluno; o texto completo permanece consultável. Backup com anexos continua disponível em um grupo separado. Os registros e arquivos existentes mantêm seus formatos e identificadores.

## Configuração guiada e rotina editável · 1.5.0

Primeira entrada sem preparação abre um guia local de sete etapas: nome, objetivo, semestre/disciplinas, ponto de partida por disciplina, dias e horários, ritmo e prévia. Catálogo IFBA e modelos de programação, inglês e concurso são editáveis. O rascunho fica em chave local separada e os registros só mudam após confirmar a prévia. Não há pedidos de IA no guia.

A geração distribui blocos de forma determinística conforme prioridade, nível declarado, prazo, assunto inicial, método, horários, pausas e margem de tempo. Evita aulas, blocos e compromissos importados existentes. Não cria resultados de estudo. Minha rotina permite editar todas as respostas; por padrão mantém o planejamento existente. Atualizar os próximos blocos exige escolha explícita, adia os registros substituídos e preserva blocos concluídos, sessões e vínculos. Disciplinas retiradas são arquivadas.

Hoje destaca saudação com nome, dia da semana e data, mensagem diária baseada em registros reais, próximo bloco e prazos. Não presume desempenho quando não há amostra. Dias livres são reconhecidos. O tutorial usa um exemplo temporário e restaura o rascunho e os registros anteriores. A NORBIT só recebe preferências do guia quando o usuário envia uma mensagem com contexto ativado.

Hoje organiza ferramentas secundárias em Praticar e revisar e Acompanhar meu progresso, mantendo o próximo passo e os prazos em evidência. Reflexões diárias locais selecionadas conforme dias livres, amostra de questões, prazos e registros dos últimos sete dias. Textos originais identificados; adaptações de Epicteto e Marco Aurélio indicam obra e fonte consultável. Sem novas chamadas à IA nem mudanças nos registros.
