// Original DesignGabor scene; the How compositor also supplies these pixels to Hana.
export function createRetrofuturism(){
 const canvas=document.createElement('canvas');
 canvas.getContext('webgl2',{alpha:true,preserveDrawingBuffer:true,antialias:true});
 let app,loading,ready=false,active=false,failed=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 async function load(){
  if(loading||failed)return loading;
  loading=(async()=>{try{
   const {Application}=await import('./runtime.js');
   app=new Application(canvas,{renderer:'webgl',renderMode:'manual',htmlContentMode:'none'});
   app.setSize(1100,690);
   await app.load(new URL(reduced.matches?'./scene-static.splinecode':'./scene.splinecode',import.meta.url).href);
   if(reduced.matches){const cover=app.findObjectByName('Cube');if(cover)cover.visible=false;}
   ready=true;if(!active)app.stop();
  }catch(e){failed=true;console.warn('Spline background unavailable',e);}})();
  return loading;
 }
 return {
  setActive(value){active=value;if(value){load();if(ready)app.play()}else app?.stop()},
  draw(ctx,w,h){if(!ready)return;if(!reduced.matches)app.requestRender();const scale=Math.max(w/canvas.width,h/canvas.height),sw=canvas.width*scale,sh=canvas.height*scale;ctx.drawImage(canvas,(w-sw)/2,(h-sh)/2,sw,sh)},
  dispose(){active=false;app?.dispose()},
  get ready(){return ready},get stopped(){return app?.isStopped??true}
 };
}
