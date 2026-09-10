import {MeshoptDecoder} from './meshopt_decoder.js';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DiskyLensField} from './deep-lens.js';
const MODELL_ZU_WELT=4.0;

const DRIVE_MODELL_VERSION="v7-library";
const DRIVE_MODELLE=new Set(["ssd-black","rugged-carabiner","ssd-grey","ssd-orange","silver-metal","m2-nvme","desktop-hdd","rugged-orange","sd-tough","cfexpress-a"]);
const _glbFertig=new Map();          
const _glbLaeuft=new Map();          
const _glbAn=()=>true;
function _glbBasis(){ return (window.diskyNative&&window.diskyNative.assetBase)
  ? window.diskyNative.assetBase+"models/drives/" : "./assets/original-search/models/"; }

function repairTangents(geometry){
  if(geometry.userData.diskyTangentsChecked)return;
  geometry.userData.diskyTangentsChecked=true;
  const normal=geometry.attributes.normal,tangent=geometry.attributes.tangent;
  if(!normal||!tangent)return;
  let repaired=0;
  for(let i=0;i<tangent.count;i++){
    let nx=normal.getX(i),ny=normal.getY(i),nz=normal.getZ(i);
    const nl=Math.hypot(nx,ny,nz);if(!Number.isFinite(nl)||nl<1e-8)continue;
    nx/=nl;ny/=nl;nz/=nl;
    let tx=tangent.getX(i),ty=tangent.getY(i),tz=tangent.getZ(i);
    const dot=tx*nx+ty*ny+tz*nz;
    tx-=dot*nx;ty-=dot*ny;tz-=dot*nz;
    let length=Math.hypot(tx,ty,tz);
    if(!Number.isFinite(length)||length<1e-5){
      if(Math.abs(nz)<.9){tx=ny;ty=-nx;tz=0;}
      else{tx=-nz;ty=0;tz=nx;}
      length=Math.hypot(tx,ty,tz);repaired++;
    }
    tangent.setXYZW(i,tx/length,ty/length,tz/length,tangent.getW(i)<0?-1:1);
  }
  tangent.needsUpdate=true;geometry.userData.diskyTangentRepairs=repaired;
}
function _glbHolen(typ){
  if(!DRIVE_MODELLE.has(typ)) return Promise.resolve(null);
  if(_glbFertig.has(typ)) return Promise.resolve(_glbFertig.get(typ));
  if(_glbLaeuft.has(typ)) return _glbLaeuft.get(typ);
  
  const p=new Promise(res=>{ try{ new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(_glbBasis()+typ+".glb?v="+DRIVE_MODELL_VERSION,
      g=>{ g.scene.traverse(o=>{ if(o.isMesh&&o.geometry){
        if(typ==="m2-nvme"&&/Black injection moulding/.test(o.material?.name||"")){
          // Endkappe und rotes Dach lagen beide bei y=.0065: echte Flächentrennung.
          const pos=o.geometry.attributes.position;
          for(let i=0;i<pos.count;i++){
            const y=pos.getY(i);if(y>.004)pos.setY(i,y+.00012*Math.min(1,(y-.004)/.0025));
          }
          pos.needsUpdate=true;o.geometry.computeBoundingBox();o.geometry.computeBoundingSphere();
          o.geometry.userData.capSeparation=.00012;
        }
        repairTangents(o.geometry); o.geometry.userData._shared=true; } });
        _glbFertig.set(typ,g.scene); res(g.scene); }, undefined,
      e=>{ console.warn("DISKY-Modell nicht geladen:",typ,e); res(null); }); }catch(e){ res(null); } });
  _glbLaeuft.set(typ,p); p.finally(()=>_glbLaeuft.delete(typ)); return p;
}

