import {attachLiveTourGlass} from './live-tour-glass.js?v=clear-11';
const section=document.querySelector('#how'),host=section.querySelector('.how-steps'),panels=[...host.querySelectorAll('.how-card')];
host.classList.add('how-live-host');panels.forEach(p=>p.style.setProperty('--reveal','1'));
const canvas=document.createElement('canvas');canvas.className='how-live-backdrop';canvas.setAttribute('aria-hidden','true');section.prepend(canvas);
const ctx=canvas.getContext('2d'),glass=attachLiveTourGlass(host,panels),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let near=false,raf=0,last=0,phase=0;
function draw(t){raf=0;if(!near||document.hidden)return;raf=requestAnimationFrame(draw);if(t-last<32)return;const dt=Math.min(50,t-last);last=t;if(!reduced.matches)phase+=dt/1000;
 const r=section.getBoundingClientRect(),w=section.clientWidth,h=section.clientHeight;if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}
 ctx.fillStyle='#080c11';ctx.fillRect(0,0,w,h);
 for(const [x,y,rad,color] of [[.24,.65,.55,'42,124,155'],[.82,.55,.4,'120,73,43']]){const g=ctx.createRadialGradient(w*x,h*y,0,w*x,h*y,w*rad);g.addColorStop(0,`rgba(${color},.19)`);g.addColorStop(1,`rgba(${color},0)`);ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
 ctx.save();ctx.strokeStyle='rgba(145,205,230,.07)';ctx.lineWidth=1;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(-50,h*(.35+i*.13));ctx.bezierCurveTo(w*.25,h*(.1+i*.1),w*.55,h*(.9+i*.04)+Math.sin(phase*.15)*15,w+50,h*(.35+i*.13));ctx.stroke()}ctx.restore();
 const plug=section.querySelector('.hw-plug'),wire=section.querySelector('.how-wire');
 if(plug&&getComputedStyle(wire).display!=='none'){
 const pr=plug.getBoundingClientRect(),y=pr.y-r.y+11,end=pr.right-r.x,alpha=Number(getComputedStyle(plug).opacity);
 ctx.save();ctx.globalAlpha=alpha;const g=ctx.createLinearGradient(0,y,end||1,y);g.addColorStop(0,'#6d3619');g.addColorStop(1,'#fa8d43');ctx.strokeStyle=g;ctx.lineWidth=6;ctx.lineCap='round';ctx.shadowColor='#ff8a3c';ctx.shadowBlur=9;ctx.beginPath();ctx.moveTo(-10,y);ctx.lineTo(end-30,y);ctx.stroke();ctx.shadowBlur=0;
 const body=ctx.createLinearGradient(0,y-11,0,y+11);body.addColorStop(0,'#ffa45e');body.addColorStop(1,'#d85311');ctx.fillStyle=body;ctx.beginPath();ctx.roundRect(end-34,y-11,34,22,5);ctx.fill();ctx.fillStyle='#c5d0db';ctx.beginPath();ctx.roundRect(end,y-5.5,13,11,2);ctx.fill();ctx.restore();
 }
 glass.frame(canvas,t);
}
function start(){if(!raf&&near&&!document.hidden)raf=requestAnimationFrame(draw)}
new IntersectionObserver(([e])=>{near=e.isIntersecting;if(near)start();else{cancelAnimationFrame(raf);raf=0;glass.suspend()}},{rootMargin:'100px'}).observe(section);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;glass.suspend()}else start()});
