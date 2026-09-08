// Browser-only sample data; gallery, cells and export sheet below are original app functions.
const ipT=(de,en)=>lang==='de'?de:en,ipHuman=human,ipElement=id=>document.getElementById(id);
const ipLivePage=()=>document.getElementById('ipmPage'),ipShell=html=>{if(ipLivePage())ipLivePage().innerHTML=html},ipWireHead=()=>{};
function ipHead(sub){return `<div class="ipm-topline"><span class="tl-dot"></span><span id="ipmStatus">${sub}</span></div>`}
const ipN=()=>({freeSpace:async()=>({ok:true,free:512e9})});
const ipList=()=>{},ipgOpenCleanup=()=>{},ipRenderSpaceWarn=()=>{},ipgOpenLb=()=>{},ipgCtxMenu=e=>e.preventDefault();
let _ipItems=[],_ipSummary={},_ipDevice='iPhone · Demo',_ipDest='/Volumes/T9/iPhone-Backup',_ipPick=new Set(),_ipFilter='all',_ipOnlyNew=false,_ipSorted=[],_ipRendered=0,_ipCellByName={},_ipgSec='',_ipgLast=null,_ipIO=null,_ipDateDays=0,_ipStreaming=false,_ipThumbMap={},_ipConv=false,_ipConvQ=.95,_ipScheme='dated',_ipLiveMode='pair';
function renderIphoneDemo(){
 _ipPick.clear();_ipFilter='all';_ipOnlyNew=false;_ipScheme='dated';_ipConv=false;
 _ipItems=Array.from({length:18},(_,i)=>({name:`IMG_${4000+i}.${i%5===0?'MOV':'HEIC'}`,kind:i%5===0?'video':i%4===0?'livephoto':'photo',size:i%5===0?120e6:4e6,date:'2026-09-05',new:i<12}));
 _ipSorted=_ipItems;_ipThumbMap={};_ipItems.forEach((it,i)=>_ipThumbMap[it.name]=ipDemoThumb(i,it.kind));
 _ipSummary={counts:{photo:11,livephoto:3,video:4},newBytes:384e6,savedBytes:144e6};
 app.innerHTML='<div class="ipm page" id="ipmPage"></div>';ipRenderGallery();
}
// No native import or filesystem access in a website demonstration.
function ipStartImport(){toast(ipT('Beispielvorführung · Originale bleiben erhalten','Sample demonstration · originals stay intact'))}

const IP_CATS=[{k:"photo",nm:"Fotos",g:"Bilder"},{k:"livephoto",nm:"Live Photos",g:"Bilder"},{k:"screenshot",nm:"Screenshots",g:"Bilder"},{k:"raw",nm:"RAW",g:"Bilder"},{k:"video",nm:"Videos",g:"Videos"}];
// Handgemachte Kategorie-Icons (Disky-Cyan, Apple-clean)
const IP_ICONS={
  photo:`<svg viewBox="0 0 24 24" fill="none" stroke="#37cfe0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.25" y="4.9" width="17.5" height="14.2" rx="3.5"/><circle cx="8.3" cy="9.5" r="1.55" fill="#37cfe0" stroke="none"/><path d="M3.9 17.6 L8.7 12.8 a1.25 1.25 0 0 1 1.77 0 L14.1 16.4 M12.9 15.2 L15.1 13 a1.25 1.25 0 0 1 1.77 0 L20.5 16.4"/></svg>`,
  livephoto:`<svg viewBox="0 0 24 24" fill="none" stroke="#37cfe0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5" fill="#37cfe0" stroke="none"/><circle cx="12" cy="12" r="7" stroke-dasharray="0.01 3.665" stroke-width="2"/></svg>`,
  screenshot:`<svg viewBox="0 0 24 24" fill="none" stroke="#37cfe0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="3" stroke-dasharray="3.1 2.5"/></svg>`,
  raw:`<svg viewBox="0 0 24 24" fill="none" stroke="#37cfe0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4.5"/><text x="12" y="16.5" font-family="-apple-system,SF Pro Display,Helvetica,Arial,sans-serif" font-size="11" font-weight="700" fill="#37cfe0" stroke="none" text-anchor="middle">R</text></svg>`,
  video:`<svg viewBox="0 0 24 24" fill="none" stroke="#37cfe0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.25" y="7.1" width="11.4" height="9.8" rx="2.8"/><path d="M14.65 10.5 L19.5 7.9 a0.72 0.72 0 0 1 1.06 0.63 V15.48 a0.72 0.72 0 0 1 -1.06 0.63 L14.65 13.5 Z"/></svg>`,
};

