// Same SVG markup and keyframes as the app, paired with genuine UI previews.
const keys={map:'SUN',dupes:'STACK',search:'SEARCH',iphone:'PHONE',worldmap:'GLOBE',gather:'GATH'};
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('playing',e.isIntersecting)),{rootMargin:'40px'});
document.querySelectorAll('.sc-row[data-feature]').forEach((button,i)=>{const key=keys[button.dataset.feature],svg=window.DiskyFeatureArt?.[key];if(!svg)return;const art=document.createElement('div');art.className='app-feature-art';art.setAttribute('aria-hidden','true');
// Each instance owns its paint servers, exactly as in the app's tile factory.
art.innerHTML=svg.replace(/id="([^"]+)"/g,(_,id)=>`id="web-${i}-${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#web-${i}-${id})`);
const row=button,caption=row?.querySelector('.sc-text')||button.closest('.mf-card')?.querySelector('.mf-cap');if(caption){caption.prepend(art);observer.observe(art)}});
