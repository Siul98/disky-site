// Original DISKY/Spline material. Lazy, shared, serial jobs; no idle WebGL loop.
let renderer,queue=Promise.resolve();
export function attachGlass(root,panels=[root]){
 let disposed=false,visible=false,revision=0,timer,lastGeometry='',failed=false;
 root.classList.add('web-glass-host');panels.forEach(p=>p.classList.add('web-glass-pane'));
 const repaint=()=>{clearTimeout(timer);const version=++revision;timer=setTimeout(()=>{
  if(!visible||disposed||failed)return;
  queue=queue.catch(()=>{}).then(async()=>{
   if(disposed||!visible||version!==revision||!root.isConnected)return;
   let output,url;
   try{
    const w=root.clientWidth,h=root.clientHeight;if(!w||!h)return;
    const geometry=[w,h,...panels.flatMap(p=>[p.offsetLeft,p.offsetTop,p.clientWidth,p.clientHeight,getComputedStyle(p).borderRadius])].join(":");
    if(geometry===lastGeometry)return;
    const bg=document.createElement('canvas'),dpr=Math.min(devicePixelRatio||1,1.5);bg.width=Math.round(w*dpr);bg.height=Math.round(h*dpr);
    const ctx=bg.getContext('2d');ctx.fillStyle='#08090b';ctx.fillRect(0,0,bg.width,bg.height);
    const blob=await new Promise(resolve=>bg.toBlob(resolve,'image/png'));bg.width=bg.height=1;
    if(!blob)throw new Error('Backdrop snapshot failed');url=URL.createObjectURL(blob);
    const panes=panels.map(p=>({x:p===root?0:p.offsetLeft,y:p===root?0:p.offsetTop,width:p.clientWidth,height:p.clientHeight,radius:parseFloat(getComputedStyle(p).borderRadius)||36}));
    const {renderGlass}=await(renderer ||= import('./glass-material.js'));
    output=await renderGlass(url,w,h,panes,1.5);
    if(disposed||!visible||version!==revision||!root.isConnected)return;
    output.className='web-glass-surface';output.setAttribute('aria-hidden','true');
    root.querySelector(':scope > .web-glass-surface')?.remove();root.prepend(output);output=null;
    lastGeometry=geometry;root.classList.add('web-glass-ready');
   }catch(error){failed=true;console.warn('DISKY website glass unavailable',error);}
   finally{if(url)URL.revokeObjectURL(url);if(output)output.width=output.height=1;}
  });
 },120);};
 const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)repaint();},{rootMargin:'100px'});io.observe(root);
 const ro=new ResizeObserver(repaint);ro.observe(root);panels.forEach(p=>{if(p!==root)ro.observe(p)});
 return ()=>{disposed=true;revision++;clearTimeout(timer);io.disconnect();ro.disconnect();const c=root.querySelector(':scope > .web-glass-surface');if(c){c.width=c.height=1;c.remove();}};
}
const how=document.querySelector('.how-steps');if(how)attachGlass(how,[...how.querySelectorAll('.how-card')]);
