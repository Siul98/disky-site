const section=document.querySelector('#privacy');
if(section){
 const canvas=document.createElement('canvas');canvas.className='privacy-matrix';canvas.setAttribute('aria-hidden','true');section.prepend(canvas);const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion:reduce)');let w=0,h=0,raf=0,last=0,phase=0,visible=false;
 const glyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]';const chars=Array.from({length:150},(_,i)=>({x:((i*73.19)%100)/100,y:((i*31.71)%100)/100,speed:5+(i%7)*1.3,char:glyphs[(i*17)%glyphs.length]}));
 function draw(){ctx.clearRect(0,0,w,h);ctx.font='14px monospace';chars.forEach((c,i)=>{const x=c.x*w,y=(c.y*h+phase*c.speed)%(h+40)-20;const edge=Math.min(1,Math.abs(x-w/2)/(w*.32));const glow=.5+.5*Math.sin(phase*.4+i);ctx.fillStyle=`rgba(74,158,255,${(.07+edge*.19)*(glow*.4+.6)})`;ctx.fillText(c.char,x,y)});}
 function tick(now){raf=0;if(!visible||document.hidden||reduce.matches)return;if(now-last>=50){phase+=Math.min(.1,(now-last)/1000);last=now;draw()}raf=requestAnimationFrame(tick)}
 function start(){if(visible&&!document.hidden&&!reduce.matches&&!raf){last=performance.now();raf=requestAnimationFrame(tick)}}
 new ResizeObserver(()=>{w=section.clientWidth;h=section.clientHeight;const dpr=Math.min(devicePixelRatio,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw()}).observe(section);
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(raf);raf=0}},{rootMargin:'100px'}).observe(section);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else start()});reduce.addEventListener('change',()=>{cancelAnimationFrame(raf);raf=0;draw();start()});
}
