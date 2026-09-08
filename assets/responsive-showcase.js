/* User-controlled, swipeable app walkthrough; never auto-advances while reading. */
(()=>{
 const track=document.querySelector('.story-track');
 if(!track)return;
 const buttons=[...document.querySelectorAll('[data-slide]')];
 let frame=0;
 const update=()=>{frame=0;const i=Math.round(track.scrollLeft/(track.clientWidth+24));buttons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));};
 const go=i=>track.scrollTo({left:Math.max(0,Math.min(buttons.length-1,i))*(track.clientWidth+24),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 buttons.forEach((b,i)=>b.addEventListener('click',()=>go(i)));
 track.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});
 track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(Math.round(track.scrollLeft/(track.clientWidth+24))+(e.key==='ArrowRight'?1:-1));}});
 new ResizeObserver(()=>{const i=buttons.findIndex(b=>b.getAttribute('aria-pressed')==='true');track.scrollTo({left:Math.max(0,i)*(track.clientWidth+24),behavior:'instant'});}).observe(track);
})();
