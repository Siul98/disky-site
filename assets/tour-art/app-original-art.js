// Extracted verbatim icon, arc function and sunburst layout from app/index.html.
// Only wrapper inputs/return are adapted; scene highlights are applied by feature-art.js.
export const appFiles="<svg viewBox=\"118 34 384 384\" class=\"macfld macfls\" preserveAspectRatio=\"xMidYMid meet\" xmlns=\"http://www.w3.org/2000/svg\"><defs>\n  <linearGradient id=\"cfSheet\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#bfe2ff\"/><stop offset=\".5\" stop-color=\"#5aa8ff\"/><stop offset=\"1\" stop-color=\"#3d88ff\"/></linearGradient>\n  <linearGradient id=\"cfBack1\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#cfe6ff\"/><stop offset=\".55\" stop-color=\"#7ab4f8\"/><stop offset=\"1\" stop-color=\"#4a8ce6\"/></linearGradient>\n  <linearGradient id=\"cfBack2\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#b9d9fb\"/><stop offset=\".55\" stop-color=\"#6aa4ef\"/><stop offset=\"1\" stop-color=\"#3d7cd8\"/></linearGradient>\n  <radialGradient id=\"cfBloom\" cx=\".5\" cy=\".54\" r=\".6\"><stop offset=\"0\" stop-color=\"#bfe0ff\" stop-opacity=\".95\"/><stop offset=\".6\" stop-color=\"#4f9bff\" stop-opacity=\".5\"/><stop offset=\"1\" stop-color=\"#3f8cff\" stop-opacity=\"0\"/></radialGradient>\n  <linearGradient id=\"cfMilk\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#eaf3ff\" stop-opacity=\".30\"/><stop offset=\".44\" stop-color=\"#d2e4fb\" stop-opacity=\".06\"/><stop offset=\"1\" stop-color=\"#c6dcf8\" stop-opacity=\".16\"/></linearGradient>\n  <radialGradient id=\"cfFrost\" cx=\".5\" cy=\".5\" r=\".68\"><stop offset=\"0\" stop-color=\"#e6f1ff\" stop-opacity=\"0\"/><stop offset=\".72\" stop-color=\"#dceaff\" stop-opacity=\".04\"/><stop offset=\"1\" stop-color=\"#eef6ff\" stop-opacity=\".24\"/></radialGradient>\n  <linearGradient id=\"cfEdge\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffffff\" stop-opacity=\".92\"/><stop offset=\".5\" stop-color=\"#dbeaff\" stop-opacity=\".12\"/><stop offset=\"1\" stop-color=\"#eaf3ff\" stop-opacity=\".4\"/></linearGradient>\n  <clipPath id=\"cfClip\"><path d=\"M235 116 H335 L383 164 V324 a18 18 0 0 1-18 18 H235 a18 18 0 0 1-18-18 V134 a18 18 0 0 1 18-18 Z\"/></clipPath>\n  <filter id=\"cfBB\" x=\"-60%\" y=\"-60%\" width=\"220%\" height=\"220%\"><feGaussianBlur stdDeviation=\"14\"/></filter>\n  <filter id=\"cfHalo\" x=\"-70%\" y=\"-70%\" width=\"240%\" height=\"240%\"><feGaussianBlur stdDeviation=\"22\"/></filter>\n  <filter id=\"cfDoc\" x=\"-60%\" y=\"-60%\" width=\"220%\" height=\"220%\"><feDropShadow dx=\"0\" dy=\"8\" stdDeviation=\"10\" flood-color=\"#04070d\" flood-opacity=\".4\"/></filter>\n  </defs>\n  <rect x=\"215\" y=\"130\" width=\"200\" height=\"200\" rx=\"48\" fill=\"#3a8cff\" opacity=\".38\" filter=\"url(#cfHalo)\"/>\n  <!-- Gestufte Kaskade nach oben rechts: erst so sieht man von jedem Blatt eine\n       Kante. Der erste Entwurf faecherte sie hinter das vordere Blatt \u2014 dort\n       waren sie nur ein dunkler Fleck, kein Stapel.\n       Zweiter Fund: hintere Blaetter NICHT ueber Gruppen-Deckkraft abdunkeln.\n       Blau auf fast schwarzem Grund wird bei .42 zu Grau \u2014 sie sahen aus wie\n       Pappkarten. Jetzt volle Deckkraft mit je eigenem, etwas dunklerem\n       Verlauf: es bleibt Papier, es liegt nur weiter hinten.\n       Der ganze Stapel ist so gesetzt, dass seine Mitte bei x=310 liegt \u2014\n       sonst haengt das Zeichen neben dem Ordner sichtbar aus der Achse. -->\n  <g filter=\"url(#cfDoc)\">\n    <g><rect x=\"253\" y=\"84\" width=\"150\" height=\"210\" rx=\"16\" fill=\"url(#cfBack2)\"/>\n      <rect x=\"253\" y=\"84\" width=\"150\" height=\"210\" rx=\"16\" fill=\"none\" stroke=\"#ffffff\" stroke-opacity=\".34\" stroke-width=\"2\"/></g>\n    <g><rect x=\"235\" y=\"100\" width=\"158\" height=\"218\" rx=\"17\" fill=\"url(#cfBack1)\"/>\n      <rect x=\"235\" y=\"100\" width=\"158\" height=\"218\" rx=\"17\" fill=\"none\" stroke=\"#ffffff\" stroke-opacity=\".42\" stroke-width=\"2\"/></g>\n  </g>\n  <g filter=\"url(#cfDoc)\">\n    <path d=\"M235 116 H335 L383 164 V324 a18 18 0 0 1-18 18 H235 a18 18 0 0 1-18-18 V134 a18 18 0 0 1 18-18 Z\" fill=\"url(#cfSheet)\"/>\n    <path d=\"M335 116 V152 a12 12 0 0 0 12 12 H383 Z\" fill=\"#eaf4ff\" fill-opacity=\".55\"/>\n  </g>\n  <g clip-path=\"url(#cfClip)\">\n    <ellipse cx=\"300\" cy=\"246\" rx=\"100\" ry=\"86\" fill=\"url(#cfBloom)\" filter=\"url(#cfBB)\"/>\n    <rect x=\"217\" y=\"116\" width=\"166\" height=\"226\" fill=\"url(#cfMilk)\"/>\n    <rect x=\"217\" y=\"116\" width=\"166\" height=\"226\" fill=\"url(#cfFrost)\"/>\n  </g>\n  <path d=\"M235 116 H335 L383 164 V324 a18 18 0 0 1-18 18 H235 a18 18 0 0 1-18-18 V134 a18 18 0 0 1 18-18 Z\" fill=\"none\" stroke=\"url(#cfEdge)\" stroke-width=\"2.4\"/>\n  <path d=\"M241 122 H333\" fill=\"none\" stroke=\"#ffffff\" stroke-opacity=\".5\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n</svg>";
const SUN_HUES=[210,172,196,226,186,234,202,164,218,180,244,190];
function arcPath(cx,cy,r0,r1,a0,a1){
  const P=(r,a)=>[cx+r*Math.cos(a), cy+r*Math.sin(a)];
  const large=(a1-a0)>Math.PI?1:0;
  const [x0,y0]=P(r1,a0),[x1,y1]=P(r1,a1),[x2,y2]=P(r0,a1),[x3,y3]=P(r0,a0);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r1} ${r1} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} `+
         `L${x2.toFixed(2)} ${y2.toFixed(2)} A${r0} ${r0} 0 ${large} 0 ${x3.toFixed(2)} ${y3.toFixed(2)} Z`;
}
export function appSunburst(focus){
  const CX=260,CY=260,R0=66,RING=40,MAXRING=4,MINANG=0.013,OFF=-Math.PI/2;
  const paths=[];
  function layout(node,a0,a1,depth,hue,rootIdx){
    if(depth>0 && depth<=MAXRING && (a1-a0)>=MINANG){
      const r0=R0+(depth-1)*RING, r1=r0+RING;
      const sat=Math.max(48,66-depth*3), li=Math.min(67,48+depth*5);
      paths.push({d:arcPath(CX,CY,r0,r1,a0+OFF,a1+OFF),col:`hsl(${hue} ${sat}% ${li}%)`,node,rootIdx});
    }
    if(depth>=MAXRING) return;
    const tot=node.size||1; let a=a0;
    /* Große Kinder kompakt hintereinander — Kleinkram wird zu EINEM Rest-Bogen gebündelt,
       damit der Kreis nach jedem Re-Root voll ist (statt 92 % unsichtbarer Lücken). */
    const kids=node.childArr.map((c,idx)=>({c,idx,span:(a1-a0)*((c.size||0)/tot)}));
    let restSpan=0, restBytes=0, restN=0;
    kids.forEach(k=>{ if(k.span<MINANG){ restSpan+=k.span; restBytes+=(k.c.size||0); restN++; } });
    kids.filter(k=>k.span>=MINANG).forEach(k=>{
      layout(k.c,a,a+k.span,depth+1, depth===0?SUN_HUES[k.idx%SUN_HUES.length]:hue, depth===0?k.idx:rootIdx);
      a+=k.span; });
    /* Rest-Sektor NUR im innersten Ring — entspricht der „N kleinere"-Zeile der Legende.
       Äußere Ringe lassen normale Lücken (Standard-Sunburst-Lesart: Rest des Ordners). */
    if(depth===0 && restSpan>0.01 && restN>0){ const r0=R0, r1=r0+RING;
      paths.push({d:arcPath(CX,CY,r0,r1,a+OFF,a+restSpan+OFF),col:"rgba(140,160,195,.14)",
        node:{label:restN+" "+(window.lang!=="en"?"kleinere":"smaller"),size:restBytes,isFile:true,childArr:[]},rootIdx:-1,rest:true}); }
  }
  layout(focus,0,Math.PI*2,0,0,-1);
  return paths;
}
