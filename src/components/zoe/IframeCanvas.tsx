"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

/**
 * Sandboxed iframe renderer for AI-generated interactive HTML+JS+CSS.
 * Includes a readiness timeout — if the iframe doesn't emit 'ready' within
 * READY_TIMEOUT_MS, it shows a fallback error state with a retry button.
 */

// How long to wait before showing the iframe anyway (even without an explicit ready signal)
const READY_TIMEOUT_MS = 14000;
// Only switch to hard error state if we get this many JS errors before ready fires
const ERROR_THRESHOLD = 3;

const BRIDGE_PREAMBLE = `<script>
var __zoe_errors=0,__zoe_ready=false;
function emit(t,d){window.parent.postMessage(Object.assign({source:'zoe-lesson',type:t},d||{}),'*');}
window.addEventListener('message',function(e){
  if(!e.data||!e.data.type)return;
  if(e.data.type==='narration-action'&&e.data.action){
    if(typeof window[e.data.action]==='function')window[e.data.action]();
    else console.warn('[ZOE] action not found:',e.data.action);
  }
  if(e.data.type==='beat'){ __zoeBeat(e.data.phase|0, e.data.beatMs); }
  if(e.data.type==='pause'){ __zoePause(); }
  if(e.data.type==='resume'){ __zoeResume(); }
  if(e.data.type==='experiment-change'&&typeof window.onExperiment==='function'){
    window.onExperiment(e.data.id,e.data.value);
  }
  if(e.data.type==='reset'){
    __zoe_phase=0; __zoe_beatPt=0; __zoe_beatStart=__zoeNow(); __zoe_accPause=0; __zoe_paused=false;
    if(typeof window.onReset==='function') window.onReset();
  }
});
window.addEventListener('error',function(e){
  __zoe_errors++;
  console.error('[ZOE iframe error]',e.message);
  if(!__zoe_ready && __zoe_errors>=${ERROR_THRESHOLD}){
    emit('error',{message:e.message||'Visual failed to initialize'});
  }
});
window.addEventListener('load',function(){
  __zoeStartLoop();
  setTimeout(function(){
    if(!__zoe_ready){ __zoe_ready=true; emit('ready'); }
  }, 400);
  setTimeout(function(){
    try{
      var hasCanvas=false;
      var nodes=document.querySelectorAll('canvas,svg,img,video');
      for(var i=0;i<nodes.length;i++){
        var r=nodes[i].getBoundingClientRect();
        if(r.width>8 && r.height>8){ hasCanvas=true; break; }
      }
      var text=(document.body.innerText||'').trim();
      if(!hasCanvas && text.length<2){ emit('blank',{}); }
    }catch(_){}
  }, 2600);
});
var __orig_emit=emit;
window.emit=function(t,d){
  if(t==='ready') __zoe_ready=true;
  __orig_emit(t,d);
};
// ── HiDPI canvas helper — always call this when creating/resizing a canvas
window.zoeCanvas=function(el,safeBottom){
  var sb=safeBottom!==undefined?safeBottom:(window.__zoe_safe_bottom||0);
  var dpr=window.devicePixelRatio||1;
  var W=window.innerWidth, H=window.innerHeight-sb;
  el.width=Math.floor(W*dpr); el.height=Math.floor(H*dpr);
  el.style.width=W+'px'; el.style.height=H+'px';
  var ctx=el.getContext('2d'); if(ctx) ctx.setTransform(dpr,0,0,dpr,0,0);
  return {W:W,H:H,DPR:dpr};
};
// ── Fluid size helpers (use inside draw/layout code)
window.fs=function(base){return Math.min(base,window.innerWidth*0.042);}; // responsive font px
window.vw=function(pct){return window.innerWidth*pct/100;};
window.vh=function(pct){return(window.innerHeight-(window.__zoe_safe_bottom||0))*pct/100;};
// ── zoeStage: FIXED reference coordinate system, scaled-to-fit (contain) with HiDPI.
// Draw everything in constant refW×refH coords — it fits ANY screen/DPR with no
// per-resize repositioning. Call once + on resize, then draw in ref coords.
// Returns {W,H} = the reference dims to author against (NOT pixels).
window.zoeStage=function(el,refW,refH){
  refW=refW||1000; refH=refH||625;
  var sb=window.__zoe_safe_bottom||0;
  var dpr=window.devicePixelRatio||1;
  var SW=window.innerWidth, SH=Math.max(1,window.innerHeight-sb);
  el.width=Math.floor(SW*dpr); el.height=Math.floor(SH*dpr);
  el.style.width=SW+'px'; el.style.height=SH+'px';
  var ctx=el.getContext('2d');
  var scale=Math.min(SW/refW, SH/refH);           // contain-fit: uniform, never distorts
  var offX=(SW-refW*scale)/2, offY=(SH-refH*scale)/2;
  if(ctx) ctx.setTransform(dpr*scale,0,0,dpr*scale,dpr*offX,dpr*offY);
  return {W:refW,H:refH,scale:scale,DPR:dpr,offX:offX,offY:offY,screenW:SW,screenH:SH};
};
// ── appear: smoothstep reveal — 0 before start, 1 after end, eased between.
window.appear=function(p,s,e){ if(p<=s)return 0; if(p>=e)return 1; var u=(p-s)/(e-s); return u*u*(3-2*u); };
// ── ZOE palette (use these for on-brand visuals)
window.ZC={bg:'#0f0d0a',gold:'#F6C863',amber:'#E9A23B',earth:'#C5876E',cream:'#FAF5EB',
  ink:'#FAF5EB',dim:'rgba(250,245,235,0.55)',line:'rgba(250,245,235,0.14)',
  good:'#7BCF9E',bad:'#E8846B',cool:'#8FB8D6',violet:'#B49BE0'};

// ════ BEAT ENGINE ════
// The player drives a beat timeline; each section authors ONE function
//   window.zoeRender(t, phase, pt, bt)
// that redraws every frame — 'phase' is the current beat index, 'pt' is a
// smooth 0..1 progress through that beat (great with appear()), 't'/'bt' are
// smooth ms clocks for ambient motion. We run the RAF loop and clock here so
// authored code stays declarative. (Old action-based code with no zoeRender
// keeps working — the loop simply no-ops until zoeRender exists.)
var __zoe_phase=0,__zoe_animStart=0,__zoe_beatStart=0,__zoe_beatMs=3200,__zoe_beatPt=0;
var __zoe_paused=false,__zoe_pauseAt=0,__zoe_accPause=0,__zoe_loopOn=false,__zoe_renderErrs=0;
function __zoeNow(){return (window.performance&&performance.now)?performance.now():Date.now();}
function __zoeBeat(phase,beatMs){
  __zoe_phase=phase; __zoe_beatStart=__zoeNow(); __zoe_beatPt=0;
  __zoe_beatMs=(typeof beatMs==='number'&&beatMs>0)?beatMs:3200;
  __zoe_paused=false;
  if(typeof window.onBeat==='function'){ try{window.onBeat(phase);}catch(_){} }
  __zoeStartLoop();
}
function __zoePause(){ if(!__zoe_paused){ __zoe_paused=true; __zoe_pauseAt=__zoeNow(); } }
function __zoeResume(){ if(__zoe_paused){ var d=__zoeNow()-__zoe_pauseAt; __zoe_accPause+=d; __zoe_beatStart+=d; __zoe_paused=false; } }
function __zoeStartLoop(){
  if(__zoe_loopOn) return; __zoe_loopOn=true;
  __zoe_animStart=__zoeNow(); if(!__zoe_beatStart)__zoe_beatStart=__zoe_animStart;
  function frame(){
    requestAnimationFrame(frame);
    if(typeof window.zoeRender!=='function') return;
    if(__zoe_paused) return;
    var now=__zoeNow();
    var t=now-__zoe_animStart-__zoe_accPause;
    var bt=now-__zoe_beatStart;
    var sp=Math.min(1, bt/Math.max(1,__zoe_beatMs));
    if(sp>__zoe_beatPt)__zoe_beatPt=sp;
    try{ window.zoeRender(t, __zoe_phase, __zoe_beatPt, bt); }
    catch(err){
      __zoe_renderErrs++;
      if(__zoe_renderErrs===12){ console.error('[ZOE zoeRender]',err&&err.message); }
      if(__zoe_renderErrs>90 && !__zoe_ready){ emit('error',{message:(err&&err.message)||'render error'}); }
    }
  }
  requestAnimationFrame(frame);
}

// ════ zoeDraw — shared 2D primitive kit (bind to a ctx + stage) ════
// var draw = zoeDraw(ctx, S);  then draw.clear(); draw.text(...); draw.arrow(...);
// Every method is defensive (never throws) and works in stage coordinates.
window.zoeDraw=function(ctx,S){
  S=S||{W:1000,H:625}; var W=S.W,H=S.H;
  function col(c,d){return c||d;}
  function rr(x,y,w,h,r){ r=Math.min(r||0,w/2,h/2);
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  }
  var api={
    W:W,H:H,
    clear:function(){ try{ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);ctx.restore();}catch(_){}},
    bg:function(top,bot){ try{ctx.save();ctx.setTransform(1,0,0,1,0,0);
      var g=ctx.createLinearGradient(0,0,0,ctx.canvas.height);
      g.addColorStop(0,top||'#161009'); g.addColorStop(1,bot||'#0d0b08');
      ctx.fillStyle=g; ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height); ctx.restore();}catch(_){}},
    text:function(str,x,y,o){ o=o||{}; try{
      ctx.save();
      ctx.font=(o.weight||'600')+' '+(o.size||20)+'px '+(o.font||'system-ui,-apple-system,sans-serif');
      ctx.textAlign=o.align||'center'; ctx.textBaseline=o.baseline||'middle';
      ctx.globalAlpha=(o.alpha==null?1:o.alpha);
      if(o.glow){ ctx.shadowColor=o.color||'#F6C863'; ctx.shadowBlur=o.glow===true?12:o.glow; }
      ctx.fillStyle=o.color||'#FAF5EB'; ctx.fillText(str,x,y);
      ctx.restore();
    }catch(_){}},
    // text on a padded pill — for labels that sit over artwork (guaranteed legible)
    pill:function(str,x,y,o){ o=o||{}; try{
      var sz=o.size||16; ctx.save();
      ctx.font=(o.weight||'700')+' '+sz+'px system-ui,sans-serif';
      var w=ctx.measureText(str).width, padX=sz*0.6, padY=sz*0.42;
      var bw=w+padX*2, bh=sz+padY*2, bx=x-bw/2, by=y-bh/2;
      ctx.fillStyle=o.bg||'rgba(15,13,10,0.72)'; rr(bx,by,bw,bh,bh/2); ctx.fill();
      if(o.stroke){ ctx.strokeStyle=o.stroke; ctx.lineWidth=1.4; ctx.stroke(); }
      ctx.fillStyle=o.color||'#FAF5EB'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(str,x,y); ctx.restore();
    }catch(_){}},
    rect:function(x,y,w,h,o){ o=o||{}; try{ ctx.save(); ctx.globalAlpha=(o.alpha==null?1:o.alpha);
      rr(x,y,w,h,o.radius||0);
      if(o.fill){ctx.fillStyle=o.fill;ctx.fill();}
      if(o.stroke){ctx.strokeStyle=o.stroke;ctx.lineWidth=o.lineWidth||1.5;ctx.stroke();}
      ctx.restore(); }catch(_){}},
    line:function(x1,y1,x2,y2,o){ o=o||{}; try{ ctx.save(); ctx.globalAlpha=(o.alpha==null?1:o.alpha);
      ctx.strokeStyle=col(o.color,'#FAF5EB'); ctx.lineWidth=o.width||2;
      if(o.dash)ctx.setLineDash(o.dash);
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.restore(); }catch(_){}},
    circle:function(x,y,r,o){ o=o||{}; try{ ctx.save(); ctx.globalAlpha=(o.alpha==null?1:o.alpha);
      if(o.glow){ctx.shadowColor=o.fill||o.stroke||'#F6C863';ctx.shadowBlur=o.glow===true?16:o.glow;}
      ctx.beginPath(); ctx.arc(x,y,Math.max(0,r),0,Math.PI*2);
      if(o.fill){ctx.fillStyle=o.fill;ctx.fill();}
      if(o.stroke){ctx.strokeStyle=o.stroke;ctx.lineWidth=o.lineWidth||2;ctx.stroke();}
      ctx.restore(); }catch(_){}},
    dot:function(x,y,r,color,glow){ this.circle(x,y,r,{fill:color||'#F6C863',glow:glow?14:0}); },
    arrow:function(x1,y1,x2,y2,o){ o=o||{}; try{ var col2=o.color||'#FAF5EB',wid=o.width||2.5,head=o.head||10;
      var a=Math.atan2(y2-y1,x2-x1); ctx.save(); ctx.strokeStyle=col2; ctx.fillStyle=col2; ctx.lineWidth=wid;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2,y2);
      ctx.lineTo(x2-head*Math.cos(a-0.42), y2-head*Math.sin(a-0.42));
      ctx.lineTo(x2-head*Math.cos(a+0.42), y2-head*Math.sin(a+0.42));
      ctx.closePath(); ctx.fill(); ctx.restore(); }catch(_){}},
    // horizontal number line with ticks/labels
    numberLine:function(x0,x1,y,o){ o=o||{}; try{ var min=o.min==null?0:o.min,max=o.max==null?10:o.max,step=o.step||1;
      var c=o.color||'rgba(250,245,235,0.6)'; this.line(x0,y,x1,y,{color:c,width:2});
      var span=max-min; for(var v=min;v<=max+1e-6;v+=step){ var px=x0+(v-min)/span*(x1-x0);
        this.line(px,y,px,y+7,{color:c,width:1.5});
        this.text((Math.round(v*100)/100)+'',px,y+20,{size:o.labelSize||13,color:c,weight:'600'}); }
      return function(v){ return x0+(v-min)/span*(x1-x0); };
    }catch(_){ return function(){return x0;}; }},
    // x/y axes with origin at (ox,oy)
    axes:function(ox,oy,len,o){ o=o||{}; var c=o.color||'rgba(250,245,235,0.55)';
      this.arrow(ox,oy,ox+(o.w||len),oy,{color:c,width:1.8,head:9});
      this.arrow(ox,oy,ox,oy-(o.h||len),{color:c,width:1.8,head:9});
      if(o.xLabel)this.text(o.xLabel,ox+(o.w||len)-6,oy+22,{size:13,color:c,align:'right'});
      if(o.yLabel)this.text(o.yLabel,ox+12,oy-(o.h||len)+6,{size:13,color:c,align:'left'}); }
  };
  return api;
};
<\/script>`;

