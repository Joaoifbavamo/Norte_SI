import {BotEngine,BOT_STATES} from './mochi/engine';
type Entry={node:HTMLElement,canvas:HTMLCanvasElement,bot:BotEngine,base:string,mood:string,visible:boolean,until:number,last:number};
const entries=new Map<HTMLElement,Entry>(),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const states:Record<string,string>={welcome:'idle',thinking:'thinking',focus:'working',success:'finished',encourage:'idle',pause:'sleeping',curious:'searching',affection:'idle',dizzy:'dizzy',annoyed:'idle',idle:'idle',planning:'thinking',searching:'searching',reading:'idle',writing:'working',flip:'idle',recall:'idle',review:'question',question:'question',practice:'approval',complete:'finished',saved:'idle',upload:'idle',export:'idle',rest:'sleeping',resume:'working',alarm:'approval',serviceError:'ratelimit',grades:'thinking',project:'working',calendar:'searching',semester:'approval',progress:'finished',chat:'idle'};
const emotes:Record<string,any>={encourage:'happy',affection:'love',flip:'wink',recall:'proud',saved:'proud',chat:'happy',alarm:'surprised',rest:'yawn'};
function pose(bot:BotEngine,mood:string,animate:boolean){
 if(emotes[mood]){if(animate)bot.triggerEmote(emotes[mood]);else bot.setPermanentEmote(emotes[mood])}
 if(['reading','review'].includes(mood))bot.setOutfit('roundGlasses',animate);
 if(mood==='complete')bot.setOutfit('partyHat',animate);
 if(mood==='project')bot.setOutfit('beanie',animate);
 if(mood==='grades')bot.setOutfit('roundGlasses',animate);
 if(mood==='planning'){bot.lookX=.6;bot.lookY=-.5}
 if(mood==='reading'){bot.lookX=.15;bot.lookY=.6}
 if(mood==='calendar'){bot.lookY=.35}
 if(mood==='writing'&&animate)bot.squash();
 if(mood==='resume'&&animate)bot.greet();
 if(mood==='export'&&animate){bot.greet();bot.triggerEmote('proud')}
 if(mood==='upload'){bot.morph=1;if(animate){bot.gulp();setTimeout(()=>bot.animateMorph(0),1300)}}
 if(mood==='progress'&&animate)bot.triggerEmote('proud');
}
let frame=0,frameCount=0,lastTick=0;
function quiet(){return reduced.matches||document.hidden||document.body.dataset.mascot==='hidden'}
function make(mood:string,animate:boolean){const bot=new BotEngine(),state=(states[mood]||'idle') as keyof typeof BOT_STATES;
 if(animate){bot.setState(state,true);if(mood==='welcome')bot.greet();if(mood==='encourage')bot.triggerEmote('happy');if(mood==='affection')bot.triggerEmote('love');if(mood==='annoyed')bot.slap()}
 else{bot.state=state;bot.cfg=BOT_STATES[state];bot.col=bot.cfg.color;bot.colT=bot.col;bot.tint=bot.cfg.tint;bot.badge=bot.cfg.badge;bot.badgeS=1;bot.tilt=bot.cfg.tilt;bot.tgTilt=bot.tilt;if(mood==='welcome'||mood==='encourage')bot.eyeOverride='happy';if(mood==='affection')bot.eyeOverride='heart';if(mood==='annoyed')bot.eyeOverride='line';bot.eyeOverrideUntil=Infinity}
 pose(bot,mood,animate);return bot;
}
function draw(e:Entry){const ctx=e.canvas.getContext('2d',{alpha:true});if(!ctx)return;ctx.clearRect(0,0,320,320);ctx.save();ctx.translate(60,60);e.bot.draw(ctx,200,200);ctx.restore()}
function stop(e:Entry){e.until=0;e.bot=make(e.base,false);draw(e)}
function start(e:Entry,mood:string,seconds=3){e.mood=mood;e.bot=make(mood,!quiet());e.last=performance.now();e.until=!quiet()&&e.visible?e.last+seconds*1000:0;draw(e);wake()}
function wake(){if(!frame&&!quiet()&&[...entries.values()].some(e=>e.visible&&e.until>performance.now()))frame=requestAnimationFrame(tick)}
function tick(now:number){frame=0;if(quiet()){entries.forEach(stop);return}if(now-lastTick<1000/30){wake();return}lastTick=now;frameCount++;
 for(const [node,e] of entries){if(!node.isConnected||node.ownerDocument.defaultView?.closed){entries.delete(node);observer.unobserve(node);continue}if(!e.visible)continue;if(e.until>now){e.bot.update(Math.min(.05,(now-e.last)/1000));e.last=now;draw(e)}else if(e.until)stop(e)}wake();
}
const observer=new IntersectionObserver(list=>{for(const item of list){const e=entries.get(item.target as HTMLElement);if(!e)continue;const first=!e.node.dataset.mochiShown;e.visible=item.isIntersecting;if(e.visible&&first){e.node.dataset.mochiShown='true';start(e,e.base,e.base==='thinking'?3.5:2.4)}else if(!e.visible)stop(e)}},{threshold:.1});
function attach(node:HTMLElement){if(entries.has(node))return entries.get(node)!;const canvas=node.querySelector<HTMLCanvasElement>('canvas.mochi-canvas');if(!canvas)return;const base=node.dataset.state||'welcome',e:Entry={node,canvas,base,mood:base,bot:make(base,false),visible:false,until:0,last:0};entries.set(node,e);draw(e);if(node.ownerDocument===document)observer.observe(node);else{e.visible=true;start(e,base)}return e}
function scan(root:ParentNode=document){root.querySelectorAll<HTMLElement>('.norbit-mascot[data-mochi]').forEach(attach);for(const [node] of entries){if(!node.isConnected){entries.delete(node);observer.unobserve(node)}}}
function react(node:HTMLElement,mood:string,seconds=1.6){const e=attach(node);if(!e)return;const r=node.getBoundingClientRect();e.visible=r.width>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;if(e.visible)node.dataset.mochiShown='true';node.dataset.mochiMood=mood;start(e,mood,Math.max(mood==='affection'?2.1:mood==='dizzy'?2.6:.8,seconds))}
function setBase(node:HTMLElement,mood:string){const e=attach(node);if(!e)return;e.base=mood;node.dataset.state=mood;stop(e)}
new MutationObserver(()=>scan()).observe(document.body,{childList:true,subtree:true});
document.addEventListener('visibilitychange',()=>{entries.forEach(stop);if(frame){cancelAnimationFrame(frame);frame=0}});reduced.addEventListener('change',()=>{entries.forEach(stop);if(frame){cancelAnimationFrame(frame);frame=0}});
new MutationObserver(()=>{if(document.body.dataset.mascot==='hidden'){entries.forEach(stop);if(frame){cancelAnimationFrame(frame);frame=0}}}).observe(document.body,{attributes:true,attributeFilter:['data-mascot']});
Object.assign(window,{NorteMochi:{scan,react,setBase,moods:Object.keys(states),snapshot:()=>({entries:entries.size,running:!!frame,frames:frameCount})}});scan();
