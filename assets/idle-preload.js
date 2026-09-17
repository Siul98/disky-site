// Warm only the next approaching section, never the whole page at startup.
const status=window.DiskyPreload={state:'observing',prepared:0};
const limited=()=>navigator.connection?.saveData||/^(slow-)?2g$/.test(navigator.connection?.effectiveType||'');
const idle=job=>{if('requestIdleCallback'in window)requestIdleCallback(job,{timeout:800});else setTimeout(job,80)};
const observer=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  observer.unobserve(entry.target);
  if(limited())continue;
  idle(async()=>{
   if(document.hidden)return;
   for(const img of entry.target.querySelectorAll('img[loading="lazy"]')){img.fetchPriority='low';img.loading='eager'}
   if(entry.target.id==='morefeats'){
    await customElements.whenDefined('disky-demo');
    // Prepare the visible card and its neighbour; remaining cards retain their
    // own proximity observer as the visitor swipes the horizontal rail.
    for(const demo of [...entry.target.querySelectorAll('disky-demo')].slice(0,2))if(!demo._rendered)demo.render();
   }
   status.prepared++;
  });
 }
},{rootMargin:'400px 0px'});
for(const id of ['how','morefeats','loved']){const section=document.getElementById(id);if(section)observer.observe(section)}
