// Original app Duplicate Finder presentation; browser fixture supplies the catalog.
const FILES_SVG=`<svg viewBox="118 34 384 384" class="macfld macfls" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><defs>
  <linearGradient id="cfSheet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe2ff"/><stop offset=".5" stop-color="#5aa8ff"/><stop offset="1" stop-color="#3d88ff"/></linearGradient>
  <linearGradient id="cfBack1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6ff"/><stop offset=".55" stop-color="#7ab4f8"/><stop offset="1" stop-color="#4a8ce6"/></linearGradient>
  <linearGradient id="cfBack2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9d9fb"/><stop offset=".55" stop-color="#6aa4ef"/><stop offset="1" stop-color="#3d7cd8"/></linearGradient>
  <radialGradient id="cfBloom" cx=".5" cy=".54" r=".6"><stop offset="0" stop-color="#bfe0ff" stop-opacity=".95"/><stop offset=".6" stop-color="#4f9bff" stop-opacity=".5"/><stop offset="1" stop-color="#3f8cff" stop-opacity="0"/></radialGradient>
  <linearGradient id="cfMilk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf3ff" stop-opacity=".30"/><stop offset=".44" stop-color="#d2e4fb" stop-opacity=".06"/><stop offset="1" stop-color="#c6dcf8" stop-opacity=".16"/></linearGradient>
  <radialGradient id="cfFrost" cx=".5" cy=".5" r=".68"><stop offset="0" stop-color="#e6f1ff" stop-opacity="0"/><stop offset=".72" stop-color="#dceaff" stop-opacity=".04"/><stop offset="1" stop-color="#eef6ff" stop-opacity=".24"/></radialGradient>
  <linearGradient id="cfEdge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".92"/><stop offset=".5" stop-color="#dbeaff" stop-opacity=".12"/><stop offset="1" stop-color="#eaf3ff" stop-opacity=".4"/></linearGradient>
  <clipPath id="cfClip"><path d="M235 116 H335 L383 164 V324 a18 18 0 0 1-18 18 H235 a18 18 0 0 1-18-18 V134 a18 18 0 0 1 18-18 Z"/></clipPath>
  <filter id="cfBB" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="cfHalo" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="cfDoc" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#04070d" flood-opacity=".4"/></filter>
  </defs>
  <rect x="215" y="130" width="200" height="200" rx="48" fill="#3a8cff" opacity=".38" filter="url(#cfHalo)"/>
  <!-- Gestufte Kaskade nach oben rechts: erst so sieht man von jedem Blatt eine
       Kante. Der erste Entwurf faecherte sie hinter das vordere Blatt — dort
       waren sie nur ein dunkler Fleck, kein Stapel.
       Zweiter Fund: hintere Blaetter NICHT ueber Gruppen-Deckkraft abdunkeln.
       Blau auf fast schwarzem Grund wird bei .42 zu Grau — sie sahen aus wie
       Pappkarten. Jetzt volle Deckkraft mit je eigenem, etwas dunklerem
       Verlauf: es bleibt Papier, es liegt nur weiter hinten.
       Der ganze Stapel ist so gesetzt, dass seine Mitte bei x=310 liegt —
       sonst haengt das Zeichen neben dem Ordner sichtbar aus der Achse. -->
  <g filter="url(#cfDoc)">
    <g><rect x="253" y="84" width="150" height="210" rx="16" fill="url(#cfBack2)"/>
      <rect x="253" y="84" width="150" height="210" rx="16" fill="none" stroke="#ffffff" stroke-opacity=".34" stroke-width="2"/></g>
    <g><rect x="235" y="100" width="158" height="218" rx="17" fill="url(#cfBack1)"/>
      <rect x="235" y="100" width="158" height="218" rx="17" fill="none" stroke="#ffffff" stroke-opacity=".42" stroke-width="2"/></g>
  </g>
  <g filter="url(#cfDoc)">
    <path d="M235 116 H335 L383 164 V324 a18 18 0 0 1-18 18 H235 a18 18 0 0 1-18-18 V134 a18 18 0 0 1 18-18 Z" fill="url(#cfSheet)"/>
    <path d="M335 116 V152 a12 12 0 0 0 12 12 H383 Z" fill="#eaf4ff" fill-opacity=".55"/>
  </g>
  <g clip-path="url(#cfClip)">
    <ellipse cx="300" cy="246" rx="100" ry="86" fill="url(#cfBloom)" filter="url(#cfBB)"/>
    <rect x="217" y="116" width="166" height="226" fill="url(#cfMilk)"/>
    <rect x="217" y="116" width="166" height="226" fill="url(#cfFrost)"/>
  </g>
  <path d="M235 116 H335 L383 164 V324 a18 18 0 0 1-18 18 H235 a18 18 0 0 1-18-18 V134 a18 18 0 0 1 18-18 Z" fill="none" stroke="url(#cfEdge)" stroke-width="2.4"/>
  <path d="M241 122 H333" fill="none" stroke="#ffffff" stroke-opacity=".5" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;
async function openDupFolder(a){
  if(!a||document.querySelector(".overlay")) return;
  const drivesArr=[...a.drives];
  const DIC=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7.5" width="18" height="9.5" rx="2.4"/><circle cx="7.4" cy="12.2" r="1.05" fill="currentColor" stroke="none"/><path d="M11 12.2h7" stroke-width="1.3"/></svg>`;
  const IIC=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v5" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none"/></svg>`;
  const CHK=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>`;
  const STAR=`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.4 6.5L12 17.9 6 20.3l1.4-6.5L2.5 9.3l6.6-.7z"/></svg>`;
  const OIC=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-8.5 8.5"/><path d="M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/></svg>`;
  // Mounts holen (welche Platten sind verbunden → freigebbar) + driveId→Label
  const driveMount={}; let byId={}, _connVols=[], _cardIds=new Set();
  try{ const _conn=await getVolumes(); _connVols=_conn; const drs=await getAll("drives"); byId=Object.fromEntries(drs.map(d=>[d.id,d.label]));
    _cardIds=new Set(drs.filter(x=>driveCategory(x)==="card").map(x=>x.id));   // SD-Karten transient — wie im renderDupes-Compute NICHT als Kreuz-Kopie zaehlen
    for(const d of drs){ const v=liveVolFor(d,_conn); if(v) driveMount[d.label]=v.mount; }   // UUID-first: eine gleichnamige Zweitplatte darf nie den Mount stellen
  }catch(e){}
  // Volle Ordner-Statistik PRO Platte (nicht nur Duplikate) — für „bessere vs. schlechtere Version" + sichere Ganzordner-Freigabe
  const filesByDrive=new Map(); // label -> [{path,size}]
  try{ const files=await allFiles();
    for(let i=0;i<files.length;i++){ const f=files[i]; if(topFolder(f.relPath)!==a.name) continue; const lbl=byId[f.driveId]; if(!lbl) continue;
      let arr=filesByDrive.get(lbl); if(!arr){ arr=[]; filesByDrive.set(lbl,arr); } arr.push({path:f.relPath,size:f.size||0,hash:f.hash||null}); }
  }catch(e){}
  // Auf Backup-Platten liegt derselbe Inhalt oft VERSCHACHTELT oder unter GANZ ANDEREM Ordnernamen
  // (real: „LEO GÄRTNER" auf ACE = „AFRICA FOOTAGE Videographer" auf LENNO). Der Namens-Filter oben findet dort
  // nichts → Platte zeigte fälschlich „0 · 0 B" und die Freigabe liefe ins Leere. Deshalb: über die PRÜFSUMMEN
  // der Gruppe alle Kopien plattenweit einsammeln (a.items trägt hash) — eng + ehrlich, keine Fremddateien.
  const _dupLoc=new Map();   // label -> gemeinsames Verzeichnis der Duplikate dort (für Reveal + Anzeige)
  const crossByDrive=new Map();   // label -> [{path,size,hash}] — ALLE Kopien der Gruppen-Prüfsummen, plattenweit
  {
    const dirOf=p=>{ const i=p.lastIndexOf("/"); return i<0?"":p.slice(0,i); };
    const comPre=(x,y)=>{ const A=x.split("/"),B=y.split("/"),o=[]; for(let i=0;i<Math.min(A.length,B.length);i++){ if(A[i]!==B[i]) break; o.push(A[i]); } return o.join("/"); };
    const hashSet=new Set(); for(const it of a.items){ if(it.hash) hashSet.add(it.hash); }
    try{ const files=await allFiles();
      for(let i=0;i<files.length;i++){ const f=files[i]; if(!f.hash||!hashSet.has(f.hash)||_cardIds.has(f.driveId)) continue; const lbl=byId[f.driveId]; if(!lbl) continue;
        let arr=crossByDrive.get(lbl); if(!arr){ arr=[]; crossByDrive.set(lbl,arr); } arr.push({path:f.relPath,size:f.size||0,hash:f.hash});
        const d=dirOf(f.relPath), cur=_dupLoc.get(lbl); _dupLoc.set(lbl, cur==null?d:comPre(cur,d)); }
    }catch(e){}
    for(const lbl of drivesArr){ const cur=filesByDrive.get(lbl); if(!cur||!cur.length){ const cx=crossByDrive.get(lbl); if(cx&&cx.length) filesByDrive.set(lbl,cx); } }
  }
  const dstat=new Map(); for(const [lbl,arr] of filesByDrive){ let b=0; for(const x of arr) b+=x.size; dstat.set(lbl,{bytes:b,count:arr.length}); }
  for(const d of drivesArr){ if(!dstat.has(d)) dstat.set(d,{bytes:0,count:0}); }
  const _openVer=_filesVer;   // Katalog-Stand beim Öffnen des Walkthroughs — vor dem Trashen prüfen (nicht gegen veraltete Pfade löschen)
  const statOf=d=>dstat.get(d)||{bytes:0,count:0};
  // DREI Messgrößen, sauber getrennt — vorher standen „21 files · 40.7 GB" (Kopien-Zählung + Dubletten-Inhalt)
  // neben „123 · 71.3 GB" (kompletter Ordnerinhalt) auf einem Screen, ohne Erklärung:
  //   statOf(d)  = ALLES, was in diesem Ordner auf Platte d liegt
  //   xstat(d)   = davon nachweislich identisch woanders vorhanden (Prüfsumme, ≥2 Platten)
  //   shareStat  = was Platte d mit dem BEHALTER teilt (hash+size — exakt die doRelease-Logik)
  const hashDrives=new Map(); for(const [lbl,arr] of crossByDrive) for(const f of arr){ if(!f.hash) continue; let s=hashDrives.get(f.hash); if(!s){ s=new Set(); hashDrives.set(f.hash,s); } s.add(lbl); }
  const _fkeyOf=f=>(f.hash||"")+"|"+(f.size||0);
  // xstat: ORDNER-Scope (dieselben Dateien wie statOf) + jeder Inhalt nur 1× — damit kann die grüne
  // Zeilen-Zahl weder den Zeilen-Gesamtwert noch die Kopf-Zahl (a.dupSize, 1× pro Gruppe) übersteigen.
  const xstat=new Map(); for(const [lbl,arr] of filesByDrive){ const seen=new Set(); let b=0,c=0;
    for(const f of arr){ if(!f.hash) continue; const hd=hashDrives.get(f.hash); if(!hd||hd.size<2) continue;
      const k=_fkeyOf(f); if(seen.has(k)) continue; seen.add(k); b+=f.size||0; c++; }
    xstat.set(lbl,{bytes:b,count:c}); }
  const xfilesDistinct=[...hashDrives.values()].filter(s=>s.size>=2).length;
  // shareStat: EXAKT die doRelease-Menge — iteriert die ORDNER-Dateien der Lösch-Platte (filesByDrive,
  // inkl. Verschachtelt-Fallback) gegen den plattenweiten Bestand des Behalters (hash+size). Vorher lief das
  // plattenweit über crossByDrive: der Button versprach dann Bytes, die doRelease nie anfasst (Kopien außerhalb
  // des Ordners), und „vollständig enthalten" konnte falsch-grün werden.
  const shareStat=(keepLbl,d)=>{ const ks=new Set(); for(const f of (crossByDrive.get(keepLbl)||[])){ if(f.hash) ks.add(_fkeyOf(f)); }
    let b=0,c=0; for(const f of (filesByDrive.get(d)||[])){ if(f.hash&&ks.has(_fkeyOf(f))){ b+=f.size||0; c++; } }
    const s=statOf(d); return {shared:b, sharedCount:c, uniq:Math.max(0,s.bytes-b), uniqCount:Math.max(0,s.count-c)}; };
  const _fullyCovered=(cs,d)=>cs.uniq<=Math.max(50e6, statOf(d).bytes*0.01);   // <1% bzw. <50 MB Rest = praktisch vollständig enthalten
  const fileCount=xfilesDistinct||a.xfiles||a.dup||a.items.length;
  // Empfehlung: reichste Version (meiste Bytes, dann meiste Dateien) = wahrscheinlich die Arbeitsversion
  let recommend=drivesArr[0];
  for(const d of drivesArr){ const s=statOf(d), r=statOf(recommend); if(s.bytes>r.bytes || (s.bytes===r.bytes && s.count>r.count)) recommend=d; }
  const sr=statOf(recommend);
  const maxOther=drivesArr.filter(d=>d!==recommend).reduce((m,d)=>Math.max(m,statOf(d).bytes),0);
  const clearWinner = sr.bytes > maxOther*1.12 && sr.bytes>0;   // >12% mehr Inhalt = klar die reichere Kopie
  // Inhalts-Hinweis: enthält die reichste Version Exports/Edits/MISC/Projektdateien?
  const CONTENT_RE=/(^|\/)(exports?|edits?|misc|projekt|projects?|renders?|finals?|footage|proxies|graphics?|grafik)(\/|$)/i;
  const PROJ_RE=/\.(prproj|drp|aep|aepx|fcpbundle|psd|psb|ai|indd|blend|c4d|sesx|als|logicx|xd|sketch)$/i;
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1).toLowerCase();
  const contentTags=new Set();
  for(const x of (filesByDrive.get(recommend)||[])){ const m=x.path.match(CONTENT_RE); if(m) contentTags.add(cap(m[2])); if(PROJ_RE.test(x.path)) contentTags.add(_bwL("Projektdateien","project files")); if(contentTags.size>=5) break; }
  const connOf=d=>!!driveMount[d];
  // Liegen in diesem Ordner NLE-Projekte? Dann kann Disky vor dem Löschen sicherstellen, dass der Behalter
  // wirklich vollständig ist (Projekt + ALLE genutzten Medien sammeln + versiegeln) — erst danach löschen.
  const projByDrive=new Map();
  for(const [lbl,arr] of filesByDrive){
    for(const x of arr){ const n=(x.path||"").split("/").pop(); const e=(n.split(".").pop()||"").toLowerCase();
      const meta=_PG_PROJ_EXT[e]; if(!meta||!meta.gather) continue;
      if(_PG_NOISE_RE.test(x.path)||_PG_NOISE_DIR_RE.test(x.path)||_PG_NOISE_NAME_RE.test(n)) continue;   // Auto-Save/Backup nicht anbieten
      let l=projByDrive.get(lbl); if(!l){ l=[]; projByDrive.set(lbl,l); }
      if(l.length<40) l.push({rel:x.path, name:n, app:meta.app}); } }
  // SIEGEL-BEWUSST: liegt eine Kopie in einem versiegelten Disky-Projekt (nachweislich vollständige Sammlung),
  // ist SIE der Behalter — und wird nie zum Löschkandidaten. Streu-Kopien weichen, die Sammlung bleibt.
  const sealedOn=new Map();   // label → Projektname des Siegels
  try{ const seals=await (window.diskyNative?.sealsList?.()||[]);
    for(const d of drivesArr){ const mnt=driveMount[d]; if(!mnt) continue;
      const abs=(mnt.replace(/\/$/,"")+"/"+a.name);
      for(const s of seals){ const sp=String(s.path||"").replace(/\/$/,"");
        if(abs===sp || abs.startsWith(sp+"/") || sp.startsWith(abs+"/")){ sealedOn.set(d, s.project||"Disky"); break; } } }
  }catch(e){}
  if(sealedOn.size){ let bestSeal=null; for(const d of drivesArr){ if(!sealedOn.has(d)) continue;
      if(!bestSeal || statOf(d).bytes>statOf(bestSeal).bytes) bestSeal=d; }
    if(bestSeal) recommend=bestSeal; }
  // Geister-Schutz: der Katalog kann älter sein als die Platte. Existiert der Duplikat-Ort auf einer
  // VERBUNDENEN Platte nicht mehr → Zeile als VERALTET markieren, Platte automatisch neu einlesen,
  // von der Freigabe ausschließen. Vorher: Reveal tat still nichts, Freigabe lief gegen Geister-Pfade.
  const staleOn=new Set();
  // Ziel = ein ECHTER Katalog-Ort auf dieser Platte: gemeinsames Duplikat-Verzeichnis, sonst der Elternordner
  // der ersten Katalog-Datei. NIE der blanke a.name-Fallback — der hat auf verschachtelten/umbenannten
  // Backup-Platten nie existiert und machte daraus falsche „Veraltet"-Stempel + sinnlose Rescans.
  const _dupPathOn=d=>{ const m=driveMount[d]; if(!m) return null; const base=m.replace(/\/$/,"");
    const loc=_dupLoc.get(d); if(loc!=null&&loc!=="") return base+"/"+loc;
    const f0=(filesByDrive.get(d)||[])[0];
    if(f0){ const i=f0.path.lastIndexOf("/"); return i>0 ? base+"/"+f0.path.slice(0,i) : base; }
    /* Kein Rateweg mehr: `base+"/"+a.name` erfand einen Ordner, den es auf
       dieser Platte gar nicht geben muss — der Kartenname stammt von einer
       ANDEREN Platte. Ohne Katalogpfad wird nichts gezeigt. */
    return isProjRoot(a.name) ? base : null; };
  const _queueUpd=d=>{ try{ const v=_connVols.find(x=>x.mount===driveMount[d]); if(v) queueAutoScan(v,{force:true,upd:true}); }catch(e){} };
  const markStale=d=>{ if(releasing||_walkFinished||staleOn.has(d)) return;   // nie in eine laufende/abgeschlossene Freigabe hineinrendern
    staleOn.add(d); _queueUpd(d);
    if(keep===d){ const alt=drivesArr.filter(x=>connOf(x)&&!staleOn.has(x)&&!sealedOn.has(x)).sort((x,y)=>statOf(y).bytes-statOf(x).bytes)[0];
      if(alt) keep=alt; }   // veralteter Behalter wird entthront — sonst würde gegen einen Geist „verifiziert"
    try{ renderStep(); }catch(e){} };
  /* Im Finder zeigen — genau das, was nachweislich Duplikat ist.
     Vorher wurde der gemeinsame Oberordner ALLER Duplikate geoeffnet; liegen die
     verstreut, klettert der bis fast zur Plattenwurzel und man landet auf zwei
     Platten an voellig verschiedenen Stellen. Jetzt: ist der ganze Ordner das
     Duplikat, wird DER Ordner markiert — sonst die einzelnen identischen Dateien,
     jeweils in einem NEUEN Finder-Fenster. */
  const revealOn=async d=>{
    const api=window.diskyNative||{};
    const m=driveMount[d];
    if(!m){ try{ toast(t("map_need_mount")); }catch(e){} return; }
    const base=m.replace(/\/$/,"");
    const alle=filesByDrive.get(d)||[];
    /* nur was per Pruefsumme auf mindestens zwei Platten liegt */
    const gleich=alle.filter(f=>{ if(!f.hash) return false;
      const hd=hashDrives.get(f.hash); return !!hd && hd.size>=2; });
    if(api.revealMany && gleich.length){
      const ordner=new Set(gleich.map(f=>{ const i=f.path.lastIndexOf("/"); return i>0?f.path.slice(0,i):""; }));
      const loc=_dupLoc.get(d);
      let ziele, ganzerOrdner=false;
      if(ordner.size===1 && loc && loc!=="" && gleich.length===alle.length){
        ziele=[base+"/"+loc]; ganzerOrdner=true;     /* der Ordner SELBST ist das Duplikat */
      } else {
        ziele=gleich.slice(0,200).map(f=>base+"/"+f.path);
      }
      const r=await api.revealMany(ziele);
      if(r&&r.ok){
        try{
          if(ganzerOrdner) toast(_bwL("Ordner im Finder markiert.","Folder selected in Finder."));
          else if(r.ersatz) toast(_bwL("Finder liess sich nicht steuern — zeige die erste identische Datei.","Could not drive Finder — showing the first identical file."));
          else {
            const rest = gleich.length>r.gezeigt ? _bwL(" · "+(gleich.length-r.gezeigt)+" nicht mehr vorhanden","") : "";
            const mehr = (r.ordner>r.fenster) ? _bwL(" · "+(r.ordner-r.fenster)+" weitere Ordner nicht geoeffnet","") : "";
            toast(_bwL(r.gezeigt+" identische Dateien markiert"+(r.fenster>1?" in "+r.fenster+" Fenstern":"")+rest+mehr,
                       r.gezeigt+" identical files selected"));
          }
        }catch(e){}
        return;
      }
      try{ toast(_bwL("Nichts davon liegt noch dort — Disky liest die Platte neu ein.","None of it is there any more — Disky is refreshing this drive.")); }catch(e){}
      markStale(d); return;
    }
    /* Kein Nachweis vorhanden (Platte ohne Pruefsummen): ehrlich sagen, dass nur
       der Ablageort gezeigt wird, nicht die geprueften Duplikate. */
    const p=_dupPathOn(d);
    if(!p){ try{ toast(t("map_need_mount")); }catch(e){} return; }
    if(api.revealSmart){
      const r=await api.revealSmart(p);
      if(!r||!r.ok){ try{ toast(_bwL("Ordner nicht gefunden — Disky liest die Platte neu ein.","Folder not found — Disky is refreshing this drive.")); }catch(e){} markStale(d); }
      else if(!r.exact){ try{ toast(_bwL("Der Ordner liegt dort nicht mehr — zeige den naechsten vorhandenen. Disky aktualisiert die Platte.","That folder is gone — showing the closest existing one. Disky is refreshing this drive.")); }catch(e){} markStale(d); }
      else { try{ toast(_bwL("Diese Platte hat keine Pruefsummen — gezeigt wird nur der Ablageort, nicht geprueft.","No checksums on this drive — showing the location only, unverified.")); }catch(e){} }
    } else if(api.reveal){ api.reveal(p); } };
  async function _checkGhosts(){ const api=window.diskyNative||{}; if(!api.pathExists) return;
    // ECHTE Katalog-Dateien proben, nicht den abgeleiteten Sammelpfad: bei verschachtelten/umbenannten Kopien
    // oder Wurzel-Karten hat der a.name-Fallback dort nie existiert → falscher VERALTET-Stempel + sinnloser Rescan.
    for(const d of drivesArr){ const m=driveMount[d]; if(!m) continue;
      const arr=filesByDrive.get(d)||[]; if(!arr.length) continue;
      const base=m.replace(/\/$/,"");
      const samples=[...new Set([arr[0],arr[Math.floor(arr.length/2)],arr[arr.length-1]].filter(Boolean).map(x=>x.path))];
      let any=false;
      for(const rel of samples){ try{ if(await api.pathExists(base+"/"+rel)){ any=true; break; } }catch(e){ any=true; break; } }   // Fehler = unklar → NIE als Geist werten
      if(!any) markStale(d); } }
  let keep=recommend;   // Vorschlag = reichste Version behalten
  let step=0;
  const ov=document.createElement("div"); ov.className="overlay";
  const subTxt=_bwL(`${human(a.dupSize)} identisch · ${t("dc_files",nloc(fileCount))} · auf ${drivesArr.length} ${drivesArr.length===1?"Platte":"Platten"}`,
                    `${human(a.dupSize)} identical · ${t("dc_files",nloc(fileCount))} · on ${drivesArr.length} ${drivesArr.length===1?"drive":"drives"}`);
  ov.innerHTML=`<div class="modal dupmodal dupwalk">
    <button class="x" id="dmx" aria-label="${t("c_close")}">✕</button>
    <div class="dm-head"><span class="dm-ic">${a.whole?FOLDER_SVG:FILES_SVG}</span>
      <div><div class="dm-name">${esc(projName(a.name))}${a.whole?` <span class="df-badge">${t("dup_whole_badge")}</span>`:""}</div>
        <div class="dm-sub">${subTxt}</div></div></div>
    <div class="dw-steps"><span class="dw-dot"></span><span class="dw-dot"></span><span class="dw-dot"></span></div>
    <div class="dw-stage" id="dwStage"></div>
    <div class="dw-foot" id="dwFoot"></div></div>`;
  document.body.appendChild(ov);
  const onEsc=e=>{ if(e.key==="Escape") close(); };
  let releasing=false, _walkFinished=false;   // _walkFinished: Fertig-Screen steht — späte Geister-Meldungen dürfen ihn nicht überschreiben
  const close=()=>{ if(releasing) return; document.removeEventListener("keydown",onEsc); ov.remove(); };
  ov.onclick=e=>{ if(e.target===ov) close(); };
  ov.querySelector("#dmx").onclick=close;
  document.addEventListener("keydown",onEsc);
  const stage=ov.querySelector("#dwStage"), footEl=ov.querySelector("#dwFoot"), dots=[...ov.querySelectorAll(".dw-dot")];
  const foot=html=>{ footEl.innerHTML=html; };
  const relCands=()=>drivesArr.filter(d=>d!==keep&&connOf(d)&&!sealedOn.has(d)&&!staleOn.has(d));   // versiegelte + veraltete (Ordner weg) Kopien sind nie Löschkandidaten
  const szTxt=d=>{ const s=statOf(d); const xs=xstat.get(d)||{bytes:0,count:0}; const loc=_dupLoc.get(d);
    const other=(loc!=null && loc!=="" && loc!==a.name && topFolder(loc+"/x")!==a.name);
    const xTag=(s.bytes>0&&xs.bytes>0)?` · <b style="color:#8ff0bb" title="${_bwL('per Prüfsumme auch auf einer anderen Platte nachgewiesen','verified by checksum on another drive too')}">${human(Math.min(xs.bytes,s.bytes))} ${_bwL("identisch","identical")}</b>`:"";
    return `${nloc(s.count)} · ${human(s.bytes)}${xTag}${other?` <span class=\"muted\" style=\"font-size:10.5px\" title=\"${esc(loc)}\">· in ${esc(loc)}</span>`:""}`; };
  function renderStep(){
    dots.forEach((d,i)=>{ d.className="dw-dot"+(i<step?" done":i===step?" on":""); });
    if(step===0){
      /* Deckung zuerst: die Zeile selbst soll sagen, ob ihr Inhalt vollständig
         woanders liegt — dafür braucht es das Ergebnis vor dem Zeilenbau. */
      const _deckung=new Map();
      for(const d of drivesArr){ if(d===recommend||statOf(d).bytes<=0) continue;
        const cs=shareStat(recommend,d); _deckung.set(d, _fullyCovered(cs,d)?null:cs); }
      const rows=drivesArr.map(d=>{ const c=connOf(d), sl=sealedOn.has(d), st=staleOn.has(d), isR=(d===recommend&&(clearWinner||sl));
        const badge = st?`<span class="dw-rec" style="color:#ffc861;border-color:rgba(90,175,255,.4)">${_bwL("Veraltet — wird neu eingelesen","Stale — refreshing")}</span>`
          : sl?`<span class="dw-rec" style="color:#7dd6ff;border-color:rgba(90,170,255,.45)">${PIC.shield} ${_bwL("Versiegelt","Sealed")}</span>`:(isR?`<span class="dw-rec">★ ${_bwL("Größte","Biggest")}</span>`:"");
        return `<div class="dw-copy${isR?" rec":""}${c?" clickable":" off"}"${c?` data-reveal="${esc(d)}" title="${_bwL('Ordner auf dieser Platte im Finder zeigen','Show the folder on this drive in Finder')}"`:""}><span class="dwd-dot${c?" on":""}"></span><span class="dwd-nm">${esc(d)}</span><span class="dwd-sz">${szTxt(d)}</span>${(_deckung.has(d)&&_deckung.get(d)===null)?`<span class="dwd-voll" title="${_bwL('Alles hier liegt nachweislich auch auf der Behalter-Platte','Everything here provably exists on the keeper drive too')}">${_bwL("ganz enthalten","fully contained")}</span>`:""}${badge}${c?`<span class="dw-open">${OIC}</span>`:""}</div>`; }).join("");
      const tagChips=[...contentTags].map(x=>`<span class="dw-ctag">${esc(x)}</span>`).join("");
      const whyKeep = !(sealedOn.has(recommend)||clearWinner) ? "" : sealedOn.has(recommend)
        ? `<div class="dw-why">${STAR}<span>${_bwL(`<b>${esc(recommend)}</b> trägt das <b>Disky-Siegel</b> — die nachweislich vollständige Projekt-Sammlung${sealedOn.get(recommend)?` („${esc(sealedOn.get(recommend))}")`:""}. Diese Kopie bleibt; versiegelte Ordner sind vor dem Löschen geschützt.`,`<b>${esc(recommend)}</b> carries the <b>Disky seal</b> — the verified-complete project gather${sealedOn.get(recommend)?` (“${esc(sealedOn.get(recommend))}”)`:""}. This copy stays; sealed folders are protected from deletion.`)}</span></div>`
        : clearWinner
        ? `<div class="dw-why">${STAR}<span>${_bwL(`<b>${esc(recommend)}</b> ist die größte Kopie — ${nloc(sr.count)} Dateien · ${human(sr.bytes)}${tagChips?", mit ":""}`,`<b>${esc(recommend)}</b> is the biggest copy — ${nloc(sr.count)} files · ${human(sr.bytes)}${tagChips?", with ":""}`)}${tagChips}${_bwL(" Wahrscheinlich die <b>Arbeitsversion</b> — behalte diese; die anderen sind schlankere Backups."," Likely the <b>working copy</b> — keep this one; the others are leaner backups.")}</span></div>`
        : "";
      const h=_bwL(`${human(a.dupSize)} liegen identisch auf ${drivesArr.length} Platten`,`${human(a.dupSize)} of identical content on ${drivesArr.length} drives`);
      const p=_bwL(`Per <b>Prüfsumme</b> (echter Inhalt) nachgewiesen — nicht nur am Namen. Jede Zeile zeigt den <b>gesamten</b> Ordnerinhalt dieser Platte; <b style="color:#8ff0bb">grün</b> ist der Anteil, der nachweislich auch woanders liegt. Freigegeben wird später nur nachweislich Doppeltes — alles andere fasst Disky nicht an.`,
                   `Verified by <b>checksum</b> (actual content), not just the name. Each row shows that drive's <b>entire</b> folder; <b style="color:#8ff0bb">green</b> is the share that provably also exists elsewhere. Only verified duplicates ever get released — Disky never touches the rest.`);
      const note=_bwL("Jetzt wird nichts gelöscht. Im nächsten Schritt wählst du, welche Kopie bleibt.","Nothing is deleted now. Next you choose which copy stays.");
      // Deckungs-Klartext: verliert man beim Freigeben der schlankeren Kopien etwas? (max. 3 Zeilen)
      /* Nur der Fall, der eine Entscheidung ändert: etwas liegt NUR hier.
         „Vollständig enthalten" ist der Normalfall und steht als Marke an
         der Zeile selbst, nicht als eigener Kasten. */
      const warnRows=[..._deckung.entries()].filter(([d,cs])=>cs!==null)
        .map(([d,cs])=>({d,cs})).sort((x,y)=>y.cs.uniq-x.cs.uniq).slice(0,2)
        .map(({d,cs})=>`<div class="dw-note" style="background:rgba(90,175,255,.07);border-color:rgba(90,175,255,.28)"><span style="color:#ffc861">${IIC}</span><span>${_bwL(`<b>${human(cs.uniq)}</b> auf „${esc(d)}" gibt es nur dort — bleibt unangetastet.`,`<b>${human(cs.uniq)}</b> on “${esc(d)}” exists only there — stays untouched.`)}</span></div>`).join("");
      /* Datei-KLARTEXT: WAS genau ist identisch? Nie raten lassen — jede Zeile = ein Inhalt,
         Chips = seine Kopien; Klick markiert DIE DATEI im Finder (nicht nur den Ordner). */
      const fileList=(()=>{
        /* Quelle = crossByDrive (plattenweite Prüfsummen-Sammlung): findet auch Kopien, die auf der
           anderen Platte in einem ANDERS benannten/verschachtelten Ordner liegen — genau die Fälle,
           in denen man sonst rätselt, wo das Duplikat steckt. Fallback: a.items (ohne Hash). */
        const byHash=new Map();
        for(const [lbl,arr] of crossByDrive){ for(const x of arr){ if(!x.hash) continue;
          let g=byHash.get(x.hash); if(!g){ g={size:x.size||0,copies:[]}; byHash.set(x.hash,g); }
          g.copies.push({drive:lbl,path:x.path,size:x.size||0}); } }
        if(!byHash.size) for(const it of a.items){ const k=it.hash||("p:"+it.path+":"+it.size);
          let g=byHash.get(k); if(!g){ g={size:it.size||0,copies:[]}; byHash.set(k,g); } g.copies.push(it); }
        const groups=[...byHash.values()].filter(g=>g.copies.length>=2).sort((x,y)=>y.size-x.size);
        if(!groups.length) return "";
        const CAP=50;
        const rws=groups.slice(0,CAP).map(g=>{
          const nm=(g.copies[0].path||"").split("/").pop()||"?";
          const chips=g.copies.slice(0,4).map(c=>{ const on=connOf(c.drive)&&driveMount[c.drive];
            return `<button class="dwf-go${on?"":" off"}"${on?` data-fd="${esc(driveMount[c.drive])}" data-fp="${esc(c.path)}"`:""} title="${esc(c.drive)} · ${esc(c.path)}">${esc(c.drive)}</button>`; }).join("");
          const onc=g.copies.find(c=>connOf(c.drive)&&driveMount[c.drive]);
          const th=(onc&&isMediaExt(thExt(nm)))?`<span class="dwf-th" data-tfull="${esc(driveMount[onc.drive].replace(/\/$/,"")+"/"+onc.path)}"></span>`:"";
          return `<div class="dwf-row">${th}<span class="dwf-nm" title="${esc(g.copies[0].path||"")}">${esc(nm)}</span><span class="dwf-sz">${human(g.size)}</span>${chips}</div>`;
        }).join("");
        const more=groups.length>CAP?`<div class="dwf-more">… ${_bwL(`${nloc(groups.length-CAP)} weitere`,`${nloc(groups.length-CAP)} more`)}</div>`:"";
        const label=_bwL(groups.length===1?"Diese Datei ist identisch — ansehen":`Diese ${nloc(groups.length)} Dateien sind identisch — ansehen`,
                         groups.length===1?"See the identical file":`See the ${nloc(groups.length)} identical files`);
        return `<details class="dwf"${groups.length<=4?" open":""}><summary>${label}</summary><div class="dwf-list">${rws}${more}</div></details>`;
      })();
      /* Nur was wirklich hin muss. Die Kopfzeile trägt Name, Größe und
         Plattenzahl bereits — Überschrift und Erklärabsatz wiederholten das
         nur. Der Prüfsummen-Hinweis steht im Seitenkopf. Die „vollständig
         enthalten"-Bestätigungen sind jetzt kleine Marken AN den Zeilen,
         als eigene Kästen waren es vier Blöcke für vier Selbstverständ-
         lichkeiten. Übrig bleibt, was eine Entscheidung ändern kann:
         eine echte Warnung, wenn etwas NICHT gedeckt ist. */
      stage.innerHTML=`<div class="dw-diagram"><span class="dw-fold">${FOLDER_SVG}</span><div class="dw-links">${rows}</div></div>
        ${warnRows}${whyKeep}${fileList}`;
      try{ thumbLazy(stage); }catch(e){}
      stage.querySelectorAll(".dwf-go[data-fp]").forEach(el=>el.onclick=ev=>{ ev.stopPropagation();
        const api=window.diskyNative||{}; const full=el.dataset.fd.replace(/\/$/,"")+"/"+el.dataset.fp;
        if(api.reveal) api.reveal(full); else if(api.revealSmart) api.revealSmart(full); });
      stage.querySelectorAll(".dw-copy[data-reveal]").forEach(el=>el.onclick=()=>revealOn(el.dataset.reveal));   // Klick auf verbundene Platte → Ordner im Finder
      // Weiter NUR möglich, wenn ≥2 dieser Platten verbunden UND aktuell sind (eine behalten + mind. eine freigeben)
      const connCount=drivesArr.filter(d=>connOf(d)&&!staleOn.has(d)).length, canGo=connCount>=2;
      const blockHint = canGo ? "" : `<span class="dwp-meta" style="color:#ffc861">${_bwL(`Schließe mind. 2 dieser Platten an (aktuell ${connCount}), um ein Duplikat freizugeben.`,`Connect at least 2 of these drives (currently ${connCount}) to release a duplicate.`)}</span>`;
      const ruhe=`<span class="dwp-meta">${_bwL("Es wird noch nichts gelöscht.","Nothing is deleted yet.")}</span>`;
      foot(`${blockHint||ruhe}<div class="dw-spacer"></div><button class="dw-btn prim" id="dwNext" ${canGo?"":"disabled"}>${_bwL("Weiter","Continue")} →</button>`);
      const _nx0=ov.querySelector("#dwNext"); if(_nx0 && canGo) _nx0.onclick=()=>{ step=1; renderStep(); };
    } else if(step===1){
      const rows=drivesArr.map(d=>{ const c=connOf(d), sl=sealedOn.has(d), st=staleOn.has(d), isKeep=(d===keep), isR=(d===recommend&&(clearWinner||sl)), willrel=(!isKeep&&c&&!sl&&!st);
        const tag = isKeep ? `<span class="dwp-tag keep">✓ ${_bwL("BEHALTEN","KEEP")}</span>`
                  : st ? `<span class="dwp-tag off" style="color:#ffc861">${_bwL("VERALTET","STALE")}</span>`
                  : sl ? `<span class="dwp-tag off" style="color:#7dd6ff">${PIC.shield} ${_bwL("GESCHÜTZT","PROTECTED")}</span>`
                  : c ? `<span class="dwp-tag rel">${PIC.trash} ${_bwL("LÖSCHEN","DELETE")}</span>`
                  : `<span class="dwp-tag off">${_bwL("OFFLINE","OFFLINE")}</span>`;
        // Verlust-Klartext direkt an der Lösch-Zeile: was hat diese Platte, das der Behalter NICHT hat?
        const cs=willrel?shareStat(keep,d):null;
        const uniqTag=(cs&&!_fullyCovered(cs,d))?`<span style="flex:0 0 auto;font-size:10.5px;color:#ffc861" title="${_bwL('Diese Dateien fasst Disky beim Freigeben nicht an','Disky won’t touch these when releasing')}">${human(cs.uniq)} ${_bwL("nur hier","only here")}</span>`:"";
        return `<button class="dw-pickrow${isKeep?" sel":""}${willrel?" willrel":""}${isR?" rec":""}" data-d="${esc(d)}"${st?` data-stale="1"`:""}>
          <span class="dwp-radio"></span><span class="dwp-dot${c?" on":""}"></span>
          <span class="dwp-nm">${isR?`<span style="color:#8ff0bb">★</span> `:""}${esc(d)}</span>
          <span class="dwp-meta">${szTxt(d)}</span>${uniqTag}${tag}${c?`<span class="dw-open" data-reveal="${esc(d)}" title="${_bwL('Ordner im Finder zeigen','Show folder in Finder')}">${OIC}</span>`:""}</button>`; }).join("");
      const h=_bwL("Welche Kopie behalten?","Which copy to keep?");
      /* Kein Erklärabsatz mehr: die Zeilen tragen BEHALTEN/LÖSCHEN/OFFLINE
         selbst, das Wiederholen in Prosa war reine Wand. */
      stage.innerHTML=`<div class="dw-h">${h}</div><div class="dw-pick">${rows}</div>`;
      stage.querySelectorAll(".dw-pickrow").forEach(b=>b.onclick=()=>{ if(b.dataset.stale){ try{ toast(_bwL("Diese Kopie ist veraltet (Ordner nicht mehr gefunden) — Disky liest die Platte gerade neu ein.","This copy is stale (folder no longer found) — Disky is refreshing the drive.")); }catch(e){} return; } keep=b.dataset.d; renderStep(); });
      stage.querySelectorAll(".dw-pickrow .dw-open[data-reveal]").forEach(el=>el.onclick=ev=>{ ev.stopPropagation(); revealOn(el.dataset.reveal); });   // ↗ → Ordner im Finder (ohne die Auswahl zu ändern)
      const rc=relCands().length;
      const hint=rc?"":`<span class="dwp-meta">${_bwL("Schließe eine zweite Platte an, um freizugeben.","Connect a second drive to release.")}</span>`;
      foot(`<button class="dw-btn" id="dwBack">← ${_bwL("Zurück","Back")}</button>${hint}<div class="dw-spacer"></div><button class="dw-btn prim" id="dwNext" ${rc?"":"disabled"}>${_bwL("Weiter","Continue")} →</button>`);
      ov.querySelector("#dwBack").onclick=()=>{ step=0; renderStep(); };
      const nx=ov.querySelector("#dwNext"); if(nx&&!nx.disabled) nx.onclick=()=>{ step=2; renderStep(); };
    } else {
      // NUR verifiziert Freigebbares versprechen (hash+size mit Gegenstück auf dem Behalter) — exakt was doRelease
      // nachher trasht. Vorher stand hier der KOMPLETTE Ordnerinhalt der Platte im Lösch-Button: eine Lüge,
      // sobald die Kopie auch Einzelstücke trug (die Disky korrekt liegen lässt).
      const rel=relCands(); let relBytes=0, relFiles=0, leftB=0, leftC=0;
      rel.forEach(d=>{ const cs=shareStat(keep,d); relBytes+=cs.shared; relFiles+=cs.sharedCount; leftB+=cs.uniq; leftC+=cs.uniqCount; });
      const keepIsRich=(keep===recommend&&clearWinner);
      const keepRow=`<div class="dw-copy keep"><span class="dwd-dot on"></span><span class="dwd-nm">${esc(keep)}</span><span class="dwd-sz">${szTxt(keep)}</span><span class="dwd-tag">${keepIsRich?"★ "+_bwL("Behalten","Keep"):_bwL("Behalten","Keep")}</span></div>`;
      const relRows=rel.map(d=>`<div class="dw-copy rel"><span class="dwd-dot on"></span><span class="dwd-nm">${esc(d)}</span><span class="dwd-sz">${szTxt(d)}</span><span class="dwd-tag">${_bwL("Freigeben","Release")}</span></div>`).join("");
      const sum=_bwL(`Behalten auf <b>${esc(keep)}</b>${keepIsRich?" (größte Version)":""}. Zur Prüfung: bis zu <b>${human(relBytes)}</b> (${nloc(relFiles)} ${_bwL("Dateien","files")}) auf ${rel.length} ${rel.length===1?"Platte":"Platten"} — Kandidaten aus dem Katalog. Vor dem Papierkorb werden beide Dateien vollständig verglichen.`,
                     `Keeping on <b>${esc(keep)}</b>${keepIsRich?" (biggest copy)":""}. Checking up to <b>${human(relBytes)}</b> (${nloc(relFiles)} files) on ${rel.length} ${rel.length===1?"drive":"drives"} — catalog candidates. Both files are fully compared before moving anything to Trash.`);
      const leftNote=leftC>0?`<div class="dw-note"><span>${IIC}</span><span>${_bwL(`<b>${nloc(leftC)} Dateien (${human(leftB)})</b> haben keinen passenden Katalogeintrag auf „${esc(keep)}" — sie bleiben unangetastet liegen.`,`<b>${nloc(leftC)} files (${human(leftB)})</b> have no matching catalog entry on “${esc(keep)}” — they stay untouched.`)}</span></div>`:"";
      const warn=(keep!==recommend&&clearWinner)?`<div class="dw-note" style="background:rgba(90,175,255,.08);border-color:rgba(90,175,255,.28)"><span style="color:#ffc861">${IIC}</span><span>${_bwL(`Achtung: <b>${esc(recommend)}</b> ist die größere Version — du behältst gerade eine schlankere Kopie.`,`Heads up: <b>${esc(recommend)}</b> is the bigger copy — you're keeping a leaner one.`)}</span></div>`:"";
      const note=_bwL("Freigegebene Dateien wandern in den <b>Papierkorb</b> deines Macs — wiederherstellbar, bis du ihn leerst.","Released files go to your Mac's <b>Trash</b> — recoverable until you empty it.");
      // SICHER GEHEN, BEVOR GELÖSCHT WIRD: enthält der Behalter Projekte, erst „sammeln & versiegeln" anbieten.
      // Danach ist bewiesen, dass alle genutzten Medien beisammen sind — und das Siegel schützt den Ordner vorm Löschen.
      const kProj=projByDrive.get(keep)||[];
      const gatherCard = kProj.length ? `<div class="dw-gsafe">
          <span class="dw-gsafe-ic">${PIC.clap}</span>
          <span class="dw-gsafe-tx"><b>${_bwL(`${nloc(kProj.length)} ${kProj.length===1?"Projekt":"Projekte"} in „${esc(keep)}" gefunden`,`${nloc(kProj.length)} project${kProj.length===1?"":"s"} found in “${esc(keep)}”`)}</b>
            <span>${_bwL("Disky kann erkannte Medienreferenzen sammeln und den Ordner versiegeln. Prüfe anschließend den Bericht und öffne das Projekt zur Kontrolle. Ein Siegel ersetzt keine unabhängige Sicherung.","Disky can gather recognized media references and seal the folder. Review the report and open the project to check it afterwards. A seal does not replace an independent backup.")}</span></span>
          <button class="dw-btn" id="dwGather">${_bwL("Projekt sammeln","Gather project")} →</button>
        </div>` : "";
      stage.innerHTML=`<div class="dw-h">${_bwL("Freigeben & Platz zurückholen","Release & reclaim space")}</div>
        <p class="dw-relsum">${sum}</p><div class="dw-links">${keepRow}${relRows}</div>${warn}${leftNote}
        ${gatherCard}
        <div class="dw-note">${IIC}<span>${_bwL("Identische Kopien auf anderen Platten können deine Sicherung sein. Beim Freigeben reduzierst du diese Redundanz. Behalte eine unabhängige Sicherung, wenn du sie brauchst.","Identical copies on other drives may be your backup. Releasing them reduces that redundancy. Keep an independent backup when you need one.")}</span></div>
        <div class="dw-note">${IIC}<span>${note}</span></div><div class="dw-prog hide" id="dwProg"><i></i></div>`;
      const _noRel=relBytes<=0;
      const _noRelHint=_noRel?`<span class="dwp-meta" style="color:#ffc861">${_bwL(`Nichts nachweislich doppelt: Auf den Lösch-Platten liegt keine Datei, die es auch auf „${esc(keep)}" gibt.`,`Nothing verifiably duplicated: the delete drives hold no file that also exists on “${esc(keep)}”.`)}</span>`:"";
      foot(`<button class="dw-btn" id="dwBack">← ${_bwL("Zurück","Back")}</button>${_noRelHint}<div class="dw-spacer"></div><button class="dw-btn danger" id="dwGo" ${_noRel?"disabled":""}>${_bwL("In den Papierkorb","Move to Trash")} · ${human(relBytes)}</button>`);
      ov.querySelector("#dwBack").onclick=()=>{ step=1; renderStep(); };
      const _go=ov.querySelector("#dwGo"); if(_go&&!_noRel) _go.onclick=()=>doRelease(rel);
      const gb=ov.querySelector("#dwGather");
      if(gb) gb.onclick=async()=>{
        if(releasing) return;   // close() ist während der Freigabe ein No-Op — sonst startet das Sammeln MITTEN im Trashen
        const mnt=driveMount[keep];
        if(!mnt){ try{ toast(_bwL(`Platte „${keep}" anstecken.`,`Plug in “${keep}”.`)); }catch(e){} return; }
        let pick=kProj[0];
        if(kProj.length>1){
          const lines=kProj.slice(0,12).map((p,i)=>`${i+1}. ${p.name} (${p.app})`).join("\n");
          const go=await uiConfirm(_bwL("Projekt sammeln","Gather project"),
            _bwL(`Gefundene Projekte:\n${lines}\n\nDisky sammelt das neueste zuerst — du kannst die anderen danach genauso sammeln.`,
                 `Projects found:\n${lines}\n\nDisky gathers the newest first — you can gather the others the same way afterwards.`),
            _bwL("Weiter","Continue"));
          if(!go) return;
        }
        close();   // Walkthrough schließen; nach dem Sammeln kann der Nutzer erneut freigeben
        projectGatherFlow(mnt.replace(/\/$/,"")+"/"+pick.rel);
      };
    }
  }
  async function doRelease(){toast(_bwL('Beispielvorschau — keine Dateien werden verändert.','Sample preview — no files are changed.'));}

  renderStep();
  _checkGhosts();   // async im Hintergrund: verbundene Platten auf Geister-Ordner prüfen → markiert Zeilen als VERALTET + stößt Update-Scan an
}

