import assert from 'node:assert/strict';
import worker,{StudyQuota} from './index.js';
const map=new Map();let lock=Promise.resolve();const storage={get:async k=>structuredClone(map.get(k)),put:async(k,v)=>map.set(k,structuredClone(v)),transaction:fn=>{const p=lock.then(()=>fn(storage));lock=p.catch(()=>{});return p}};
const quota=new StudyQuota({storage});const send=(path,data)=>quota.fetch(new Request('https://quota/'+path,{method:'POST',body:JSON.stringify(data)})).then(r=>r.json());
const realNow=Date.now,base=Date.now();let minute=0;Date.now=()=>base+minute*60000;
try{
 for(let i=0;i<100;i++){minute=Math.floor(i/6);assert.equal((await send('reserve',{ipHash:'campus',clientHash:'student-a'})).allowed,true)}
 minute++;assert.equal((await send('reserve',{ipHash:'campus',clientHash:'student-a'})).allowed,false);
 assert.equal((await send('reserve',{ipHash:'campus',clientHash:'student-b'})).allowed,true,'another student on same network is independent');
 const before=JSON.stringify([...map]);const status=await send('status',{ipHash:'campus',clientHash:'student-b'});assert.equal(status.remaining,99);assert.equal(status.personalRemaining,99);assert.equal(JSON.stringify([...map]),before,'availability is read-only');
 map.clear();let calls=0,hostname='joaoifbavamo.github.io';globalThis.fetch=async url=>{calls++;return String(url).includes('siteverify')?Response.json({success:true,hostname,action:'study'}):Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify({explanation:'Resposta de teste, sem acesso ao provedor.'})}]}}]})};
 const env={GEMINI_API_KEY:'fake',TURNSTILE_SECRET:'fake',QUOTA:{idFromName:()=>0,get:()=>({fetch:(url,init)=>quota.fetch(new Request(url,init))})}};
 const req=(origin,path='/ai',method='POST')=>new Request('https://worker.example'+path,{method,headers:{Origin:origin,'CF-Connecting-IP':'192.0.2.1','Content-Type':'application/json'},...(method==='POST'?{body:JSON.stringify({mode:'explain',content:'Uma dúvida de teste sobre banco de dados.',token:'test',clientId:'test-browser-123456789'})}:{})});
 const response=await worker.fetch(req('https://joaoifbavamo.github.io'),env);assert.equal(response.status,200);assert.equal(response.headers.get('access-control-allow-origin'),'https://joaoifbavamo.github.io');
 const count=calls;assert.equal((await worker.fetch(req('https://evil.example'),env)).status,403);assert.equal(calls,count);
 const available=await worker.fetch(req('https://joaoifbavamo.github.io','/availability?client=test-browser-123456789','GET'),env);assert.equal(available.status,200);assert.equal(calls,count,'availability makes no external call');assert.equal((await available.json()).globalLimit,200);
 hostname='wrong.example';assert.equal((await worker.fetch(req('https://joaoifbavamo.github.io'),env)).status,403);
 console.log('PASS 200 global/100 browser, campus sharing, read-only availability, authorized new origin, Turnstile hostname and disallowed-origin checks. Mocked services only.');
}finally{Date.now=realNow}
