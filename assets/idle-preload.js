// Prepare lower sections after the first screen; animation remains visibility-owned.
const status=window.DiskyPreload={state:'waiting',prepared:0};
const connection=navigator.connection;
const limited=()=>connection?.saveData||/^(slow-)?2g$/.test(connection?.effectiveType||'');
const idle=()=>new Promise(resolve=>{if('requestIdleCallback'in window)requestIdleCallback(resolve,{timeout:1800});else setTimeout(resolve,180)});
const visible=()=>document.hidden?new Promise(resolve=>{const resume=()=>{if(!document.hidden){document.removeEventListener('visibilitychange',resume);resolve()}};document.addEventListener('visibilitychange',resume)}):Promise.resolve();
async function prepare(){
 if(limited()){status.state='data-saving';return}
 await customElements.whenDefined('disky-demo');
 const jobs=[...document.querySelectorAll('#mfRail disky-demo')].map(d=>()=>{if(!d._rendered)d.render()});
 // Request existing lower-page image URLs at low priority; no duplicate asset list.
 for(const img of document.querySelectorAll('#how img[loading="lazy"],#loved img[loading="lazy"]'))jobs.push(async()=>{img.fetchPriority='low';img.loading='eager';try{await img.decode()}catch{}});
 status.state='preparing';
 for(const job of jobs){await visible();await idle();if(limited()){status.state='data-saving';return}try{await job();status.prepared++}catch(error){console.debug('DISKY deferred preload skipped',error)}}
 status.state='ready';
}
function start(){setTimeout(prepare,1200)}
if(document.readyState==='complete')start();else addEventListener('load',start,{once:true});
