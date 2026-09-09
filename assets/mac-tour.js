import {discovery,storage,duplicates,phoneTransfer,animateFeatureArt} from './tour-art/feature-art.js?v=polish-12';
import {attachLiveTourGlass} from './live-tour-glass.js?v=polish-12';
const rail=document.querySelector('#hf-rail'),host=document.createElement('nav');
host.className='hf-tour-cards';host.setAttribute('aria-label','App feature demonstrations');
const views=['search','map','dupes','iphone'],stations=[.40,.57,.73,.88];
const names=['Deep Search','Storage Map','Duplicate Finder','iPhone Sync'];
const motifs=[discovery,storage,duplicates,phoneTransfer];
function art(i){return motifs[i].replaceAll('/web/assets/',new URL('./',import.meta.url).href).replace(/id="([^"]+)"/g,(_,id)=>`id="tour-${i}-${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#tour-${i}-${id})`).replace(/href="#([^"]+)"/g,(_,id)=>`href="#tour-${i}-${id}"`)}
const copy={en:[['There it is.','Find the file you thought you’d lost. Even on unplugged drives.'],['See what eats your space.','Spot the biggest folders. Follow them down to the file.'],['Different names. Same file.','Find identical copies across your drives. Compare them and choose what stays.'],['Your memories. Your drive.','Bring your iPhone photos and videos home. Keep original quality, choose your folders and skip what’s already saved.']],de:[['Da ist sie ja.','Finde die Datei, die du längst verloren glaubtest. Auch auf nicht angeschlossenen Platten.'],['Entlarve die Platzfresser.','Erkenne die größten Ordner. Folge ihnen bis zur einzelnen Datei.'],['Andere Namen. Dieselbe Datei.','Finde identische Kopien auf deinen Platten. Vergleiche sie und entscheide, was bleibt.'],['Deine Erinnerungen. Deine Platte.','Hol deine iPhone-Fotos und Videos auf deine eigene Platte. In Originalqualität, mit deiner Ordnerstruktur. Bereits Gesichertes wird übersprungen.']]};
let disposers=[],chosen=-1,timer,progress=0,ready=false;
const nearest=p=>stations.reduce((best,s,i)=>p>=s-.02?i:best,-1);
const send=()=>{if(chosen>=0)document.querySelector('#hf-liveapp')?.contentWindow.postMessage({diskyStep:views[chosen]},location.origin)};
function go(i){const top=scrollY+rail.getBoundingClientRect().top,span=rail.offsetHeight-innerHeight;if(chosen===i&&progress>=.38)send();scrollTo({top:top+span*stations[i],behavior:'smooth'})}
function labels(){const de=document.documentElement.lang==='de';const cap=document.querySelector('#hf-cap2');cap.querySelector('[data-t=hero_cap2]').textContent=de?'Dein Archiv. In Aktion.':'Your archive. In action.';cap.querySelector('.hf-cap2sub').textContent=de?'Vier Werkzeuge. Echte App-Oberfläche. Scrolle weiter oder wähle eine Karte für die Vorführung.':'Four tools. The real app interface. Scroll or choose a card to watch it work.';disposers.forEach(f=>f());const c=copy[document.documentElement.lang==='de'?'de':'en'];host.innerHTML=views.map((v,i)=>`<button type="button" class="hf-tour-card" data-view="${v}" aria-current="${i===chosen}" aria-label="${names[i]}: ${c[i][0]}"><span class="tour-art" aria-hidden="true">${art(i)}</span><span class="tour-card-head"><small>0${i+1} / ${names[i]}</small><span class="tour-arrow" aria-hidden="true">↗</span></span><strong>${c[i][0]}</strong><p>${c[i][1]}</p></button>`).join('');host.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>go(i));const live=attachLiveTourGlass(host);window.DiskyWebsiteGlass=live;disposers=[()=>live.dispose()]}
document.querySelector('#hf-mac').parentElement.append(host);labels();
// Anchor lands at the first feature, without replaying the introductory scan.
const anchor=document.createElement('span');anchor.id='features';anchor.style.cssText='position:absolute;top:32%;pointer-events:none';rail.append(anchor);
document.querySelectorAll('a[href="#features"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(0)}));
window.diskyTourProgress=p=>{
 progress=p;
 const active=p>=.32;
 host.classList.toggle('is-visible',active);
 host.classList.toggle('is-playing',active&&!document.hidden);
 host.querySelectorAll('button').forEach((b,i)=>{
  const t=Math.max(0,Math.min(1,(p-.32)/.07));
  const reveal=t*t*(3-2*t);
  b.style.setProperty('--reveal',reveal.toFixed(4));
  b.setAttribute('aria-hidden',String(reveal<=.01));b.classList.toggle('is-revealed',reveal>.1);b.tabIndex=reveal>.1?0:-1;
 });
 const next=nearest(p);
 if(next===chosen)return;
 clearTimeout(timer);chosen=next;
 host.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-current',String(i===next)));
 if(next>=0)timer=setTimeout(()=>{if(chosen===next)send()},290);
};
addEventListener('message',e=>{if(e.source!==document.querySelector('#hf-liveapp')?.contentWindow||e.origin!==location.origin)return;if(e.data?.diskyReady){ready=true;send()}});
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
// Restore the selected demonstration after reload/back navigation in the rail.
window.diskyTourProgress(Math.max(0,Math.min(1,-rail.getBoundingClientRect().top/Math.max(1,rail.offsetHeight-innerHeight))));

document.addEventListener('visibilitychange',()=>host.classList.toggle('is-playing',progress>=.38&&!document.hidden));

// Same visible canvas feeds Hana; reuse the site's existing animation loop.
let artPhase=0,artLast=0,paintLast=-Infinity;
const satin=document.createElement('canvas'),satinCtx=satin.getContext('2d');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
window.DiskyTourBackdrop=(visible,w,h,t)=>{
 const fade=Math.max(0,Math.min(1,(progress-.30)/.09));
 if(!fade||document.hidden){artLast=t;return}
 const resolution=.5,sw=Math.ceil(w*resolution),sh=Math.ceil(h*resolution);
 const resized=satin.width!==sw||satin.height!==sh;
 const composite=()=>{visible.save();visible.globalAlpha=fade;visible.drawImage(satin,0,0,w,h);visible.restore()};
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
 ctx.save();ctx.filter='blur(32px)';path();ctx.lineWidth=w*.085;const glow=ctx.createLinearGradient(0,0,w,h);glow.addColorStop(0,'rgba(110,182,222,.16)');glow.addColorStop(.5,'rgba(105,194,218,.24)');glow.addColorStop(1,'rgba(51,97,148,.04)');ctx.strokeStyle=glow;ctx.stroke();ctx.restore();
 }
 ctx.restore();composite();animateFeatureArt(artPhase);
};

const demoFrame=document.querySelector('#hf-liveapp');
function syncDemo(){demoFrame?.contentWindow.postMessage({diskyReadyRequest:true},location.origin)}
demoFrame?.addEventListener('load',syncDemo);syncDemo();
