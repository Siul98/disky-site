import {attachLiveTourGlass} from './live-tour-glass.js?v=refinements-48';
const section=document.querySelector('#how'),host=section.querySelector('.how-steps'),panels=[...host.querySelectorAll('.how-card')];
host.classList.add('how-live-host');panels.forEach(p=>p.style.setProperty('--reveal','1'));
const canvas=document.createElement('canvas');canvas.className='how-live-backdrop';canvas.setAttribute('aria-hidden','true');section.prepend(canvas);
const ctx=canvas.getContext('2d'),glass=attachLiveTourGlass(host,panels),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const connector=new Image();connector.src=new URL('./cable/orange-usbc.webp',import.meta.url).href;
// Cached fine routing lines: visible spatial detail for the original refraction,
// without another model download or a second animation loop.
const detail=document.createElement('canvas');let detailKey='';
function drawDetail(w,h){
 const key=w+':'+h;if(key!==detailKey){
  detailKey=key;detail.width=Math.ceil(w);detail.height=Math.ceil(h);const g=detail.getContext('2d');
  const spacing=32;g.fillStyle='rgba(110,177,240,.16)';
  for(let x=16;x<w;x+=spacing)for(let y=16;y<h;y+=spacing)g.fillRect(x,y,1,1);
  g.lineCap='round';g.lineJoin='round';
  for(let i=0;i<18;i++){
   const y=h*.34+i*19,x1=w*(.12+(i%5)*.045),x2=w*(.53+(i%6)*.041),dy=(i%2?1:-1)*(48+(i%4)*24),r=14;
   g.beginPath();g.moveTo(-20,y);g.lineTo(x1-r,y);g.quadraticCurveTo(x1,y,x1,y+Math.sign(dy)*r);
   g.lineTo(x1,y+dy-Math.sign(dy)*r);g.quadraticCurveTo(x1,y+dy,x1+r,y+dy);
   g.lineTo(x2-r,y+dy);g.quadraticCurveTo(x2,y+dy,x2,y+dy-Math.sign(dy)*r);
   g.lineTo(x2,y+Math.sign(dy)*r);g.quadraticCurveTo(x2,y,x2+r,y);g.lineTo(w+20,y);
   g.strokeStyle=i%4===0?'rgba(106,190,255,.50)':'rgba(74,158,255,.24)';g.lineWidth=i%4===0?1.4:.8;g.stroke();
   for(const x of [x1+32,x2-32]){g.beginPath();g.arc(x,y+dy,2.5,0,Math.PI*2);g.fillStyle='#0b1726';g.fill();g.strokeStyle='rgba(133,203,255,.65)';g.lineWidth=1;g.stroke()}
  }
  // Soft edges and a quiet heading area, with full detail behind the cards.
  g.globalCompositeOperation='destination-in';const fade=g.createLinearGradient(0,0,0,h);
  for(const[a,v]of[[0,0],[.2,.12],[.4,1],[.78,1],[1,0]])fade.addColorStop(a,`rgba(0,0,0,${v})`);
  g.fillStyle=fade;g.fillRect(0,0,w,h);g.globalCompositeOperation='source-over';
 }
 ctx.drawImage(detail,0,0,w,h);
}
let near=false,raf=0,last=0,phase=0;
const reached=panels.map(()=>false);
function draw(t){raf=0;if(!near||document.hidden)return;raf=requestAnimationFrame(draw);if(t-last<32)return;const dt=Math.min(50,t-last);last=t;if(!reduced.matches)phase+=dt/1000;
 const r=section.getBoundingClientRect(),w=section.clientWidth,h=section.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0)
 // Quiet blue pools give the process section its own identity. The same
 // canvas feeds the original glass, including the moving physical cable.
 ctx.fillStyle='#08090c';ctx.fillRect(0,0,w,h);
 for(const [x,y,r,a] of [[.22,.50,.43,.16],[.78,.63,.48,.20]]){
  const glow=ctx.createRadialGradient(w*x,h*y,0,w*x,h*y,Math.max(w,h)*r);
  glow.addColorStop(0,`rgba(74,158,255,${a})`);glow.addColorStop(1,'rgba(74,158,255,0)');
  ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 }
 drawDetail(w,h);
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
