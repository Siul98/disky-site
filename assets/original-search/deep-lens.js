import * as THREE from 'three';
/* Objektweise Linsenfaltung: isolierte Platten verhindern Tiefen- und Alpha-Halos.
   Bei kleinen Objekten relativ zum Fokusabstand genügt ein CoC pro Platte.
   64 feste Apertur-Samples, lineares HDR bis zum letzten Ausgabepass. */
export class DiskyLensField {
  constructor(renderer,scene,camera,items){
    Object.assign(this,{renderer,scene,camera,items,focus:9,focusHalfWidth:2.8,maxBlur:11,enabled:true});
    this.cropCamera=camera.clone();this.composite=new THREE.Scene();
    this.screenCamera=new THREE.OrthographicCamera(0,1,1,0,-1,1);
    this.geometry=new THREE.PlaneGeometry(1,1);
    const aperture=Array.from({length:64},(_,i)=>{
      const r=Math.sqrt((i+.5)/64),a=i*2.399963229728653;
      return new THREE.Vector2(Math.cos(a)*r,Math.sin(a)*r);
    });
    this.layers=items.map(item=>{
      const target=new THREE.WebGLRenderTarget(384,384,{type:THREE.HalfFloatType,
        minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,depthBuffer:true,stencilBuffer:false,samples:4});
      const material=new THREE.ShaderMaterial({
        uniforms:{map:{value:target.texture},aperture:{value:aperture},blur:{value:0},motion:{value:new THREE.Vector2()},opacity:{value:1}},
        vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
        fragmentShader:`
          uniform sampler2D map; uniform vec2 aperture[64]; uniform vec2 motion; uniform float blur,opacity;
          varying vec2 vUv;
          void main(){
            vec4 c=vec4(0.);
            if(blur<.0005 && length(motion)<.0005)c=texture2D(map,vUv);
            else{for(int i=0;i<64;i++){
              float shutter=(float(i)+.5)/64.-.5;
              c+=texture2D(map,vUv+aperture[i]*blur+motion*shutter);
            }c/=64.;}
            gl_FragColor=vec4(c.rgb/max(c.a,.00001),c.a*opacity);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
        transparent:true,depthTest:false,depthWrite:false});
      const quad=new THREE.Mesh(this.geometry,material);quad.frustumCulled=false;
      this.composite.add(quad);return {item,target,material,quad};
    });
  }
  circleOfConfusion(depth){
    const defocus=Math.max(0,Math.abs(depth-this.focus)-this.focusHalfWidth)/Math.max(depth,.1);
    return this.enabled?Math.min(this.maxBlur,defocus*25):0;
  }
  render(width,height){
    const r=this.renderer,camera=this.cropCamera;
    this.screenCamera.right=width;this.screenCamera.top=height;this.screenCamera.updateProjectionMatrix();
    camera.copy(this.camera);
    const visible=this.items.map(it=>it.piv.visible);
    this.items.forEach(it=>it.piv.visible=false);
    try{
      for(let i=0;i<this.layers.length;i++){
        const l=this.layers[i],it=l.item,s=it.screen;l.quad.visible=visible[i];
        if(!visible[i]||!s)continue;
        const coc=this.circleOfConfusion(-it.piv.position.z);
        const extent=(s.radius+this.maxBlur+20),diameter=extent*2;
        camera.setViewOffset(width,height,s.x-extent,s.y-extent,diameter,diameter);
        it.piv.visible=true;r.setRenderTarget(l.target);r.clear();r.render(this.scene,camera);it.piv.visible=false;
        l.quad.position.set(s.x,height-s.y,0);l.quad.scale.set(diameter,diameter,1);
        l.quad.renderOrder=Math.round(it.piv.position.z*1000);
        l.material.uniforms.motion.value.set((s.motionX||0)/diameter,-(s.motionY||0)/diameter);
        l.material.uniforms.blur.value=coc/diameter;l.material.uniforms.opacity.value=it.opacity??1;
      }
    }finally{
      this.items.forEach((it,i)=>it.piv.visible=visible[i]);
      camera.clearViewOffset();r.setRenderTarget(null);
    }
    r.render(this.composite,this.screenCamera);
  }
  dispose(){
    for(const l of this.layers){l.target.dispose();l.material.dispose();}
    this.geometry.dispose();this.composite.clear();this.layers=[];
  }
}