function ipDemoThumb(i,kind){
  const c=document.createElement("canvas"); c.width=c.height=320; const x=c.getContext("2d");
  const hues=[[214,72],[196,66],[230,62],[262,52],[184,58],[205,70]]; const [h,s]=hues[i%hues.length];
  const g=x.createLinearGradient(0,0,320,320); g.addColorStop(0,`hsl(${h} ${s}% 64%)`); g.addColorStop(1,`hsl(${h+26} ${s}% 28%)`);
  x.fillStyle=g; x.fillRect(0,0,320,320);
  x.fillStyle="rgba(255,255,255,.9)"; x.beginPath(); x.arc(236-(i%3)*44,82,24,0,7); x.fill();
  x.fillStyle=`hsl(${h} ${s}% 20%)`; x.beginPath(); x.moveTo(0,320); x.lineTo(0,212+((i*37)%44));
  x.lineTo(112,138+((i*53)%64)); x.lineTo(206,236); x.lineTo(320,146+((i*29)%72)); x.lineTo(320,320); x.closePath(); x.fill();
  if(kind==="video"){ x.fillStyle="rgba(8,12,20,.55)"; x.beginPath(); x.arc(160,160,42,0,7); x.fill(); x.fillStyle="#fff"; x.beginPath(); x.moveTo(146,136); x.lineTo(186,160); x.lineTo(146,184); x.closePath(); x.fill(); }
  return c.toDataURL("image/jpeg",.82).split(",")[1];
}

