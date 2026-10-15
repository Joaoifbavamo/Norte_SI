/* A dedicated workspace: destinations describe the student's next action. */
const cwDestinations=[['atividades','Pendentes'],['provas','Provas'],['entregas','Entregues'],['prioridades','Prioridades da NORBIT']];
function cwIsRoute(value=route){return ['atividades','provas','entregas','prioridades'].includes(value)}
let cwWhen='all';
for(const [key,label] of cwDestinations){const existing=routes.find(r=>r[0]===key);if(existing)existing[1]=label;else routes.push([key,label])}
for(const group of sidebarGroups)group[1]=group[1].filter(r=>!cwIsRoute(r));
sidebarGroups.splice(1,0,['Atividades e provas',cwDestinations.map(([key])=>key)]);
Object.assign(sidebarPaths,{
 provas:'<path d="M8 4H5v17h14V4h-3M8 3h8v4H8zM8 12h8M8 16h5"/>',
 entregas:'<path d="M9 5H5v16h14V5h-4M9 3h6v4H9zM8 14l3 3 5-6"/>',
 prioridades:'<path d="M4 7h12M4 12h9M4 17h6M18 11v9m-3-3 3 3 3-3M19 3v4m-2-2h4"/>'
});
const cwNavSidebarBefore=renderSidebar;
renderSidebar=function(...args){cwNavSidebarBefore(...args);for(const [key] of cwDestinations.slice(0,2)){const n=cwAll().filter(t=>cwPending(t)&&(key!=='provas'||t.kind==='Prova')).length,node=$('#nav a[href="#'+key+'"]');if(node&&n)node.insertAdjacentHTML('beforeend','<span class="count-badge" aria-label="'+n+' pendentes">'+n+'</span>')}};
const cwNavGoBefore=go;
go=function(value){if(cwIsRoute(value)){cwDetail=null;if(value!==route){cwWhen='all';cwStatus=value==='entregas'?'all':'pending'}}if(cwIsRoute(route)&&value!==route&&aiAwaitingVerification)aiCleanupWidget();return cwNavGoBefore(value)};
function cwScopeRows(){return cwAll().filter(t=>(cwScope==='all'||t.spaceId===exam()?.id)&&(!cwSubject||t.subjectId===cwSubject))}
cwFiltered=function(){return cwScopeRows().filter(t=>{
 const history=route==='entregas';
 if(history?!['submitted','done','cancelled'].includes(t.status):!cwPending(t))return false;
 if(route==='provas'&&t.kind!=='Prova')return false;
 if(['open','doing','submitted','done','cancelled'].includes(cwStatus)&&t.status!==cwStatus)return false;
 if(cwWhen==='late'&&cwHours(t)>=0||cwWhen==='soon'&&(cwHours(t)<0||cwHours(t)>72))return false;
 return !cwQuery||(t.title+' '+t.subjectName+' '+t.details).toLocaleLowerCase().includes(cwQuery.toLocaleLowerCase());
 }).sort((a,b)=>route==='entregas'?(b.updatedAt||b.date||'').localeCompare(a.updatedAt||a.date||''):cwScore(b)-cwScore(a)||cwHours(a)-cwHours(b)||a.title.localeCompare(b.title))};
