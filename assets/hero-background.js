import {createRetrofuturism} from './spline/retrofuturism/backdrop.js?v=fine-bands-42';
import {attachLiveTourGlass} from './live-tour-glass.js?v=motion-24';
const rail=document.querySelector('#hf-rail'),head=document.querySelector('#hf-head');
const scene=createRetrofuturism();window.DiskyHeroBackground={draw(ctx,w,h){ctx.fillStyle='#08090b';ctx.fillRect(0,0,w,h);scene.draw(ctx,w,h)}};
let visible=true,covered=false,bar=null,glass=null;
function syncSearch(){
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