interface IframeCanvasProps {
  code: string;
  className?: string;
  /**
   * Pixels to reserve at the bottom of the iframe body as a safe zone for
   * the floating UI overlay. Injected as `padding-bottom` on `<body>` so
   * AI-generated interactive controls are never hidden behind the narration panel.
   */
  safeBottom?: number;
  onReady?: () => void;
  onInteraction?: (data: Record<string, unknown>) => void;
  onSubmission?: (data: { payload: unknown; label?: string }) => void;
  onError?: (msg: string) => void;
  fallbackText?: string;
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
}

export default function IframeCanvas({
  code, className = "", safeBottom = 0, onReady, onInteraction, onSubmission, onError, fallbackText, iframeRef: externalRef,
}: IframeCanvasProps) {
  const localRef = useRef<HTMLIFrameElement>(null);
  const iframeRef = externalRef ?? localRef;
  const readyFired = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (e.data?.source !== "zoe-lesson") return;
    switch (e.data.type) {
      case "ready":
        if (!readyFired.current) {
          readyFired.current = true;
          setStatus("ready");
          onReady?.();
        }
        break;
      case "interaction":
        onInteraction?.(e.data);
        break;
      case "submission":
        onSubmission?.({ payload: e.data.payload, label: e.data.label });
        break;
      case "blank":
        // Rendered nothing visible — surface the fallback (only if not already ready-with-content)
        setErrorMsg(fallbackText || "This visual came up empty.");
        setStatus("error");
        onError?.("blank render");
        break;
      case "error":
        // Only switch to error state if ready hasn't fired yet — minor script errors
        // in an already-running visual should not kill the whole display.
        if (!readyFired.current) {
          setErrorMsg(e.data.message || "Visual failed to load");
          setStatus("error");
          onError?.(e.data.message || "iframe error");
        }
        break;
    }
  }, [onReady, onInteraction, onSubmission, onError, fallbackText]);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  // Readiness timeout — after READY_TIMEOUT_MS, show it regardless
  // (the visual may be running fine but didn't emit 'ready')
  useEffect(() => {
    readyFired.current = false;
    setStatus("loading");
    setErrorMsg("");
    const timer = setTimeout(() => {
      if (!readyFired.current) {
        setStatus("ready");
      }
    }, READY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [code, retryKey]);

  const retry = () => {
    readyFired.current = false;
    setRetryKey((k) => k + 1);
  };

  if (status === "error") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6" style={{ background: "#0f0d0a" }}>
        <AlertTriangle className="w-8 h-8" style={{ color: "#E9A23B" }} />
        <p className="text-[13px] font-semibold text-center" style={{ color: "#FAF5EB" }}>
          {errorMsg || fallbackText || "The interactive visual couldn't load."}
        </p>
        <button
          onClick={retry}
          className="flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 rounded-xl"
          style={{ background: "rgba(255,255,255,0.1)", color: "#FAF5EB" }}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Retry
        </button>
      </div>
    );
  }

  const srcdoc = buildSrcdoc(code, safeBottom);

  return (
    <div className="relative w-full h-full">
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: "#0f0d0a" }}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#F6C863", borderTopColor: "transparent" }} />
            <span className="text-[12px] font-semibold" style={{ color: "#FAF5EB80" }}>Loading interactive...</span>
          </div>
        </div>
      )}
      <iframe
        key={retryKey}
        ref={iframeRef}
        srcDoc={srcdoc}
        sandbox="allow-scripts"
        className={`w-full h-full border-0 ${className}`}
        style={{ background: "#0f0d0a" }}
        title="ZOE Interactive Lesson"
      />
    </div>
  );
}