function cwFriendlyDate(t){
 if(!t.date)return 'Sem prazo definido';
 const days=diffDays(today(),t.date),time=t.time?' · '+t.time:'';
 if(cwPending(t)&&cwHours(t)<0)return days===0?'Prazo encerrado hoje'+time:'Atrasada desde '+dateLabel(t.date)+time;
 return (days===0?'Hoje':days===1?'Amanhã':dateLabel(t.date))+time;
}
cwCard=function(t){const done=!cwPending(t),progress=t.steps.length?t.steps.filter(s=>s.done).length+'/'+t.steps.length+' etapas':'';return `<article class="cw-row ${!done&&cwHours(t)<0?'is-late':''}">
 <div class="cw-row-main"><div class="cw-row-meta"><span>${esc(t.kind)}</span><span>${esc(t.subjectName)}</span>${cwScope==='all'?'<span>'+esc(t.spaceName)+'</span>':''}</div>
 <button class="cw-title" data-action="cw-detail" ${cwAttrs(t)}>${esc(t.title)}</button>
 <div class="cw-row-foot"><span class="cw-deadline">${esc(cwFriendlyDate(t))}</span>${progress?'<span>'+progress+'</span>':''}${t.files.length?'<span>'+t.files.length+' anexo'+(t.files.length>1?'s':'')+'</span>':''}</div></div>
 <div class="cw-row-end"><span class="cw-status">${esc(cwStates[t.status])}</span>${t.grade!==null?'<strong>Nota '+t.grade.toLocaleString('pt-BR')+'/10</strong>':''}
 <div class="actions">${btn('Abrir','cw-detail',cwAttrs(t),'secondary small')}${!done?btn(t.kind==='Prova'?'Realizada':t.status==='doing'?'Entregar':'Começar','cw-advance',cwAttrs(t),'quiet small'):''}</div></div></article>`};
