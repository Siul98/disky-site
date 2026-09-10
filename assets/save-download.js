import {attachLiveTourGlass} from './live-tour-glass.js?v=performance-53';
const button=document.querySelector('.save-download');
if(button){
 button.parentElement.classList.add("download-glass-host");button.style.setProperty("--reveal","1");window.DiskyDownloadGlass=attachLiveTourGlass(button.parentElement,[button]);
 const icon=button.querySelector('svg'),label=button.querySelector('span'),idleIcon=icon.innerHTML;
 let resetTimer,startTimer;
 const reset=()=>{clearTimeout(resetTimer);clearTimeout(startTimer);delete button.dataset.state;button.removeAttribute('aria-busy');icon.innerHTML=idleIcon;label.textContent=document.documentElement.lang==='de'?'Beta laden':'Download the beta'};
 const status=document.createElement('span');status.setAttribute('role','status');status.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)';button.after(status);
 button.addEventListener('click',event=>{
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||!button.hasAttribute('download'))return;
  if(button.dataset.state){event.preventDefault();return}
  // Keep the real anchor's default action. Browsers do not report download completion.
  const de=document.documentElement.lang==='de';button.dataset.state='starting';button.setAttribute('aria-busy','true');label.textContent=de?'Wird gestartet…':'Starting…';icon.innerHTML='<path d="M20 12a8 8 0 1 1-5.5-7.6"/>';
  startTimer=setTimeout(()=>{button.dataset.state='started';button.removeAttribute('aria-busy');label.textContent=de?'Download gestartet':'Download started';status.textContent=label.textContent;icon.innerHTML='<path d="m5 12 4 4L19 6"/>';
   if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const r=button.getBoundingClientRect();for(let i=0;i<12;i++){const el=document.createElement('i'),a=i*Math.PI*2/12;el.className='download-spark';el.style.cssText=`left:${r.x+r.width/2}px;top:${r.y+r.height/2}px;--spark-x:${Math.cos(a)*(r.width*.65)}px;--spark-y:${Math.sin(a)*70-20}px;--spark-color:${['#8dc8ff','#fff','#86e8b8'][i%3]}`;document.body.append(el);el.addEventListener('animationend',()=>el.remove(),{once:true})}}
   resetTimer=setTimeout(reset,2200);
  },300);
 });
 new MutationObserver(()=>{if(button.dataset.state)reset()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 addEventListener('pageshow',reset);
}
