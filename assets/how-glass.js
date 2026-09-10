import {attachLiveTourGlass} from './live-tour-glass.js?v=performance-53';
const section=document.querySelector('#how'),host=section.querySelector('.how-steps'),panels=[...host.querySelectorAll('.how-card')];
host.classList.add('how-live-host');panels.forEach(p=>p.style.setProperty('--reveal','1'));
const canvas=document.createElement('canvas');canvas.className='how-live-backdrop';canvas.setAttribute('aria-hidden','true');section.prepend(canvas);
const ctx=canvas.getContext('2d'),glass=attachLiveTourGlass(host,panels),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const connector=new Image();connector.src=new URL('./cable/orange-usbc.webp',import.meta.url).href;
// A deterministic starfield is painted once per size, then shared with Hana.
// No network asset, particle simulation, or additional animation loop.
const detail=document.createElement('canvas');let detailKey='';
function drawDetail(w,h){
 const key=w+':'+h;if(key!==detailKey){
  detailKey=key;detail.width=Math.ceil(w);detail.height=Math.ceil(h);const g=detail.getContext('2d');
  let seed=57021;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
  const normal=()=>Math.sqrt(-2*Math.log(Math.max(.00001,rand())))*Math.cos(6.283185*rand());
  const band=x=>h*(.84-.62*x/w)+Math.sin(x/w*5)*h*.035;
  g.fillStyle='#060a12';g.fillRect(0,0,w,h);
  function cloud(x,y,rx,ry,color,alpha){g.save();g.translate(x,y);g.scale(rx,ry);const grad=g.createRadialGradient(0,0,0,0,0,1);grad.addColorStop(0,`rgba(${color},${alpha})`);grad.addColorStop(1,`rgba(${color},0)`);g.fillStyle=grad;g.fillRect(-1,-1,2,2);g.restore()}
  // Overlapping, irregular light and dust clouds give the Milky Way depth.
  for(let i=0;i<46;i++){const x=rand()*w,y=band(x)+normal()*h*.035;cloud(x,y,w*(.04+rand()*.075),h*(.055+rand()*.09),i%3?'55,104,174':'123,152,193',.055+rand()*.07)}
  for(let i=0;i<25;i++){const x=rand()*w;cloud(x,band(x)+normal()*h*.025,w*(.018+rand()*.04),h*(.018+rand()*.035),'3,7,15',.25+rand()*.35)}
  const count=Math.min(5500,Math.max(1800,Math.round(w*h/280)));
  for(let i=0;i<count;i++){
   const clustered=i>count*.28,x=rand()*w,y=clustered?band(x)+normal()*h*.075:rand()*h;
   const radius=.2+Math.pow(rand(),5)*1.05,alpha=(clustered?.14:.22)+rand()*.52;
   g.fillStyle=`rgba(${i%7?'169,200,238':'234,231,216'},${alpha})`;g.beginPath();g.arc(x,y,radius,0,Math.PI*2);g.fill();
  }
  // A few brighter stars, with restrained halos rather than large flares.
  for(let i=0;i<24;i++){const x=rand()*w,y=rand()*h;cloud(x,y,6,6,'100,178,255',.22);g.fillStyle='rgba(220,238,255,.88)';g.beginPath();g.arc(x,y,.9+rand()*.45,0,Math.PI*2);g.fill()}
  const shade=g.createLinearGradient(0,0,0,h);for(const [at,alpha] of [[0,.75],[.23,.38],[.4,.08],[.75,0],[1,.8]])shade.addColorStop(at,`rgba(6,9,14,${alpha})`);
  g.fillStyle=shade;g.fillRect(0,0,w,h);
  canvas.dataset.starfieldBuilds=String(Number(canvas.dataset.starfieldBuilds||0)+1);
 }
 ctx.drawImage(detail,0,0,w,h);
}
let near=false,raf=0,last=0,phase=0;
const reached=panels.map(()=>false);
function draw(t){raf=0;if(!near||document.hidden)return;raf=requestAnimationFrame(draw);if(t-last<(window.DiskyPerformance?.interval||33.3)-.5)return;const dt=Math.min(50,t-last);last=t;if(!reduced.matches)phase+=dt/1000;
 const r=section.getBoundingClientRect(),w=section.clientWidth,h=section.clientHeight;const dpr=Math.min(devicePixelRatio||1,window.DiskyPerformance?.economy?1:1.5);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0)
 // The cached Milky Way gives the process section its own identity. The same
 // canvas feeds the original glass, including the moving physical cable.
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