// Universal mobile-first CSS + JS injected into every iframe regardless of what the AI generated.
// This is the safety net: even poorly-generated code is corrected.
function buildMobileBlock(safeBottom: number): string {
  return `<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover">
<style id="zoe-mobile">
  /* Universal mobile reset */
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
  html,body{
    width:100%!important;height:100%!important;
    overflow:hidden!important;
    background:#0f0d0a;color:#FAF5EB;
    font-family:system-ui,-apple-system,sans-serif;
    font-size:clamp(12px,3.4vw,15px);
    -webkit-text-size-adjust:100%;
    user-select:none;-webkit-user-select:none;
    overscroll-behavior:none;
  }
  /* Every canvas fills available space (below safe-bottom) */
  canvas{
    display:block;touch-action:none;
    width:100%!important;
    height:calc(100% - ${safeBottom}px)!important;
  }
  /* All buttons and range inputs are minimum tap-target size */
  button,[role="button"]{
    min-height:44px;min-width:44px;
    touch-action:manipulation;cursor:pointer;
    font-size:clamp(13px,3.6vw,15px);
  }
  input[type="range"]{
    height:44px;width:100%;
    touch-action:none;cursor:pointer;
  }
  /* Overlay/HUD text is fluid */
  #overlay,#hud,#label{
    font-size:clamp(11px,3vw,14px)!important;
    max-width:90vw;word-break:break-word;
  }
  /* Bottom-anchored labels clear the safe zone */
  #label,[id*="label"]{bottom:${safeBottom + 14}px!important;}
  /* Interactive control panels never overflow horizontally */
  #controls,#panel,[id*="controls"]{
    max-width:calc(100vw - 16px)!important;
    overflow-x:hidden!important;
  }
</style>
<script id="zoe-safe-js">
  window.__zoe_safe_bottom=${safeBottom};
<\/script>`;
}

