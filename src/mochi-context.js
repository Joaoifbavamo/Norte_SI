/* Contextual reactions: visual feedback only; no changes to study data or AI requests. */
const mochiRouteMoods={hoje:'welcome',semestre:'semester',livres:'curious',edital:'reading',assuntos:'reading',plano:'planning',foco:'focus',prazos:'calendar',calendario:'calendar',banco:'question',questoes:'encourage',simulados:'practice',revisoes:'review',cartoes:'flip',jornada:'focus',biblioteca:'reading',ia:'chat',evolucao:'progress',historico:'recall',ajustes:'idle',guia:'welcome',percurso:'progress',projetos:'project',academico:'reading'};
let mochiPreviousRoute='',mochiPreviousBusy=false,mochiLastSignal='',mochiLastSignalAt=0,mochiLastNode=null,mochiToastSerial=0,mochiToastError=false;
function mochiTarget(){return $('#modal[open] .norbit-mascot')||$('#norbit-launcher .norbit-mascot')}
function mochiSignal(mood,seconds=2){if(siSettings().mascot==='hidden'||document.hidden)return;const node=mochiTarget();if(!node)return;const now=performance.now();if(mochiLastNode===node&&mochiLastSignal===mood&&now-mochiLastSignalAt<350)return;mochiLastNode=node;mochiLastSignal=mood;mochiLastSignalAt=now;window.NorteMochi?.react(node,mood,seconds)}
function mochiActionMood(name,b){
 if(/delete|discard|reset|cancel|modal-close|undo/.test(name))return null;
 if(name==='card-rate')return ['again','hard'].includes(b.dataset.value)?'encourage':'recall';
 if(name==='card-flip')return 'flip';
 if(name==='timer-toggle')return db.timer?.running?'resume':'rest';
 if(name==='timer-start'||name==='start-focus')return db.timer?.running?'resume':null;
 if(name==='timer-finish')return 'writing';
 if(name==='ai-answer'){const q=aiResult?.questions?.[+b.dataset.index];return q?.revealed?(q.choice===q.answer?'success':'encourage'):null}
 if(name==='si-tab')return b.dataset.tab==='grades'?'grades':b.dataset.tab==='lessons'?'calendar':'semester';
 if(/export|^csv$|^ics$/.test(name))return 'export';
 if(/import|upload|attach/.test(name))return 'upload';
 if(/search|filter/.test(name))return 'searching';
 if(/card|flash/.test(name))return 'flip';
 if(/review|mistake|question-go/.test(name))return 'review';
 if(/plan|generator|schedule|routine/.test(name))return 'planning';
 if(/project|tcc|internship/.test(name))return 'project';
 if(/grade|assessment|target/.test(name))return 'grades';
 if(/semester|enroll|subject|topic|course|space/.test(name))return 'semester';
 if(/calendar|deadline|week|day|lesson/.test(name))return 'calendar';
 if(/resource|library|source|note|summary/.test(name))return 'reading';
 if(/practice|mock|bank/.test(name))return 'practice';
 if(/ai|chat|tutor/.test(name))return aiBusy?'thinking':'chat';
 if(/session|register|record/.test(name))return 'writing';
 if(/tour|guide/.test(name))return 'welcome';
 if(/analytics|progress|history/.test(name))return 'progress';
 if(/focus|timer|journey|mission/.test(name))return 'focus';
 return null;
}
const mochiRenderBefore=render;
render=function(){mochiRenderBefore();const node=$('#norbit-launcher .norbit-mascot'),busy=!!aiBusy,mood=busy?'thinking':route==='foco'&&db.timer&&!db.timer.running?'rest':mochiRouteMoods[route]||'idle';if(node){window.NorteMochi?.setBase(node,mood);if(route!==mochiPreviousRoute||busy!==mochiPreviousBusy)mochiSignal(mood,2.2);else node.dataset.mochiShown='true'}mochiPreviousRoute=route;mochiPreviousBusy=busy};
const mochiModalBefore=modal;
modal=function(...args){const result=mochiModalBefore(...args),head=$('#modal .dialog-header');if(head&&siSettings().mascot!=='hidden'){head.querySelector('button')?.insertAdjacentHTML('beforebegin',norbitMascot('question','tiny'));window.NorteMochi?.scan();}return result};
const mochiToastBefore=toast;
toast=function(message,undo=false){mochiToastSerial++;mochiToastError=/não foi|indisponível|esgotad|falha|erro de|adicione.*primeiro|selecione|confira|aguarde|antes de|já (?:tem|foi|está)|atingiu.*limite/i.test(message);mochiToastBefore(message,undo);if(/não foi possível|indisponível|esgotad|falha|erro de/i.test(message))mochiSignal('serviceError');else if(/concluíd|resolvida/i.test(message))mochiSignal('complete');else if(/salv[oa]|registrad|importad|adicionad|atualizad/i.test(message))mochiSignal(/importad/i.test(message)?'upload':'saved');};
for(const [name,fn] of Object.entries(actions)){actions[name]=function(...args){const serial=mochiToastSerial,b=args[0]||{dataset:{}};const react=()=>{if(serial!==mochiToastSerial&&mochiToastError)return;const mood=mochiActionMood(name,b);if(mood)mochiSignal(mood)};const result=fn.apply(this,args);if(result?.then)return result.then(value=>{react();return value});react();return result};}
const mochiAIBefore=aiSubmit;
aiSubmit=async function(...args){const before=aiResult;const result=await mochiAIBefore(...args);if(aiError)mochiSignal('serviceError');else if(aiResult&&aiResult!==before)mochiSignal('recall');return result};
const mochiAlarmBefore=timerFireAlert;
timerFireAlert=function(message,finish=false){const result=mochiAlarmBefore(message,finish);if(!tour)mochiSignal(finish?'complete':'alarm',2.8);return result};
document.addEventListener('change',event=>{const e=event.target;if(e.name==='practice-answer')mochiSignal('question',1);else if(e.id==='exam-select')mochiSignal('semester');else if(e.id==='si-curriculum-matrix'||e.id==='si-curriculum-period'||e.id?.startsWith('bank-'))mochiSignal('searching',1.3)});
document.addEventListener('toggle',event=>{if(event.target.open&&event.target.matches('.practice-correction,.ai-alternative-reasons,.chat-saved-card'))mochiSignal('reading',1.8)},true);
const mochiTutorialText='O Mochi acompanha cada atividade: piscadinha nos cartões, estrelas na lembrança, pensamento ao planejar, óculos na leitura, foco no cronômetro, bocejo na pausa e comemoração ao concluir. Questões recebem incentivo ou celebração somente após a correção. A IA mostra pensamento durante a espera. As reações são breves, sem som, e respeitam ocultação e movimento reduzido.';
tourAreas.ajustes.steps.at(-1).body=mochiTutorialText;
for(const [area,selector,title] of [['cartoes','.flashcard','Uma reação para sua lembrança.'],['foco','#timer-count','Seu foco tem companhia.'],['ia','#ai-form','A NORBIT acompanha a conversa.'],['semestre','#si-offerings','Cada área tem seu gesto.']])if(tourAreas[area])tourAreas[area].steps.push(tStep(selector,title,mochiTutorialText,area==='semestre'?{onEnter:()=>{semesterTab='subjects';render()}}:{}));