function ipCatName(k){ const m={photo:["Fotos","Photos"],livephoto:["Live Photos","Live Photos"],screenshot:["Screenshots","Screenshots"],raw:["RAW","RAW"],video:["Videos","Videos"]}; return m[k]?ipT(m[k][0],m[k][1]):k; }
const IPG_CHUNK=240;
function ipPickStats(){ let n=0,bytes=0; for(const it of _ipItems){ if(_ipPick.has(it.name)){ n++; bytes+=it.size||0; } } return {n,bytes}; }
function ipgItems(){
  let cutoff="";
  if(_ipDateDays>0){ const d=new Date(Date.now()-_ipDateDays*86400000); cutoff=d.toISOString().slice(0,10); }
  return _ipSorted.filter(it=>it.kind!=="livevideo" && (_ipFilter==="all"||it.kind===_ipFilter) && (!_ipOnlyNew||it.new) && (!cutoff||String(it.date||"").slice(0,10)>=cutoff));
}
const IP_MONTHS_DE=["Januar","Februar","M\u00e4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const IP_MONTHS_EN=["January","February","March","April","May","June","July","August","September","October","November","December"];
function ipgSecLabel(it){ const s=String(it.date||"").slice(0,7); if(!/^\d{4}-\d{2}$/.test(s)) return ipT("Ohne Datum","No date"); const y=s.slice(0,4), m=parseInt(s.slice(5,7),10)-1; const M=(lang==="de"?IP_MONTHS_DE:IP_MONTHS_EN)[m]||""; return M+" "+y; }

function ipgCell(it){
  const d=document.createElement("div");
  d.className="ipg-c"+(_ipPick.has(it.name)?" sel":"")+(it.new?"":" dup");
  d.dataset.n=it.name;
  d.title=it.name+(it.date?" · "+dstr(new Date(it.date).getTime()):"")+(it.new?" · "+ipT("neu","new"):" · "+ipT("bereits exportiert — liegt im Zielordner","already exported — in the target folder"));
  const kb=it.kind==="video"?'<span class="kb">\u25b6</span>':it.kind==="livephoto"?'<span class="kb">\u25c9</span>':it.kind==="raw"?'<span class="kb">R</span>':it.kind==="screenshot"?'<span class="kb">\u2317</span>':"";
  d.innerHTML='<span class="ck">\u2713</span>'+(it.new?'<span class="nb">NEU</span>':'<span class="eb">\u2713 '+ipT("gesichert","saved")+'</span>')+kb;
  const jpg=_ipThumbMap[it.name];
  if(jpg){ const img=document.createElement("img"); img.loading="lazy"; img.src="data:image/jpeg;base64,"+jpg; d.prepend(img); }
  _ipCellByName[it.name]=d;
  d.onclick=(e)=>{
    const items=ipgItems();
    const i=items.indexOf(it);
    const willSel=!_ipPick.has(it.name);
    if(e.shiftKey && _ipgLast!=null && _ipgLast!==i){
      const [a,b2]=[Math.min(_ipgLast,i),Math.max(_ipgLast,i)];
      for(let j=a;j<=b2;j++){ const t=items[j]; if(!t) continue; if(willSel)_ipPick.add(t.name); else _ipPick.delete(t.name); }
      ipgResync();
    } else {
      if(willSel){ _ipPick.add(it.name); d.classList.add("sel"); } else { _ipPick.delete(it.name); d.classList.remove("sel"); }
      ipgUpdateBar();
    }
    _ipgLast=i;
  };
  d.ondblclick=(e)=>{ e.preventDefault(); ipgOpenLb(ipgItems().indexOf(it)); };
  d.oncontextmenu=(e)=>ipgCtxMenu(e,it);
  return d;
}

function ipgRenderChunk(reset){
  const grid=ipElement("ipgGrid"); if(!grid) return;
  const items=ipgItems();
  if(reset){ grid.innerHTML=""; _ipRendered=0; _ipCellByName={}; _ipgSec=""; _ipgLast=null; if(_ipIO){ _ipIO.disconnect(); _ipIO=null; } }
  const endI=Math.min(items.length,_ipRendered+IPG_CHUNK);
  const frag=document.createDocumentFragment();
  for(let i=_ipRendered;i<endI;i++){
    const sec=ipgSecLabel(items[i]);
    if(sec!==_ipgSec){ _ipgSec=sec; const h=document.createElement("div"); h.className="ipg-sec"; h.textContent=sec; frag.appendChild(h); }
    frag.appendChild(ipgCell(items[i]));
  }
  grid.appendChild(frag); _ipRendered=endI;
  const more=ipElement("ipgMore");
  const empty=ipElement("ipgEmpty");
  if(empty) empty.style.display=items.length?"none":"block";
  if(more){
    if(_ipRendered<items.length){
      if(!_ipIO){ _ipIO=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)) ipgRenderChunk(false); },{rootMargin:"1000px"}); _ipIO.observe(more); }
    } else if(_ipIO){ _ipIO.disconnect(); _ipIO=null; }
  }
}
function ipgResync(){ app.querySelectorAll("#ipmPage .ipg-c").forEach(c=>c.classList.toggle("sel",_ipPick.has(c.dataset.n))); ipgUpdateBar(); }
function ipgUpdateBar(){
  const s=ipPickStats(), go=ipElement("ipmGo"), info=ipElement("ipgSelInfo");
  if(info) info.textContent=s.n?(s.n.toLocaleString(lang==="en"?"en-US":"de-DE")+" "+ipT("ausgew\u00e4hlt","selected")+" \u00b7 "+ipHuman(s.bytes)):ipT("nichts ausgew\u00e4hlt","nothing selected");
  if(go){
    if(_ipStreaming){ go.disabled=true; go.textContent=ipT("Mediathek wird noch gelesen\u2026","still reading\u2026"); }
    else { const nn=s.n?s.n.toLocaleString(lang==="en"?"en-US":"de-DE"):"";
      /* Wortstellung je Sprache: „6.134 exportieren…" / "Export 6,134…" */
      go.textContent=s.n?ipT(`${nn} exportieren\u2026`,`Export ${nn}\u2026`):ipT("Exportieren\u2026","Export\u2026"); go.disabled=s.n===0; }
  }
  ipRenderSpaceWarn();
}

