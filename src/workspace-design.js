/* Task-first navigation and plain-language guidance. No storage migration. */
const workspaceHelp={
 hoje:['Seu dia de estudos','Escolha o próximo passo e confira os prazos do seu espaço.','Escolha um objetivo no guia da NORBIT.','Abra um prazo para consultar a atividade.','Registre apenas o tempo que você realmente estudou.'],
 faculdade:['Minha faculdade','Disciplinas e assuntos do semestre selecionado.','Confira o semestre no seletor lateral.','Escolha assuntos para seu foco atual.','Abra uma disciplina para consultar conteúdos, atividades e notas.'],
 semestre:['Meu semestre','Organize as disciplinas que você está cursando.','Escolha ou crie um semestre.','Adicione as disciplinas em que está matriculado.','Abra cada disciplina para organizar conteúdos e atividades.'],
 livres:['Estudos livres','Organize idiomas, concursos e outros objetivos fora da faculdade.','Crie um espaço para seu objetivo.','Adicione matérias e assuntos.','Planeje sessões sem misturar os dados do semestre.'],
 sessoes:['Sessões de estudo','Escolha um assunto e reserve um bloco de atenção.','Selecione um assunto do seu foco atual.','Defina o tempo e o objetivo da sessão.','Ao terminar, confira e registre o que estudou.'],
 atividades:['Atividades e provas','Trabalhos e entregas que ainda precisam da sua atenção.','Adicione uma atividade com disciplina e prazo.','Use os filtros para encontrar o que precisa fazer.','Abra a atividade para incluir arquivos, etapas e andamento.'],
 provas:['Provas','Confira as avaliações futuras e prepare seu estudo.','Cadastre a prova na disciplina correspondente.','Informe data, conteúdo e peso quando souber.','Reserve tempo para preparação antes do prazo.'],
 entregas:['Entregues','Consulte atividades concluídas e entregas anteriores.','Localize a atividade pelos filtros.','Abra os detalhes para consultar arquivos e anotações.','Atualize a nota quando receber o resultado.'],
 prioridades:['Prioridades','Organize o que fazer primeiro com base nos seus prazos.','Confira datas e esforço estimado das atividades.','Consulte a ordem sugerida e seus critérios.','Use a análise da IA como apoio e decida o próximo passo.'],
 plano:['Planejamento','Reserve horários para estudar; os registros realizados ficam no Histórico.','Escolha o dia e o assunto.','Reserve um horário que caiba na sua rotina.','Depois de estudar, registre a duração real.'],
 calendario:['Calendário','Veja compromissos e distribua o estudo ao longo da semana.','Confira o período exibido.','Adicione compromissos ou importe um calendário.','Revise os horários antes de reservar estudos.'],
 foco:['Cronômetro','Concentre-se em um assunto e acompanhe o tempo.','Escolha a duração e o modo de foco.','Inicie o cronômetro e ajuste o som se desejar.','Ao encerrar, confira os dados antes de registrar.'],
 banco:['Praticar questões','Resolva questões, confira respostas e acompanhe suas dificuldades.','Filtre por disciplina e assunto.','Escolha uma questão para responder.','Leia a explicação e retome os assuntos em que errou.'],
 questoes:['Caderno de erros','Transforme dificuldades em próximos assuntos de estudo.','Registre a questão e o motivo do erro.','Filtre pelo assunto que deseja retomar.','Revise a explicação antes de tentar novamente.'],
 simulados:['Simulados','Pratique com tempo definido e confira seu resultado.','Escolha o conteúdo do simulado.','Responda dentro do tempo que definiu.','Revise os erros para planejar o próximo estudo.'],
 revisoes:['Revisões','Retome os assuntos que precisam de reforço.','Escolha um assunto pendente.','Tente lembrar antes de consultar o material.','Informe o resultado da revisão para atualizar o acompanhamento.'],
 cartoes:['Cartões de memória','Pratique a lembrança com perguntas e respostas curtas.','Escolha uma disciplina ou crie um cartão.','Tente responder antes de revelar o verso.','Avalie sua lembrança para organizar as próximas revisões.'],
 biblioteca:['Materiais de estudo','Encontre referências, links e anotações por disciplina.','Adicione um material e vincule à disciplina.','Use os filtros para encontrar uma referência.','Abra o material durante uma sessão de estudo.'],
 evolucao:['Meu progresso','Acompanhe o estudo registrado e identifique onde ajustar o ritmo.','Escolha o período que deseja analisar.','Compare tempo, questões e assuntos.','Use o resultado para ajustar sua rotina, sem tratar tempo como domínio.'],
 historico:['Histórico de estudos','Confira e corrija os estudos que você já registrou.','Filtre por período ou disciplina.','Abra Editar para corrigir um registro.','Exporte um backup para guardar uma cópia dos dados.'],
 ia:['NORBIT AI','Converse sobre uma dúvida e continue o assunto em chats salvos.','Abra um chat ou comece uma conversa.','Descreva a dúvida e confira o contexto enviado.','Faça perguntas sobre a resposta; confirme informações importantes.'],
 ajustes:['Ajustes','Personalize a aparência, sua rotina e o cuidado com seus dados.','Escolha uma seção de ajustes.','Altere as preferências conforme seu uso.','Em Dados e backup, exporte uma cópia dos registros.'],
 rotina:['Minha rotina','Ajuste objetivos, disciplinas e horários sempre que precisar.','Confira seus objetivos e disciplinas atuais.','Defina disponibilidade e dias livres.','Revise a prévia antes de aplicar um novo plano.'],
 comecar:['Começar meu espaço','Responda às perguntas para montar um plano que você poderá editar.','Conte seu objetivo de estudo.','Escolha disciplinas e disponibilidade.','Confira o plano antes de salvar.'],
 guia:['Tutorial','Aprenda usando uma demonstração que preserva seus registros.','Escolha a área que quer conhecer.','Siga as instruções destacadas na tela.','Encerre quando quiser para voltar aos seus estudos.'],
 edital:['Disciplinas e conteúdos','Organize o que precisa aprender, assunto por assunto.','Adicione ou abra uma disciplina.','Revise a lista de conteúdos.','Escolha um assunto para estudar ou revisar.'],
 assuntos:['Assuntos','Consulte o conteúdo e escolha seu próximo estudo.','Selecione uma disciplina.','Confira o progresso dos assuntos.','Abra um assunto para estudar e registrar sua prática.'],
 disciplina:['Minha disciplina','Conteúdos, atividades e acompanhamento reunidos em um lugar.','Escolha a aba correspondente ao que deseja fazer.','Organize conteúdos e compromissos.','Atualize notas e frequência com as informações da disciplina.'],
 percurso:['Percurso do curso','Consulte a organização curricular e planeje seus próximos semestres.','Escolha a matriz de referência.','Confira os períodos e disciplinas.','Confirme requisitos e informações com a instituição.'],
 projetos:['Projetos','Organize etapas e materiais dos seus projetos de estudo.','Crie ou abra um projeto.','Divida o trabalho em etapas pequenas.','Acompanhe as entregas e mantenha os materiais juntos.'],
 academico:['Central acadêmica','Ferramentas de apoio para as atividades do curso.','Escolha a ferramenta adequada à sua atividade.','Preencha os dados solicitados.','Confira o resultado e guarde o que for útil.'],
 jornada:['Sessão guiada','Lembre, pratique e revise um assunto com uma etapa por vez.','Defina assunto e objetivo.','Avance pelas etapas no seu ritmo.','Confira o estudo antes de registrar a conclusão.'],
 prazos:['Prazos','Confira as datas importantes dos seus estudos.','Cadastre os compromissos com suas datas.','Revise o que vence primeiro.','Reserve tempo para se preparar.']
};
const workspaceParent={provas:'atividades',entregas:'atividades',prioridades:'atividades',semestre:'faculdade',edital:'faculdade',assuntos:'faculdade',disciplina:'faculdade',percurso:'faculdade',projetos:'faculdade',academico:'faculdade',questoes:'banco',simulados:'banco',revisoes:'banco',cartoes:'banco',jornada:'sessoes',foco:'sessoes',historico:'evolucao',prazos:'atividades',rotina:'ajustes',comecar:'ajustes',calendario:'plano'};
const workspaceNavBefore=renderSidebar;
renderSidebar=function(...args){
 if(tour||!exam())return workspaceNavBefore(...args);
 const previous=sidebarGroups.map(([label,items])=>[label,[...items]]);
 sidebarGroups.splice(0,sidebarGroups.length,['Meu dia',['hoje','plano','atividades']],['Meus estudos',['faculdade','livres','sessoes','banco','biblioteca']],['Assistência e progresso',['ia','evolucao']],['Preferências',['guia','ajustes']]);
 try{workspaceNavBefore(...args)}finally{sidebarGroups.splice(0,sidebarGroups.length,...previous)}
 const labels={atividades:'Atividades e provas',banco:'Praticar questões',ia:'Conversar com NORBIT',guia:'Como usar',evolucao:'Meu progresso'};
 for(const a of document.querySelectorAll('#nav a')){const key=a.hash.slice(1);if(labels[key])a.querySelector('.nav-label').textContent=labels[key];a.title=workspaceHelp[key]?.[1]||studyLabel(key);if(workspaceParent[route]===key){a.classList.add('active');a.setAttribute('aria-current','location')}}
};
let workspaceHelpRoute='';
actions['workspace-help']=button=>{const panel=$('#workspace-instructions'),open=button.getAttribute('aria-expanded')!=='true';if(!panel)return;panel.hidden=!open;button.setAttribute('aria-expanded',String(open));button.textContent=open?'Ocultar orientação':'Como usar esta página';workspaceHelpRoute=open?route:'';if(open)siteMotion.play(panel,[{opacity:.5,transform:'translateY(-4px)'},{opacity:1,transform:'none'}],{duration:180});};
const workspaceRenderBefore=render;
render=function(){const result=workspaceRenderBefore();document.body.dataset.workspaceRoute=route;if(tour)return result;
 if(!exam()&&!['ajustes','guia','ia','semestre','livres','academico','percurso','calendario','comecar','rotina'].includes(route))return result;
 const content=$('#content'),info=workspaceHelp[route],heading=content.querySelector('.page-heading'),header=heading||content.querySelector('#daily-home>header');
 if(cwIsRoute()&&!content.querySelector('.cw-navigation'))content.insertAdjacentHTML('afterbegin',cwNavigation());
 if(info&&header){const title=heading?.querySelector('h1'),subtitle=heading?.querySelector('p'),activePractice=route==='banco'&&(studio().draft||practiceResultId);if(title&&!activePractice&&!['disciplina','assuntos','comecar'].includes(route))title.textContent=info[0];if(subtitle&&!activePractice)subtitle.textContent=info[1];
 const help=document.createElement('div');help.className='workspace-help';help.innerHTML='<button class="quiet small" data-action="workspace-help" aria-expanded="'+(workspaceHelpRoute===route)+'" aria-controls="workspace-instructions">'+(workspaceHelpRoute===route?'Ocultar orientação':'Como usar esta página')+'</button><section id="workspace-instructions" '+(workspaceHelpRoute===route?'':'hidden')+' aria-label="Como usar esta página"><ol>'+info.slice(2).map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><button class="secondary small" data-action="tour-current">Abrir tutorial ao vivo</button></section>';header.after(help);
 }
 // Keep related destinations close to the content, rather than repeating them in the sidebar.
 if(['faculdade','sessoes'].includes(route)&&!content.querySelector('.si-subnav')){const links=route==='faculdade'?[['faculdade','Visão geral'],['semestre','Disciplinas'],['percurso','Matriz curricular'],['projetos','Projetos'],['academico','Ferramentas']]:[['sessoes','Preparar estudo'],['foco','Cronômetro'],['jornada','Sessão guiada']];const nav=document.createElement('nav');nav.className='si-subnav workspace-subnav';nav.setAttribute('aria-label','Áreas relacionadas');nav.innerHTML=links.map(([r,l])=>'<a class="si-link '+(r===route?'selected':'')+'" href="#'+r+'" '+(r===route?'aria-current="page"':'')+'>'+l+'</a>').join('');(heading||content.firstElementChild)?.before(nav)}
 // One command bar, one destination: do not duplicate buttons across navigation levels.
 const scope=content.querySelector(':scope>.si-scope'),nav=content.querySelector(':scope>.si-subnav');if(scope&&nav){nav.append(scope);nav.classList.add('workspace-home-nav')}
 for(const node of content.querySelectorAll('.empty'))node.classList.add('workspace-empty');
 return result;
};
for(const [key,area] of Object.entries(tourAreas)){if(area.steps?.[0]&&workspaceHelp[key])area.steps[0].body+=' Fora do tutorial, use “Como usar esta página” para consultar três passos rápidos. A barra lateral reúne as áreas principais; as abas da página mostram as ferramentas relacionadas.'}