function buildSrcdoc(code: string, safeBottom = 0): string {
  const mobileBlock = buildMobileBlock(safeBottom);
  const inject = BRIDGE_PREAMBLE + "\n" + mobileBlock;

  if (code.trim().startsWith("<!DOCTYPE") || code.trim().startsWith("<html")) {
    // Prefer injecting right before </head> so our meta/style come last (highest specificity)
    const headClose = code.indexOf("</head>");
    if (headClose !== -1) {
      return code.slice(0, headClose) + inject + code.slice(headClose);
    }
    const bodyOpen = code.indexOf("<body");
    if (bodyOpen !== -1) {
      return code.slice(0, bodyOpen) + "<head>" + inject + "</head>" + code.slice(bodyOpen);
    }
    const htmlOpen = code.indexOf("<html");
    const afterTag = code.indexOf(">", htmlOpen) + 1;
    return code.slice(0, afterTag) + "<head>" + inject + "</head>" + code.slice(afterTag);
  }

  // Bare snippet — wrap with a full document
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
${inject}
</head><body>
${code}
</body></html>`;
}

/** Send a narration action to the iframe. */
export function sendAction(iframe: HTMLIFrameElement | null, action: string) {
  iframe?.contentWindow?.postMessage({ type: "narration-action", action }, "*");
}

/** Send an experiment value change to the iframe. */
export function sendExperiment(iframe: HTMLIFrameElement | null, id: string, value: unknown) {
  iframe?.contentWindow?.postMessage({ type: "experiment-change", id, value }, "*");
}

/** Send a reset command to the iframe. */
export function sendReset(iframe: HTMLIFrameElement | null) {
  iframe?.contentWindow?.postMessage({ type: "reset" }, "*");
}

/** Advance the beat timeline: sets the active phase + how long the beat lasts. */
export function sendBeat(iframe: HTMLIFrameElement | null, phase: number, beatMs: number) {
  iframe?.contentWindow?.postMessage({ type: "beat", phase, beatMs }, "*");
}

/** Freeze the beat clock + ambient motion (narration paused). */
export function sendPause(iframe: HTMLIFrameElement | null) {
  iframe?.contentWindow?.postMessage({ type: "pause" }, "*");
}

/** Resume the beat clock after a pause. */
export function sendResume(iframe: HTMLIFrameElement | null) {
  iframe?.contentWindow?.postMessage({ type: "resume" }, "*");
}
