// Original DesignGabor scene; the How compositor also supplies these pixels to Hana.
export function createRetrofuturism(){
 const canvas=document.createElement('canvas');
 canvas.getContext('webgl2',{alpha:true,preserveDrawingBuffer:true,antialias:true});
 let app,loading,ready=false,active=false,failed=false,readyAt=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 async function load(){
  if(loading||failed)return loading;
  loading=(async()=>{try{
   const {Application}=await import('./runtime.js');
   app=new Application(canvas,{renderer:'webgl',renderMode:'manual',htmlContentMode:'none'});
   app.setSize((navigator.hardwareConcurrency||8)<=4?825:1100,(navigator.hardwareConcurrency||8)<=4?518:690);
   await app.load(new URL(reduced.matches?'./scene-static.splinecode?v=fast-load-43':'./scene.splinecode?v=fast-load-43',import.meta.url).href);
   // The poster already shows this scene; avoid restarting a black cover over it.
   const cover=app.findObjectByName('Cube');if(cover)cover.visible=false;
   ready=true;readyAt=performance.now();if(!active)app.stop();
  }catch(e){failed=true;console.warn('Spline background unavailable',e);}})();
  return loading;
 }
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();ready=false;app?.stop()});
 canvas.addEventListener('webglcontextrestored',()=>{app?.dispose();app=null;loading=null;failed=false;if(active)load()});
 return {
  prepare:load,
  setActive(value){active=value;if(value){load();if(ready)app.play()}else app?.stop()},
  draw(ctx,w,h){if(!ready)return;if(!reduced.matches)app.requestRender();const scale=Math.max(w/canvas.width,h/canvas.height),sw=canvas.width*scale,sh=canvas.height*scale;ctx.save();ctx.globalAlpha=Math.min(1,(performance.now()-readyAt)/450);ctx.drawImage(canvas,(w-sw)/2,(h-sh)/2,sw,sh);ctx.restore()},
  dispose(){active=false;app?.dispose()},
  get ready(){return ready},get stopped(){return app?.isStopped??true}
 };
}
