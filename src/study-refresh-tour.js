/* Tour fixtures remain temporary; no API calls, exports or imports during practice. */
tourAreas.jornada.caption='Objetivo, tempo ativo, prática e conclusão';
tourAreas.jornada.steps=[
 tStep('.guided-track','Uma etapa por vez.','Prepare o objetivo, lembre, pratique, confira e conclua. O rascunho fica neste aparelho.',{onEnter:()=>guidedTourStep(0)}),
 tStep('#guided-goal','Uma intenção concreta.','Escreva o que quer conseguir explicar. A duração é uma referência, sem pressa para terminar.',{onEnter:()=>guidedTourStep(0)}),
 tStep('.guided-session-bar','Conte só o tempo de estudo.','Comece o tempo ao avançar para Lembrar. Pause quando precisar. Sair da sessão ou ocultar a página pausa o contador; retome por Continuar tempo.',{onEnter:()=>guidedTourStep(1)}),
 tStep('#guided-recall','Lembre com suas palavras.','Tente explicar com o material fechado. A anotação fica local e não é enviada à IA.',{onEnter:()=>guidedTourStep(1)}),
 tStep('.guided-question','Uma questão por vez.','A sessão usa até cinco perguntas salvas, priorizando as menos praticadas. Questões em branco ficam para depois e não contam como erro.',{onEnter:()=>guidedTourStep(2)}),
 tStep('#guided-reflection','Confira o raciocínio.','Compare resposta e referência. Nas discursivas, indique se sua resposta atende ao critério. Anote uma correção e uma dúvida.',{onEnter:()=>guidedTourStep(3)}),
 tStep('.guided-summary','Confira antes de registrar.','O resumo distingue tempo ativo, respostas e acertos. No formulário final, ajuste o tempo real. O histórico recebe um único registro.',{onEnter:()=>guidedTourStep(4)}),
 tStep('[data-action="guided-review"]','Escolha como retomar.','Marque uma revisão amanhã ou crie um cartão da dúvida. Essas ações são locais e não fazem pedidos à IA.',{onEnter:()=>guidedTourStep(4),observeOnly:true})
];
tourAreas.hoje.steps.push(tStep('#connected-start','Seu próximo passo primeiro.','Retome a sessão guardada ou prepare uma com o assunto recomendado. Metas, backup e tutoriais ficam depois da ação principal.'));
tourAreas.ia.steps.push(tStep('#norbit-options','Ajustes quando você precisar.','A mensagem aparece primeiro. Abra os ajustes para escolher tarefa, contexto e material. O espaço ativo é mostrado acima do formulário; trocar de espaço desativa o envio de contexto.',{onEnter:()=>{$('#norbit-options')?.setAttribute('open','')}}));
tourAreas.semestre.steps.push(
 tStep('#exam-study-plans','Prepare uma avaliação pelos assuntos.','Escolha a disciplina, a data e os assuntos cobrados. O plano acompanha as etapas reais dos assuntos, sem criar horários automaticamente.'),
 tStep('#attendance-records','Presenças com data.','Registre presença ou falta por aula. Esse diário pessoal permanece separado do total de faltas informado na matrícula.'),
 tStep('#workflow-tools','Organize sem sobrecarregar o painel.','Abra as ferramentas para importar uma lista de assuntos do professor ou compartilhar só a estrutura de uma disciplina, sem dados pessoais.')
);
tourAreas.calendario.steps.push(tStep('#workflow-tools','Traga compromissos e preserve os horários.','A importação .ics tem uma prévia de eventos e informa os não compatíveis. Exportar semana inclui aulas e horários dos estudos; prazos continuam como dia inteiro.'));
tourAreas.ajustes.steps.push(tStep('#workflow-tools','Traga um backup preservando o atual.','Na importação com prévia, espaços novos são adicionados. Para versões diferentes do mesmo espaço, mantenha a atual ou guarde a importada separadamente. Preferências e cronômetro atuais são preservados.'));
tourAreas.academico.steps.push(tStep('#study-labs','Pratique raciocínio localmente.','Rastreie as variáveis de um algoritmo e experimente SELECT, WHERE e ORDER BY em uma tabela didática. São exercícios locais, sem consumir IA.',{observeOnly:true}));
tourAreas.biblioteca.steps.push(tStep('#checked-responses','Uma referência que você conferiu.','Depois de verificar uma resposta da NORBIT no seu material, guarde uma cópia com fonte e data. A marca indica sua conferência, não uma garantia automática da IA.'));
// A tour target may live inside progressive disclosure. Open its ancestors only on entry.
const refreshTourPosition=tourPosition;tourPosition=function(reveal=false){if(reveal&&tour){const node=$(tour.steps[tour.index].selector);for(let p=node?.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true}return refreshTourPosition(reveal)};
