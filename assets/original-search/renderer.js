const FEATURES=[
 {v:"onevent",name:"On Event",de:"Karten vollständig sichern, auf bis zu zwei Ziele prüfen und sauber an dein Team übergeben.",en:"Back up complete cards, verify up to two destinations and hand off to your team.",ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 3h10l4 4v14H5zM9 3v5h6V3M8 15l3 3 5-6"/></svg>'},
 {v:"activity",nameKey:"nav_activity",de:"Was Disky getan hat — jeder Scan, jede Freigabe, jeder Import. Lückenlos.",en:"Everything Disky did — every scan, release and import. Complete.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l2.5 2.5"/><circle cx="12" cy="12" r="9"/></svg>'},
 {v:"insights",nameKey:"nav_insights",de:"Dein Archiv im Profil — Wachstum, größte Projekte, Medientypen.",en:"Your archive, profiled — growth, biggest projects, media types.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>'},
 {v:"search",  nameKey:"nav_search",  de:"Erfasste Datei- und Projektordnernamen durchsuchen. Auch offline.", en:"Search cataloged file and project folder names. Even offline.",
  ic:'<svg class="ai-lupe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.5-4.5"/></svg>'},
 {v:"map",     nameKey:"nav_map",     de:"Jede Platte als interaktive Karte — sieh sofort, was den Platz frisst.", en:"Every drive as an interactive map — see what eats your space.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><g class="ai-zeiger"><path d="M12 12V3.2"/><path d="M12 12l7.6 4.6"/></g></svg>'},
 {v:"worldmap",nameKey:"nav_worldmap",de:"Deine Aufnahmen auf der Weltkarte — jeder Drehort aus den GPS-Daten.", en:"Your footage on a world map — every location from GPS data.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><g stroke-width="1.5" opacity=".9"><path d="M3.2 12h17.6"/><path d="M5.1 7.4h13.8M5.1 16.6h13.8" opacity=".7"/><path class="ai-globemer" d="M12 3a5.4 9 0 0 1 0 18a5.4 9 0 0 1 0-18"/></g></svg>'},
 {v:"backup",  nameKey:"nav_backup",  de:"Jedes Projekt bewertet: sicher gesichert — oder nur einen Ausfall vom Verlust entfernt?", en:"Every project scored: safely backed up — or one failure from gone?",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>'},
 {v:"dupes",   nameKey:"nav_dupes",   de:"Duplikate über alle Platten finden — per Prüfsumme, nicht per Name.", en:"Find duplicates across all drives — by checksum, not by name.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path class="ai-copytop" d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'},
 {v:"gather",   nameKey:"nav_gather",  de:"Projekt + alle genutzten Medien in EINEN Ordner sammeln — auch von ausgesteckten Platten.", en:"Gather a project + all its media into ONE folder — even from unplugged drives.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1"/><path d="M3.5 11h17l-1.7 8a2 2 0 0 1-2 1.6H7.2a2 2 0 0 1-2-1.6z"/><path d="M12 13v5M9.6 15.6 12 13l2.4 2.6"/></svg>'},
 {v:"diskspeed",name:"Disk Speed Test", de:"Echtes Lese-/Schreibtempo messen — cache-frei, mit Mess-Log.", en:"Measure true read/write speed — uncached, with a test log.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 15a8.5 8.5 0 0 1 17 0"/><path d="M12 15l4-3.2"/></svg>'},
 {v:"cache",   name:"Cache Cleaner", de:"Zwischenspeicher und Entwickler-Reste finden — alles in den Papierkorb, nichts endgültig.", en:"Find caches and developer leftovers — all to the Trash, nothing permanent.",
  ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path class="ai-binlid" d="M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7"/><path d="M6 7l1 12.1A1.9 1.9 0 0 0 8.9 21h6.2a1.9 1.9 0 0 0 1.9-1.9L18 7"/><path d="M10.5 11v6M13.5 11v6" opacity=".65"/></svg>'},
 {v:"iphone",  name:"iPhone Gallery Manager", de:"Fotos & Videos vom iPhone sichern — nur Neues, Originale, resume-sicher.", en:"Back up iPhone photos & videos — only new items, originals, resume-safe.",
  ic:'<svg class="ai-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6.5" y="2" width="11" height="20" rx="2.6"/><path d="M10.5 18.5h3"/></svg>'},
];
const FOLDER_SVG=`<svg viewBox="118 34 384 384" class="macfld" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="ciFile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe2ff"/><stop offset=".5" stop-color="#5aa8ff"/><stop offset="1" stop-color="#3d88ff"/></linearGradient>
  <linearGradient id="ciCard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6cdff"/><stop offset=".5" stop-color="#4496ff"/><stop offset="1" stop-color="#2a6ff0"/></linearGradient>
  <radialGradient id="ciBloom" cx=".5" cy=".56" r=".58"><stop offset="0" stop-color="#bfe0ff" stop-opacity=".95"/><stop offset=".6" stop-color="#4f9bff" stop-opacity=".5"/><stop offset="1" stop-color="#3f8cff" stop-opacity="0"/></radialGradient>
  <linearGradient id="ciMilk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf3ff" stop-opacity=".30"/><stop offset=".44" stop-color="#d2e4fb" stop-opacity=".06"/><stop offset="1" stop-color="#c6dcf8" stop-opacity=".16"/></linearGradient>
  <radialGradient id="ciFrost" cx=".5" cy=".5" r=".68"><stop offset="0" stop-color="#e6f1ff" stop-opacity="0"/><stop offset=".72" stop-color="#dceaff" stop-opacity=".04"/><stop offset="1" stop-color="#eef6ff" stop-opacity=".24"/></radialGradient>
  <linearGradient id="ciEdge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".92"/><stop offset=".5" stop-color="#dbeaff" stop-opacity=".12"/><stop offset="1" stop-color="#eaf3ff" stop-opacity=".4"/></linearGradient>
  <clipPath id="ciClip"><path d="M185 160 H291 C311 160 315 198 339 198 H435 A20 20 0 0 1 455 218 V352 A20 20 0 0 1 435 372 H185 A20 20 0 0 1 165 352 V180 A20 20 0 0 1 185 160 Z"/></clipPath>
  <filter id="ciCB" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="ciBB" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="ciHalo" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="ciDoc" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#04070d" flood-opacity=".4"/></filter>
  </defs>
  <rect x="180" y="196" width="200" height="172" rx="46" fill="#3a8cff" opacity=".40" filter="url(#ciHalo)"/>
  <g filter="url(#ciDoc)"><path d="M234 80 H352 L404 128 V250 a10 10 0 0 1-10 10 H234 a10 10 0 0 1-10-10 V90 a10 10 0 0 1 10-10 Z" fill="url(#ciFile)"/><path d="M352 80 V118 a10 10 0 0 0 10 10 H404 Z" fill="#eaf4ff" fill-opacity=".55"/></g>
  <g clip-path="url(#ciClip)"><rect x="214" y="200" width="192" height="168" rx="22" fill="url(#ciCard)" filter="url(#ciCB)"/><ellipse cx="310" cy="300" rx="118" ry="84" fill="url(#ciBloom)" filter="url(#ciBB)"/><rect x="165" y="160" width="290" height="212" fill="url(#ciMilk)"/><rect x="165" y="160" width="290" height="212" fill="url(#ciFrost)"/></g>
  <path d="M185 160 H291 C311 160 315 198 339 198 H435 A20 20 0 0 1 455 218 V352 A20 20 0 0 1 435 372 H185 A20 20 0 0 1 165 352 V180 A20 20 0 0 1 185 160 Z" fill="none" stroke="url(#ciEdge)" stroke-width="2.4"/>
  <path d="M188 169 H289 C306 169 309 206 333 206 H432" fill="none" stroke="#ffffff" stroke-opacity=".5" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;
const IC = {
  box:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12h4"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.4 12.4l2.5 2.5 4.7-5.2"/></svg>`,
  image:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/></svg>`,
  film:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>`,
  folder:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>`,
  file:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/></svg>`,
  spark:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l1.7 6.3 6.3 1.7-6.3 1.7L12 18.5l-1.7-6.3L4 10.5l6.3-1.7z"/><circle cx="19" cy="5" r="1.4"/><circle cx="5.5" cy="18" r="1.1"/></svg>`,
  reveal:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-8.5 8.5"/><path d="M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5"/></svg>`,
  edit:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  drive:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6.5" width="18" height="11" rx="2.2"/><circle cx="8" cy="12" r="2.1"/><path d="M14 12h4"/></svg>`,
  layers:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5Z"/><path d="M3 13l9 5 9-5"/></svg>`,
  copy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2.2"/><path d="M5 15.5V5a2 2 0 0 1 2-2h8.5"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4.2-4.2"/></svg>`,
};
function _norm(s){ return (s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g,"").toLowerCase(); }
function _edist(a,b,cap){ const m=a.length,n=b.length; if(Math.abs(m-n)>cap) return cap+1;   // gedeckelte Damerau-Levenshtein (Abbruch, sobald Zeilenminimum > cap); Vertauschung benachbarter Zeichen = 1
  let prev2=null, prev=new Array(n+1); for(let j=0;j<=n;j++) prev[j]=j;
  for(let i=1;i<=m;i++){ const cur=new Array(n+1); cur[0]=i; let rowMin=i;
    for(let j=1;j<=n;j++){ const cost=(a.charCodeAt(i-1)===b.charCodeAt(j-1))?0:1; let v=prev[j-1]+cost; const dn=prev[j]+1, lf=cur[j-1]+1; if(dn<v)v=dn; if(lf<v)v=lf;
      if(i>1&&j>1 && a.charCodeAt(i-1)===b.charCodeAt(j-2) && a.charCodeAt(i-2)===b.charCodeAt(j-1)){ const tr=prev2[j-2]+1; if(tr<v)v=tr; }   // Vertauschung (häufigster Tippfehler)
      cur[j]=v; if(v<rowMin)rowMin=v; }
    if(rowMin>cap) return cap+1; prev2=prev; prev=cur; }
  return prev[n]; }
// nq (schon normalisiert) gegen text. Rückgabe: Score (höher=besser) oder -1. typo=true nur für kleine Mengen (Ordner) — Edit-Distanz ist teuer.

function _findNS(heu, nadel){
  const H=heu.length, N=nadel.length; if(!N) return 0;
  for(let s0=0;s0<H;s0++){
    let i=s0, j=0;
    while(i<H && j<N){ const c=heu.charCodeAt(i);
      if(c===32||c===9||c===10||c===13||c===160){ i++; continue; }   // Leerraum im Text ueberspringen
      if(c!==nadel.charCodeAt(j)) break;
      i++; j++; }
    if(j===N) return s0;
  }
  return -1; }

function _fuzz(nq, text, typo){ if(!nq) return 0;
  const idx=_findNS(text, nq); if(idx<0) return -1;
  let sc=2000 - idx*2 - (text.length-nq.length);
  if(idx===0 || !/[a-z0-9]/.test(text.charAt(idx-1))) sc+=400;   // Wortanfang bevorzugen
  return sc; }
function folderIndex(files){ if(_folderIdx&&_folderIdxVer===_filesVer) return _folderIdx;
  const m=new Map();
  for(const f of files){ const rel=f.relPath||""; if(rel.indexOf("/")<0) continue; const segs=rel.split("/"); segs.pop(); let acc="";
    for(const seg of segs){ acc = acc ? acc+"/"+seg : seg; const key=f.driveId+"|"+acc;
      let g=m.get(key); if(!g){ g={did:f.driveId,path:acc,name:seg,nl:seg.toLowerCase(),nn:_norm(seg),items:0,bytes:0}; m.set(key,g); }   // nn = normalisiert, EINMAL pro Ordner gecacht (nicht pro Tastendruck)
      g.items++; g.bytes+=f.size||0; } }
  _folderIdx=[...m.values()]; _folderIdxVer=_filesVer; return _folderIdx; }

function renderNav(){
  const el=document.getElementById("sbNav"); if(!el) return;
  
  const aktiv=(typeof VS!=="undefined"&&VS.gen&&VS.gen.phase==="covered")?VS.gen.von:view;
  const btn=(v,ic,label,extra)=>`<button class="nav${aktiv===v?" on":""}" data-v="${v}" data-label="${String(label).replace(/"/g,"&quot;")}"${extra||""}><span class="ic">${ic}</span><span>${label}</span></button>`;
  let h=btn("overview",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',t("nav_overview"));
  for(const v of navPins()){ const f=FEATURES.find(x=>x.v===v); if(f) h+=btn(f.v,f.ic,featureName(f)); }
  h+=btn("drawer",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>',_bwL("Features","Features"));
  el.innerHTML=h;
  navDnD(el);
  renderPageRail(view);
}

function originalField(){
  const SIC=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.75"/><path d="M20 20l-4.8-4.8"/></svg>`;
  
  const _dwKommt = false;   // Buehne der ganzen Seite — auch WAEHREND getippt wird
  app.innerHTML = ""
    + `<div class="dsview" style="position:relative">`
    + `<div class="deepsearch${(q||"")?" has-val":""}"><span class="ds-ic">${SIC}</span>
        <input id="deepQ" class="ds-inp" type="text" autocomplete="off" spellcheck="false" placeholder="" aria-label="${t("deep_ph")}" value="${esc(q||"")}">
        <div class="ds-ph" id="deepPh" aria-hidden="true"><b>${esc(t("deep_ph"))}</b></div>
        <canvas class="ds-vanish" id="deepVan" aria-hidden="true"></canvas>
        <button class="ds-x${q?"":" hide"}" id="deepX" title="${t("deep_clear")}" tabindex="-1">✕</button></div>`

    
    + `<div id="dwheel" style="${_dwKommt?"visibility:hidden":"display:none"}"></div>`
    + `<div id="deepBody"></div>`
    + `</div>`;


}
async function deepNameBody(host){
  const seq=host._deepSeq=(host._deepSeq||0)+1;
  const qq=(q||"").trim();
  const aktuell=()=>host.isConnected&&host._deepSeq===seq&&(q||"").trim()===qq;
  const drives=await getAll("drives");
  if(!aktuell()) return;
  if(!drives.length){ host.innerHTML=emptyState(); return; }
  const dById=Object.fromEntries(drives.map(d=>[d.id,d.label]));
  
  let res=host.querySelector(":scope > #dres");
  if(!res){
    host.innerHTML=`<div id="dres" class="deep-res"><div class="view-skel"><div class="vsk"></div><div class="vsk"></div><div class="vsk"></div></div></div>`;
    res=host.querySelector("#dres");
  } // Beim Tippen bleiben vorhandene Treffer gedimmt stehen, bis die neue Antwort fertig ist.
  const files=await allFiles();
  if(!aktuell()) return;
  
  if(!(q||"").trim()){ try{
    if(_phVer!==_filesVer){
      _phListe=folderIndex(files).filter(g=>g.path.indexOf("/")<0)
        .sort((a,b)=>b.bytes-a.bytes).slice(0,8).map(g=>g.name);
      _phVer=_filesVer; }
    if(_phListe.length) _phSetzen(_phListe);
  }catch(e){} }
  // Mounts der angeschlossenen Platten → entscheidet, ob „im Finder zeigen" möglich ist
  let _dVols=[];
  if(window.diskyNative?.listVolumes){ try{ _dVols=(await getVolumes())||[]; }catch(e){} }
  if(!aktuell()) return;
  const driveById=Object.fromEntries(drives.map(d=>[d.id,d]));
  const mountOfDrive=id=>{ const v=liveVolFor(driveById[id],_dVols); return v?v.mount:null; };   // UUID-FIRST: kein Reveal auf gleichnamiger Fremd-Platte
  if(!qq){ res.innerHTML=`<div class="deep-hint">${t("deep_hint",nloc(files.length))}</div>`; return; }
  // ── Ordner zuerst: Pfad-Segmente, deren Name zum Suchbegriff passt (gebündelt je Platte) ──
  // ── UNSCHARFE Suche: findet auch bei Tippfehlern / fehlenden Zeichen (Substring > Subsequenz > Tippfehler), nach Score sortiert ──
  const nq=_norm(qq);
  // Ordner: kleine Menge (gecachter Index) → volle Fuzzy inkl. Tippfehler-Toleranz (Edit-Distanz)
  const _fs=[]; for(const g of folderIndex(files)){ const sc=_fuzz(nq, g.nn||g.nl, true); if(sc>=0) _fs.push([sc,g]); }
  _fs.sort((a,b)=> b[0]-a[0] || b[1].bytes-a[1].bytes);
  const folders=(_dsType!=="all"||_dsMinMB>0)?[]:_fs.slice(0,40).map(x=>x[1]);   // aktive Typ/Größen-Facette meint DATEIEN → Ordner-Treffer ausblenden (wären Rauschen)
  // Dateien: große Menge (~1,8 Mio) → nur toLowerCase (kein teures NFD-normalize/Edit-Distanz pro Datei).
  // VOLLSTÄNDIG zählen, gedeckelt ANZEIGEN: der alte 900er-Abbruch stoppte mitten im Katalog — bei breiten
  // Suchen („mp4": 120k Treffer) kamen alle 900 von der ERSTEN Platte, der Rest der Platten wirkte LEER.
  // Jetzt: ein voller Durchlauf zählt alles (gesamt + pro Platte), gespeichert werden nur die besten
  // Kandidaten fürs Ranking, gezeigt die Top 300 — und jede Platte sagt „+N weitere".
  const qL=qq.toLowerCase().replace(/\s+/g,"");   // Leerzeichen zaehlen nicht — passend zu _findNS
  const _facet=_dsType!=="all"||_dsMinMB>0;
  const KEEP=20000;   // genug gescorte Kandidaten fürs Top-300-Ranking; darüber nur noch zählen
  const _ff=[]; const _perDrive=new Map(); let totFiles=0;
  for(let _i=0;_i<files.length;_i++){ const _f=files[_i];
    if(_i && (_i & 131071)===0){ await _raf(); if(!aktuell()||!res.isConnected) return; }   // Event-Loop atmen lassen; View-Wechsel bricht sauber ab
    if(_facet){ if(_dsType!=="all" && !_dsTypeMatch(_f)) continue; if(_dsMinMB && (_f.size||0)<_dsMinMB*1048576) continue; }   // Facetten VOR dem Fuzzy (billig)
    const sc=_fuzz(qL, (_f.name||"").toLowerCase(), false); if(sc<0) continue;   // qL ist unten schon leerraumfrei; _findNS ueberspringt Leerraum im Namen
    totFiles++; let pd=_perDrive.get(_f.driveId); if(!pd){ pd={n:0,bytes:0}; _perDrive.set(_f.driveId,pd); } pd.n++; pd.bytes+=_f.size||0;
    if(_ff.length<KEEP) _ff.push([sc,_f]); }
  _ff.sort((a,b)=>b[0]-a[0]);
  const fhits=_ff.slice(0,300).map(x=>x[1]);
  
  const grps=new Map();
  const grpOf=did=>{ let g=grps.get(did); if(!g){ g={did,file:[],totFile:0,totFileBytes:0}; grps.set(did,g); } return g; };
  fhits.forEach(f=>{ grpOf(f.driveId).file.push(f); });
  for(const [did,pd] of _perDrive){ const G=grpOf(did); G.totFile=pd.n; G.totFileBytes=pd.bytes; }
  const list=[...grps.values()].filter(G=>G.totFile>0)
    .map(G=>{ G.n=G.totFile; G.bytes=G.totFileBytes; return G; }).sort((a,b)=>b.bytes-a.bytes);
  if(!list.length && !folders.length){ res.innerHTML=`<div class="deep-hint">${t("deep_no_hits",esc(qq))}</div>`; return; }
  const chevSvg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
  const totMatches=list.reduce((s,g)=>s+g.n,0)+folders.length;
  const matchedDrives=new Set([...folders.map(g=>g.did),...list.map(g=>g.did)]).size;
  // KEIN exakter Treffer? (Query kommt in keinem Treffer-Namen als Substring vor) → ehrlich sagen: nicht gefunden, aber ähnliche. Sonst wirken Fuzzy-Treffer wie echte Treffer.
  const _hasExact = folders.some(g=>_norm(g.name||"").includes(nq)) || fhits.some(f=>_norm(f.name||"").includes(nq));
  const _approx = _hasExact ? "" : `<div class="deep-approx">${t("deep_approx",esc(qq))}</div>`;
  
  const projBlock = folders.length ? `<div class="deep-sec">${_bwL("Passende Ordner / Projekte","Matching folders / projects")} <span class="ds-cnt">${nloc(folders.length)}</span></div>`
    + `<div class="deep-projs">`+folders.map(g=>{
        const on2=!!mountOfDrive(g.did);
        return `<button class="dhit dfold" data-did="${g.did}" data-path="${esc(g.path)}" title="${esc(dById[g.did]||"?")} · ${esc(g.path)} — ${t("deep_fold_t")}">
          <span class="dh-ic" aria-hidden="true">${FOLDER_SVG}</span>
          <span class="dh-name">${esc(g.name)}</span>
          <span class="dh-loc"><b>${esc(dById[g.did]||"?")}</b><span class="dh-path">${esc(g.path)}</span></span>
          <span class="dh-size">${t("dc_files",nloc(g.items))} · ${human(g.bytes)}<br>${on2?_bwL("Angeschlossen","Connected"):_bwL("Offline · im Katalog öffnen","Offline · View in catalog")}</span></button>`; }).join("")+`</div>` : "";
  const dateiKopf = list.length ? `<div class="deep-sec">${_bwL("Dateien","Files")} <span class="ds-cnt">${nloc(totFiles)}</span></div>` : "";
  res.innerHTML=_approx+`<p class="deep-hint">${_bwL("Suche in erfassten Datei- und Ordnernamen. Der Katalog ist keine Live-Prüfung des Dateiinhalts.","Searching cataloged file and folder names. The catalog is not a live check of file contents.")}</p><div class="deep-sum">${t("deep_summary",totMatches,matchedDrives)}${totFiles>fhits.length?` · <span class="muted">${t("ds_shown",nloc(fhits.length))}</span>`:""}</div>`
    +projBlock+dateiKopf+list.map(G=>{
    const on=!!mountOfDrive(G.did);
    const gm=on?mountOfDrive(G.did):null;
    const fileRows=G.file.map(f=>
      `<button class="dhit dfile" data-did="${f.driveId}" data-rel="${esc(f.relPath||"")}" title="${on?t("deep_file_show"):t("deep_file_noshow")}">
        <span class="dh-ic"${thAttrs(f.driveId,f.relPath,f.size,gm)}>${IC.file}</span>
        <span class="dh-name">${esc(f.name||f.relPath||"?")}</span>
        <span class="dh-loc">${_norm(f.name||"").includes(nq)?_bwL("Name enthält Suchbegriff","Name contains search term"):_bwL("Ähnlicher Dateiname","Similar filename")} · ${esc(f.relPath||"")}</span>
        <span class="dh-size">${human(f.size||0)}</span></button>`).join("");
    return `<div class="dgroup open">
      <button class="dg-head" aria-expanded="true">
        <span class="dg-chev">${chevSvg}</span>
        <span class="dg-disk"></span>
        <span class="dg-name">${esc(dById[G.did]||"?")}</span>
        ${(()=>{ const nt=(((driveById||{})[G.did]||{}).note||"").trim(); return nt?`<span class="dg-loc" title="${_bwL("Standort dieser Platte — greif dir genau diese","Where this drive is — grab exactly this one")}">${PIC.pin} ${esc(nt)}</span>`:""; })()}
        ${on?"":`<span class="dg-closet">${t("deep_closet_tag")}</span>`}
        <span class="dg-meta">${nloc(G.n)} ${t("deep_grp_matches")} · ${human(G.bytes)}</span>
      </button>
      <div class="dg-body"><p class="deep-hint" style="padding:8px 14px;text-align:left">${on?_bwL("Angeschlossen · Datei im Finder zeigen","Connected · Show file in Finder"):_bwL(`Schließe „${esc(dById[G.did]||"?")}“ an, um Dateien im Finder zu öffnen. Jetzt kannst du ihren Speicherort im Katalog ansehen.`,`Connect “${esc(dById[G.did]||"?")}” to open files in Finder. You can view their catalog location now.`)} · ${driveById[G.did]?.scannedAt?_bwL("Zuletzt erfasst: ","Last cataloged: ")+esc(dstr(driveById[G.did].scannedAt)):_bwL("Erfassungsdatum unbekannt","Catalog date unknown")}</p>${fileRows}${(()=>{ const more=G.totFile-G.file.length;
        return more>0?`<div class="deep-hint" style="padding:8px 14px;font-size:12px">${t("ds_grp_more",nloc(more))}</div>`:""; })()}</div>
    </div>`;
  }).join("");
  res.querySelectorAll(".dg-head").forEach(h=>h.onclick=()=>{ const g=h.closest(".dgroup"); const open=g.classList.toggle("open"); h.setAttribute("aria-expanded",open?"true":"false"); });
  res.querySelectorAll(".dfold").forEach(b=>{
    const openMap=()=>{ mapDriveId=+b.dataset.did; mapStack=[]; mapTree=null; mapDrill=null; mapDrillPath=(b.dataset.path||"").split("/").filter(Boolean); setView("map"); };
    b.onclick=openMap;
    b.oncontextmenu=ev=>{ const mount=mountOfDrive(+b.dataset.did), path=b.dataset.path||"", full=mount?mount.replace(/\/$/,"")+"/"+path:null;
      showCtx(ev,[ {label:t("ctx_open_map"),ic:IC.layers,on:openMap},
        full?{label:t("ctx_reveal_folder"),ic:IC.reveal,on:()=>revealHonest(full)}:{label:t("ctx_offline"),ic:IC.reveal,disabled:true},
        "sep", {label:t("ctx_copy_path"),ic:IC.copy,on:()=>copyText(full||path)} ], path.split("/").pop()||path); };
  });
  res.querySelectorAll(".dfile").forEach(b=>{
    const did=+b.dataset.did, rel=b.dataset.rel||"";
    const reveal=()=>{ const mount=mountOfDrive(did); if(mount) revealHonest(mount.replace(/\/$/,"")+"/"+rel); };
    const inMap=()=>{ mapDriveId=did; mapStack=[]; mapTree=null; mapDrillPath=rel.includes("/")?rel.split("/").slice(0,-1):null; setView("map"); };
    b.onclick=()=>{ if(mountOfDrive(did)&&window.diskyNative?.reveal) reveal(); else inMap(); };
    b.oncontextmenu=ev=>{ const mount=mountOfDrive(did), full=mount?mount.replace(/\/$/,"")+"/"+rel:null;
      showCtx(ev,[ full?{label:t("ctx_reveal_file"),ic:IC.reveal,on:reveal}:{label:t("ctx_offline"),ic:IC.reveal,disabled:true},
        {label:t("ctx_show_map"),ic:IC.layers,on:inMap},
        "sep", {label:t("ctx_copy_path"),ic:IC.copy,on:()=>copyText(full||rel)}, {label:t("ctx_copy_name"),ic:IC.copy,on:()=>copyText(rel.split("/").pop()||rel)} ], rel.split("/").pop()||rel); };
  });
  // Vorschau-Bilder lazy in die Treffer: Katalog-Thumb (auch für Platten im Regal) → sonst
  // Live-qlmanage bei verbundener Platte. Läuft über thumbLazy (einzelne IDB-gets statt
  // ensureMediaMap-Vollladen, Size-Gate inklusive).
  try{ thumbLazy(res); }catch(e){}
}
