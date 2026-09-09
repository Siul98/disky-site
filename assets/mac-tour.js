import {discovery,storage,duplicates,phoneTransfer,animateFeatureArt} from './tour-art/feature-art.js?v=motion-24';
import {attachLiveTourGlass} from './live-tour-glass.js?v=compat-45';
const rail=document.querySelector('#hf-rail'),host=document.createElement('nav');
host.className='hf-tour-cards';host.setAttribute('aria-label','App feature demonstrations');
const views=['search','map','dupes','iphone'];
const names=['Deep Search','Storage Map','Duplicate Finder','iPhone Sync'];
const motifs=[discovery,storage,duplicates,phoneTransfer];
function art(i){return motifs[i].replaceAll('/web/assets/',new URL('./',import.meta.url).href).replace(/id="([^"]+)"/g,(_,id)=>`id="tour-${i}-${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#tour-${i}-${id})`).replace(/href="#([^"]+)"/g,(_,id)=>`href="#tour-${i}-${id}"`)}
const copy={en:[['There it is.','Find the file you thought you’d lost. Even on unplugged drives.'],['A detailed view of what eats your space.','Spot the biggest folders. Follow them down to the file.'],['Remove unnecessary duplicates.','Find identical copies across your drives. Compare them and choose what stays.'],['The best tool to manage your phone gallery.','Bring your iPhone photos and videos home. Keep original quality, choose your folders and skip what’s already saved.']],de:[['Da ist sie ja.','Finde die Datei, die du längst verloren glaubtest. Auch auf nicht angeschlossenen Platten.'],['Im Detail sehen, was deinen Speicher belegt.','Erkenne die größten Ordner. Folge ihnen bis zur einzelnen Datei.'],['Unnötige Duplikate entfernen.','Finde identische Kopien auf deinen Platten. Vergleiche sie und entscheide, was bleibt.'],['Deine Handygalerie bestens verwalten.','Hol deine iPhone-Fotos und Videos auf deine eigene Platte. In Originalqualität, mit deiner Ordnerstruktur. Bereits Gesichertes wird übersprungen.']]};
let disposers=[],chosen=0,timer,progress=0,ready=false;
const send=()=>{if(chosen>=0)document.querySelector('#hf-liveapp')?.contentWindow.postMessage({diskyStep:views[chosen]},location.origin)};
function go(i){chosen=i;host.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-current',String(j===i)));send()}

function labels(){const de=document.documentElement.lang==='de';const cap=document.querySelector('#hf-cap2');cap.querySelector('[data-t=hero_cap2]').textContent=de?'Dein Archiv. In Aktion.':'Your archive. In action.';cap.querySelector('.hf-cap2sub').textContent=de?'Vier Werkzeuge. Echte App-Oberfläche. Klicke auf eine Karte, um die Demo zu starten.':'Four tools. The real app interface. Click a card to play its demo.';disposers.forEach(f=>f());const c=copy[document.documentElement.lang==='de'?'de':'en'];host.innerHTML=views.map((v,i)=>`<button type="button" class="hf-tour-card" data-view="${v}" aria-current="${i===chosen}" aria-label="${names[i]}: ${c[i][0]}"><span class="tour-art" aria-hidden="true">${art(i)}</span><span class="tour-card-head"><small>0${i+1} / ${names[i]}</small><span class="tour-arrow" aria-hidden="true">↗</span></span><strong>${c[i][0]}</strong><p>${c[i][1]}</p><span class="tour-play">▷ ${de?'Demo starten':'Play demo'}</span></button>`).join('');host.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>go(i));const live=attachLiveTourGlass(host);window.DiskyWebsiteGlass=live;disposers=[()=>live.dispose()]}
document.querySelector('#hf-mac').parentElement.append(host);labels();
// Anchor lands at the first feature, without replaying the introductory scan.
const anchor=document.createElement('span');anchor.id='features';anchor.style.cssText='position:absolute;top:160vh;pointer-events:none';rail.append(anchor);
document.querySelectorAll('a[href="#features"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();scrollTo({top:scrollY+rail.getBoundingClientRect().top+innerHeight*1.6,behavior:'smooth'})}));
window.diskyTourProgress=p=>{
 progress=p;
 const active=p>=.22;
 host.classList.toggle('is-visible',active);
 host.classList.toggle('is-playing',active&&!document.hidden);
 host.querySelectorAll('button').forEach((b,i)=>{
  const t=Math.max(0,Math.min(1,(p-(.22+i*.028))/.09));
  const reveal=t*t*(3-2*t);
  b.style.setProperty('--reveal',reveal.toFixed(4));
  b.setAttribute('aria-hidden',String(reveal<=.01));b.classList.toggle('is-revealed',reveal>.1);b.tabIndex=reveal>.1?0:-1;
 });

};
addEventListener('message',e=>{if(e.source!==document.querySelector('#hf-liveapp')?.contentWindow||e.origin!==location.origin)return;if(e.data?.diskyReady){ready=true;send()}});
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
// Restore the selected demonstration after reload/back navigation in the rail.
window.diskyTourProgress(Math.max(0,Math.min(1,-rail.getBoundingClientRect().top/Math.max(1,innerHeight*4))));

document.addEventListener('visibilitychange',()=>host.classList.toggle('is-playing',progress>=.22&&!document.hidden));

// Same visible canvas feeds Hana; reuse the site's existing animation loop.
let artPhase=0,artLast=0,paintLast=-Infinity;
const satin=document.createElement('canvas'),satinCtx=satin.getContext('2d');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const strip=document.createElement('canvas');strip.width=256;strip.height=1;
 const sc=strip.getContext('2d'),g=sc.createLinearGradient(0,0,256,0);
 for(const [at,c] of [[0,'rgba(24,59,92,0)'],[.30,'rgba(30,80,130,.03)'],[.47,'rgba(64,131,177,.18)'],[.53,'rgba(118,192,230,.48)'],[.545,'rgba(194,233,252,.72)'],[.554,'rgba(66,130,177,.16)'],[.65,'rgba(26,62,102,.03)'],[1,'rgba(25,62,102,0)']])g.addColorStop(at,c);
 sc.fillStyle=g;sc.fillRect(0,0,256,1);

window.DiskyTourBackdrop=(visible,w,h,t)=>{
 const fade=Math.max(0,Math.min(1,(progress-.22)/.12));
 if(!fade||document.hidden){artLast=t;return}
 const resolution=1,sw=Math.ceil(w*resolution),sh=Math.ceil(h*resolution);
 const resized=satin.width!==sw||satin.height!==sh;
 const composite=()=>{
  visible.save();visible.globalAlpha=fade;visible.drawImage(satin,0,0,w,h);
  // Numbers are in the live scene, behind the original refracting panes.
  const bounds=visible.canvas.getBoundingClientRect();
  host.querySelectorAll('button').forEach((b,i)=>{
   const r=b.getBoundingClientRect(),reveal=Number(b.style.getPropertyValue('--reveal'))||0;
   const previous=i>1?host.querySelectorAll('button')[i-2].getBoundingClientRect():null;
   const room=previous?Math.max(20,r.top-previous.bottom-6):1000;
   const size=Math.min(innerWidth<=600?42:110,r.width*.44,room/ .55),x=r.left-bounds.left+r.width*(i%2?.02:.98);
   visible.font=`400 ${size}px "Epic Pro"`;visible.textAlign='center';visible.textBaseline='alphabetic';
   const metrics=visible.measureText(String(i+1)),height=metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent;
   const y=r.top-bounds.top+height*.30-metrics.actualBoundingBoxDescent;
   const ink=visible.createLinearGradient(0,y-size,0,y+size*.2);ink.addColorStop(0,'rgba(244,250,255,.95)');ink.addColorStop(1,'rgba(215,235,250,.32)');
   visible.globalAlpha=fade*reveal;visible.fillStyle=ink;visible.fillText(String(i+1),x,y);
  });visible.restore();
 };
 if(!resized&&t-paintLast<32){composite();return}
 if(resized){satin.width=sw;satin.height=sh}
 paintLast=t;const ctx=satinCtx;
 const dt=Math.min(50,t-(artLast||t));artLast=t;if(!reduced.matches)artPhase+=dt/1000;
 ctx.save();ctx.scale(resolution,resolution);ctx.fillStyle='#080b10';ctx.fillRect(0,0,w,h);
 const drift=Math.sin(artPhase*.11)*.035;
 for(const [x,y,r,color] of [[.12,.42,.42,'31,115,152'],[.88,.64,.44,'37,89,139']]){const g=ctx.createRadialGradient(w*x,h*y,0,w*x,h*y,w*r);g.addColorStop(0,`rgba(${color},.19)`);g.addColorStop(1,`rgba(${color},0)`);ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
 for(let side=0;side<2;side++){
 const x=w*(side?.93:.07),dir=side?-1:1;
 const path=()=>{ctx.beginPath();ctx.moveTo(x-dir*w*.2,-h*.25);ctx.bezierCurveTo(x+dir*w*(.37+drift),h*.05,x-dir*w*.1,h*.58,x+dir*w*.13,h*1.2)};
 // A continuous cross-section follows the ribbon curve. No blur or contour stack.
 for(let y=0;y<h;y+=2){const u=(y/h+.25)/1.45,v=1-u;
 const center=v*v*v*(x-dir*w*.2)+3*v*v*u*(x+dir*w*(.37+drift))+3*v*u*u*(x-dir*w*.1)+u*u*u*(x+dir*w*.13);
 ctx.drawImage(strip,center-w*.13,y,w*.26,2);
 }

 }
 ctx.restore();composite();animateFeatureArt(artPhase);
};

const demoFrame=document.querySelector('#hf-liveapp');
function syncDemo(){demoFrame?.contentWindow.postMessage({diskyReadyRequest:true},location.origin)}
demoFrame?.addEventListener('load',syncDemo);syncDemo();
