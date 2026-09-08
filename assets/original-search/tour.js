// Website navigation and fixture only. The views/chart/dialog are original app functions.
let _mapMount=null,_uncatVol=null,_dupSeq=0,_dupList=[],_dupQT=null,_dupConnOnly=false,_dupCache=null;
const SUN_HUES=[210,172,196,226,186,234,202,164,218,180,244,190];
const cloudInfo=()=>null,getVolumes=async()=>[],buildOnline=()=>new Map(),driveOnline=()=>false,_bg=p=>Promise.resolve(p).catch(console.error),catVer=()=>1,driveCategory=()=> 'drive',projName=x=>x,topFolder=p=>p.split('/')[0],isProjRoot=()=>false,match=s=>!q||String(s||'').toLowerCase().includes(q.toLowerCase());
function mapDriveRender(d){return `<img src="assets/demo-drives/${d.model}.webp" alt="${esc(d.label)}">`}
function fillMapInfo(){const e=document.querySelector('#mapInfo');if(e)e.textContent=_bwL('Beispielkatalog · Platte offline','Sample catalog · drive offline')}
async function buildAndDraw(){const d=catalog.find(d=>d.id===mapDriveId)||catalog[4];mapTree=buildTree(files.filter(f=>f.driveId===d.id),d.label);mapStack=[mapTree];for(const name of mapDrillPath||[]){const n=mapStack.at(-1).childArr.find(n=>n.name===name);if(n)mapStack.push(n)}mapDrillPath=null;drawSun()}
function toast(msg){let e=document.querySelector('#demoNotice');if(!e){e=document.createElement('div');e.id='demoNotice';document.body.append(e)}e.textContent=msg;clearTimeout(e.timer);e.timer=setTimeout(()=>e.remove(),3500)}
// Checksums and totals describe a small synthetic catalog, never visitor files.
files.forEach(f=>{f.hash=f.name.includes('Interview')?'sample-interview':f.name+'-'+f.size});
const dupNames=['Doku Nordsee','Werbespot Hamburg','Hochzeit Tegernsee'];
for(const [i,name] of dupNames.entries())if(i)for(const driveId of [2,4,5])files.push({driveId,name:'Master.mov',relPath:name+'/Master.mov',size:(i===1?3.7:2.3)*1e9,hash:'sample-'+i});
function fixtureDupes(){const folders=dupNames.map((name,i)=>{const items=files.filter(f=>topFolder(f.relPath)===name&&(i||f.name.includes('Interview'))).map(f=>({drive:catalog.find(d=>d.id===f.driveId).label,driveId:f.driveId,path:f.relPath,size:f.size,hash:f.hash,role:'backup',redundant:false}));return {name,items,drives:new Set(items.map(f=>f.drive)),dup:items.length,xfiles:1,dupSize:items[0].size,whole:i>0,deckung:i?1:.27,reclaim:0}});_dupCache={sig:catVer()+'|'+catalog.map(d=>d.id+':'+d.label).join(','),folders,totalCross:folders.reduce((n,a)=>n+a.dupSize,0)}}
let turn=0;
async function setView(next){if(!['search','map','dupes'].includes(next)||!window.demoBooted)return;const token=++turn;clearTimeout(timer);_dupSeq++;_mapCoverflowStop();document.querySelector('#dmx')?.click();view=next;VS.rt=token;window.websiteSceneVisible=visible&&next==='search';app.style.opacity='0';await new Promise(r=>setTimeout(r,matchMedia('(prefers-reduced-motion:reduce)').matches?0:160));if(token!==turn)return;document.body.dataset.view=next;renderNav();const h=document.querySelector('.original-title');h.querySelector('h1').textContent={search:'DEEP SEARCH',map:'STORAGE MAP',dupes:'DUPLICATE FINDER'}[next];h.querySelector('p').textContent={search:_bwL('Suche im Katalog. Auch offline.','Search your catalog. Even offline.'),map:_bwL('Jeder Ordner. Jede Datei. Ihr Platz im Katalog.','Every folder. Every file. Its place in your catalog.'),dupes:_bwL('Identische Inhalte vergleichen. Kopien bewusst behalten.','Compare identical content. Decide which copies to keep.')}[next];h.querySelectorAll(':scope > span').forEach(e=>e.hidden=true);
if(next==='map'){mapDriveId=mapDriveId||5;await renderMap()}
if(next==='dupes'){q='';fixtureDupes();await renderDupes()}
if(next==='search'){q='';manual=false;started=false;originalField();document.querySelector('.deepsearch').classList.add('ds-orb');document.querySelector('#deepQ').addEventListener('input',e=>{manual=true;q=e.target.value;deepNameBody(document.querySelector('#deepBody'))});document.querySelector('#deepX').onclick=()=>{manual=true;q='';document.querySelector('#deepQ').value='';deepNameBody(document.querySelector('#deepBody'))};await deepNameBody(document.querySelector('#deepBody'));update()}
if(token!==turn)return;app.style.opacity='1';manual=false;if(next==='dupes')demoCompare(token);parent.postMessage({diskyStep:next},location.origin)}
addEventListener('message',e=>{if(parent===window||e.source!==parent||e.origin!==location.origin||!e.data?.diskyStep)return;const next=e.data.diskyStep;if(next==='map'){mapDriveId=5;mapDrillPath=['Doku Nordsee']}setView(next)});
// A real result click uses the original deepNameBody → setView('map') path.
document.addEventListener('pointerdown',()=>{manual=true},true);
addEventListener('unhandledrejection',e=>{document.body.dataset.demoError=String(e.reason?.stack||e.reason)});
document.addEventListener('click',e=>{const b=e.target.closest('#sbNav [data-v]');if(b)setView(b.dataset.v)});

