const section=document.querySelector('#privacy');
if(section){
 const canvas=document.createElement('canvas');canvas.className='privacy-matrix';canvas.setAttribute('aria-hidden','true');section.prepend(canvas);const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion:reduce)');let w=0,h=0,raf=0,last=0,phase=0,visible=false;
 const glyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';let chars=[];
 // Random best-candidate sampling: even coverage without a visible grid or repeated sequences.
 function distribute(){
  chars=[];const count=Math.max(40,Math.min(420,Math.round(w*h/6500)));
  for(let i=0;i<count;i++){
   let best,score=-1;
   for(let attempt=0;attempt<12;attempt++){
    const x=Math.random()*w,y=Math.random()*h;let distance=Infinity;
    for(const c of chars){const dx=Math.min(Math.abs(x-c.x),w-Math.abs(x-c.x)),dy=Math.min(Math.abs(y-c.y),h-Math.abs(y-c.y));distance=Math.min(distance,dx*dx+dy*dy)}
    if(distance>score){best={x,y};score=distance}
   }
   chars.push({...best,char:glyphs[Math.floor(Math.random()*glyphs.length)],glow:Math.random()*Math.PI*2,size:13+Math.random()*5});
  }
 }
 function draw(){ctx.clearRect(0,0,w,h);ctx.textAlign='center';ctx.textBaseline='middle';chars.forEach(c=>{const y=(c.y+phase*7)%h;const glow=.5+.5*Math.sin(phase*.4+c.glow);ctx.font=`${c.size}px monospace`;ctx.fillStyle=`rgba(74,158,255,${.13+glow*.1})`;ctx.fillText(c.char,c.x,y);if(y<12)ctx.fillText(c.char,c.x,y+h);if(y>h-12)ctx.fillText(c.char,c.x,y-h)});}
 function tick(now){raf=0;if(!visible||document.hidden||reduce.matches)return;if(now-last>=50){phase+=Math.min(.1,(now-last)/1000);last=now;draw()}raf=requestAnimationFrame(tick)}
 function start(){if(visible&&!document.hidden&&!reduce.matches&&!raf){last=performance.now();raf=requestAnimationFrame(tick)}}
 new ResizeObserver(()=>{w=section.clientWidth;h=section.clientHeight;const dpr=Math.min(devicePixelRatio,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);distribute();draw()}).observe(section);
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(raf);raf=0}},{rootMargin:'100px'}).observe(section);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else start()});reduce.addEventListener('change',()=>{cancelAnimationFrame(raf);raf=0;draw();start()});
}
