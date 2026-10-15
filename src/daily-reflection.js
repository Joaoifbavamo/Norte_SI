// Original reflections are deliberately distinguished from adaptations of public-domain works.
const dailySources={
 control:{text:'Dedique sua atenção ao que depende de suas próprias ações.',author:'Epicteto',work:'Manual, §1',url:'https://classics.mit.edu/Epictetus/epicench.html'},
 obstacle:{text:'A mente pode transformar um obstáculo em auxílio para agir.',author:'Marco Aurélio',work:'Meditações, V.20',url:'https://classics.mit.edu/Antoninus/meditations.5.five.html'},
 return:{text:'Se você falhar, retorne ao caminho sem se entregar ao desânimo.',author:'Marco Aurélio',work:'Meditações, V.9',url:'https://classics.mit.edu/Antoninus/meditations.5.five.html'}
};
const dailyReflections={
 rest:['Descansar também faz parte de uma rotina que você consegue manter.','Seu dia livre não precisa virar uma dívida com os estudos.','Há espaço para aprender e há espaço para viver o que você aprende.','Hoje, respeitar a pausa também é seguir o plano.','Você pode deixar o próximo passo preparado e aproveitar o descanso.','Uma semana possível inclui tempo para você.','Seu valor não é medido pelas horas que você registra.'],
 review:['Um erro bem compreendido pode orientar seu próximo exercício.',dailySources.obstacle,'Antes de repetir muitas questões, experimente explicar um erro com suas palavras.','A dúvida mostra onde vale colocar atenção; ela não define sua capacidade.','Diminua o tamanho do passo, se precisar. Continue investigando o porquê.','Rever um conceito com calma pode ser mais útil que correr para o seguinte.','Sua próxima tentativa pode começar por uma pergunta melhor.'],
 deadline:[dailySources.control,'Transforme a entrega em uma primeira etapa que caiba no dia.','Você não precisa resolver tudo de uma vez para começar a organizar os prazos.','Escolha o que precisa de atenção primeiro e defina uma ação concreta.','Uma prioridade clara deixa o próximo passo mais simples.','Dividir uma tarefa grande torna visível o que pode ser feito agora.','Se a carga não couber, ajustar o plano também é uma decisão responsável.'],
 return:['Recomeçar pode ser tão simples quanto escolher um assunto e alguns minutos.','O registro que falta não conta toda a sua história. Comece do ponto em que está.',dailySources.return,'Um plano pequeno e possível pode ajudar mais que uma promessa enorme.','Você não precisa compensar todos os dias anteriores hoje.','Escolha um primeiro passo que consiga terminar com calma.','A sua rotina pode mudar. Seu planejamento também pode.'],
 steady:['Reconheça o que você fez e escolha com calma o que vem depois.','A constância se constrói em passos que cabem na vida.',dailySources.control,'Além de avançar, reserve espaço para compreender o caminho.','O próximo assunto fica mais claro quando você revisita o que aprendeu.','Um bom ritmo permite continuar e também permite ajustar.','Olhe para seus registros como orientação, sem transformar números em comparação.']
};
function dailyReflection(x=setupDailyData(),date=today()){
 const urgent=x.deadlines.some(t=>cwHours(t)<=72),context=x.free?'rest':x.last.q>=10&&x.last.accuracy<60?'review':urgent?'deadline':!x.last.m?'return':'steady';
 const day=Math.floor(Date.parse(date+'T12:00:00Z')/86400000),entry=dailyReflections[context][((day%7)+7)%7],item=typeof entry==='string'?{text:entry,author:'Reflexão do Norte'}:entry;
 const reasons={rest:'Hoje é um dia livre na disponibilidade que você informou.',review:`Você registrou ${x.last.c} acertos em ${x.last.q} questões nos últimos 7 dias. A sugestão é reservar atenção à revisão, sem julgar sua capacidade.`,deadline:'Há uma pendência vencida ou com prazo nas próximas 72 horas.',return:'Não há tempo de estudo registrado nos últimos 7 dias. Isso não significa que você não estudou.',steady:`Você registrou estudo em ${x.days} dia${x.days===1?'':'s'} nos últimos 7 dias. A reflexão acompanha esse ritmo, sem presumir domínio dos assuntos.`};
 return {...item,context,reason:reasons[context]};
}
function dailyReflectionPanel(){const q=dailyReflection();return `<aside class="daily-reflection" id="daily-reflection" aria-labelledby="daily-reflection-title"><div class="reflection-heading"><h2 id="daily-reflection-title">Uma pausa para pensar</h2><span>Reflexão do dia</span></div><blockquote><p>${esc(q.text)}</p><footer>${esc(q.author)}${q.work?' · '+esc(q.work)+' <span>· Adaptação livre</span>':''}</footer></blockquote><details><summary>Por que esta reflexão hoje?</summary><p>${esc(q.reason)} A seleção muda com o dia e o contexto dos seus registros, neste aparelho, sem usar IA.</p>${q.url?`<a href="${esc(q.url)}" target="_blank" rel="noopener noreferrer">Consultar a obra · texto em inglês</a><p>Adaptação em português do trecho indicado; não é uma citação literal.</p>`:'<p>Texto original do Norte, sem atribuição a um filósofo.</p>'}</details></aside>`}
const dailyDisclosureState=new Map();
document.addEventListener('toggle',event=>{const n=event.target;if(n.matches?.('.daily-disclosure'))dailyDisclosureState.set(n.id,n.open)},true);
const dailyOrganizeBefore=viewPersonalToday;
viewPersonalToday=function(){return refreshTemplate(dailyOrganizeBefore(),root=>{
 const hero=root.querySelector('#daily-home');if(!hero)return;
 const reflection=document.createElement('div');reflection.innerHTML=dailyReflectionPanel();
 const plan=root.querySelector('[data-dashboard=plan]'),start=root.querySelector('#connected-start');
 (plan||start||hero).after(reflection.firstElementChild);
 if(tour)return;
 const makeGroup=(id,title,description)=>{const node=document.createElement('details');node.id=id;node.className='daily-disclosure';node.open=dailyDisclosureState.get(id)===true;node.innerHTML=`<summary><span><strong>${title}</strong><small>${description}</small></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></summary><div class="daily-disclosure-body"></div>`;return node};
 const practice=makeGroup('daily-practice','Praticar e revisar','Sua fila de estudo e os assuntos para recuperar da memória'),progress=makeGroup('daily-progress','Acompanhar meu progresso','Registros, metas, cobertura dos assuntos e todos os prazos');
 for(const block of root.querySelectorAll('.dashboard-block')){if(block.dataset.dashboard==='plan')continue;const group=['queue','reviews'].includes(block.dataset.dashboard)?practice:progress;group.lastElementChild.append(block)}
 const metrics=root.querySelector('.metrics');if(metrics)progress.lastElementChild.prepend(metrics);
 const grid=root.querySelector('.dashboard-grid');if(grid){grid.classList.add('daily-main-plan');if(!grid.children.length)grid.remove()}
 const anchor=root.querySelector('#daily-reflection');for(const group of [progress,practice].reverse())if(group.lastElementChild.children.length)anchor.after(group);
 const tools=root.querySelector('.dashboard-tools');if(tools){tools.classList.add('daily-panel-tools');const first=root.querySelector('.daily-disclosure');if(first)first.before(tools)}
 })};
tourAreas.hoje.steps.splice(1,0,tStep('#daily-reflection','Uma reflexão para o seu momento.','A mensagem muda a cada dia e considera os últimos 7 dias de registros, dias livres e prazos próximos. Abra Por que esta reflexão hoje? para entender a escolha e consultar a fonte das adaptações. Textos originais são identificados e a seleção não usa IA.'));
