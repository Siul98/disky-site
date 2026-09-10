// Original scene with measured quality tiers. Softness affects this background only.
export function createRetrofuturism(){
 const canvas=document.createElement('canvas'),soft=document.createElement('canvas');
 let app,loading,ready=false,active=false,failed=false,readyAt=0,renders=0,disposed=false;
 let frameId=0,lastFrame=0,windowStart=0,frames=0,late=0,badWindows=0;
 const policy=()=>window.DiskyPerformance;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function stopMonitor(){cancelAnimationFrame(frameId);frameId=0;lastFrame=windowStart=frames=late=badWindows=0}
 function monitor(t){
  frameId=0;if(!active||!ready||disposed||document.hidden||policy()?.staticBackground)return;
  // Ignore startup, tab returns, and occasional isolated stalls. Two sustained
  // windows distinguish a GPU that cannot keep up from one slow network task.
  if(t-readyAt>2500){
   if(lastFrame){frames++;if(t-lastFrame>50)late++}lastFrame=t;
   if(!windowStart)windowStart=t;
   if(t-windowStart>=2000){badWindows=frames&&late/frames>.2?badWindows+1:0;frames=late=0;windowStart=t;
    if(badWindows>=2){badWindows=0;policy()?.reduce('sustained-frame-delays');readyAt=t}
   }
  }
  if(!policy()?.staticBackground)frameId=requestAnimationFrame(monitor);
 }
 function sync(){
  if(policy()?.staticBackground){app?.stop();stopMonitor();return}
  if(!app)return;
  app.setSize(policy()?.economy?660:1100,policy()?.economy?414:690);
  if(active&&ready&&!document.hidden){app.play();if(!frameId)frameId=requestAnimationFrame(monitor)}else app.stop();
 }
 addEventListener('disky-quality-change',sync);
 async function load(){
  if(loading||failed||disposed||policy()?.staticBackground)return loading;
  loading=(async()=>{try{
   if(!canvas.getContext('webgl2',{alpha:true,preserveDrawingBuffer:true,antialias:true}))throw Error('WebGL2 unavailable');
   const {Application}=await import('./runtime.js');if(disposed)return;
   app=new Application(canvas,{renderer:'webgl',renderMode:'manual',htmlContentMode:'none'});sync();
   await app.load(new URL(reduced.matches?'./scene-static.splinecode?v=fast-load-43':'./scene.splinecode?v=fast-load-43',import.meta.url).href);
   if(disposed){app.dispose();return}
   const cover=app.findObjectByName('Cube');if(cover)cover.visible=false;
   ready=true;readyAt=performance.now();sync();
  }catch(e){failed=true;app?.stop();policy()?.fallback('background-unavailable');console.warn('Spline background unavailable',e)}})();return loading;
 }
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();ready=false;app?.stop();stopMonitor();policy()?.fallback('background-context-lost')});
 return {
  prepare:load,
  setActive(value){if(active===value)return;active=value;if(value){readyAt=performance.now();load();sync()}else{app?.stop();stopMonitor()}},
  draw(ctx,w,h){
   if(!ready||!active||policy()?.staticBackground)return;
   if(!reduced.matches){app.requestRender();renders++}
   let source=canvas;
   if(policy()?.economy){
    window.DiskySoftBackground(canvas,soft,440,276);source=soft;
   }
   const scale=Math.max(w/source.width,h/source.height),sw=source.width*scale,sh=source.height*scale;
   ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.globalAlpha=Math.min(1,(performance.now()-readyAt)/450);ctx.drawImage(source,(w-sw)/2,(h-sh)/2,sw,sh);ctx.restore();
  },
  dispose(){disposed=true;active=false;stopMonitor();removeEventListener('disky-quality-change',sync);app?.dispose()},
  get renders(){return renders},get ready(){return ready},get stopped(){return app?.isStopped??true},
  get quality(){return policy()?.staticBackground?'soft-poster':policy()?.economy?'soft-live':'full-live'}
 };
}