function ipgOpenExport(){
  const s=ipPickStats(); if(!s.n) return;
  ipElement("ipgExp")?.remove();
  const fmt=_ipConv?(_ipConvQ>=0.95?"jpg95":"jpg85"):"orig";
  const sheet=document.createElement("div"); sheet.id="ipgExp"; sheet.className="ipg-exp";
  sheet.innerHTML=`<div class="ipg-expc">
    <div class="xh">${ipT("Export","Export")}</div>
    <div class="xs">${s.n.toLocaleString(lang==="en"?"en-US":"de-DE")} ${ipT("Objekte","items")} \u00b7 ${ipHuman(s.bytes)}</div>
    <div class="xrow">
      <div class="xl">${ipT("Zielordner","Destination")}</div>
      <div class="ipm-folder" style="flex:1"><svg style="width:15px;height:15px;color:#DCEFFF;flex:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg><span class="fp" id="xDest">${esc(_ipDest||"\u2014")}</span><span class="ch" id="xChange">${ipT("\u00e4ndern","change")}</span></div>
    </div>
    <div class="xrow"><div class="xl">${ipT("Ordner-Schema","Folder scheme")}</div>
      <div class="xseg" id="xScheme"><button data-v="dated" class="${_ipScheme==="dated"?"on":""}">${ipT("Jahr / Monat","Year / Month")}</button><button data-v="type" class="${_ipScheme==="type"?"on":""}">${ipT("Nach Typ","By type")}</button><button data-v="flat" class="${_ipScheme==="flat"?"on":""}">${ipT("Ein Ordner","One folder")}</button></div></div>
    <div class="xhint${_ipScheme==="type"?" show":""}" id="xSchemeHint">${ipT("Getrennte Ordner","Separate folders")}: <b>Photos</b> · <b>Live Photos</b> · <b>Videos</b> · <b>Screenshots</b> · <b>RAW</b> · <b>Panoramas</b></div>
    <div class="xrow"><div class="xl">Live Photos</div>
      <div class="xseg" id="xLive"><button data-v="pair" class="${_ipLiveMode==="pair"?"on":""}">HEIC + MOV</button><button data-v="photo" class="${_ipLiveMode==="photo"?"on":""}">${ipT("nur Foto","photo only")}</button></div></div>
    <div class="xl" style="margin:14px 0 8px">${ipT("Format & Kompression","Format & compression")}</div>
    <div class="xcards">
      <div class="xcard ${fmt==="orig"?"on":""}" data-f="orig"><b>${ipT("Originale behalten","Keep originals")}</b><span>HEIC/HEVC \u00b7 ${ipT("verlustfrei, 1:1 vom iPhone","lossless, 1:1 from iPhone")}</span></div>
      <div class="xcard ${fmt==="jpg95"?"on":""}" data-f="jpg95"><b>HEIC \u2192 JPG \u00b7 95 %</b><span>${ipT("maximale Kompatibilit\u00e4t, beste Qualit\u00e4t \u00b7 EXIF/GPS bleiben","max compatibility, best quality \u00b7 keeps EXIF/GPS")}</span></div>
      <div class="xcard ${fmt==="jpg85"?"on":""}" data-f="jpg85"><b>HEIC \u2192 JPG \u00b7 85 %</b><span>${ipT("kleinere Dateien (~40 % weniger) \u00b7 EXIF/GPS bleiben","smaller files (~40 % less) \u00b7 keeps EXIF/GPS")}</span></div>
    </div>
    <div class="xnote">${ipT("Videos werden immer als Original \u00fcbertragen. Schon Vorhandenes wird \u00fcbersprungen (Resume-sicher).","Videos always transfer as originals. Existing files are skipped (resume-safe).")}</div>
    <div class="xspace" id="xSpace"></div>
    <div class="xfoot">
      <button class="ipm-btn ghost" id="xCancel">${ipT("Abbrechen","Cancel")}</button>
      <button class="ipm-btn primary" id="xGo">${s.n.toLocaleString(lang==="en"?"en-US":"de-DE")} ${ipT("exportieren","export")} \u00b7 ${ipHuman(s.bytes)}</button>
    </div></div>`;
  document.body.appendChild(sheet);
  sheet.addEventListener("pointerdown",e=>{ if(e.target===sheet) sheet.remove(); });
  { const segS=ipElement("xScheme"), hintEl=ipElement("xSchemeHint");
    segS.querySelectorAll("button").forEach(b=>b.onclick=()=>{ _ipScheme=b.dataset.v; segS.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b)); if(hintEl)hintEl.classList.toggle("show",_ipScheme==="type"); }); }
  ipElement("xLive").querySelectorAll("button").forEach(b=>b.onclick=()=>{ _ipLiveMode=b.dataset.v; ipElement("xLive").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b)); });
  sheet.querySelectorAll(".xcard").forEach(c=>c.onclick=()=>{
    sheet.querySelectorAll(".xcard").forEach(x=>x.classList.toggle("on",x===c));
    const f=c.dataset.f; _ipConv=f!=="orig"; _ipConvQ=f==="jpg85"?0.85:0.95;
  });
  ipElement("xChange").onclick=async()=>{ try{ const r=await ipN().pickFolder(); const pth=typeof r==="string"?r:(r&&r.path); if(pth){ _ipDest=pth; try{localStorage.setItem("disky_ip_dest",pth);}catch(e2){} ipElement("xDest").textContent=pth; ipgExpSpace(); } }catch(e){} };
  ipElement("xCancel").onclick=()=>sheet.remove();
  ipElement("xGo").onclick=()=>{ sheet.remove(); ipStartImport(); };
  ipgExpSpace();
}
async function ipgExpSpace(){
  const el=ipElement("xSpace"); if(!el) return;
  try{
    const r=await ipN().freeSpace?.(_ipDest); if(!r||!r.ok){ el.textContent=""; return; }
    const s=ipPickStats(); const tight=s.bytes*1.05>r.free;
    el.innerHTML=(tight?"\u26a0\ufe0f ":"\u2713 ")+ipT("Frei am Ziel","Free at destination")+": <b>"+ipHuman(r.free)+"</b> \u00b7 "+ipT("ben\u00f6tigt","needed")+": <b>"+ipHuman(s.bytes)+"</b>";
    el.style.color=tight?"#ffc39b":"#8fe3c0";
  }catch(e){ el.textContent=""; }
}

