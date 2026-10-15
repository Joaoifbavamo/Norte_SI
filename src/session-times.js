/* Optional activity clocks; keep all existing form handlers and duration semantics. */
const sessionBeforeClocks=sessionForm;
sessionForm=function(options={}){
 sessionBeforeClocks(options);
 const form=$('#modal-form'),start=form?.elements.startTime,end=form?.elements.endTime;
 if(!start||!end)return;
 const real=form.elements.minutes,next=form.elements.endNextDay,help=$('#session-clock-help'),use=$('#session-clock-use');
 let manual=Boolean(options.existing),interval=null;
 function update(fromClock=false){
  try{
   interval=sessionInterval({startTime:start.value,endTime:end.value,endNextDay:next.checked});
   help.classList.remove('is-error');
   if(interval===null){help.textContent='Informe os dois horários para calcular o intervalo. Você pode descontar pausas no tempo real.';use.hidden=true;return}
   if(fromClock&&!manual)real.value=interval;
   help.textContent=minutesLabel(interval)+' entre início e fim. '+(+real.value===interval?'O tempo real acompanha esse intervalo.':'Seu tempo real foi mantido; desconte pausas se precisar.');
   use.hidden=+real.value===interval;
  }catch(error){interval=null;use.hidden=true;help.textContent=error.message;help.classList.add('is-error')}
 }
 for(const field of [start,end,next])field.addEventListener('input',()=>update(true));
 real.addEventListener('input',()=>{manual=true;update()});
 use.addEventListener('click',()=>{if(interval===null)return;real.value=interval;manual=false;update();real.focus()});
 update();
};

// The welcome remains immediately usable. One short greeting per page session,
// only on the empty preparation screen; no change to the study storage schema.
let arrivalGreetingShown=false;
const welcomeBeforeGreeting=viewWelcome;
viewWelcome=function(){
 const html=welcomeBeforeGreeting();
 const first=!arrivalGreetingShown&&!exam()&&!tour?.active;
 if(first)arrivalGreetingShown=true;
 return html.replace('class="arrival"','class="arrival'+(first?' arrival-greeting':'')+'"').replace('Olá, eu sou a NORBIT.','Olá, eu sou a NORBIT.<small class="arrival-greeting-note">Vamos começar no seu ritmo.</small>');
};

tourAreas.hoje.steps.splice(3,0,tStep('#modal .session-clock','Do início ao fim.','Início e fim são opcionais. Experimente 16:00 e 16:45: o intervalo é de 45 minutos. Desconte pausas em Tempo real. Para atravessar a meia-noite, marque o dia seguinte.',{prepare:()=>sessionForm(),modal:true}));
tourAreas.historico.steps.push(tStep('#modal .session-clock','Adicione horários sem duplicar.','Registros antigos continuam válidos sem horário. Ao editar, informe início e fim se souber; o tempo real existente será mantido até você escolher Usar intervalo. O backup inclui os horários.',{prepare:()=>sessionForm({existing:exam().sessions[0]}),modal:true}));
