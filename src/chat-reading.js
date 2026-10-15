/* Safe, deliberately small Markdown renderer: model output never becomes raw HTML. */
function readingInline(value){
 const tokens=[];let raw=String(value).replace(/`([^`\n]+)`/g,(_,s)=>'\u0001'+(tokens.push('<code>'+esc(s)+'</code>')-1)+'\u0001');
 raw=esc(raw).replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g,(_,label,url)=>{const safe=safeURL(url.replace(/&amp;/g,'&'));return safe?'<a href="'+esc(safe)+'" target="_blank" rel="noopener noreferrer">'+label+'</a>':label}).replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*\n]+)\*/g,'<em>$1</em>');
 return raw.replace(/\u0001(\d+)\u0001/g,(_,i)=>tokens[+i]||'');
}
tutorText=function(value){
 const lines=String(value||'').replace(/\r/g,'').split('\n');let html='',i=0;
 const cells=l=>l.trim().replace(/^\||\|$/g,'').split('|').map(s=>s.trim());
 while(i<lines.length){const l=lines[i];if(!l.trim()){i++;continue}
  if(/^```/.test(l)){const lang=l.slice(3).trim().slice(0,30),code=[];i++;while(i<lines.length&&!/^```/.test(lines[i]))code.push(lines[i++]);i++;html+='<figure class="reading-code"><figcaption>'+esc(lang||'Código')+btn('Copiar código','reading-code','','quiet small')+'</figcaption><pre tabindex="0"><code>'+esc(code.join('\n'))+'</code></pre></figure>';continue}
  if(i+1<lines.length&&l.includes('|')&&/^\s*\|?\s*:?-{3,}/.test(lines[i+1])){const head=cells(l);i+=2;let rows='';while(i<lines.length&&lines[i].includes('|'))rows+='<tr>'+cells(lines[i++]).map(c=>'<td>'+readingInline(c)+'</td>').join('')+'</tr>';html+='<div class="reading-table" role="region" aria-label="Tabela da resposta" tabindex="0"><table><thead><tr>'+head.map(c=>'<th scope="col">'+readingInline(c)+'</th>').join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div>';continue}
  if(/^#{1,6}\s/.test(l)){html+='<h3>'+readingInline(l.replace(/^#{1,6}\s*/,''))+'</h3>';i++;continue}
  if(/^\s*([-*+] |\d+[.)] )/.test(l)){const ordered=/^\s*\d/.test(l),tag=ordered?'ol':'ul';html+='<'+tag+'>';while(i<lines.length&&/^\s*([-*+] |\d+[.)] )/.test(lines[i]))html+='<li>'+readingInline(lines[i++].replace(/^\s*([-*+] |\d+[.)] )/,''))+'</li>';html+='</'+tag+'>';continue}
  if(/^>\s?/.test(l)){html+='<blockquote>'+readingInline(l.replace(/^>\s?/,''))+'</blockquote>';i++;continue}
  const p=[l];i++;while(i<lines.length&&lines[i].trim()&&!/^(```|#{1,6}\s|>\s?|\s*[-*+] |\s*\d+[.)] )/.test(lines[i]))p.push(lines[i++]);html+='<p>'+p.map(readingInline).join('<br>')+'</p>';
 }return html;
};
aiChatThread=function(chat){return '<div class="norbit-thread" aria-label="Histórico da conversa">'+chat.messages.map(m=>m.role==='user'?'<article class="norbit-user"><span class="norbit-message-label">Você</span>'+(m.content.length>900?'<p>'+esc(m.content.slice(0,240))+'…</p><details class="reading-user-full"><summary>Ver mensagem completa</summary><p>'+esc(m.content)+'</p></details>':'<p>'+esc(m.content)+'</p>')+''+(m.error?'<p class="chat-error" role="alert">'+esc(m.error)+'</p>':'')+'</article>':'<section class="norbit-answer ai-output" tabindex="-1" aria-label="Resposta da NORBIT AI"><div class="norbit-answer-byline"><span class="norbit-symbol">'+norbitMark+'</span><strong>NORBIT AI</strong></div>'+(m.result===aiResult&&!aiBusy&&!aiError?aiOutput():m.result.explanation?'<div class="tutor-prose">'+tutorText(m.result.explanation)+'</div>':btn('Abrir este '+(m.result.cards?'conjunto de cartões':'treino'),'chat-result','data-id="'+esc(m.id)+'"','secondary small'))+(m.result.explanation?'<div class="reading-message-actions">'+btn('Copiar resposta','reading-copy','data-id="'+esc(m.id)+'"','quiet small')+'</div>':'')+'</section>').join('')+(aiBusy?'<section class="ai-output norbit-answer" aria-busy="true">'+aiOutput()+'</section>':'')+'</div>'};
actions['reading-copy']=async b=>{const text=aiCurrentChat()?.messages.find(m=>m.id===b.dataset.id)?.result?.explanation;if(text)try{await navigator.clipboard.writeText(text);toast('Resposta copiada.')}catch{toast('Selecione o texto da resposta para copiar.')}};
actions['reading-code']=async b=>{try{await navigator.clipboard.writeText(b.closest('figure').querySelector('code').textContent);toast('Código copiado.')}catch{toast('Selecione o código para copiar.')}};