function cwNavigation(){return '<nav class="cw-navigation" aria-label="Atividades e provas">'+cwDestinations.map(([r,l])=>'<a href="#'+r+'" '+(route===r?'aria-current="page"':'')+'>'+l+'</a>').join('')+'</nav>'}
function cwSimpleFilters(){
 const history=route==='entregas',options=history?[['all','Todas as entregas'],['submitted','Aguardando nota'],['done','Concluídas'],['cancelled','Arquivadas']]:[['pending','Todas as pendências'],['open','A fazer'],['doing','Em andamento']];
 return `<section id="cw-filters" class="cw-simple-filters" aria-label="Filtrar atividades">
 <label>Buscar atividade<input id="cw-search" type="search" placeholder="Título, disciplina ou detalhe" value="${esc(cwQuery)}"></label>
 <label>Disciplina<select id="cw-subject"><option value="">Todas as disciplinas</option>${db.exams.filter(e=>!e.academic?.archived&&(cwScope==='all'||e.id===exam()?.id)).flatMap(e=>e.subjects.map(s=>'<option value="'+esc(s.id)+'" '+(cwSubject===s.id?'selected':'')+'>'+esc(s.name)+(cwScope==='all'?' · '+esc(e.name):'')+'</option>')).join('')}</select></label>
 <details class="cw-more-filters"><summary>Mais filtros${cwScope==='current'||!['all','pending'].includes(cwStatus)?' · ativos':''}</summary><div><label>Estudos<select id="cw-scope"><option value="all" ${cwScope==='all'?'selected':''}>Todos os espaços</option><option value="current" ${cwScope==='current'?'selected':''}>Somente ${esc(exam()?.name||'espaço atual')}</option></select></label><label>Situação<select id="cw-status">${options.map(([v,l])=>`<option value="${v}" ${cwStatus===v?'selected':''}>${l}</option>`).join('')}</select></label>${btn('Limpar filtros','cw-clear','','quiet small')}</div></details></section>`;
}
function cwQuickFilters(){const rows=cwScopeRows().filter(t=>cwPending(t)&&(route!=='provas'||t.kind==='Prova')&&(!['open','doing'].includes(cwStatus)||t.status===cwStatus)&&(!cwQuery||(t.title+' '+t.subjectName+' '+t.details).toLocaleLowerCase().includes(cwQuery.toLocaleLowerCase())));return '<div class="cw-quick-filters" role="group" aria-label="Filtrar por prazo">'+[['all','Todas',rows.length],['soon','Próximos 3 dias',rows.filter(t=>cwHours(t)>=0&&cwHours(t)<=72).length],['late','Atrasadas',rows.filter(t=>cwHours(t)<0).length]].map(([v,label,n])=>'<button data-action="cw-when" data-value="'+v+'" aria-pressed="'+(cwWhen===v)+'">'+label+' <span>'+n+'</span></button>').join('')+'</div>'}
function cwSimpleList(rows){
 if(!rows.length){const filtered=!!cwQuery||!!cwSubject||cwWhen!=='all'||!['all','pending'].includes(cwStatus);return empty(filtered?'Nenhum resultado com estes filtros':route==='entregas'?'Suas entregas vão aparecer aqui':route==='provas'?'Nenhuma prova pendente':'Você está em dia',filtered?'Limpe os filtros para ver outras atividades.':route==='entregas'?'Ao entregar uma atividade ou concluir uma prova, ela fica guardada neste histórico.':'Cadastre o que o professor passou, escolha a disciplina e informe o prazo.',filtered?btn('Limpar filtros','cw-clear','','secondary small'):route==='entregas'?btn('Ver pendências','cw-route','data-route="atividades"','secondary small'):btn(route==='provas'?'Adicionar prova':'Adicionar minha primeira atividade','cw-new','','primary small'))}
 if(route==='entregas')return rows.map(cwCard).join('');
 const groups=[['Atrasadas',t=>cwHours(t)<0],['Próximas entregas',t=>cwHours(t)>=0&&cwHours(t)<=72],['Mais adiante',t=>cwHours(t)>72&&Number.isFinite(cwHours(t))],['Sem prazo definido',t=>!t.date]];
 return groups.map(([label,filter])=>{const selected=rows.filter(filter);return selected.length?'<section class="cw-date-group"><h2>'+label+' <span>'+selected.length+'</span></h2>'+selected.map(cwCard).join('')+'</section>':''}).join('');
}
function cwBackupTools(){return '<details class="cw-backup-tools" id="cw-backup-tools"><summary>Backup e arquivos deste aparelho</summary><p>Os anexos ficam neste navegador. Baixe um backup completo para levar os registros e arquivos a outro aparelho. O JSON comum guarda apenas as referências aos arquivos.</p><div class="actions">'+btn('Baixar backup com anexos','cw-backup','','secondary small')+btn('Restaurar backup completo','cw-restore','','quiet small')+'</div></details>'}
viewCoursework=function(){
 if(cwScope==='current'&&cwSubject&&!exam()?.subjects.some(s=>s.id===cwSubject))cwSubject='';
 const detail=cwDetail&&cwAll().find(t=>t.id===cwDetail.id&&t.spaceId===cwDetail.spaceId);
 if(detail)return '<div class="cw-simple">'+btn('Voltar à lista','cw-detail-close','','quiet')+cwDetailView(detail)+'</div>';
 const priority=route==='prioridades',history=route==='entregas',rows=cwFiltered(),pending=rows.filter(cwPending),urgent=pending.filter(t=>cwHours(t)<=72).length;
 const titles={atividades:['Tarefas pendentes','Veja o que precisa fazer e abra uma atividade para continuar.'],provas:['Minhas provas','Separe um tempo para se preparar para cada avaliação.'],entregas:['Entregas e histórico','Consulte o que já foi entregue, acrescente notas ou reabra uma atividade.'],prioridades:['Por onde começar?','Veja a ordem sugerida e peça à NORBIT um plano para suas entregas.']};
 const [title,subtitle]=titles[route]||titles.atividades;
 return '<div class="cw-simple">'+heading(title,subtitle,btn(route==='provas'?'Adicionar prova':'Adicionar atividade','cw-new','','primary'))+cwNavigation()+cwSimpleFilters()+(!priority&&!history?cwQuickFilters():'')+
 (priority?'<div class="cw-priority-page">'+cwPriority(rows)+'</div>':
 '<aside id="cw-guide-shortcut" class="cw-guide-shortcut">'+norbitMascot(history?'complete':urgent?'focus':'planning','small')+'<div><strong>'+(history?'Cada entrega conta.':urgent?urgent+' pendência'+(urgent>1?'s precisam':' precisa')+' de atenção.':'Organize uma entrega de cada vez.')+'</strong><p>'+(history?'Abra uma atividade para registrar a nota ou conferir os arquivos.':'Confira os detalhes, avance nas etapas e marque quando entregar.')+'</p></div>'+btn('Ver prioridades da NORBIT','cw-route','data-route="prioridades"','secondary small')+'</aside><section id="cw-list" class="cw-list" aria-label="'+(history?'Histórico de entregas':'Atividades da seleção')+'">'+cwSimpleList(rows)+'</section>')+cwBackupTools()+'</div>';
};
Object.assign(actions,{
 'cw-route':b=>go(b.dataset.route),
 'cw-when':b=>{cwWhen=b.dataset.value;cwDetail=null;render()},
 'cw-clear':()=>{cwScope='all';cwSubject='';cwStatus=route==='entregas'?'all':'pending';cwQuery='';cwWhen='all';cwDetail=null;render()},
 'cw-advance':b=>{const {e,t}=cwFind(b);if(!t||!cwPending(t))return;snapshot();const status=t.kind==='Prova'?'done':t.status==='doing'?'submitted':'doing';cwWrite(e,{...t,status});commit(status==='doing'?'Atividade em andamento.':status==='done'?'Prova realizada. Confira seu histórico de entregas.':'Entrega registrada. Ela está em Entregues.',true)}
});
const cwSimpleDetailBefore=cwDetailView;
cwDetailView=function(t){return refreshTemplate(cwSimpleDetailBefore(t),root=>{root.querySelector('.cw-detail-head>div')?.insertAdjacentHTML('beforeend','<p class="cw-details-status"><span class="cw-status">'+esc(cwStates[t.status])+'</span>'+(t.grade!==null?'<strong>Nota '+t.grade.toLocaleString('pt-BR')+'/10</strong>':'')+'</p>');const submit=root.querySelector('[data-action=cw-submit]');if(submit&&t.kind==='Prova'){submit.textContent='Marcar prova como realizada';submit.dataset.action='cw-advance'}})};
const cwSimpleSubnavBefore=siSubnav;
siSubnav=function(){return refreshTemplate(cwSimpleSubnavBefore(),root=>{const old=root.querySelector('a[href="#prazos"]');if(old){old.href='#atividades';old.textContent='Pendentes'}})};
const cwSimpleNavigateBefore=actions.navigate;
actions.navigate=b=>{if(b.dataset.route==='prazos'&&!tour){closeModal();go('atividades');return}return cwSimpleNavigateBefore(b)};
const cwSimpleFormBefore=cwForm;
cwForm=function(e=exam(),item=null,sid=''){
 if(!e?.subjects.length)return toast('Adicione uma disciplina ao seu espaço antes de cadastrar atividades.');
 cwSimpleFormBefore(e,item,sid||cwSubject);const form=$('#modal-form');if(!form)return;
 if(!item&&route==='provas')form.elements.kind.value='Prova';
 const grid=form.querySelector('.form-grid'),group=(label,help)=>{const details=document.createElement('details');details.className='cw-form-section';details.innerHTML='<summary>'+label+'</summary><p class="form-help">'+help+'</p><div class="form-grid"></div>';grid.after(details);return details};
 const extra=group('Situação, esforço e nota','Preencha quando precisar. Você pode voltar e ajustar depois.'),materials=group('Etapas, links e arquivos','Divida a tarefa em passos e reúna os materiais da entrega.');
 for(const name of ['status','effort','weight','grade'])extra.querySelector('.form-grid').append(form.elements[name].closest('label'));
 for(const name of ['steps','links'])materials.querySelector('.form-grid').append(form.elements[name].closest('label'));
 materials.querySelector('.form-grid').append(form.querySelector('#cw-files').closest('label'));
 for(const check of [...form.querySelectorAll('[name="remove-file"]')])materials.append(check.closest('label'));
 const help=[...form.children].find(n=>n.classList?.contains('form-help'));if(help)materials.append(help);
 if(item?.steps.length||item?.links.length||item?.files.length)materials.open=true;
 form.elements.title.placeholder=route==='provas'?'Ex.: Prova de Banco de Dados':'Ex.: Lista de exercícios de SQL';
 form.elements.details.placeholder='O que precisa ser feito? Como o professor pediu a entrega?';
 const subtitle=$('#modal .dialog-header p');if(subtitle)subtitle.textContent=e.name+' · comece pelo título, disciplina e prazo. O restante é opcional.';
 if(item&&!item.id)$('#modal-title').textContent='Duplicar atividade';
 form.addEventListener('invalid',event=>{const section=event.target.closest('details');if(section)section.open=true},true);
 const previous=new Map((e.courseTasks||[]).map(t=>[t.id,t.updatedAt])),save=form.onsubmit;
 form.onsubmit=async event=>{await save(event);if($('#modal').open||storageProblem)return;const saved=(e.courseTasks||[]).find(t=>item?.id?t.id===item.id&&t.updatedAt!==previous.get(t.id):!previous.has(t.id));if(!saved)return;const destination=cwPending(saved)?saved.kind==='Prova'?'provas':'atividades':'entregas';if(cwSubject&&cwSubject!==saved.subjectId)cwSubject='';go(destination);cwDetail={spaceId:e.id,id:saved.id};render();window.scrollTo({top:0,behavior:'instant'})};
};
/* The priority destination keeps the full workflow visible, including on mobile. */
const cwSimplePriorityBefore=cwPriority;
cwPriority=function(rows){return refreshTemplate(cwSimplePriorityBefore(rows),root=>{
 if(route!=='prioridades')return;const details=root.querySelector('.cw-priority-content');if(details){details.querySelector(':scope>summary')?.remove();details.replaceWith(...details.childNodes)}root.querySelector('.cw-eyebrow')?.remove();
 const form=root.querySelector('#ai-form'),content=form?.querySelector('#ai-content');if(!form||!content||!cwAIRequest)return;
 const max=Math.min(600,Math.max(0,7900-cwAIRequest.content.length)),preview=document.createElement('div');preview.className='cw-ai-preview';
 preview.innerHTML='<h3>Confira antes de analisar</h3><p>Serão enviados os títulos, disciplinas, prazos, pesos, esforço, etapas e um trecho dos detalhes de até 12 pendências desta seleção. Os arquivos não serão enviados. A análise usa um pedido de IA.</p><ul>'+rows.filter(cwPending).slice(0,12).map(t=>'<li><strong>'+esc(t.title)+'</strong><span>'+esc(t.subjectName+' · '+cwFriendlyDate(t))+'</span></li>').join('')+'</ul><label>Algo a considerar? (opcional)<textarea id="cw-ai-note" maxlength="'+max+'" rows="2" placeholder="Ex.: tenho duas horas livres hoje." '+(aiBusy?'disabled':'')+'>'+esc(cwAIRequest.note||'')+'</textarea></label>';
 const original=content.closest('label'),payload=document.createElement('details');payload.className='cw-ai-payload';payload.innerHTML='<summary>Ver o texto completo que será enviado</summary>';content.readOnly=true;content.setAttribute('aria-label','Texto completo enviado à NORBIT');content.textContent=cwAIRequest.content+(cwAIRequest.note?'\nPreferência do aluno: '+cwAIRequest.note:'');original.replaceWith(preview);payload.append(content);preview.after(payload);
})};
document.addEventListener('input',event=>{if(event.target.id!=='cw-ai-note'||!cwAIRequest)return;cwAIRequest.note=event.target.value;const content=$('#ai-content');if(content)content.value=cwAIRequest.content+(cwAIRequest.note?'\nPreferência do aluno: '+cwAIRequest.note:'')});
for(const type of ['input','change'])document.addEventListener(type,event=>{if(cwIsRoute()&&aiAwaitingVerification&&['cw-search','cw-scope','cw-status','cw-subject'].includes(event.target.id))aiCleanupWidget()},true);
const cwSimpleCaptureBefore=studyTourCapture;
studyTourCapture=function(){return {...cwSimpleCaptureBefore(),courseworkNavigation:{cwWhen,cwPriorityExpanded}}};
const cwSimpleRestoreBefore=studyTourRestore;
studyTourRestore=function(saved){cwSimpleRestoreBefore(saved);if(saved?.courseworkNavigation)({cwWhen,cwPriorityExpanded}=saved.courseworkNavigation)};
/* Explain the new destinations instead of pointing at the former split panel. */
tourAreas.atividades.steps=[
 tStep('#cw-filters','Encontre a atividade certa.','Busque pelo título ou escolha a disciplina. Em Mais filtros, limite os estudos e a situação. Seus cadastros antigos continuam aqui.',{onEnter:cwTourDemo}),
 tStep('.cw-quick-filters','Veja primeiro o que está perto.','Use Próximos 3 dias ou Atrasadas para reduzir a lista. Cada botão mostra a quantidade de pendências naquele prazo.'),
 tStep('#cw-list','Abra, comece e entregue.','Abra para acessar detalhes, etapas, links e arquivos. Começar marca Em andamento; Entregar move para Entregues. Provas têm a opção Realizada.'),
 tStep('#cw-guide-shortcut','As prioridades têm uma página própria.','Abra Prioridades da NORBIT na seção Atividades e provas da barra lateral. A ordem local não gasta IA; a análise opcional pede sua confirmação e aparece nessa página.'),
 tStep('#cw-detail','Tudo o que a atividade precisa.','Confira instruções, etapas e arquivos sem outra lista disputando espaço. Voltar à lista mantém seus filtros.',{prepare:()=>{cwDetail={spaceId:exam().id,id:'cw-tour-example'};render()}}),
 tStep('#modal [name=details]','Cadastre o essencial primeiro.','Informe título, disciplina e prazo. Em Etapas, links e arquivos, reúna os materiais. Situação, esforço e nota ficam em outro grupo opcional.',{prepare:()=>cwForm(exam(),cwRows(exam()).find(t=>t.id==='cw-tour-example')),modal:true,observeOnly:true}),
 tStep('#cw-backup-tools','Guarde uma cópia com os arquivos.','Abra Backup e arquivos deste aparelho para baixar ou restaurar um ZIP completo. A restauração pede confirmação antes de substituir os registros.',{prepare:()=>{closeModal();cwDetail=null;render()}})
];
tourAreas.provas={label:'Provas',caption:'Avaliações em uma lista própria',steps:[tStep('.cw-navigation','Encontre as provas sem procurar entre tarefas.','A barra lateral reúne Pendentes, Provas, Entregues e Prioridades da NORBIT. A mesma navegação aparece aqui no celular.'),tStep('[data-action=cw-new]','Uma prova já começa com o tipo certo.','Adicionar prova abre o cadastro com Prova selecionado. Informe a disciplina, a data e o horário; reúna orientações e materiais no mesmo lugar.') ]};
tourAreas.entregas={label:'Entregues',caption:'Entregas, notas e histórico',steps:[tStep('#cw-filters','Entregar preserva o histórico.','Atividades entregues e provas realizadas aparecem aqui. Use Mais filtros para separar as que aguardam nota, as concluídas e as arquivadas.'),tStep('#cw-list','Volte para conferir ou ajustar.','Abra uma entrega para conferir arquivos, editar a nota ou mudar a situação para A fazer. Reabrir leva a atividade de volta a Pendentes.') ]};
tourAreas.prioridades={label:'Prioridades da NORBIT',caption:'Uma ordem e um primeiro passo',steps:[tStep('#cw-priority','Comece pelo que precisa de atenção.','A ordem considera prazo, peso e esforço e funciona sem IA. O Mochi acompanha a urgência com reações discretas.',{onEnter:()=>{cwDetail=null;cwStatus='pending';cwWhen='all';cwScope='all';cwSubject='';render()}}),tStep('[data-action=cw-ai]','Peça uma análise quando precisar.','Confira o resumo antes de enviar. A NORBIT sugere a ordem e o primeiro passo, usando um pedido. Os arquivos anexos não são enviados; a sugestão não altera sua agenda.') ]};
for(const step of tourAreas.semestre.steps)if(step.selector==='[data-action=cw-subject]')step.body='Abra Atividades na disciplina para filtrar suas pendências. A seção Atividades e provas da barra lateral separa Pendentes, Provas, Entregues e Prioridades da NORBIT.';