function ipRenderGallery(){
  if(!ipLivePage()) return;
  const total=_ipItems.filter(it=>it.kind!=="livevideo").length;
  const totalNew=_ipItems.filter(it=>it.new&&it.kind!=="livevideo").length;
  if(total===0 && !_ipStreaming){
    ipShell(ipHead(`\u201e${esc(_ipDevice)}\u201c \u00b7 ${ipT("verbunden","connected")}`)+`<div class="ipm-okwrap">
      <div class="ipm-okball stop">${IP_ICONS.photo}</div>
      <div class="big" style="font-size:17px;font-weight:800">${ipT("Keine Fotos oder Videos gefunden","No photos or videos found")}</div>
      <div class="sub2" style="max-width:420px;margin:6px auto 0;line-height:1.5">${ipT("Das passiert, wenn das iPhone beim Lesen gesperrt war \u2014 entsperrt lassen und erneut pr\u00fcfen.","This happens when the iPhone was locked while reading \u2014 keep it unlocked and check again.")}</div>
      <div style="margin-top:20px"><button class="ipm-btn primary" id="ipmRetry2">${ipT("Erneut pr\u00fcfen","Check again")}</button></div></div>`);
    ipWireHead(); ipElement("ipmRetry2").onclick=ipList; return;
  }
  const chips=[["all","Alle"]].concat(IP_CATS.map(c=>[c.k,c.nm]));
  const _nSaved=total-totalNew;
  const _sb=(_ipSummary&&_ipSummary.savedBytes)||0, _nb=(_ipSummary&&_ipSummary.newBytes)||0;
  ipShell(ipHead(_ipStreaming?`\u201e${esc(_ipDevice)}\u201c \u00b7 ${ipT("lese Mediathek\u2026","reading\u2026")} ${total.toLocaleString(lang==="en"?"en-US":"de-DE")} ${ipT("Objekte","items")}`:`\u201e${esc(_ipDevice)}\u201c \u00b7 ${ipT("verbunden","connected")} \u00b7 ${total.toLocaleString(lang==="en"?"en-US":"de-DE")} ${ipT("Objekte","items")} \u00b7 ${totalNew.toLocaleString(lang==="en"?"en-US":"de-DE")} ${ipT("neu","new")}${_nb?` (${ipHuman(_nb)})`:""}${_nSaved>0?` \u00b7 ${_nSaved.toLocaleString(lang==="en"?"en-US":"de-DE")} ${ipT("auf dem Mac \u2713","on your Mac \u2713")}${_sb?` (${ipHuman(_sb)})`:""}`:""}`)+`
    <div class="ipg-top">
      <div class="ipg-chips">${chips.map(([k,l])=>`<button class="ipg-chip${_ipFilter===k?" on":""}" data-f="${k}">${IP_ICONS[k]?`<span class="ci">${IP_ICONS[k]}</span>`:""}${k==="all"?ipT("Alle","All"):ipCatName(k)}${k!=="all"?` <i>${((((_ipSummary||{}).counts)||{})[k]||0).toLocaleString(lang==="en"?"en-US":"de-DE")}</i>`:""}</button>`).join("")}
        <button class="ipg-chip nw${_ipOnlyNew?" on":""}" id="ipgOnlyNew">${ipT("nur Neue","new only")}</button>
      </div>
    </div>
    <div class="ipg-bar">
      <span class="ipg-thprog" id="ipgThProg"></span>
      <div class="ipg-tools">
        <select class="ipg-sel" id="ipgDate">
          <option value="0">${ipT("Alle Zeiten","All time")}</option>
          <option value="30">${ipT("Letzte 30 Tage","Last 30 days")}</option>
          <option value="90">${ipT("Letzte 90 Tage","Last 90 days")}</option>
          <option value="365">${ipT("Letzte 12 Monate","Last 12 months")}</option>
        </select>
        <div class="ipg-seg">
          <button id="ipgPickEvery" title="${ipT("Alle Objekte ausw\u00e4hlen","Select every item")}">${ipT("Alle","All")}</button>
          <button id="ipgPickNew" title="${ipT("Nur neue Objekte ausw\u00e4hlen","Select new items only")}">${ipT("Neue","New")}</button>
          <button id="ipgPickAll" title="${ipT("Sichtbare zur Auswahl hinzuf\u00fcgen","Add visible to selection")}">${ipT("+ Sichtbare","+ Visible")}</button>
          <button id="ipgPickNone" title="${ipT("Auswahl leeren","Clear selection")}">${ipT("Keine","None")}</button>
        </div>
      </div>
    </div>
    <div class="ipm-warn" id="ipmWarn" style="display:none"></div>
    <div class="ipg-help">${ipT("Klick = ausw\u00e4hlen \u00b7 Shift-Klick = Bereich \u00b7 Doppelklick = gro\u00dfe Vorschau \u00b7 Rechtsklick = wo liegt das? \u2014 unten rechts startet der Import","Click = select \u00b7 Shift-click = range \u00b7 double-click = preview \u00b7 right-click = where is it saved? \u2014 start the import bottom right")}</div>
    <div class="ipg-grid" id="ipgGrid"></div>
    <div class="ipg-empty" id="ipgEmpty" style="display:none">${ipT("Nichts in dieser Ansicht \u2014 Filter oben anpassen.","Nothing in this view \u2014 adjust the filters above.")}</div>
    <div id="ipgMore" style="height:2px"></div>
    <div class="ipm-foot ipg-foot">
      <div class="ipm-folder"><svg style="width:15px;height:15px;color:#DCEFFF;flex:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg><span class="fp" title="${esc(_ipDest||"")}"><b>${ipT("Ziel","Target")}:</b> ${esc(_ipDest||"\u2014")}</span><span class="ch" id="ipmChange">${ipT("\u00e4ndern","change")}</span></div>
      <span class="ipg-selinfo" id="ipgSelInfo"></span>
      <button class="ipm-btn ghost" id="ipgClean" title="${ipT("Öffnet erst die Optionen — gelöscht wird nichts ohne deine Bestätigung im nächsten Schritt","Opens the options first — nothing is deleted without your confirmation in the next step")}">${ipT("iPhone freiräumen","Free up iPhone")} <span style="opacity:.65">›</span></button>
      <button class="ipm-btn primary" id="ipmGo"></button>
    </div>`);
  ipWireHead();
  app.querySelectorAll("#ipmPage .ipg-chip[data-f]").forEach(b=>b.onclick=()=>{ _ipFilter=b.dataset.f; app.querySelectorAll("#ipmPage .ipg-chip[data-f]").forEach(x=>x.classList.toggle("on",x===b)); ipgRenderChunk(true); });
  const on=ipElement("ipgOnlyNew"); on.onclick=()=>{ _ipOnlyNew=!_ipOnlyNew; on.classList.toggle("on",_ipOnlyNew); ipgRenderChunk(true); };
  ipElement("ipgPickEvery").onclick=()=>{ _ipPick=new Set(_ipItems.filter(it=>it.kind!=="livevideo").map(it=>it.name)); ipgResync(); };
  ipElement("ipgPickNew").onclick=()=>{ _ipPick=new Set(_ipItems.filter(it=>it.new&&it.kind!=="livevideo").map(it=>it.name)); ipgResync(); };
  ipElement("ipgPickAll").onclick=()=>{ ipgItems().forEach(it=>_ipPick.add(it.name)); ipgResync(); };
  ipElement("ipgPickNone").onclick=()=>{ _ipPick.clear(); ipgResync(); };
  const dsel=ipElement("ipgDate"); dsel.value=String(_ipDateDays); dsel.addEventListener("change",()=>{ _ipDateDays=parseInt(dsel.value,10)||0; ipgRenderChunk(true); });
  ipElement("ipmChange").addEventListener("click",async()=>{ try{ const r=await ipN().pickFolder(); const pth=typeof r==="string"?r:(r&&r.path); if(pth){ _ipDest=pth; try{localStorage.setItem("disky_ip_dest",pth);}catch(e2){} ipList({silent:true}); } }catch(e){} });
  ipElement("ipmGo").addEventListener("click",ipgOpenExport);
  ipElement("ipgClean").addEventListener("click",ipgOpenCleanup);
  ipgRenderChunk(true);
  ipgUpdateBar();
}