async function renderDupes(){
  const my=++_dupSeq;   // Generation-Token gegen Clobbern nach schnellem View-Wechsel
  const drives = await getAll("drives");
  if(my!==_dupSeq || view!=="dupes") return;   /* auch der Leer-Fall unten schreibt in #app — der Schutz gehoert VOR den ersten Schreibzugriff, nicht erst vor den grossen */
  if(!drives.length){ app.innerHTML = emptyState(); return; }
  const byId = Object.fromEntries(drives.map(d=>[d.id,d.label]));
  const _conn = await (window.diskyNative?getVolumes():Promise.resolve([])).catch(()=>[]);
  const driveMount = {};
  for(const d of drives){ const v=liveVolFor(d,_conn); if(v) driveMount[d.label]=v.mount; }   // UUID-first wie überall — gleichnamige Zweitplatte darf die Chips/Reveals nicht kapern
  // MEMOIZATION: die schwere Analyse (3 Pässe über ~1,6 Mio Dateien) nur neu rechnen, wenn sich der Katalog geändert
  // hat. Re-Open des Duplicate Finders bei unverändertem Bestand = SOFORT (kein allFiles, keine Pässe). driveMount
  // (Verbindungs-Status der Chips) wird separat oben frisch ermittelt und fließt erst beim DOM-Bau ein.
  const _dsig = catVer()+"|"+drives.map(d=>d.id+":"+d.label).join(",");   // catVer ueberlebt Neustarts — sonst war jeder Kaltstart ein Cache-Miss
  let folders, totalCross;
  if(_dupCache && _dupCache.sig===_dsig){ folders=_dupCache.folders; totalCross=_dupCache.totalCross; }
  else {
    // Persistierter Stand aus der DB (Sets ueberleben den Structured Clone). Trifft die
    // Signatur, entfaellt der komplette 1,7-Mio-Durchlauf beim Kaltstart.
    try{ const row=await new Promise((res)=>{ const tr=tx(["dupes"],"readonly"); const g=tr.objectStore("dupes").get("v7");
        g.onsuccess=()=>res(g.result||null); g.onerror=()=>res(null); tr.onabort=()=>res(null); });
      if(row && row.sig===_dsig && Array.isArray(row.folders)){
        folders=row.folders; totalCross=row.totalCross||0;
        _dupCache={sig:_dsig, folders, totalCross};
      }
    }catch(e){}
  }
  if(!folders){
    const files = await allFiles();
    if(my!==_dupSeq || view!=="dupes") return;
    const MIN = 1024*1024; // 1 MB
    const map = new Map(), folderTotal = new Map();
    const fbd = new Map(), dbd = new Map();   // "Ordner\0Platte" → Bytes gesamt / Bytes nachweislich doppelt
    const cardDriveIds = new Set(drives.filter(d=>driveCategory(d)==="card").map(d=>d.id));   // SD-Karten transient → nicht in die Cross-Drive-Logik
    for(let _i=0;_i<files.length;_i++){ const f=files[_i];   // EIN Pass: Hash-Gruppen + Ordner-Gesamtzahl zugleich (statt zwei)
      if(_i && (_i & 65535)===0){ await _raf(); if(my!==_dupSeq || view!=="dupes") return; }   // alle 64k dem Event-Loop überlassen → kein Freeze
      const tk=topFolder(f.relPath); folderTotal.set(tk,(folderTotal.get(tk)||0)+1);
      /* Bytes je Ordner UND Platte — Grundlage für die ehrliche Deckung:
         wie viel von dem, was dort liegt, ist nachweislich auch woanders. */
      if(!cardDriveIds.has(f.driveId)){ const _fk=tk+"\u0000"+(byId[f.driveId]||"?");
        fbd.set(_fk,(fbd.get(_fk)||0)+(f.size||0)); }
      if(!f.hash || (f.size||0)<MIN || cardDriveIds.has(f.driveId)) continue;
      const k=fkey(f); let g=map.get(k); if(!g){ g={size:f.size,copies:[]}; map.set(k,g); }
      g.copies.push(f);
    }
    const idx = copyIndex(files);
    const reclaimSeen = new Map();
    const agg = new Map(); // topFolder → {name, dup, reclaim, drives:Set, items:[]}
    for(const g of map.values()){
      if(g.copies.length<2) continue;
      const D=new Set(g.copies.map(f=>f.driveId)).size;
      const groupDrives=[...new Set(g.copies.map(f=>byId[f.driveId]||"?"))];
      const touched=new Set();
      g.copies.forEach((f)=>{
        const role=copyRole(f, idx, reclaimSeen);   // 'waste' (Same-Drive-Extra) | 'backup' (≥2 Platten) | 'only'
        const k=topFolder(f.relPath); touched.add(k);
        let a=agg.get(k); if(!a){ a={name:k, dup:0, reclaim:0, dupSize:0, drives:new Set(), items:[], crossDrive:false}; agg.set(k,a); }
        a.dup++; groupDrives.forEach(d=>a.drives.add(d));
        if(role==='waste'){ a.reclaim += f.size||0; }
        a.items.push({drive:byId[f.driveId]||"?", driveId:f.driveId, path:f.relPath, size:f.size||0, redundant:role==='waste', role, hash:f.hash});   // totes `copies`-Feld gestrichen (nirgends gelesen) → kein O(N²)-Klon pro Gruppe mehr
      });
      if(D>=2){ for(const k of touched){ const a=agg.get(k); if(a){ a.crossDrive=true; a.dupSize += g.size||0; a.xfiles=(a.xfiles||0)+1;
          /* KERNURSACHE des falschen Finder-Sprungs: `a.drives` wird aus dem
             Prüfsummen-Treffer gefüllt (alle Platten mit diesem Inhalt), aber
             `a.items` nur aus Dateien, deren OBERORDNER dem Kartennamen
             entspricht. Liegt dieselbe Datei auf Platte B unter einem anderen
             Oberordner, stand B auf der Karte — ohne dass die Karte einen Ort
             auf B kannte. Genau diese Lücke füllte vorher `a.name`.
             Deshalb: für JEDE beteiligte Platte den echten Katalogpfad merken. */
          /* ANKER statt „irgendein Duplikat": vorher bekam jede Platte den
             Pfad des ERSTEN Treffers, den sie zufällig hatte — aus womöglich
             verschiedenen Prüfsummen-Gruppen. Beide Chips zeigten dann auf
             echte Duplikate, aber auf VERSCHIEDENE Inhalte, und man landete
             in unterschiedlichen Ordnern. Jetzt entscheidet EINE Gruppe für
             die ganze Karte: die, die über die meisten Platten reicht (bei
             Gleichstand die größte Datei). Alle Chips zeigen damit auf
             DENSELBEN Inhalt. */
          const _spanne=new Set(g.copies.map(f2=>f2.driveId)).size, _gr=g.size||0;
          if(!a._ankSp || _spanne>a._ankSp || (_spanne===a._ankSp && _gr>a._ankGr)){
            a._ankSp=_spanne; a._ankGr=_gr; a.ort={};
            for(const f2 of g.copies){ const _l=byId[f2.driveId]||"?"; if(a.ort[_l]==null) a.ort[_l]=f2.relPath; } }
          /* Rückfall für Platten, die den Anker-Inhalt nicht haben */
          a._any=a._any||{};
          for(const f2 of g.copies){ const _l=byId[f2.driveId]||"?"; if(a._any[_l]==null) a._any[_l]=f2.relPath; }
        } }
        for(const f of g.copies){ const _fk=topFolder(f.relPath)+"\u0000"+(byId[f.driveId]||"?");
          dbd.set(_fk,(dbd.get(_fk)||0)+(f.size||0)); } }   // dieselbe Datei auf ≥2 Platten → echtes Cross-Drive-Duplikat. xfiles zählt INHALTE (1× pro Gruppe) — a.dup zählt Kopien und stand als „21 Dateien" neben „6 · 40 GB"-Zeilen: unerklärbar.
    }
    folders=[...agg.values()];
    folders.forEach(a=>{ a.total=folderTotal.get(a.name)||a.dup;
      /* Lücken auffüllen und die Buchhaltung des Ankers wegwerfen */
      if(a._any){ a.ort=a.ort||{}; a.ortFb=[];
                  for(const _l in a._any){ if(a.ort[_l]==null){ a.ort[_l]=a._any[_l]; a.ortFb.push(_l); } }
                  delete a._any; }
      delete a._ankSp; delete a._ankGr;
      /* „Ganzer Ordner doppelt" heißt: auf mindestens ZWEI Platten ist der
         Inhalt dieses Ordners fast vollständig auch woanders vorhanden.
         Gemessen in BYTES je Platte. Vorher wurde die Zahl der Kopien gegen
         die Zahl aller Dateien gehalten — inklusive nie geprüfter Winzlinge,
         deshalb schlug das Kennzeichen praktisch nie an. */
      const deck=[];
      for(const d of a.drives){ const _fk=a.name+"\u0000"+d;
        const ges=fbd.get(_fk)||0, dop=dbd.get(_fk)||0;
        if(ges>0) deck.push(Math.min(1,dop/ges)); }
      deck.sort((x,y)=>y-x);
      /* Es zählt die BESTGEDECKTE Platte: liegt der Inhalt dieses Ordners dort
         fast vollständig auch woanders, ist das Projekt doppelt — und genau
         diese Kopie wäre freigebbar. Zu verlangen, dass BEIDE Seiten voll
         gedeckt sind, verfehlt den Fall, dass die zweite Kopie unter einem
         anderen Oberordner liegt (umbenannt, verschachtelt). */
      a.deckung = deck[0]||0;
      a.whole = a.deckung>=0.90; });
    folders = folders.filter(a=>a.crossDrive);   // NUR echte Cross-Drive-Duplikate; intra-Drive → Cleanup-Assistent
    folders.sort((x,y)=>(y.dupSize||0)-(x.dupSize||0));
    totalCross = folders.reduce((s,a)=>s+(a.dupSize||0),0);
    _dupCache={sig:_dsig, folders, totalCross};   // für den nächsten Re-Open cachen
    // Ergebnis persistieren — aber GETRENNT: das Raster braucht nur die schlanken Ordner-Daten
    // (~200 KB, liest sich in Millisekunden). Die Datei-Listen pro Ordner (zusammen ~40 MB)
    // liegen in eigenen Zeilen und werden erst beim Klick auf eine Karte geladen.
    // EINE Transaktion fuer alles: entweder ist der Stand komplett da oder gar nicht.
    try{
      const slim=folders.map(a=>{ const rep={}; for(const it of a.items){ if(rep[it.drive]==null) rep[it.drive]=it.path; }
        const {items, ...rest}=a; return {...rest, rep}; });
      const tr=tx(["dupes"],"readwrite"); const st=tr.objectStore("dupes");
      st.clear();
      st.put({k:"v7", sig:_dsig, folders:slim, totalCross, at:Date.now()});   // v6: `ort` folgt EINEM Anker-Inhalt (gleiche Datei auf allen Platten). v5: Zeilen tragen `ort` (echter Katalogpfad je Platte). v4: Deckung zaehlt die BESTgedeckte Platte (v3 verlangte beide Seiten) — bei jeder Aenderung an der Berechnung MUSS dieser Schluessel hoch, sonst rechnet der Cache mit der alten Regel weiter — alte v1-Zeilen (Kopien-Zählung) nie mehr ausliefern
      for(const a of folders) st.put({k:"f:"+a.name, items:a.items});
    }catch(e){}
  }

  // Suchleiste UNTER dem Titel (Glow-Look). Globale Top-Leiste ist in dieser Ansicht ausgeblendet.
  const SIC=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.75"/><path d="M20 20l-4.8-4.8"/></svg>`;
  if(my!==_dupSeq || view!=="dupes") return;   // veralteten/abgewaehlten Build nicht ins DOM schreiben
  app.innerHTML = ""
    + `<div class="dupsearch"><span class="ds-ic">${SIC}</span>
        <input id="dupQ" type="text" autocomplete="off" spellcheck="false" placeholder="${t("deep_ph")}" value="${esc(q||"")}">
        <button class="ds-x${q?"":" hide"}" id="dupX" title="${t("deep_clear")}" tabindex="-1">✕</button></div>`
    + `<div class="dup-stats">
        <span><b class="amber">${human(totalCross)}</b> ${t("dup_cross_size")}</span><i></i>
        <span><b id="dupCount">${nloc(folders.length)}</b> ${t("dup_folders_label")}</span><i></i>
        <span><b id="dupWholeCnt" class="amber">–</b> ${_bwL("komplett doppelt","duplicated in full")}</span>
        <button class="dup-conn-btn${_dupConnOnly?" on":""}" id="dupConnBtn" title="${_bwL('Nur Duplikate, deren Ordner auf mind. 2 gerade verbundenen Platten liegen — jetzt freiräumbar','Only duplicates whose folder is on 2+ currently-connected drives — removable right now')}"><span class="dcb-dot"></span>${_bwL("Nur verbunden","Connected only")}</button></div>`
    + `<div id="dupBody"></div>`;
  const bodyEl=document.getElementById("dupBody"), FLIMIT=120;
  const card=(a,i)=>{
    const dr=[...a.drives];
    const chips=dr.slice(0,3).map(d=>{
      /* NIE einen Pfad aus dem Gruppennamen ableiten. Der Kartenname ist der
         Ordnername auf IRGENDEINER Platte — auf einer anderen kann derselbe
         Inhalt unter einem ganz anderen Ordner liegen. `|| a.name` erzeugte
         genau dann einen Pfad, den es dort nie gab: Finder sprang in einen
         Ersatz-Ordner oder markierte nichts. Es gilt ausschließlich, was im
         Katalog steht; fehlt das, ist der Chip nicht klickbar. */
      /* Der ANKER hat Vorrang: nur er garantiert, dass alle Chips einer Karte
         auf DENSELBEN Inhalt zeigen. `a.items`/`a.rep` liefern je Platte den
         erstbesten Treffer — auch echt, aber eben nicht dieselbe Datei. */
      const it=(a.items||[]).find(x=>x.drive===d);
      const rel=(a.ort&&a.ort[d]) || (it&&it.path) || (a.rep&&a.rep[d]) || "";
      const kann=!!(driveMount[d]&&rel);
      const titel = !driveMount[d] ? t("cf_noconn_t")
                  : !rel ? _bwL("Für diese Platte steht im Katalog kein Ablageort — bitte neu einlesen.","No location recorded for this drive — please rescan.")
                  : esc(d)+" · "+esc(rel)+((a.ortFb&&a.ortFb.indexOf(d)>=0)?_bwL(" (anderer Inhalt — diese Platte hat die Vergleichsdatei nicht)"," (different content — this drive lacks the reference file)"):"");
      return `<span class="dchip${driveMount[d]?" conn":""}${kann?"":" tot"}"${kann?` data-drive="${esc(d)}" data-file="${esc(rel)}" role="button"`:""} title="${titel}">${esc(d)}</span>`; }).join("")
      + (dr.length>3?`<span class="dchip more">+${dr.length-3}</span>`:"");
    return `<button class="dupcard${a.whole?" ganz":""}" data-i="${i}" title="${t("dup_card_t",esc(dr.join(', ')),nloc(a.xfiles||a.dup),a.whole)}">
      <span class="dupfolder">${a.whole?FOLDER_SVG:FILES_SVG}${a.whole?`<span class="dupfolder-badge" title="${t("dup_whole")}"></span>`:""}</span>
      ${a.whole?`<span class="dup-whole-tag">${t("dup_whole_badge")}</span>`
               :`<span class="dup-part-tag" title="${_bwL('So viel vom Inhalt dieses Ordners liegt nachweislich auch auf einer anderen Platte — ab 90 % gilt er als komplett doppelt','How much of this folder is proven to exist on another drive too')}">${Math.round((a.deckung||0)*100)} % ${_bwL("davon","of it")}</span>`}
      <span class="dupcard-name">${esc(projName(a.name))}</span>
      <span class="dupcard-meta"><b>${human(a.dupSize)}</b> ${_bwL("identisch","identical")} · ${t("proj_files_abbr",nloc(a.xfiles||a.dup))}</span>
      <span class="dupcard-drives">${chips}</span>
    </button>`;
  };
  const _connCount=a=>{ let n=0; for(const d of a.drives){ if(driveMount[d]) n++; } return n; };   // wie viele der beteiligten Platten sind GERADE verbunden
  function fill(){
    if(!folders.length){ const msg=t("dup_none");
      bodyEl.innerHTML=`<div class="empty"><span class="big-emoji">${IC.check}</span>${msg}</div>`; return; }
    /* ══ „Nur verbunden" ruht, wenn es nichts liefern KANN ═════════════════
       Luis: „lass uns das Feature automatisch anschalten, wenn keine Platte
       angeschlossen ist — es sollte angezeigt werden."
       Der Filter verlangt Ordner auf mindestens ZWEI gerade verbundenen
       Platten. Stecken weniger als zwei, ist das Ergebnis zwangslaeufig leer
       — und eine leere Seite mit einer Erklaerung ist der schlechteste
       Zustand: die Funde sind ja da, sie helfen beim Planen, auch wenn man
       gerade nichts freiraeumen kann.
       Also ruht der Filter dann und alles wird gezeigt. Die GESPEICHERTE Wahl
       bleibt unberuehrt: sobald zwei Platten stecken, filtert er wieder wie
       eingestellt. Der Knopf sagt das auch — er sieht dann schlafend aus. */
    const _verbAnz = Object.keys(driveMount).length;
    const _connRuht = _dupConnOnly && _verbAnz < 2;
    const _connAktiv = _dupConnOnly && !_connRuht;
    { const _cb2=document.getElementById("dupConnBtn");
      if(_cb2){ _cb2.classList.toggle("on",_connAktiv); _cb2.classList.toggle("ruht",_connRuht);
        if(_connRuht) _cb2.title=_bwL("Ruht: es sind weniger als 2 Platten angeschlossen, deshalb werden alle Funde gezeigt",
                                      "Dormant: fewer than 2 drives connected, so all findings are shown"); } }
    let base = _connAktiv ? folders.filter(a=>_connCount(a)>=2) : folders;   // „Nur verbunden": nur freiräumbare Duplikate (Ordner auf ≥2 verbundenen Platten)
    const betroffen = base.length;              /* Gesamtbefund — unabhängig vom Ordner-Filter */
    const ganze = base.filter(a=>a.whole);
    const _cnt=document.getElementById("dupCount"); if(_cnt) _cnt.textContent=nloc(betroffen);
    const _gz=document.getElementById("dupWholeCnt"); if(_gz) _gz.textContent=nloc(ganze.length);
    if(!base.length){ const msg = _connAktiv
        ? _bwL("Keine freiräumbaren Duplikate auf verbundenen Platten. Schließe mind. 2 der beteiligten Platten an.","No removable duplicates on connected drives. Connect at least 2 of their drives.")
        : t("dup_none");
      bodyEl.innerHTML=`<div class="empty"><span class="big-emoji">${IC.check}</span>${msg}</div>`; _dupList=[]; return; }
    const filtered = base.filter(a=> match(a.name) || match(projName(a.name))
      || (a.items||[]).some(it=>match(it.path)||match(it.drive))
      || [...(a.drives||[])].some(d=>match(d))
      || Object.values(a.rep||{}).some(pp=>match(pp)) );
    // Rang 0 = alle beteiligten Platten stecken -> sofort freiräumbar
    // Rang 1 = mindestens zwei stecken       -> teilweise freiräumbar
    // Rang 2 = weniger als zwei              -> erst Platte anstecken
    // a.drives ist ein Set — .length ist undefined, damit waere Rang 0 nie erreichbar gewesen.
    const _tot=a=>(a.drives && (a.drives.size!=null ? a.drives.size : a.drives.length)) || 0;
    const _rank=a=>{ const c=_connCount(a), t=_tot(a); return (t>1 && c>=t) ? 0 : (c>=2 ? 1 : 2); };
    /* Ganze Ordner nach vorn — auch wenn alles angezeigt wird. */
    filtered.sort((x,y)=> (y.whole?1:0)-(x.whole?1:0) || _rank(x)-_rank(y) || (y.dupSize||0)-(x.dupSize||0));   // .bytes existiert auf den Ordner-Aggregaten nicht — der NaN-Vergleich war nur zufällig harmlos (stabile Sortierung + vorsortierte Basis)
    if(!filtered.length){ bodyEl.innerHTML=`<div class="empty"><span class="big-emoji" style="opacity:.55">${IC.search||IC.box}</span>${t("no_matches")}</div>`; _dupList=[]; return; }   // Lupe, nicht Haken: das ist kein Erfolg, das ist ein leerer Filter
    const list=filtered.slice(0,FLIMIT);
    /* Sagen, warum trotz aktivem Schalter alles zu sehen ist — sonst wirkt es
       wie ein Fehler. */
    const _ruhtHinweis = _connRuht
      ? `<div class="dup-ruht">${_bwL(
          _verbAnz===0 ? "Keine Platte angeschlossen — es werden alle Funde gezeigt. Zum Freiräumen mindestens 2 der beteiligten Platten anschließen."
                       : "Nur eine Platte angeschlossen — es werden alle Funde gezeigt. Zum Freiräumen mindestens 2 der beteiligten Platten anschließen.",
          _verbAnz===0 ? "No drive connected — showing every finding. Connect at least 2 of the drives involved to free space."
                       : "Only one drive connected — showing every finding. Connect at least 2 of the drives involved to free space.")}</div>`
      : "";
    bodyEl.innerHTML=_ruhtHinweis+`<div class="dupgrid">${list.map((a,i)=>{
        const h=card(a,i), r=_rank(a);
        /* ⚠ Die Ersetzung matchte auf den EXAKTEN Klassenstring. Seit die
           Ganz-Karten zusaetzlich `ganz` tragen, greift sie dort nicht mehr —
           deshalb wird jetzt auf beide Formen ersetzt. */
        return r===0 ? h.replace(/<button class="dupcard( ganz)?"/,
          (m,g)=>'<button class="dupcard'+(g||"")+' ready" data-ready="'+_bwL("jetzt freiräumbar","ready now")+'"') : h;
      }).join("")}</div>`
      + (filtered.length>FLIMIT?`<div class="muted" style="padding:10px 2px">${t("dup_more",nloc(filtered.length-FLIMIT))}</div>`:"");
    _dupList=list;
    bodyEl.querySelectorAll(".dupcard").forEach(b=>b.onclick=async()=>{
      const a=_dupList[+b.dataset.i]; if(!a) return;
      if(!a.items){   // schlanke Liste aus dem Kalt-Cache: Datei-Details dieses Ordners nachladen
        const row=await busy(new Promise(res=>{ const tr=tx(["dupes"],"readonly"); const g=tr.objectStore("dupes").get("f:"+a.name);
          g.onsuccess=()=>res(g.result||null); g.onerror=()=>res(null); tr.onabort=()=>res(null); }), bodyEl);
        if(row && Array.isArray(row.items)) a.items=row.items;
        else { _dupCache=null; renderDupes(); return; }   // Detail-Zeile fehlt (sollte nie passieren: gleiche Tx) -> einmal frisch rechnen
      }
      openDupFolder(a); });
    bodyEl.querySelectorAll(".dchip[data-drive]").forEach(c=>{
      /* Ein einziger Weg für „im Finder zeigen" — derselbe wie im Dialog:
         NEUES Fenster, das Objekt blau markiert. `openFolder` sprang in den
         Ordner HINEIN; damit sah man nie, WAS das Duplikat ist, und auf der
         zweiten Platte landete man in einem Ersatz-Ordner. */
      c.onclick=async ev=>{ ev.stopPropagation();
        const drive=c.dataset.drive, mnt=driveMount[drive], rel=c.dataset.file;
        const flash=()=>{ c.classList.remove("cf-flash"); void c.offsetWidth; c.classList.add("cf-flash"); };
        if(!mnt||!rel){ flash(); return; }
        const api=window.diskyNative||{};
        const a=_dupList[+c.closest(".dupcard").dataset.i];
        const base=mnt.replace(/\/$/,"");
        let ziele=[base+"/"+rel];
        /* Liegt der ganze Ordner doppelt und steht dieser Platten-Pfad in einem
           Ordner, dann DEN Ordner markieren — sonst genau diese Datei. */
        if(a&&a.whole){ const i=rel.lastIndexOf("/"); if(i>0) ziele=[base+"/"+rel.slice(0,i)]; }
        if(api.revealMany){
          const r=await api.revealMany(ziele);
          if(!r||!r.ok){ flash(); try{ toast(t("dup_folder_gone")); }catch(e){}
            try{ const v=_conn.find(x=>x.mount===mnt); if(v) queueAutoScan(v,{force:true,upd:true}); }catch(e){} }
          return;
        }
        if(api.revealSmart) await api.revealSmart(ziele[0]); else if(api.reveal) api.reveal(ziele[0]);
      };
    });
  }
  fill();
  const _cb=document.getElementById("dupConnBtn");
  if(_cb) _cb.onclick=()=>{ _dupConnOnly=!_dupConnOnly; try{ localStorage.setItem("disky_dup_connonly", _dupConnOnly?"1":""); }catch(e){} _cb.classList.toggle("on",_dupConnOnly); fill(); };   // „Nur verbunden" umschalten
  const inp=document.getElementById("dupQ"), x=document.getElementById("dupX");
  if(inp){ inp.oninput=()=>{ q=inp.value.toLowerCase(); if(x) x.classList.toggle("hide", !inp.value); clearTimeout(_dupQT); _dupQT=setTimeout(fill,120); }; }
  if(x){ x.onclick=()=>{ q=""; inp.value=""; x.classList.add("hide"); inp.focus(); fill(); }; }
}

