/* Website adapter only. Original Hana material/runtime are shared byte-for-byte
 * with the app. Four non-overlapping atlas panes share one persistent engine.
 * Every frame samples the SAME canvas used for the visible website background.
 */
import {createLiveGlass} from './glass-material.js?v=safari-glass-46';
export function attachLiveTourGlass(host,panels=[...host.querySelectorAll('.hf-tour-card')]){
 const pad=56,compact=(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4;
 let lastDraw=0,drawInterval=compact?50:32;
 let current=null,requested=null,building=false,disposed=false,failed=false;
 let epoch=0,lastKey='',stableSince=0,hiddenSince=0;
 const stats={frames:0,builds:0,disposed:0,engines:0,drawMs:0,maxDrawMs:0,state:'waiting'};
 host.glassStats=stats;
 panels.forEach(p=>{p.classList.add('web-glass-pane','web-live-glass');p.dataset.glass='waiting'});
 function clear(){for(const p of panels){p.dataset.glass=failed?'unsupported':'waiting';p.classList.remove('web-glass-ready');p.querySelector(':scope > .web-glass-surface')?.remove()}}
 function release(){epoch++;requested=null;if(current){current.live.dispose();current.atlas.width=current.atlas.height=1;stats.disposed++;stats.engines--;current=null}clear();stats.state=failed?'unsupported':'waiting'}
 function layout(){
  const sizes=panels.map(p=>({width:p.clientWidth,height:p.clientHeight,radius:Math.min(parseFloat(getComputedStyle(p).borderRadius)||36,p.clientHeight/2)}));
  const cellW=Math.ceil(Math.max(...sizes.map(p=>p.width))+pad*2),cellH=Math.ceil(Math.max(...sizes.map(p=>p.height))+pad*2);
  const panes=sizes.map((p,i)=>({...p,clearTint:false,tintOpacity:host.classList.contains("download-glass-host")?.25:.8,x:(i%2)*cellW+pad,y:Math.floor(i/2)*cellH+pad}));
  const width=cellW*Math.min(2,panels.length),height=cellH*Math.ceil(panels.length/2),key=[width,height,...sizes.flatMap(p=>[p.width,p.height,p.radius])].join(':');
  return {width,height,panes,key};
 }
 function fill(g,source,rects){
  const ctx=g.atlas.getContext('2d'),bounds=source.getBoundingClientRect();
  if(!bounds.width||!bounds.height)return;
  const sx=source.width/bounds.width,sy=source.height/bounds.height;
  ctx.fillStyle='#08090b';ctx.fillRect(0,0,g.width,g.height);
  g.panes.forEach((p,i)=>{
   const r=rects[i],scaleX=r.width/p.width,scaleY=r.height/p.height;
   if(!r.width||!r.height)return;
   // CSS translations/scales and sticky scroll are measured in viewport pixels.
   // Keep current sampling even while a new stable-size engine is preparing.
   ctx.save();ctx.beginPath();ctx.rect(p.x-pad,p.y-pad,p.width+2*pad,p.height+2*pad);ctx.clip();
   ctx.drawImage(source,(r.x-bounds.x-pad*scaleX)*sx,(r.y-bounds.y-pad*scaleY)*sy,(r.width+2*pad*scaleX)*sx,(r.height+2*pad*scaleY)*sy,p.x-pad,p.y-pad,p.width+2*pad,p.height+2*pad);
   // Owner-approved darker download glass; retain original Hana optics and one pane.
   if(host.classList.contains('download-glass-host')){ctx.fillStyle='rgba(4,10,21,.34)';ctx.fillRect(p.x-pad,p.y-pad,p.width+2*pad,p.height+2*pad)}
   ctx.restore();
  });
 }
 async function build(){
  building=true;
  while(requested&&!disposed&&!failed){
   const g=requested,id=epoch;requested=null;
   try{
    stats.builds++;const live=await createLiveGlass(g.atlas,g.width,g.height,g.panes,compact?1:1.25);
    if(disposed||id!==epoch||!host.isConnected||(requested&&requested.key!==g.key)){live.dispose();g.atlas.width=g.atlas.height=1;stats.disposed++;continue}
    if(current){current.live.dispose();current.atlas.width=current.atlas.height=1;stats.disposed++;stats.engines--}
    current={...g,live};stats.engines++;stats.state='live';
   }catch(error){if(id===epoch&&!disposed){failed=true;release();for(const p of panels)p.dataset.glass='unsupported';console.warn('DISKY live website glass unavailable:',error)}}
  }
  building=false;
 }
 function frame(source,now=performance.now()){
  if(disposed||failed||document.hidden||!host.isConnected)return;
  const rects=panels.map(p=>p.getBoundingClientRect());
  const visible=panels.some((p,i)=>Number(p.style.getPropertyValue('--reveal'))>.005&&rects[i].bottom>0&&rects[i].top<innerHeight);
  if(!visible){if(!hiddenSince){hiddenSince=now;release()}return}
  hiddenSince=0;
  const g=layout();if(g.key!==lastKey){lastKey=g.key;stableSince=now}
  if(current?.key!==g.key&&(!current||now-stableSince>140)&&requested?.key!==g.key&&!building){
   g.atlas=document.createElement('canvas');g.atlas.width=g.width;g.atlas.height=g.height;fill(g,source,rects);requested=g;build();
  }
  if(!current)return;
  // The source loop owns cadence. No independent animation loop is created.
  
  if(now-lastDraw<drawInterval)return;lastDraw=now;
  const start=performance.now();fill(current,source,rects);
  try{
   if(!current.live.draw())throw new Error('Hana live texture update failed');
   const output=current.live.canvas,sx=output.width/current.width,sy=output.height/current.height;
   current.panes.forEach((p,i)=>{
    const el=panels[i];if(Number(el.style.getPropertyValue('--reveal'))<=.005)return;
    let canvas=el.querySelector(':scope > .web-glass-surface');
    if(!canvas){canvas=document.createElement('canvas');canvas.className='web-glass-surface';canvas.setAttribute('aria-hidden','true');el.prepend(canvas)}
    const w=Math.round(p.width*sx),h=Math.round(p.height*sy);
    if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;
    const ctx=canvas.getContext('2d');ctx.clearRect(0,0,w,h);ctx.drawImage(output,p.x*sx,p.y*sy,p.width*sx,p.height*sy,0,0,w,h);
    el.classList.add('web-glass-ready');el.dataset.glass='live';
   });
   stats.frames++;stats.drawMs=performance.now()-start;stats.maxDrawMs=Math.max(stats.maxDrawMs,stats.drawMs);if(stats.drawMs>18)drawInterval=Math.min(100,Math.max(drawInterval,stats.drawMs*2));
  }catch(error){failed=true;release();for(const p of panels)p.dataset.glass='unsupported';console.warn('DISKY live website glass stopped:',error)}
 }
 const io=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)release()});io.observe(host);
 const onHidden=()=>{if(document.hidden)release()};document.addEventListener('visibilitychange',onHidden);
 const onPageHide=()=>release();addEventListener('pagehide',onPageHide);
 return {frame,suspend:release,dispose(){disposed=true;release();io.disconnect();document.removeEventListener('visibilitychange',onHidden);removeEventListener('pagehide',onPageHide);delete host.glassStats}};
}
