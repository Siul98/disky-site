import {attachLiveTourGlass} from './live-tour-glass.js?v=blue-17';
const section=document.querySelector('#how'),host=section.querySelector('.how-steps'),panels=[...host.querySelectorAll('.how-card')];
host.classList.add('how-live-host');panels.forEach(p=>p.style.setProperty('--reveal','1'));
const canvas=document.createElement('canvas');canvas.className='how-live-backdrop';canvas.setAttribute('aria-hidden','true');section.prepend(canvas);
const ctx=canvas.getContext('2d'),glass=attachLiveTourGlass(host,panels),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const connector=new Image();connector.src=new URL('./cable/orange-usbc.webp',import.meta.url).href;
// Cached fold surfaces: warm edge illumination with soft longitudinal ends.
const folds=Array.from({length:18},(_,i)=>{
 const c=document.createElement('canvas');c.width=256;c.height=1024;const g=c.getContext('2d');
 const shade=g.createLinearGradient(0,0,256,0);
 for(const [at,color] of [[0,'#080d17'],[.18,'#10243c'],[.58,'#245b92'],[.91,'#65a9db'],[.98,'#a6d9fa'],[1,'#234665']])shade.addColorStop(at,color);
 g.fillStyle=shade;g.fillRect(0,0,256,1024);g.globalCompositeOperation='destination-in';
 const end=g.createLinearGradient(0,0,0,1024);for(const [a,v] of [[0,0],[.16,.55],[.28,1],[.7,1],[.87,.4],[1,0]])end.addColorStop(a,`rgba(0,0,0,${v})`);
 g.fillStyle=end;g.fillRect(0,0,256,1024);return c;
});
let near=false,raf=0,last=0,phase=0;
const reached=panels.map(()=>false);
function draw(t){raf=0;if(!near||document.hidden)return;raf=requestAnimationFrame(draw);if(t-last<32)return;const dt=Math.min(50,t-last);last=t;if(!reduced.matches)phase+=dt/1000;
 const r=section.getBoundingClientRect(),w=section.clientWidth,h=section.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0)
 // Diagonal illuminated folds reconstructed from DesignGabor's reference.
 // A small cached texture replaces another full 3D scene; Hana samples this canvas.
 ctx.fillStyle='#08090b';ctx.fillRect(0,0,w,h);
 const unit=Math.min(w/1440,h/650),bw=40*unit,length=940*unit;
 ctx.save();ctx.translate(w*.62,h*.40);ctx.rotate(-Math.PI/4);
 for(let i=0;i<18;i++){
  const x=(i-8.5)*bw,offset=Math.sin(phase*.22+i*.54)*36*unit;
  ctx.drawImage(folds[i],x,-length*.5+offset,bw,length);
 }
 ctx.restore();
 // The reference's luminous folds dissolve into black at the outer silhouette.
 const vignette=ctx.createRadialGradient(w*.62,h*.40,Math.min(w,h)*.12,w*.62,h*.40,Math.max(w*.52,h*.75));
 vignette.addColorStop(0,'rgba(8,9,11,.12)');vignette.addColorStop(.52,'rgba(8,9,11,.52)');vignette.addColorStop(1,'#08090b');ctx.fillStyle=vignette;ctx.fillRect(0,0,w,h);
 const plug=section.querySelector('.hw-plug'),wire=section.querySelector('.how-wire');
 if(plug&&getComputedStyle(wire).display!=='none'){
 const pr=plug.getBoundingClientRect(),y=pr.y-r.y+11,end=pr.right-r.x,alpha=Number(getComputedStyle(plug).opacity);
 ctx.save();ctx.globalAlpha=alpha;
 // Orthographic Blender render traced to the owner's orange USB-C photos.
 // The same pixels are visible in the scene and sampled by the Hana panes.
 const scale=Math.max(.065,Math.min(.105,w/17000)),tip=end+13,origin=tip-1574*scale,cy=y-255*scale;
 panels.forEach((panel,i)=>{
  const bounds=panel.getBoundingClientRect(),hit=tip>=bounds.left-r.left+bounds.width/2;
  if(hit&&!reached[i]&&!reduced.matches){panel.animate([{scale:'1'},{scale:'1.025',offset:.32},{scale:'.994',offset:.64},{scale:'1'}],{duration:540,easing:'ease-in-out'});panel.dataset.bounces=String(Number(panel.dataset.bounces||0)+1)}
  reached[i]=hit;
 });
 const jacket=ctx.createLinearGradient(0,y-54*scale,0,y+54*scale);jacket.addColorStop(0,'#a44518');jacket.addColorStop(.35,'#dc6f34');jacket.addColorStop(.7,'#c05b28');jacket.addColorStop(1,'#82320e');
 ctx.strokeStyle=jacket;ctx.lineWidth=108*scale;ctx.lineCap='butt';ctx.beginPath();ctx.moveTo(-10,y);ctx.lineTo(Math.max(0,origin+8*scale),y);ctx.stroke();
 if(connector.complete&&connector.naturalWidth)ctx.drawImage(connector,origin,cy,1740*scale,510*scale);
 ctx.restore();
 }
 glass.frame(canvas,t);
}
function start(){if(!raf&&near&&!document.hidden)raf=requestAnimationFrame(draw)}
new IntersectionObserver(([e])=>{near=e.isIntersecting;if(near)start();else{cancelAnimationFrame(raf);raf=0;glass.suspend()}},{rootMargin:'100px'}).observe(section);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;glass.suspend()}else start()});
