/* Focus and layout safety; no change to study data or route persistence. */
function layoutRevealControl(node){
 if(!node?.isConnected||tour)return;
 const dialog=node.closest('dialog');if(dialog&&!dialog.open)return;
 const rect=node.getBoundingClientRect();if(!rect.width||!rect.height)return;
 const toolbar=$('.toolbar'),fixed=toolbar&&getComputedStyle(toolbar).position==='sticky',top=dialog?dialog.getBoundingClientRect().top+20:fixed?toolbar.getBoundingClientRect().bottom+20:20,bottom=dialog?dialog.getBoundingClientRect().bottom-20:innerHeight-24;
 if(rect.top<top||rect.bottom>bottom)node.scrollIntoView({block:rect.height>bottom-top?'start':'center',inline:'nearest',behavior:'instant'});
}
document.addEventListener('focusin',event=>{const node=event.target;if(node.matches?.('#content input,#content select,#content textarea,dialog input,dialog select,dialog textarea'))requestAnimationFrame(()=>layoutRevealControl(node));});
document.addEventListener('invalid',event=>{const node=event.target;if(node.closest?.('#content,dialog'))requestAnimationFrame(()=>{if(node.matches(':invalid')&&node===document.activeElement)layoutRevealControl(node)});},true);
const layoutRerenderBefore=setupRerender;setupRerender=function(focusId=null){
 const active=document.activeElement,day=active?.dataset.setupDay,property=active?.dataset.property,field=active?.dataset.setupField,selection=typeof active?.selectionStart==='number'?[active.selectionStart,active.selectionEnd]:null;
 const selector=focusId?'#'+CSS.escape(focusId):active?.id?'#'+CSS.escape(active.id):day!==undefined?'[data-setup-day="'+CSS.escape(day)+'"][data-property="'+CSS.escape(property||'')+'"]':field?'[data-setup-field="'+CSS.escape(field)+'"]':null;
 layoutRerenderBefore(focusId);const replacement=selector&&document.querySelector(selector);if(replacement){replacement.focus({preventScroll:true});if(selection&&replacement.setSelectionRange)try{replacement.setSelectionRange(...selection)}catch{}}
};
const layoutHistoryBefore=historyList;historyList=function(list){return refreshTemplate(layoutHistoryBefore(list),root=>{const table=root.querySelector('table');if(!table)return;table.classList.add('history-table');table.setAttribute('role','table');const labels=[...table.querySelectorAll('thead th')].map(n=>n.textContent);for(const row of table.querySelectorAll('tbody tr')){row.setAttribute('role','row');[...row.children].forEach((cell,i)=>{cell.dataset.label=labels[i];cell.setAttribute('role','cell')})}})};

if(tourAreas.comecar?.steps[0])tourAreas.comecar.steps[0].body+=' As perguntas ficam em uma área própria, com a orientação da NORBIT separada. Ao trocar de etapa, a leitura recomeça no topo; campos inválidos são trazidos para a área visível.';
if(tourAreas.historico?.steps[0])tourAreas.historico.steps[0].body+=' No celular, cada registro mostra os dados e o botão Editar sem precisar deslizar a tabela para o lado.';