function _drvAusModell(vorlage,sc){
  const g=new THREE.Group(); const mats=[];
  const inst=vorlage.clone(true);
  inst.traverse(o=>{ if(!o.isMesh) return;
    o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();
    for(const m of (Array.isArray(o.material)?o.material:[o.material])) mats.push(m); });
  inst.rotation.y=-Math.PI/2;                       
  inst.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(inst).getSize(new THREE.Vector3());
  inst.scale.multiplyScalar(.09/Math.max(bounds.x,bounds.y,bounds.z));
  inst.updateMatrixWorld(true);
  const b=new THREE.Box3().setFromObject(inst);
  inst.position.sub(b.getCenter(new THREE.Vector3()));   
  g.add(inst);
  g.scale.setScalar((sc||1)*MODELL_ZU_WELT);
  g.userData._mats=mats;
  return g;
}
const WS={r:null,scene:null,cam:null,feld:null,items:[],host:null,ro:null,raf:0,last:0,_pts:0,envRT:null,t:0};
function wheelDispose(){
  if(WS.raf) cancelAnimationFrame(WS.raf); WS.raf=0;
  if(WS.pointerMove) window.removeEventListener("pointermove",WS.pointerMove);
  WS.pointerMove=null;WS.pointer=null;
  if(WS.ro) WS.ro.disconnect(); WS.ro=null;
  if(WS.mo) WS.mo.disconnect(); WS.mo=null;
  if(WS.invalidate) window.removeEventListener("scroll",WS.invalidate,true); WS.invalidate=null;
  if(WS.feld) WS.feld.traverse(o=>{ if(o.isMesh){
    if(o.geometry&&!o.geometry.userData._shared) o.geometry.dispose();
    (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m&&m.dispose());
  } });
  if(WS.lens) WS.lens.dispose(); WS.lens=null;
  if(WS.envRT) WS.envRT.dispose(); WS.envRT=null;
  if(WS.r){ WS.r.dispose(); try{WS.r.forceContextLoss();}catch(e){} WS.r.domElement.remove(); }
  Object.assign(WS,{r:null,scene:null,cam:null,feld:null,host:null,items:[],last:0,_pts:0,t:0,_frames:0,_renderMs:0,_stillDrawn:false});
}
window.DiskyWheel={
  async vorladen(list){
    if(!list||!list.length) return 0;
    const t0=performance.now();
    const fertig=(await Promise.all([...DRIVE_MODELLE].map(_glbHolen))).filter(Boolean).length;
    window._dwLadeMs=+(performance.now()-t0).toFixed(0); return fertig;
  },
  mount(host,list){
    try{
      wheelDispose(); if(!host||!list||!list.length) return false;
      const typen=[...DRIVE_MODELLE].filter(t=>_glbFertig.has(t)); if(!typen.length) return false;
      WS.host=host;
      const w=host.clientWidth||900,h=host.clientHeight||600;
      const r=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"low-power"});
      r.setPixelRatio(Math.min(window.devicePixelRatio||1,(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4?1:1.5)); r.setSize(w,h);
      r.toneMapping=THREE.ACESFilmicToneMapping; r.toneMappingExposure=1.35; r.outputColorSpace=THREE.SRGBColorSpace;
      r.setClearColor(0x000000,0); r.domElement.style.cssText="width:100%;height:100%;display:block";
      r.domElement.setAttribute("aria-hidden","true"); host.appendChild(r.domElement);
      const scene=new THREE.Scene();
      
      const raum=new THREE.Scene(); raum.background=new THREE.Color(0x10151e);
      for(const [x,y,z,w,h,farbe] of [[-6,4,2,3,7,0xffffff],[5,1,-4,1.2,5,0x60738c]]){
        const karte=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:farbe,side:THREE.DoubleSide}));
        karte.position.set(x,y,z); karte.lookAt(0,0,0); raum.add(karte); }
      const pmrem=new THREE.PMREMGenerator(r);
      try{ WS.envRT=pmrem.fromScene(raum,.035,.1,40); scene.environment=WS.envRT.texture; }
      finally{ pmrem.dispose(); raum.traverse(o=>{ if(o.isMesh){o.geometry.dispose();o.material.dispose();} }); }
      // A distant side softbox gives every depth layer the same lighting direction.
      const fill=new THREE.HemisphereLight(0xdce6f4,0x101521,.38); fill.name="Deep Search / soft fill"; scene.add(fill);
      const key=new THREE.DirectionalLight(0xfff3e4,3.2); key.name="Deep Search / left softbox";
      key.position.set(-8,5,3); key.target.position.set(0,0,-8); scene.add(key,key.target);
      const rim=new THREE.DirectionalLight(0xb7d1f5,.75); rim.name="Deep Search / right edge";
      rim.position.set(7,2,-12); rim.target.position.set(0,0,-8); scene.add(rim,rim.target);

      const cam=new THREE.PerspectiveCamera(42,w/h,.1,40); scene.add(cam);
      const feld=new THREE.Group(); scene.add(feld);
      Object.assign(WS,{r,scene,cam,feld});
      // Dekorative Auswahl: alle acht Designs gleichmäßig gemischt, ohne Status-Zuordnung.
      const reihenfolge=[0,3,8,4,2,9,7,1,6,5];
      const box=new THREE.Box3(),size=new THREE.Vector3();
      for(let i=0;i<typen.length;i++){
        const typ=typen[reihenfolge.filter(n=>n<typen.length)[i]];
        const g=_drvAusModell(_glbFertig.get(typ),1),piv=new THREE.Group(); piv.add(g); feld.add(piv);
        box.setFromObject(g); box.getSize(size);
        const radius=Math.max(size.length()/2,.001);
        const ph=i*2.399963;
        piv.rotation.set(.85+Math.sin(ph)*.3,Math.sin(ph+1)*.55,Math.sin(ph+2)*.55);
        WS.items.push({piv,typ,radius,ph,born:0,rainOffset:(i+.5)/typen.length,travel:(i+.5)/typen.length,rainCycle:0,cycle:0,jitter:0,depthShift:0,mats:g.userData._mats||[]});
      }
      WS.lens=new DiskyLensField(r,scene,cam,WS.items);
      WS.pointerMove=e=>{
        if(e.pointerType==="touch")return;
        const prev=WS.pointer,now=performance.now();
        WS.pointer={x:e.clientX,y:e.clientY,at:now,
          speed:prev?Math.min(1800,Math.hypot(e.clientX-prev.x,e.clientY-prev.y)/Math.max(.008,(now-prev.at)/1000)):0};
      };
      window.addEventListener("pointermove",WS.pointerMove,{passive:true});
      WS.replaceDrive=it=>{
        // Vorhandene GLBs teilen; nur die privaten Materialien werden ausgetauscht.
        const counts=new Map(typen.map(t=>[t,WS.items.filter(i=>i.typ===t).length]));
        const choices=typen.filter(t=>!WS.items.some(other=>other!==it&&other.typ===t));
        const least=Math.min(...choices.map(t=>counts.get(t)));
        const pool=choices.filter(t=>counts.get(t)===least);
        const typ=pool[Math.floor(Math.random()*pool.length)];
        const g=_drvAusModell(_glbFertig.get(typ),1);
        const bounds=new THREE.Box3().setFromObject(g);
        for(const m of it.mats)m.dispose();it.piv.clear();it.piv.add(g);
        Object.assign(it,{typ,radius:Math.max(bounds.getSize(new THREE.Vector3()).length()/2,.001),
          mats:g.userData._mats||[],born:WS.t,cycle:it.cycle+1,
          ph:Math.random()*Math.PI*2,jitter:(Math.random()-.5)*.07,
          depthShift:(Math.random()-.5)*1.4,impulse:null,screen:null,poseTime:null});
      };
      WS.step=elapsed=>{
        for(const it of WS.items){
          it.travel+=elapsed/95;
          const previous=it.screen;
          // Recycle only after the entire object, including bokeh and motion blur,
          // has physically crossed the bottom edge. Pointer impulses cannot cut it off.
          if(it.travel>=1&&previous&&previous.y-previous.radius-previous.blur-32>WS.height){
            WS.replaceDrive(it);it.travel=0;it.rainCycle++;
          }
        }
        const steps=Math.max(1,Math.ceil(elapsed/(1/120))),dt=elapsed/steps;
        for(let sub=0;sub<steps;sub++){
        const pointer=WS.pointer,hb=host.getBoundingClientRect();
        for(const it of WS.items){
          const q=it.impulse||(it.impulse={x:0,y:0,vx:0,vy:0,spin:0});
          if(pointer&&performance.now()-pointer.at<90&&pointer.speed>40&&it.screen&&it.opacity>.5){
            const dx=hb.left+it.screen.x-pointer.x,dy=hb.top+it.screen.y-pointer.y;
            const dist=Math.hypot(dx,dy),reach=it.screen.radius+65;
            if(dist<reach){
              const force=(1-dist/reach)*Math.min(pointer.speed,1000)*3*Math.pow(Math.max(.06,Math.min(1,(17-it.screen.depth)/13)),2);
              q.vx+=dx/Math.max(dist,1)*force*dt;q.vy+=dy/Math.max(dist,1)*force*dt;
              q.spin+=Math.sign(dx||1)*force*.001*dt;
            }
          }
          q.vx=(q.vx-q.x*.32*dt)*Math.exp(-1.1*dt);
          q.vy=(q.vy-q.y*.32*dt)*Math.exp(-1.1*dt);
          q.x+=q.vx*dt;q.y+=q.vy*dt;q.spin*=Math.exp(-.7*dt);
          const speed=Math.hypot(q.vx,q.vy);if(speed>700){q.vx*=700/speed;q.vy*=700/speed;}
        }
      };
      };
      WS.draw=()=>WS.lens.render(WS.width,WS.height);
      WS.layout=()=>{
        if(!WS.r||!host.isConnected) return;
        const bw=host.clientWidth||w,bh=host.clientHeight||h;
        if(bh<40) return;
        WS.r.setSize(bw,bh); cam.aspect=bw/bh; cam.updateProjectionMatrix();
        WS.width=bw; WS.height=bh;
        // Versetzte Zellen verteilen die Platten über die freie Fläche.
        WS.columns=bw>=1000?4:bw>=650?3:2;
        WS.rows=Math.ceil(WS.items.length/WS.columns);
        WS._stillDrawn=false; WS.protectedDirty=true;
      };
      WS.ro=new ResizeObserver(WS.layout); WS.ro.observe(host); WS.layout();
      WS.invalidate=()=>{WS.protectedDirty=true;WS._stillDrawn=false;};
      window.addEventListener("scroll",WS.invalidate,true);
      WS.mo=new MutationObserver(WS.invalidate);
      for(const el of document.querySelectorAll('.deepsearch,#deepBody,.phero'))
        WS.mo.observe(el,{childList:true,subtree:true,characterData:true});
      const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
      WS.pose=(time)=>{
        const bw=WS.width,bh=WS.height,rows=WS.rows,columns=WS.columns;
        const margin=420,span=bh+margin*2,cell=span/rows;
        const hb=host.getBoundingClientRect();
        // Das Feld bleibt hinter der HTML-Oberfläche; keine unsichtbaren Sperrflächen.
        WS.protectedRects=[];
        const smooth=(a,b,v)=>{const x=Math.max(0,Math.min(1,(v-a)/(b-a)));return x*x*(3-2*x);};
        for(let index=0;index<WS.items.length;index++){
            const it=WS.items[index],p=it.piv,age=time-it.born;
            const row=Math.floor(index/columns),col=index%columns,phase=it.ph;
            const cfg=[
              [.3,1,.1,.003,.20,.65,.3],[.1,1,.3,.002,.15,.55,.5],
              [.4,1,.1,.003,.10,.60,.6],[.5,1,.2,.003,.18,.70,.45],
              [.2,1,-.2,.004,.18,.75,.4],[.1,1,.4,.003,.14,.85,.7],
              [.5,1,.2,.005,.12,.70,.2],[.3,1,-.3,.004,.10,.90,.5]
            ][index%8];
            // Räumliche Größenstaffelung statt einer Bildschirmgröße für alle Modelle.
            // Tiefenrolle folgt dem Modell, auch nach zufälligem Austausch.
            const hero=it.typ==="silver-metal"||it.typ==="desktop-hdd";
            const baseDepth=it.typ==="m2-nvme"?18:hero?(it.typ==="desktop-hdd"?4.6:5.2):[8,10.5,13,15][index%4];
            const depth=baseDepth+it.depthShift*.35+Math.sin(time*.12+phase)*.35;
            const hh=Math.tan(cam.fov*Math.PI/360)*depth;
            // Ruhiger Regen: konstante Geschwindigkeit, Wechsel ausschließlich außerhalb des Bildes.
            const impulse=it.impulse||{x:0,y:0,spin:0};
            const rain=it.travel;
            const y=-margin+rain*span+impulse.y;
            let x=bw*((col+.5)/columns+.035*Math.sin(phase)+it.jitter)+impulse.x;
            // Keep the search input and its hint unobstructed throughout the drift.
            const search=host.parentElement?.querySelector('input[type="search"],#searchInput,.deepsearch input');
            if(search){const rect=search.getBoundingClientRect();
              const center=(rect.top+rect.bottom)/2-hb.top+20;
              const weight=1-smooth(100,380,Math.abs(y-center));
              const left=rect.left-hb.left-130,right=rect.right-hb.left+130;
              const target=col<columns/2?Math.min(x,Math.max(65,left)):Math.max(x,Math.min(bw-65,right));
              x+=(target-x)*weight;}

            const radiusPx=Math.min(82,bw*.052,cell*.30)*9/depth;
            p.position.set((x/bw*2-1)*hh*cam.aspect,(1-y/bh*2)*hh,-depth);
            p.scale.setScalar(radiusPx*(2*hh/bh)/it.radius);
            // Local-axis turns: each case rotates around its own centre, independently of the rain.
            // Ease through the logo-facing pose; complete a turn roughly every 28–40 seconds.
            const turn=age*(.16+(index%5)*.016)*(index%2?-1:1);
            const angle=turn-.32*Math.sin(turn);
            if(!it.turnAxis) it.turnAxis=new THREE.Vector3(.20+cfg[0]*.4,.15,1).normalize();
            p.rotation.set(1.35+Math.sin(time*.18+phase)*.16,
              Math.sin(phase+1)*.20,Math.sin(time*.12+phase)*.30+impulse.spin);
            p.rotateOnAxis(it.turnAxis,angle);
            const blur=WS.lens.circleOfConfusion(depth);
            const prev=it.screen,delta=time-(it.poseTime??time);
            const moving=prev&&delta>0&&delta<.21;
            const motionX=moving?Math.max(-14,Math.min(14,(x-prev.x)/delta*.025)):0;
            const motionY=moving?Math.max(-14,Math.min(14,(y-prev.y)/delta*.025)):0;
            it.screen={x,y,radius:radiusPx,blur,depth,motionX,motionY};it.poseTime=time;
            it.opacity=1;
            it.blocked=false;p.visible=true;
        }
      };
      const tick=ts=>{
        if(!WS.r) return;
        if(!host.isConnected){wheelDispose();return;}
        WS.raf=requestAnimationFrame(tick);
        if(document.hidden||window.websiteSceneVisible===false){WS._pts=0;return;}
        const still=document.body.classList.contains("reduce-motion")||reduced.matches;
        if(still&&WS._stillDrawn) return;
        const economy=(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4;
        const gap=1000/(economy?24:30)-.5;
        if(ts-WS.last<gap) return;
        const dt=still?0:Math.min(.2,(ts-(WS._pts||ts))/1000); WS._pts=ts;WS.last=ts;WS.t+=dt;
        const start=performance.now(); if(!still)WS.step(dt); WS.pose(WS.t); WS.draw();
        WS._frames++;WS._renderMs=performance.now()-start;WS._stillDrawn=still;
      };
      // Das erste Bild ist auch bei verdecktem Fenster vollständig vorbereitet.
      WS.pose(0);WS.draw();WS._frames=1;WS.raf=requestAnimationFrame(tick);return true;
    }catch(e){console.warn("wheel mount failed",e);wheelDispose();return false;}
  },
  mess(){try{
    if(!WS.feld) return null;
    let dreiecke=0,netze=0;const geo=new Set(),mat=new Set(),tex=new Set();
    WS.feld.traverse(o=>{if(!o.isMesh)return;netze++;geo.add(o.geometry.uuid);
      dreiecke+=Math.floor((o.geometry.index?.count||o.geometry.attributes.position.count)/3);
      for(const m of(Array.isArray(o.material)?o.material:[o.material])){mat.add(m.uuid);
        for(const k of ["map","normalMap","roughnessMap","metalnessMap","aoMap"])if(m[k])tex.add(m[k].uuid);}
    });
    return {platten:WS.items.length,sichtbar:WS.items.filter(i=>i.piv.visible).length,netze,dreiecke,geometrien:geo.size,materialien:mat.size,texturen:tex.size,
      modellVersion:DRIVE_MODELL_VERSION,unschaerfe:"layered-aperture-64",fokus:WS.lens?.focus,schaerfebereich:WS.lens?.focusHalfWidth,maxBokehPx:WS.lens?.maxBlur,statusPunkte:0,modellWechsel:WS.items.reduce((n,i)=>n+i.cycle,0),renderBilder:WS._frames,renderCpuMs:+WS._renderMs.toFixed(2),modelle:[...new Set(WS.items.map(i=>i.typ))].join(",")};
  }catch(e){return null;}},
  snapshotTo(source,target){
    if(source!==WS.r?.domElement) return false;
    WS.draw(); target.width=source.width; target.height=source.height;
    target.getContext('2d').drawImage(source,0,0); return true;
  },
  unmount(){wheelDispose();}
};
window.DiskyWheel.__WS=WS;   // Debug-Handle (QA: Kamera-Close-ups)
document.addEventListener('visibilitychange',()=>{ if(!document.hidden&&WS.r) WS.last=0; });

window.dispatchEvent(new Event('scene-module-ready'));