const _PG_PROJ_EXT={};

async function demoCompare(token){let elapsed=0,last=performance.now();while(elapsed<2300){await new Promise(r=>setTimeout(r,100));const now=performance.now();if(token!==turn||manual)return;if(visible&&!document.hidden)elapsed+=now-last;last=now}if(token===turn&&!manual)document.querySelector('.dupcard')?.click()}
// The sample catalog ships no media thumbnails; retain the original file rows.
const thExt=name=>'.'+String(name).split('.').pop().toLowerCase(),isMediaExt=()=>false;

const PIC = {
  bug:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7.5" y="8" width="9" height="11" rx="4.5"/><path d="M9.4 7.2a2.6 2.6 0 0 1 5.2 0"/><path d="M7.5 12H4M16.5 12H20M7.9 8.6 5.3 6.4M16.1 8.6l2.6-2.2M7.9 17.6l-2.4 2.1M16.1 17.6l2.4 2.1"/><path d="M12 11.4v5.2"/></svg>',
  bulb:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.2 16.4a6 6 0 1 1 5.6 0v1.5a1.3 1.3 0 0 1-1.3 1.3h-3a1.3 1.3 0 0 1-1.3-1.3z"/><path d="M10.3 21.2h3.4"/><path d="M12 6.9a3.6 3.6 0 0 0-3.6 3.6"/></svg>',
  chat:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12.6a7.4 7.4 0 0 1-7.4 7.4H8.2L4 22.6v-4.1A7.4 7.4 0 0 1 4.6 8 7.4 7.4 0 0 1 12.6 5.2 7.4 7.4 0 0 1 20 12.6z"/><path d="M9 12.6h.01M12.6 12.6h.01M16.2 12.6h.01"/></svg>',
  pin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5s6.5-6.1 6.5-10.4a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21.5 12 21.5z"/><circle cx="12" cy="10.8" r="2.4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 19 5.6v5.6c0 4.8-2.9 8.3-7 9.9-4.1-1.6-7-5.1-7-9.9V5.6z"/><path d="m9 12 2.2 2.2L15.4 10"/></svg>',
  clap:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9.4" width="18" height="11" rx="2"/><path d="M3 9.4 5.6 4l16 2.6-.6 2.8z"/><path d="m9.6 4.9-1.4 4.3M15 5.6l-1.4 4.3"/></svg>',
  trash:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 6.8h15"/><path d="M9.4 6.8V5.2a1.4 1.4 0 0 1 1.4-1.4h2.4a1.4 1.4 0 0 1 1.4 1.4v1.6"/><path d="M6.4 6.8 7.3 19a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.9-12.2"/><path d="M10.4 10.4v6M13.6 10.4v6"/></svg>',
  image:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.2" y="4.6" width="17.6" height="14.8" rx="2.2"/><circle cx="8.6" cy="9.6" r="1.7"/><path d="m3.6 16.6 4.6-4.2a2 2 0 0 1 2.7 0l6 5.6"/><path d="m14.4 13.4 2-1.8a2 2 0 0 1 2.7 0l1.3 1.2"/></svg>',
  ring:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="3.4"/><path d="M12 3.4v5.2M12 15.4v5.2M3.4 12h5.2M15.4 12h5.2"/></svg>',
  warn:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.4 22 20.6H2z"/><path d="M12 9.6v4.8"/><circle cx="12" cy="17.6" r=".95" fill="currentColor" stroke="none"/></svg>',
};
