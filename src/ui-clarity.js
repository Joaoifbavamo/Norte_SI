/* Presentation only: origin, action and quotation have different visual roles. */
function clarityIdentity(label,detail){return '<div class="clarity-speaker"><strong>'+esc(label)+'</strong><span>'+esc(detail)+'</span></div>'}
const clarityTodayBefore=viewPersonalToday;
viewPersonalToday=function(){return refreshTemplate(clarityTodayBefore(),root=>{
 const hero=root.querySelector('#daily-home');if(!hero)return;
 hero.querySelector('header>.norbit-mascot')?.remove();
 const quick=document.createElement('nav');quick.className='clarity-quick-actions';quick.setAttribute('aria-label','Ações rápidas do dia');quick.innerHTML=btn('Registrar estudo','session','','primary')+btn('Planejar meu dia','setup-today-plan','','secondary')+btn('Ver pendências','cw-all','','secondary');hero.querySelector('header').after(quick);
 const start=root.querySelector('#connected-start');if(start){start.classList.add('clarity-guidance');const copy=start.firstElementChild;copy.insertAdjacentHTML('afterbegin',clarityIdentity('NORBIT','Orientação local'));start.insertAdjacentHTML('afterbegin',norbitMascot(setupDailyData().free?'rest':'planning','small'));}
 const reflection=root.querySelector('#daily-reflection');if(reflection){reflection.querySelector('h2').textContent='Reflexão do dia';const quote=reflection.querySelector('blockquote');quote.insertAdjacentHTML('afterbegin','<span class="clarity-quote-mark" aria-hidden="true">“</span>');const source=dailyReflection();if(source.url)quote.insertAdjacentHTML('beforeend','<a class="clarity-source" href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">Ler a fonte original</a>');}
 if(!tour&&start&&reflection){const layout=document.createElement('div');layout.className='clarity-home-layout';reflection.before(layout);layout.append(start,reflection)}
 })};
const claritySetupBefore=viewSetup;viewSetup=function(){return refreshTemplate(claritySetupBefore(),root=>{const box=root.querySelector('#setup-companion');if(!box)return;const speech=document.createElement('div');speech.className='clarity-setup-speech';speech.innerHTML=clarityIdentity('NORBIT','Guia de configuração');box.querySelector('p').before(speech);speech.append(box.querySelector('p'));})};
const clarityAIViewBefore=viewAI;viewAI=function(){return refreshTemplate(clarityAIViewBefore(),root=>{
 const options=root.querySelector('#norbit-options'),modes=options?.querySelector('.ai-modes');if(modes){options.before(modes);modes.setAttribute('aria-label','O que fazer com a NORBIT');}
 const welcome=root.querySelector('.norbit-welcome>p');if(welcome)welcome.insertAdjacentHTML('beforebegin',clarityIdentity('NORBIT AI','Seu assistente de estudos'));
 for(const answer of root.querySelectorAll('.norbit-answer')){const byline=answer.querySelector('.norbit-answer-byline');if(byline){byline.querySelector('strong').textContent='NORBIT AI';byline.insertAdjacentHTML('beforeend','<span class="clarity-ai-origin">Resposta gerada por IA</span>')}else answer.insertAdjacentHTML('afterbegin',clarityIdentity('NORBIT AI','Preparando resposta'));}
 })};
const clarityCWBefore=viewCoursework;viewCoursework=function(){return refreshTemplate(clarityCWBefore(),root=>{
 for(const node of root.querySelectorAll('.cw-guide-shortcut>div,.cw-guide>div')){node.querySelector('.cw-eyebrow')?.remove();node.insertAdjacentHTML('afterbegin',clarityIdentity('NORBIT','Orientação local'));}
 const report=root.querySelector('.cw-ai-report');if(report){report.classList.add('clarity-ai-report');report.querySelector('.tutor-prose')?.insertAdjacentHTML('beforebegin',clarityIdentity('NORBIT AI','Análise gerada por IA'));}
 })};
const clarityRenderBefore=render;render=function(){const result=clarityRenderBefore();document.body.dataset.clarityRoute=route;
 const launcher=$('#norbit-launcher'),toolbar=$('.toolbar-actions');if(launcher&&toolbar){toolbar.append(launcher);launcher.title='Conversar com NORBIT AI';}
 const conversations=$('[data-action=chat-list-toggle]');if(conversations){conversations.setAttribute('aria-expanded',String(aiChatListOpen));conversations.setAttribute('aria-controls','clarity-chat-list');const list=$('.chat-sidebar');if(list)list.id='clarity-chat-list';}
 return result;
};
tourAreas.hoje.steps.unshift(tStep('.clarity-quick-actions','Os atalhos ficam à vista.','Registre um estudo, abra o planejamento de hoje ou confira as pendências sem procurar no fim da página. A reflexão é uma citação identificada; as orientações locais da NORBIT aparecem com nome e mascote, e respostas geradas por IA têm identificação própria.'));
