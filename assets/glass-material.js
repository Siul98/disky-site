/* DISKY Liquid Glass = Spline Team's Stackable Glass, one original pane.
 * Material is read from the unmodified scene; layouts/background belong to DISKY.
 */
let sourcePromise;
const source=()=>sourcePromise ||= import('./vendor/hana/hana-viewer.js').then(async m=>{
 const bytes=new Uint8Array(await(await fetch(new URL('./vendor/hana/stackable-glass.hanacode',import.meta.url))).arrayBuffer());
 const original=m.HanaDocument.deserialize(bytes);
 await m.initHana(new URL('./vendor/hana/'+m.wasmForDocument(original),import.meta.url).href);
 return {m,raw:JSON.parse(JSON.stringify(original))};
});
function documentForGlass(raw,background,width,height,panes){
 const data=structuredClone(raw),frame=data.scenes[0].data.objects[0];
 let material;
 const walk=entries=>entries.forEach(entry=>{if(entry.data.name==='Rectangle 4')material=entry.data;if(entry.children)walk(entry.children);});
 walk(data.scenes[0].data.objects);
 if(!material)throw new Error('Stackable Glass material missing');
 const imageId='737da5e0-704d-4f64-9000-000000000001';
 frame.data.position=[0,0];frame.data.shape.size=[width,height];
 frame.data.fill={type:'Image',enabled:true,image:imageId,opacity:1,mode:'Crop'};
 frame.children=panes.map((pane,index)=>{
  const glass=structuredClone(material);glass.name='DISKY glass '+index;
  glass.position=[pane.x+pane.width/2,pane.y+pane.height/2];glass.is3d=false;glass.rotation=0;glass.rotation3d=[0,0,0];glass.states=[];glass.events=[];
  // Website tour override approved by Luis: untinted glass, original optics.
  if(pane.clearTint && glass.fill?.type==='Color')glass.fill.color[3]=0;
  glass.shape.size=[pane.width,pane.height];glass.shape.cornerRadius=Array(4).fill(pane.radius);
  return {id:'737da5e0-704d-4f64-9001-'+String(index+1).padStart(12,'0'),fi:index,data:glass,children:[]};
 });
 data.assets.images={[imageId]:{name:'DISKY room',data:{data:background}}};
 return data;
}
export async function renderGlass(background,width,height,panes,maxDpr=2){
 const {m,raw}=await source();
 const data=documentForGlass(raw,background,width,height,panes);
 const checked=m.HanaData.check(data),canvas=document.createElement('canvas');
 const dpr=Math.min(devicePixelRatio||1,maxDpr);
 canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
 const engine=await m.HanaEngine.create(canvas,checked,false);
 try{
  engine.resize([width,height],dpr);engine.scene.present(data.publish.startFrame);
  engine.onFrame();await m.waitForHanaImages();
  engine.onFrame();await new Promise(resolve=>setTimeout(resolve,0));engine.onFrame();
  const out=document.createElement('canvas');out.width=canvas.width;out.height=canvas.height;out.getContext('2d').drawImage(canvas,0,0);
  return out;
 }finally{engine.free();canvas.width=canvas.height=1;}
}


// Persistent original engine, fed synchronously from the just-rendered room.
export async function createLiveGlass(room,width,height,panes,maxDpr=1.5){
 const {m,raw}=await source(),url='disky-live:'+crypto.randomUUID();
 const input=document.createElement('canvas');input.width=room.width;input.height=room.height;const inputContext=input.getContext('2d');inputContext.drawImage(room,0,0);
 const bridge=m.registerHanaCanvas(url,input),canvas=document.createElement('canvas');
 const data=documentForGlass(raw,url,width,height,panes),checked=m.HanaData.check(data),dpr=Math.min(devicePixelRatio||1,maxDpr);
 canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);let engine;
 try{
  engine=await m.HanaEngine.create(canvas,checked,false);
  if(!engine.isWebgpu())throw new Error('Live Hana canvas requires WebGPU');
  engine.resize([width,height],dpr);engine.scene.present(data.publish.startFrame);
  engine.onFrame();await m.waitForHanaImages();engine.onFrame();await new Promise(r=>setTimeout(r,0));engine.onFrame();
  return {canvas,draw(){inputContext.drawImage(room,0,0);if(!bridge.update())return false;engine.reset(checked);engine.scene.present(data.publish.startFrame);engine.onFrame();return true;},dispose(){bridge.dispose();engine.free();canvas.width=canvas.height=input.width=input.height=1;}};
 }catch(error){bridge.dispose();engine?.free();throw error;}
}
