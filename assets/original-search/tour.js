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
