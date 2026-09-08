// Original app Storage Map presentation. Browser data adapter is separate.
function buildTree(files, rootName){
  const root={name:rootName,size:0,children:{},isFile:false};
  for(const f of files){
    const parts=f.relPath.split("/");
    root.size+=f.size||0;
    let node=root;
    for(let i=0;i<parts.length;i++){
      const nm=parts[i];
      if(!node.children[nm]) node.children[nm]={name:nm,size:0,children:{},isFile:(i===parts.length-1)};
      node=node.children[nm];
      node.size+=f.size||0;
    }
  }
  (function fin(n){ n.childArr=Object.values(n.children).sort((a,b)=>b.size-a.size);
    n.children=null; n.childArr.forEach(fin); })(root);
  return root;
}

function arcPath(cx,cy,r0,r1,a0,a1){
  const P=(r,a)=>[cx+r*Math.cos(a), cy+r*Math.sin(a)];
  const large=(a1-a0)>Math.PI?1:0;
  const [x0,y0]=P(r1,a0),[x1,y1]=P(r1,a1),[x2,y2]=P(r0,a1),[x3,y3]=P(r0,a0);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r1} ${r1} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} `+
         `L${x2.toFixed(2)} ${y2.toFixed(2)} A${r0} ${r0} 0 ${large} 0 ${x3.toFixed(2)} ${y3.toFixed(2)} Z`;
}

// Interne Platte: noch nicht katalogisiert → Platten-Detailseite (Belegung + Scan-Aufforderung) statt Home.
let _mapCoverflowStop=()=>{};
function initMapCoverflow(drives){
  _mapCoverflowStop();
  const root=app.querySelector('.map-coverflow'),frame=root.querySelector('.map-cf-frame'),cards=[...root.querySelectorAll('.map-cf-card')];
  const abort=new AbortController(),signal=abort.signal;
  let pos=Math.max(0,drives.findIndex(d=>d.id===mapDriveId)),target=pos,raf=0,drag=null,wheelTimer=0,width=cards[0].offsetWidth,alive=true,infoSeq=0;
  const clamp=x=>Math.max(0,Math.min(drives.length-1,x));
  function paint(){cards.forEach((c,i)=>{const off=i-pos,dist=Math.abs(off);
    c.style.transform=`translateX(calc(-50% + ${off*width*.94}px)) scale(${1/(1+.12*dist)})`;
    // Artwork only: previous 1.10 emphasis × 1.15, smoothly handed to the center.
    const focus=Math.max(0,1-dist);
    c.firstElementChild.style.transform=`scale(${1+.265*focus*focus*(3-2*focus)})`;
    c.style.opacity="1";c.style.zIndex=String(100-Math.round(dist));c.style.visibility=dist>5?'hidden':'visible';
    c.setAttribute('aria-current',String(i===target));
  });root.querySelector('.map-cf-count').textContent=`${target+1} / ${drives.length}`;
    root.querySelector('[data-step="-1"]').disabled=target===0;root.querySelector('[data-step="1"]').disabled=target===drives.length-1;
  }
  function capacityInfo(d,vol){
    const el=root.querySelector('.map-cf-info');
    const cap=Number(vol?.totalBytes||d.capacityBytes||0);
    const live=vol?.usedBytes!=null,recorded=d.scanUsedBytes!=null;
    const used=Math.max(0,Number(live?vol.usedBytes:recorded?d.scanUsedBytes:d.bytes||0));
    const pct=cap>0?Math.min(100,100*used/cap):0;
    const approximate=!live&&!recorded?'≈ ':'';
    const label=cap>0?`${approximate}${human(used)} / ${human(cap)}`:_bwL('Kapazität unbekannt','Capacity unavailable');
    const hint=live?_bwL('Aktuelle Belegung','Current usage'):recorded?_bwL('Belegung beim letzten Scan','Usage at last scan'):_bwL('Geschätzt aus dem Katalog','Estimated from catalog');
    const signature=JSON.stringify([d.id,cap,used,hint]);
    if(el.dataset.capacitySignature===signature)return;
    el.dataset.capacitySignature=signature;
    el.innerHTML=`<div class="map-capacity" title="${esc(hint)}"><div class="map-capacity-track" role="meter" aria-label="${esc(hint)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}" aria-valuetext="${esc(label)}"><i style="width:${pct}%"></i></div><span>${esc(label)}</span></div>`;
  }
  async function info(){const seq=++infoSeq,d=drives[target],infoEl=root.querySelector(".map-cf-info");if(infoEl.dataset.drive!==String(d.id)){capacityInfo(d,null);infoEl.dataset.drive=String(d.id);}
    try{const vols=await getVolumes();if(!alive||seq!==infoSeq||!root.isConnected)return;
      const on=buildOnline(vols);
      cards.forEach((c,i)=>{const connected=!!driveOnline(drives[i],on);c.classList.toggle('drive-connected',connected);c.title=drives[i].label+' · '+_bwL(connected?'Angeschlossen':'Nicht angeschlossen',connected?'Connected':'Not connected');});
      const vol=driveOnline(d,on)?(d.driveType==='mac'?vols.find(v=>v.internal):liveVolFor(d,vols)):null;
      capacityInfo(d,vol);
    }catch(e){if(alive)cards.forEach(c=>c.classList.remove('drive-connected'));}
  }
  function select(index){clearTimeout(wheelTimer);target=clamp(Math.round(index));cancelAnimationFrame(raf);info();
    const d=drives[target];if(d.id!==mapDriveId){mapDriveId=d.id;mapStack=[];mapTree=null;document.getElementById('mapInfo').textContent='';_bg(buildAndDraw());_bg(fillMapInfo(d));}
    let last=performance.now();function step(now){if(!alive||!root.isConnected)return;const dt=Math.min(40,now-last);last=now;pos+=(target-pos)*(1-Math.pow(.84,dt/(1000/60)));if(Math.abs(target-pos)<.0004)pos=target;paint();if(pos!==target)raf=requestAnimationFrame(step);}
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){pos=target;paint();}else raf=requestAnimationFrame(step);
  }
  frame.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?0:e.key==='End'?drives.length-1:target+(e.key==='ArrowRight'?1:-1));}},{signal});
  root.querySelectorAll('[data-step]').forEach(b=>{b.addEventListener('click',()=>select(target+Number(b.dataset.step)),{signal});if(b.dataset.step==='-1')b.style.transform='rotate(180deg)';});
  cards.forEach((card,index)=>card.addEventListener('click',e=>{if(e.detail===0)select(index);},{signal}));
  frame.addEventListener('pointerdown',e=>{if(e.button!==0)return;clearTimeout(wheelTimer);cancelAnimationFrame(raf);drag={id:e.pointerId,x:e.clientX,pos,moved:false,card:e.target.closest('[data-md]')};frame.setPointerCapture(e.pointerId);},{signal});
  frame.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>5)drag.moved=true;if(drag.moved){pos=clamp(drag.pos-dx/(width*.94));paint();}},{signal});
  function end(e){if(!drag||drag.id!==e.pointerId)return;const d=drag;drag=null;if(frame.hasPointerCapture(e.pointerId))frame.releasePointerCapture(e.pointerId);select(d.moved?pos:d.card?cards.indexOf(d.card):target);}
  frame.addEventListener('pointerup',end,{signal});frame.addEventListener('pointercancel',()=>{drag=null;select(target);},{signal});
  // Trackpad: follow horizontal pixels directly, including native momentum;
  // only commit the heavy map update once the gesture settles.
  root.addEventListener('wheel',e=>{
    if(e.ctrlKey || drag || !width || drives.length<2)return;
    const horizontal=e.shiftKey && Math.abs(e.deltaX)<.01 ? e.deltaY : e.deltaX;
    if(Math.abs(horizontal)<.01 || (!e.shiftKey && Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;
    e.preventDefault();cancelAnimationFrame(raf);clearTimeout(wheelTimer);
    const unit=e.deltaMode===1?16:e.deltaMode===2?frame.clientWidth:1;
    pos=clamp(pos+horizontal*unit/(width*.94));paint();
    wheelTimer=setTimeout(()=>{if(alive&&root.isConnected)select(pos);},150);
  },{signal,passive:false});
  const ro=new ResizeObserver(()=>{width=cards[0].offsetWidth;paint();});ro.observe(frame);
  const statusTimer=setInterval(()=>{if(alive&&root.isConnected&&!document.hidden)info();},2500);
  _mapCoverflowStop=()=>{alive=false;clearInterval(statusTimer);clearTimeout(wheelTimer);cancelAnimationFrame(raf);ro.disconnect();abort.abort();};paint();info();
}
async function renderMap(){ const _rt=VS.rt;   /* S9: Token dieses Aufbaus */
  const drives=await getAll("drives");
   /* Wechsel-Schutz: waehrend des awaits kann der Nutzer weiternavigiert sein.
      Ohne diese Zeile schreibt der verspaetete Aufbau in das #app der INZWISCHEN
      offenen Ansicht — Navigation sagt X, Inhalt ist Y. Und weil manche Ansichten
      zwischengespeichert werden, wird der falsche Inhalt danach auch noch
      aufgehoben und kommt bei jedem Besuch wieder. */
  if(_rt!==VS.rt) return;   /* S9: Token statt Name */
  if(mapDriveId==="internal"){
    let iv=null; if(window.diskyNative?.listVolumes){ try{ iv=(await getVolumes()).find(v=>v.internal)||null; }catch(e){} }
    if(_rt!==VS.rt) return;   /* S9: Token statt Name */
    const cat=drives.find(d=>d.driveType==="mac" || (iv && (d.volumeName===iv.volumeName||d.label===iv.volumeName||d.label===iv.name)));
    if(cat){ mapDriveId=cat.id; mapStack=[]; mapTree=null; }   // katalogisiert → echte Karte unten
    else return scanInternalDrive(iv);                         // sonst SOFORT scannen → danach Karte
  }
  if(mapDriveId==="_uncat" && _uncatVol){
    const v=_uncatVol;
    const d=(v.volumeUUID && drives.find(x=>x.volumeUUID===v.volumeUUID)) || drives.find(x=>!x.volumeUUID && (x.volumeName===v.volumeName||x.label===(v.volumeName||v.name)));
    if(d){ mapDriveId=d.id; _uncatVol=null; mapStack=[]; mapTree=null; }   // inzwischen katalogisiert -> echte Karte
    else return renderUncatDrivePage(v);
  }
  if(!drives.length){ app.innerHTML=emptyState(); return; }
  if(mapDriveId===null || !drives.find(d=>d.id===mapDriveId)){ mapDriveId=drives[0].id; mapStack=[]; mapTree=null; }
  // Platten-Umschalter — macht klar, dass die Karte für JEDE Platte da ist (nicht nur die angeklickte)
  const ordered=[...drives].sort((a,b)=>(b.driveType==="mac"?1:0)-(a.driveType==="mac"?1:0));
  const switcher = `<section class="map-coverflow" aria-label="${_bwL('Laufwerksauswahl','Drive selection')}" aria-roledescription="carousel">
    <div class="map-cf-frame" tabindex="0" aria-label="${_bwL('Mit Pfeiltasten oder Ziehen die Platte wechseln','Use arrow keys or drag to select a drive')}"><div class="map-cf-stage">${ordered.map(d=>`<button class="map-cf-card" data-md="${d.id}" tabindex="-1" aria-label="${esc(d.label)}"><span class="map-cf-icon">${mapDriveRender(d)}</span><span class="map-cf-name">${esc(d.label)}</span></button>`).join('')}</div></div>
    <div class="map-cf-nav"><button data-step="-1" aria-label="${_bwL('Vorherige Platte','Previous drive')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 5 7 7-7 7"/></svg></button><span class="map-cf-count"></span><button data-step="1" aria-label="${_bwL('Nächste Platte','Next drive')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 5 7 7-7 7"/></svg></button></div>
    <div class="map-cf-info" aria-live="polite"></div></section>`;
  app.innerHTML=`
    ${switcher}
    <div class="maptop">
      <div id="crumbs" class="crumbs"></div>
      <div id="mapInfo" class="mapinfo"></div>
    </div>
    <div class="sunwrap">
      <div class="sunsvg"><svg id="sun" viewBox="0 0 520 520"></svg>
        <div class="suncenter" id="suncenter"></div></div>
      <div class="legend" id="legend"></div>
    </div>`;
  initMapCoverflow(ordered);
  /* AWAITED: der Vorhang fällt erst, wenn das Rad wirklich gezeichnet ist.
     Unawaited settlete renderMap schon mit dem leeren Gerüst — die Karte
     wurde ein Bild VOR dem Sunburst aufgedeckt, und weil die Sparsam-Regel
     die Entfaltung auf 1 ms prügelte, stand das Rad 1 Frame eingezogen und
     sprang dann komplett auf (Luis' Video). */
  await buildAndDraw();
  { const _fiP=fillMapInfo(drives.find(d=>d.id===mapDriveId)); if(VS.gen && VS.gen.phase==="covered" && _rt===VS.rt) VS.gen.warte(_fiP); }   /* S11 */
}
function drawSun(){
  const focus=mapStack[mapStack.length-1];
  const svg=document.getElementById("sun"); if(!svg) return;
  const CX=260,CY=260,R0=66,RING=40,MAXRING=4,MINANG=0.013,OFF=-Math.PI/2;
  const paths=[];
  function layout(node,a0,a1,depth,hue,rootIdx){
    if(depth>0 && depth<=MAXRING && (a1-a0)>=MINANG){
      const r0=R0+(depth-1)*RING, r1=r0+RING;
      const sat=Math.max(48,66-depth*3), li=Math.min(67,48+depth*5);
      paths.push({d:arcPath(CX,CY,r0,r1,a0+OFF,a1+OFF),col:`hsl(${hue} ${sat}% ${li}%)`,node,rootIdx});
    }
    if(depth>=MAXRING) return;
    const tot=node.size||1; let a=a0;
    /* Große Kinder kompakt hintereinander — Kleinkram wird zu EINEM Rest-Bogen gebündelt,
       damit der Kreis nach jedem Re-Root voll ist (statt 92 % unsichtbarer Lücken). */
    const kids=node.childArr.map((c,idx)=>({c,idx,span:(a1-a0)*((c.size||0)/tot)}));
    let restSpan=0, restBytes=0, restN=0;
    kids.forEach(k=>{ if(k.span<MINANG){ restSpan+=k.span; restBytes+=(k.c.size||0); restN++; } });
    kids.filter(k=>k.span>=MINANG).forEach(k=>{
      layout(k.c,a,a+k.span,depth+1, depth===0?SUN_HUES[k.idx%SUN_HUES.length]:hue, depth===0?k.idx:rootIdx);
      a+=k.span; });
    /* Rest-Sektor NUR im innersten Ring — entspricht der „N kleinere"-Zeile der Legende.
       Äußere Ringe lassen normale Lücken (Standard-Sunburst-Lesart: Rest des Ordners). */
    if(depth===0 && restSpan>0.01 && restN>0){ const r0=R0, r1=r0+RING;
      paths.push({d:arcPath(CX,CY,r0,r1,a+OFF,a+restSpan+OFF),col:"rgba(140,160,195,.14)",
        node:{label:restN+" "+(window.lang!=="en"?"kleinere":"smaller"),size:restBytes,isFile:true,childArr:[]},rootIdx:-1,rest:true}); }
  }
  layout(focus,0,Math.PI*2,0,0,-1);
  const up=mapStack.length>1;
  svg.innerHTML=`<g id="sungrp">`+
    paths.map((p,i)=>`<path d="${p.d}" fill="${p.col}" data-i="${i}" class="seg"/>`).join("")+
    `<circle cx="${CX}" cy="${CY}" r="${R0-4}" class="upbtn" fill="${up?'rgba(255,255,255,.03)':'transparent'}" style="cursor:${up?'pointer':'default'}"/>`+
    `</g>`;
  updateCenter(focus);
  drawLegend(focus);
  drawCrumbs();
  svg.querySelectorAll(".seg").forEach(el=>{
    const p=paths[+el.dataset.i];
    el.onmouseenter=()=>{ updateCenter(p.node,focus); el.classList.add("hot"); };
    el.onmouseleave=()=>{ updateCenter(focus); el.classList.remove("hot"); };
    el.onclick=()=>{ if(!p.node.isFile && p.node.childArr.length){ mapStack.push(p.node); drawSun(); } };
  });
  const upc=svg.querySelector(".upbtn");
  if(up) upc.onclick=()=>{ mapStack.pop(); drawSun(); };
  // Hover ueber eine Legenden-Zeile -> zugehoerige Sunburst-Scheibe hervorheben (Slice = alle Wedges mit gleichem rootIdx)
  const _grp=svg.querySelector("#sungrp"), _segs=[...svg.querySelectorAll(".seg")], _lg=document.getElementById("legend");
  if(_lg) _lg.querySelectorAll(".leg[data-name]").forEach((el,idx)=>{
    el.addEventListener("mouseenter",()=>{ if(_grp)_grp.classList.add("legdim"); for(const s of _segs) if(paths[+s.dataset.i].rootIdx===idx) s.classList.add("leghot"); });
    el.addEventListener("mouseleave",()=>{ if(_grp)_grp.classList.remove("legdim"); for(const s of _segs) s.classList.remove("leghot"); });
  });
}

function updateCenter(node,focus){
  const c=document.getElementById("suncenter"); if(!c) return;
  const f=focus||node;
  const pct=f.size?Math.round(100*node.size/f.size):100;
  const _cnm=node.agg ? _bwL(`${nloc(node.count)} kleinere Dateien`,`${nloc(node.count)} smaller files`) : node.name;
  c.innerHTML=`<div class="cname">${esc(_cnm)}</div>
    <div class="csize">${human(node.size)}</div>
    <div class="cpct">${node===f?(node===mapTree?(lang==="en"?"total":"gesamt"):"100%"):pct+"%"}</div>`;
}

function drawLegend(focus){
  const lg=document.getElementById("legend"); if(!lg) return;
  const n=focus.childArr.length, items=focus.childArr.slice(0,16), rest=focus.childArr.slice(16);
  const restSize=rest.reduce((s,c)=>s+c.size,0);
  const _thPrefix=mapStack.slice(1).map(n=>n.name).join("/");   // relPath-Präfix des Fokus-Ordners (für Datei-Thumbs)
  let html=items.map((c,idx)=>{
    const hue=SUN_HUES[idx%SUN_HUES.length];
    const pct=focus.size?Math.round(100*c.size/focus.size):0;
    const nav=(!c.isFile && c.childArr.length), rev=(c.isFile && !c.agg && _mapMount);
    const cls=(c.isFile?'file ':'')+(nav?'nav ':'')+(rev?'rev ':'');
    const nm=c.agg ? _bwL(`${nloc(c.count)} kleinere Dateien`,`${nloc(c.count)} smaller files`) : c.name;
    const wolke = c.isFile ? null : cloudInfo(c.name, c.path||c.relPath||c.name);
    const wTitel = wolke ? _bwL(
        `${wolke.n}: verknüpfte Wolke. Was hier liegt, gehört zu deinem ${wolke.n}-Konto — je nach Einstellung ist es nur ein Spiegel und belegt lokal weniger.`,
        `${wolke.n}: linked cloud. What sits here belongs to your ${wolke.n} account — depending on its settings it is only a mirror and takes less space locally.`) : "";
    return `<div class="leg ${cls}${wolke?" cloud":""}" data-name="${esc(c.name)}" style="animation-delay:${(idx*0.028).toFixed(3)}s;--ld:${(idx*0.028).toFixed(3)}s"${rev?` title="${t("cf_reveal_t")}"`:''}>
      <span class="ldot" style="background:${wolke?"#7FB3FF":`hsl(${hue} 60% 56%)`}"></span>
      <span class="lname">${c.isFile?((a=>a?`<span class="lth"${a}>${IC.file}</span>`:IC.file)(c.agg?"":thAttrs(mapDriveId,_thPrefix?_thPrefix+"/"+c.name:c.name,c.size,_mapMount))):(wolke?IC_CLOUD:IC.folder)}${esc(nm)}${wolke?`<span class="lcloud" title="${esc(wTitel)}">${esc(wolke.n)}</span>`:""}</span>
      ${rev?`<span class="lrev">${IC.reveal}</span>`:""}
      <span class="lpct">${pct}%</span><span class="lsize">${human(c.size)}</span></div>`;
  }).join("");
  if(rest.length) html+=`<div class="leg muted"><span class="ldot" style="background:#4a5160"></span>
    <span class="lname">${t("leg_smaller",rest.length)}</span>
    <span class="lpct">${focus.size?Math.round(100*restSize/focus.size):0}%</span>
    <span class="lsize">${human(restSize)}</span></div>`;
  const canUp=mapStack.length>1;
  const backBtn=canUp?`<button class="legback" type="button" aria-label="${esc(t("leg_back"))}" title="${esc(t("leg_back"))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>`:'';
  lg.innerHTML=`<div class="legtitle">${backBtn}<span>${t("leg_content_of",esc(focus.name))}</span></div>`+
    (focus.childArr.length?html:`<div class="muted" style="padding:8px">${t("leg_empty")}</div>`);
  { const lb=lg.querySelector(".legback"); if(lb) lb.onclick=()=>{ if(mapStack.length>1){ mapStack.pop(); drawSun(); } }; }   // Zurück-Pfeil über der Liste → eine Ebene hoch
  const relOf=child=>{ const prefix=mapStack.slice(1).map(n=>n.name).join("/"); return prefix?prefix+"/"+child.name:child.name; };
  const fullOf=child=> _mapMount ? _mapMount.replace(/\/$/,"")+"/"+relOf(child) : null;
  const legFlash=(el,cls)=>{ el.classList.remove("lg-ok","lg-no"); void el.offsetWidth; el.classList.add(cls); setTimeout(()=>el.classList.remove(cls),760); };
  lg.querySelectorAll(".leg[data-name]").forEach(el=>{
    const child=focus.childArr.find(c=>c.name===el.dataset.name);
    el.onclick=()=>{ if(!child) return;
      if(!child.isFile && child.childArr.length){ mapStack.push(child); drawSun(); return; }
      if(child.isFile){
        if(_mapMount){ legFlash(el,"lg-ok"); try{ revealHonest(fullOf(child)); }catch(e){} }
        else { legFlash(el,"lg-no"); toast(t("map_need_mount")); }
      }
    };
    el.oncontextmenu=ev=>{ if(!child) return; const isFolder=!child.isFile && child.childArr.length, full=fullOf(child), rel=relOf(child);
      const items=[];
      if(isFolder){ items.push({label:t("ctx_open_map"),ic:IC.layers,on:()=>{ mapStack.push(child); drawSun(); }});
        items.push(full?{label:t("ctx_reveal_folder"),ic:IC.reveal,on:()=>revealHonest(full)}:{label:t("ctx_offline"),ic:IC.reveal,disabled:true}); }
      else { items.push(full?{label:t("ctx_reveal_file"),ic:IC.reveal,on:()=>revealHonest(full)}:{label:t("ctx_offline"),ic:IC.reveal,disabled:true}); }
      items.push("sep");
      items.push({label:t("ctx_copy_path"),ic:IC.copy,on:()=>copyText(full||rel)});
      items.push({label:t("ctx_copy_name"),ic:IC.copy,on:()=>copyText(child.name)});
      showCtx(ev, items, child.name);
    };
  });
  try{ thumbLazy(lg); }catch(e){}
}

function drawCrumbs(){
  const el=document.getElementById("crumbs"); if(!el) return;
  el.innerHTML=mapStack.map((n,i)=>`<span class="crumb" data-i="${i}" title="${esc(n.name)}">${esc(n.name)}</span>`)
    .join('<span class="csep">›</span>');
  el.querySelectorAll(".crumb").forEach(c=>c.onclick=()=>{ mapStack=mapStack.slice(0,+c.dataset.i+1); drawSun(); });
}

