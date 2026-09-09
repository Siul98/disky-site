import {createRetrofuturism} from './spline/retrofuturism/backdrop.js?v=compat-45';
let attachLiveTourGlass;
const rail=document.querySelector('#hf-rail'),head=document.querySelector('#hf-head');
const scene=createRetrofuturism();window.DiskyHeroBackground={draw(ctx,w,h){window.drawDiskyPoster(ctx,w,h);scene.draw(ctx,w,h)}};
let visible=true,covered=false,bar=null,glass=null;
function syncSearch(){
 if(!attachLiveTourGlass)return;
 const next=head.querySelector('.ph-search');if(next===bar)return;
 glass?.dispose();bar=next;if(!bar)return;
 bar.style.setProperty('--reveal','1');
 glass=attachLiveTourGlass(bar.parentElement,[bar]);window.DiskySearchGlass=glass;
}
syncSearch();new MutationObserver(syncSearch).observe(head,{childList:true,subtree:true});
const update=()=>scene.setActive(visible&&!covered&&!document.hidden);
new IntersectionObserver(([e])=>{visible=e.isIntersecting;update()}).observe(rail);
document.addEventListener('visibilitychange',update);
window.addEventListener('pagehide',()=>{scene.dispose();glass?.dispose()});
update();

window.DiskyHeroBackground.setProgress=p=>{const next=p>=.34;if(next!==covered){covered=next;update()}};

import('./live-tour-glass.js?v=safari-glass-46').then(m=>{attachLiveTourGlass=m.attachLiveTourGlass;syncSearch()});
