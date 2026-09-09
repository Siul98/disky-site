import * as THREE from '../original-search/three/three.module.min.js';
import {GLTFLoader} from '../original-search/three/jsm/loaders/GLTFLoader.js';
const host=document.querySelector('#hf-t9'),front=host.querySelector('.hf-front');
let renderer,model,scene,camera,last=0,scan=0,renderedLift=-1;
window.DiskyHeroDrive={draw};
try{
 renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(900,615,false);renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;window.DiskyHeroDrive.canvas=renderer.domElement;renderer.domElement.className='hero-drive-canvas';renderer.domElement.setAttribute('aria-hidden','true');host.insertBefore(renderer.domElement,host.querySelector('.hf-xray'));
 scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-.75,.75,.5125,-.5125,.01,20);camera.position.set(0,0,4);scene.add(new THREE.HemisphereLight(0xddeeff,0x263140,1.3));
 for(const [pos,power] of [[[-2,3,4],2.5],[[3,1,2],1],[[-1,-2,1],1.2]]){const l=new THREE.DirectionalLight(0xffffff,power);l.position.set(...pos);scene.add(l)}
 const g=await new GLTFLoader().loadAsync(new URL('./weave-black-woven-logo.glb',import.meta.url).href);model=new THREE.Group();const asset=g.scene;const box=new THREE.Box3().setFromObject(asset),center=box.getCenter(new THREE.Vector3());asset.position.sub(center);model.add(asset);model.rotation.order="ZYX";model.rotation.set(Math.PI/2,0,0);scene.add(model);model.updateMatrixWorld(true);const size=new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());model.scale.setScalar(1.36/size.x);window.heroDriveInfo={originalSize:size.toArray()};host.classList.add('has-drive-model');front.style.visibility='hidden';draw(last,scan,true);
}catch(e){console.warn('DISKY hero model fallback',e)}
function draw(lift,progress,force=false){last=lift;scan=progress;if(!model||document.hidden)return;const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;const turn=Math.max(0,Math.min(1,(lift-.25)/.5)),turnEase=turn*turn*(3-2*turn);model.rotation.y=reduced?0:Math.PI*(1-turnEase);model.rotation.x=Math.PI/2+(reduced?0:Math.sin(turn*Math.PI)*.12);renderer.domElement.style.opacity=front.style.opacity;renderer.domElement.style.maskImage=front.style.maskImage;renderer.domElement.style.webkitMaskImage=front.style.webkitMaskImage;if(force||renderedLift!==lift){renderer.render(scene,camera);renderedLift=lift}}

