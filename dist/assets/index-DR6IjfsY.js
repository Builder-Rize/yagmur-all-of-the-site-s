import{r as e}from"./rolldown-runtime-hePW80VL.js";import{i as t,n,r,t as i}from"./motion-BzWcJ21J.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./three--WDFIE74.js";import{A as h,I as g,R as _,S as v,_ as y,b,c as x,g as S,k as C,t as w,v as T,z as E}from"./post-Bnsl6L4D.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var D=e(t(),1),O=e(m(),1),k=`Enesileyağmur`,A={first:`ENES`,second:`YAĞMUR`,separator:`×`},j={subtitle:`Bize ait küçük bir evren.`,placeholder:`Anahtarı yaz…`,button:`EVRENE GİR`,error:`Bu doğru anahtar gibi görünmüyor.`,hint:`İpucu: ikimizin adı, aramızda tek bir kelime.`},ee={title:`KÜÇÜK EVRENİMİZ`,subtitle:`Bir dünya seç.`,mobileHint:`Sürükle · Dokun`,desktopHint:`Fareyi gezdir · Bir dünyaya tıkla`},M=[{id:`stars`,index:`01`,title:`Yıldızların Altında`,description:`Yıldızların arasında küçük bir yer.`,url:`https://builder-rize.github.io/Yagmurun-galaksisi/`,kind:`link`,color:`#4d9fff`,accent:`#bfe0ff`,angle:Math.PI*.86,height:1.05},{id:`memories`,index:`02`,title:`Küçük Anılar`,description:`Biraz daha saklanmayı hak eden anlar.`,url:`https://builder-rize.github.io/yagmuruma-ozel/`,kind:`link`,color:`#2f7fe0`,accent:`#a9d2ff`,angle:Math.PI*1.14,height:-1.25},{id:`music`,index:`03`,title:`Bizim Şarkımız`,description:`Bazı duygular kelimelerden daha güzel duyulur.`,url:`https://builder-rize.github.io/Ya-murun-/`,kind:`link`,color:`#5fb2ff`,accent:`#d6ecff`,angle:Math.PI*.14,height:1.05},{id:`surprise`,index:`04`,title:`Küçük Bir Sürpriz`,description:`Seni bekleyen bir şey var.`,url:`https://builder-rize.github.io/yagmurun-sorular-/`,kind:`link`,color:`#3d86ff`,accent:`#c2dcff`,angle:Math.PI*-.14,height:-1.25},{id:`questions`,index:`05`,title:`Sana Birkaç Soru`,description:`Uzun zamandır sormak istediğim şeyler.`,kind:`questions`,color:`#7cc4ff`,accent:`#ffffff`,angle:Math.PI*.5,height:2.35}],N=[`Bende ilk fark ettiğin şey neydi?`,`Benimle geçirdiğin, en çok aklında kalan an hangisi?`,`Seni her zaman gülümseten şey nedir?`,`Bir gecelik her yere gidebilseydik, nereyi seçerdin?`,`Hangi şarkı sana bizi hatırlatıyor?`,`Kendimle ilgili fark etmediğimi düşündüğün bir şey var mı?`,`Yıllar sonra neyi hatırlamamızı isterdin?`,`Bende en sevdiğin küçük şey ne?`,`Hikâyemiz bir yer olsaydı, nasıl görünürdü?`,`Şu an bana ne söylemek isterdin?`],P={intro:`Sana sormak istediğim birkaç şey var…`,introButton:`BAŞLAYALIM`,placeholder:`Buraya yaz…`,submit:`GÖNDER`,skip:`geç`,back:`evrene dön`},F={headline:`Bu küçük evrene birkaç yeni yıldız eklendi.`,quote:`Belki bazı evrenler bulunmaz.
Belki yaratılır.`,again:`evrene dön`,review:`cevapları gör`},I={enabled:!0,publicKey:`4-m3QZytscu6Vmo79`,serviceId:`service_7676j1j`,templateId:`template_foxuk1g`,fields:{answers:`answers`,answeredAt:`answered_at`,count:`count`}},L={src:`/ambient.mp3`,volume:.28,synthFallback:!0},te=`ey-universe-answers`;function ne(){try{let e=localStorage.getItem(te);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}var R={stage:`loading`,progress:0,focused:null,traveling:null,answers:ne(),muted:!0,audioTouched:!1},re=new Set;function ie(){for(let e of re)e()}function ae(e){return re.add(e),()=>re.delete(e)}function z(e){R={...R,...e},ie()}var B={get:()=>R,set:z,setStage:e=>z({stage:e}),setProgress:e=>z({progress:Math.min(100,Math.max(0,e))}),focus:e=>{R.focused!==e&&z({focused:e})},travel:e=>z({traveling:e,stage:e?`travel`:`hub`}),addAnswer:(e,t)=>{let n=[...R.answers,{question:e,answer:t,at:Date.now()}];z({answers:n});try{localStorage.setItem(te,JSON.stringify(n))}catch{}},clearAnswers:()=>{z({answers:[]});try{localStorage.removeItem(te)}catch{}},setMuted:e=>z({muted:e,audioTouched:!0})};function V(e){return(0,D.useSyncExternalStore)(ae,()=>e(R),()=>e(R))}function oe(){if(typeof window>`u`)return{tier:`high`,isMobile:!1,isTouch:!1,particleScale:1,dpr:[1,2],heavyFx:!0,reducedMotion:!1};let e=window.innerWidth,t=window.matchMedia(`(hover: none)`).matches,n=e<768||t,r=navigator.hardwareConcurrency??4,i=navigator.deviceMemory??4,a=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,o=`high`;return(n||r<=4||i<=4)&&(o=`mid`),(r<=2||i<=2||n&&e<400)&&(o=`low`),{tier:o,isMobile:n,isTouch:t,reducedMotion:a,...{high:{particleScale:1,dpr:[1,2],heavyFx:!0},mid:{particleScale:.5,dpr:[1,1.6],heavyFx:!0},low:{particleScale:.26,dpr:[1,1.25],heavyFx:!1}}[o]}}function se(){let[e,t]=(0,D.useState)(oe);return(0,D.useEffect)(()=>{let e=0,n=()=>{cancelAnimationFrame(e),e=requestAnimationFrame(()=>t(oe()))};return window.addEventListener(`resize`,n),()=>{cancelAnimationFrame(e),window.removeEventListener(`resize`,n)}},[]),e}function ce(e=!0){let t=(0,D.useRef)({x:0,y:0,sx:0,sy:0,active:!1});return(0,D.useEffect)(()=>{if(!e)return;let n=(e,n)=>{let r=t.current;r.x=e/window.innerWidth*2-1,r.y=-(n/window.innerHeight*2-1),r.active=!0},r=e=>n(e.clientX,e.clientY),i=()=>{t.current.active=!1,t.current.x=0,t.current.y=0};window.addEventListener(`pointermove`,r,{passive:!0}),window.addEventListener(`pointerleave`,i);let a=e=>{if(e.gamma==null||e.beta==null)return;let n=t.current;n.x=Math.max(-1,Math.min(1,e.gamma/35)),n.y=Math.max(-1,Math.min(1,(e.beta-45)/35)),n.active=!0};return window.addEventListener(`deviceorientation`,a),()=>{window.removeEventListener(`pointermove`,r),window.removeEventListener(`pointerleave`,i),window.removeEventListener(`deviceorientation`,a)}},[e]),t}var H=null,U=null,le=null,ue=!1;function de(){return H||(H=new(window.AudioContext??window.webkitAudioContext),U=H.createGain(),U.gain.value=0,U.connect(H.destination)),H}function fe(e,t){let n=[],r=[],i=[],a=[{freq:55,gain:.5,detune:-6},{freq:82.4,gain:.32,detune:5},{freq:110,gain:.22,detune:-3},{freq:164.8,gain:.1,detune:8},{freq:220,gain:.05,detune:-9}],o=e.createGain();o.gain.value=.5;let s=e.createBiquadFilter();s.type=`lowpass`,s.frequency.value=620,s.Q.value=.6;let c=e.createOscillator(),l=e.createGain();c.frequency.value=.035,l.gain.value=260,c.connect(l),l.connect(s.frequency),c.start(),i.push(c),n.push(l);for(let t of a){let a=e.createOscillator();a.type=`sine`,a.frequency.value=t.freq,a.detune.value=t.detune;let s=e.createGain();s.gain.value=t.gain;let c=e.createOscillator(),l=e.createGain();c.frequency.value=.02+Math.random()*.05,l.gain.value=t.gain*.45,c.connect(l),l.connect(s.gain),c.start(),i.push(c),a.connect(s),s.connect(o),a.start(),r.push(a),n.push(s,l)}let u=e.sampleRate*4,d=e.createBuffer(1,u,e.sampleRate),f=d.getChannelData(0),p=0,m=0,h=0;for(let e=0;e<u;e++){let t=Math.random()*2-1;p=.99765*p+t*.099,m=.963*m+t*.2965,h=.57*h+t*1.0526,f[e]=(p+m+h+t*.1848)*.06}let g=e.createBufferSource();g.buffer=d,g.loop=!0;let _=e.createBiquadFilter();_.type=`bandpass`,_.frequency.value=900,_.Q.value=.4;let v=e.createGain();return v.gain.value=.28,g.connect(_),_.connect(v),v.connect(o),g.start(),n.push(_,v),o.connect(s),s.connect(t),n.push(o,s),{stop(){for(let e of r)try{e.stop()}catch{}for(let e of i)try{e.stop()}catch{}try{g.stop()}catch{}for(let e of n)e.disconnect()}}}async function pe(){let e=de();if(e.state===`suspended`&&await e.resume(),!(ue||!U)){if(ue=!0,L.src){let t=new Audio(L.src);if(t.loop=!0,t.crossOrigin=`anonymous`,t.preload=`auto`,await new Promise(e=>{let n=n=>{t.removeEventListener(`canplaythrough`,r),t.removeEventListener(`error`,i),e(n)},r=()=>n(!0),i=()=>n(!1);t.addEventListener(`canplaythrough`,r,{once:!0}),t.addEventListener(`error`,i,{once:!0}),setTimeout(()=>n(!1),2500),t.load()})){le=e.createMediaElementSource(t),le.connect(U),await t.play().catch(()=>void 0),W(L.volume,3.5);return}}L.synthFallback&&(fe(e,U),W(L.volume,5))}}function W(e,t=1.2){if(!H||!U)return;let n=H.currentTime;U.gain.cancelScheduledValues(n),U.gain.setValueAtTime(Math.max(U.gain.value,1e-4),n),U.gain.linearRampToValueAtTime(Math.max(e,1e-4),n+t)}function me(e){W(e?0:L.volume,e?.8:1.6)}function G(e=660,t=.14,n=.05){if(!H||!U||H.state!==`running`)return;let r=H.currentTime,i=H.createOscillator();i.type=`sine`,i.frequency.setValueAtTime(e,r),i.frequency.exponentialRampToValueAtTime(e*1.5,r+t);let a=H.createGain();a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(n,r+.012),a.gain.exponentialRampToValueAtTime(1e-4,r+t);let o=H.createBiquadFilter();o.type=`lowpass`,o.frequency.value=2600,i.connect(o),o.connect(a),a.connect(H.destination),i.start(r),i.stop(r+t+.05)}var K=class{constructor(e=0,t=`Network Error`){this.status=e,this.text=t}},q={origin:`https://api.emailjs.com`,blockHeadless:!1,storageProvider:(()=>{if(!(typeof localStorage>`u`))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},J=e=>e?typeof e==`string`?{publicKey:e}:e.toString()===`[object Object]`?e:{}:{},he=(e,t=`https://api.emailjs.com`)=>{if(!e)return;let n=J(e);q.publicKey=n.publicKey,q.blockHeadless=n.blockHeadless,q.storageProvider=n.storageProvider,q.blockList=n.blockList,q.limitRate=n.limitRate,q.origin=n.origin||t},ge=async(e,t,n={})=>{let r=await fetch(q.origin+e,{method:`POST`,headers:n,body:t}),i=await r.text(),a=new K(r.status,i);if(r.ok)return a;throw a},_e=(e,t,n)=>{if(!e||typeof e!=`string`)throw`The public key is required. Visit https://dashboard.emailjs.com/admin/account`;if(!t||typeof t!=`string`)throw`The service ID is required. Visit https://dashboard.emailjs.com/admin`;if(!n||typeof n!=`string`)throw`The template ID is required. Visit https://dashboard.emailjs.com/admin/templates`},ve=e=>{if(e&&e.toString()!==`[object Object]`)throw`The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/`},ye=e=>e.webdriver||!e.languages||e.languages.length===0,be=()=>new K(451,`Unavailable For Headless Browser`),xe=(e,t)=>{if(!Array.isArray(e))throw`The BlockList list has to be an array`;if(typeof t!=`string`)throw`The BlockList watchVariable has to be a string`},Se=e=>!e.list?.length||!e.watchVariable,Ce=(e,t)=>e instanceof FormData?e.get(t):e[t],we=(e,t)=>{if(Se(e))return!1;xe(e.list,e.watchVariable);let n=Ce(t,e.watchVariable);return typeof n==`string`&&e.list.includes(n)},Te=()=>new K(403,`Forbidden`),Ee=(e,t)=>{if(typeof e!=`number`||e<0)throw`The LimitRate throttle has to be a positive number`;if(t&&typeof t!=`string`)throw`The LimitRate ID has to be a non-empty string`},De=async(e,t,n)=>{let r=Number(await n.get(e)||0);return t-Date.now()+r},Oe=async(e,t,n)=>{if(!t.throttle||!n)return!1;Ee(t.throttle,t.id);let r=t.id||e;return await De(r,t.throttle,n)>0||(await n.set(r,Date.now().toString()),!1)},ke=()=>new K(429,`Too Many Requests`),Ae=async(e,t,n,r)=>{let i=J(r),a=i.publicKey||q.publicKey,o=i.blockHeadless||q.blockHeadless,s=i.storageProvider||q.storageProvider,c={...q.blockList,...i.blockList},l={...q.limitRate,...i.limitRate};return o&&ye(navigator)?Promise.reject(be()):(_e(a,e,t),ve(n),n&&we(c,n)?Promise.reject(Te()):await Oe(location.pathname,l,s)?Promise.reject(ke()):ge(`/api/v1.0/email/send`,JSON.stringify({lib_version:`4.4.1`,user_id:a,service_id:e,template_id:t,template_params:n}),{"Content-type":`application/json`}))},je=e=>{if(!e||e.nodeName!==`FORM`)throw`The 3rd parameter is expected to be the HTML form element or the style selector of the form`},Me=e=>typeof e==`string`?document.querySelector(e):e,Ne={init:he,send:Ae,sendForm:async(e,t,n,r)=>{let i=J(r),a=i.publicKey||q.publicKey,o=i.blockHeadless||q.blockHeadless,s=q.storageProvider||i.storageProvider,c={...q.blockList,...i.blockList},l={...q.limitRate,...i.limitRate};if(o&&ye(navigator))return Promise.reject(be());let u=Me(n);_e(a,e,t),je(u);let d=new FormData(u);return we(c,d)?Promise.reject(Te()):await Oe(location.pathname,l,s)?Promise.reject(ke()):(d.append(`lib_version`,`4.4.1`),d.append(`service_id`,e),d.append(`template_id`,t),d.append(`user_id`,a),ge(`/api/v1.0/email/send-form`,d))},EmailJSResponseStatus:K},Pe=`ey-universe-mail-sent`;function Fe(e){try{return localStorage.getItem(Pe)===e}catch{return!1}}function Ie(e){try{localStorage.setItem(Pe,e)}catch{}}function Le(e){return`${e.length}:${e[e.length-1]?.at??0}`}function Re(e){return e.map((e,t)=>{let n=String(t+1).padStart(2,`0`),r=e.answer.trim()||`(boş bırakıldı)`;return`${n}. ${e.question}\n    → ${r}`}).join(`

`)}function ze(e){try{return new Intl.DateTimeFormat(`tr-TR`,{dateStyle:`full`,timeStyle:`short`}).format(new Date(e))}catch{return new Date(e).toISOString()}}async function Be(e){if(!I.enabled||e.length===0)return!1;let t=Le(e);if(Fe(t))return!1;let n=e.filter(e=>e.answer.trim().length>0).length,r={[I.fields.answers]:Re(e),[I.fields.answeredAt]:ze(e[e.length-1]?.at??Date.now()),[I.fields.count]:`${n}/${e.length}`};try{return await Ne.send(I.serviceId,I.templateId,r,{publicKey:I.publicKey}),Ie(t),!0}catch(e){return console.warn(`[mail] gönderilemedi:`,e),!1}}var Y=r(),Ve=`
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aTint;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uReveal;

  varying vec3 vTint;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;

    // Çok yavaş sürüklenme
    pos.x += sin(uTime * 0.04 + aPhase) * 1.2;
    pos.y += cos(uTime * 0.031 + aPhase * 1.7) * 0.9;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Işıldama
    float tw = 0.55 + 0.45 * sin(uTime * 1.1 + aPhase * 6.2831);
    vTwinkle = tw;
    vTint = aTint;

    float dist = -mv.z;
    gl_PointSize = aSize * uPixelRatio * (140.0 / max(dist, 1.0)) * mix(0.2, 1.0, uReveal);
  }
`,He=`
  varying vec3 vTint;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // Yumuşak çekirdek + geniş hale
    float core = smoothstep(0.5, 0.0, d);
    float halo = exp(-d * 7.0);
    float a = (core * 0.55 + halo * 0.75) * vTwinkle;

    gl_FragColor = vec4(vTint * (0.7 + vTwinkle * 0.6), a);
    #include <colorspace_fragment>
  }
`;function Ue({count:e,radius:t=190,reveal:n=1}){let r=(0,D.useRef)(null),i=(0,D.useRef)(null),a=(0,D.useRef)(0),s=(0,D.useMemo)(()=>{let n=new Float32Array(e*3),r=new Float32Array(e),i=new Float32Array(e),a=new Float32Array(e*3),o=[new b(`#ffffff`),new b(`#d6ecff`),new b(`#9ec9ff`),new b(`#6ba9f5`),new b(`#4d9fff`),new b(`#e8f2ff`)];for(let s=0;s<e;s++){let e=Math.random(),c=Math.random(),l=e*Math.PI*2,u=Math.acos(2*c-1),d=t*(.35+.65*Math.cbrt(Math.random()));n[s*3]=d*Math.sin(u)*Math.cos(l),n[s*3+1]=d*Math.cos(u)*.62,n[s*3+2]=d*Math.sin(u)*Math.sin(l);let f=Math.random();r[s]=f>.985?4.2+Math.random()*2.4:f>.9?2.1+Math.random():.75+Math.random()*.9,i[s]=Math.random();let p=o[Math.floor(Math.random()*o.length)];a[s*3]=p.r,a[s*3+1]=p.g,a[s*3+2]=p.b}let s=new T;return s.setAttribute(`position`,new y(n,3)),s.setAttribute(`aSize`,new y(r,1)),s.setAttribute(`aPhase`,new y(i,1)),s.setAttribute(`aTint`,new y(a,3)),s.boundingSphere=new g(new E,t*1.2),s},[e,t]),c=(0,D.useMemo)(()=>({uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uReveal:{value:0}}),[]);return o((e,t)=>{let r=Math.min(t,.05);c.uTime.value+=r,a.current+=(n-a.current)*r*1.2,c.uReveal.value=a.current,i.current&&(i.current.rotation.y+=r*.004)}),(0,Y.jsx)(`points`,{ref:i,geometry:s,frustumCulled:!1,children:(0,Y.jsx)(`shaderMaterial`,{ref:r,vertexShader:Ve,fragmentShader:He,uniforms:c,transparent:!0,depthWrite:!1,blending:2})})}var We=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ge=`
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uIntensity;
  uniform float uSeed;
  uniform float uScale;

  // Basit hash & value noise
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash2(i)),
      dot(b, hash2(i + o)),
      dot(c, hash2(i + 1.0))
    );
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p = rot * p * 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * uScale;
    float t = uTime * 0.02 + uSeed;

    // Domain warping — sisi akışkan gösterir
    vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, 1.3 - t * 0.7)));
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.3),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) - t * 0.25)
    );
    float f = fbm(uv + 4.0 * r);

    // Yumuşak, kenarlara doğru sönen maske
    float d = length(vUv - 0.5) * 2.0;
    float mask = smoothstep(1.0, 0.15, d);

    float density = smoothstep(0.05, 0.85, f * 0.5 + 0.5);
    vec3 col = mix(uColorA, uColorB, clamp(length(r) * 0.9, 0.0, 1.0));

    float alpha = density * mask * uIntensity;
    gl_FragColor = vec4(col * alpha, alpha);
    #include <colorspace_fragment>
  }
`;function Ke({position:e,rotation:t=[0,0,0],size:n,colorA:r,colorB:i,intensity:a,seed:s,scale:c=2.4,drift:l=.01}){let u=(0,D.useRef)(null),d=(0,D.useMemo)(()=>({uTime:{value:s*10},uColorA:{value:new b(r)},uColorB:{value:new b(i)},uIntensity:{value:a},uSeed:{value:s},uScale:{value:c}}),[r,i,a,s,c]);return o((e,t)=>{let n=Math.min(t,.05);d.uTime.value+=n,u.current&&(u.current.rotation.z+=n*l)}),(0,Y.jsxs)(`mesh`,{ref:u,position:e,rotation:t,children:[(0,Y.jsx)(`planeGeometry`,{args:[n,n]}),(0,Y.jsx)(`shaderMaterial`,{vertexShader:We,fragmentShader:Ge,uniforms:d,transparent:!0,depthWrite:!1,depthTest:!1,blending:2,side:2})]})}function qe({layers:e=4}){let t=(0,D.useMemo)(()=>[{position:[-30,10,-95],rotation:[0,.2,.4],size:190,colorA:`#0a2148`,colorB:`#1e5aa8`,intensity:.3,seed:1.3,scale:2.1,drift:.008},{position:[38,-16,-78],rotation:[0,-.25,-.6],size:150,colorA:`#123a72`,colorB:`#4d9fff`,intensity:.22,seed:4.7,scale:2.8,drift:-.011},{position:[0,26,-120],rotation:[0,0,1.1],size:240,colorA:`#071a3a`,colorB:`#2a6fc4`,intensity:.26,seed:8.1,scale:1.7,drift:.005},{position:[-12,-30,-55],rotation:[.3,.1,-.2],size:120,colorA:`#0d2b57`,colorB:`#5fb2ff`,intensity:.16,seed:12.4,scale:3.2,drift:.014}],[]);return(0,Y.jsx)(`group`,{children:t.slice(0,e).map((e,t)=>(0,Y.jsx)(Ke,{...e},t))})}var Je=`
  attribute float aSize;
  attribute float aSpeed;
  attribute float aPhase;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSpread;

  varying float vFade;

  void main() {
    vec3 pos = position;

    // Yavaşça yukarı süzülüp başa dönen toz
    float travel = mod(pos.y + uTime * aSpeed * 0.35, uSpread) - uSpread * 0.5;
    pos.y = travel;

    // Yanal salınım
    pos.x += sin(uTime * 0.25 * aSpeed + aPhase) * 0.9;
    pos.z += cos(uTime * 0.2 * aSpeed + aPhase * 1.4) * 0.9;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = -mv.z;
    // Çok yakın ve çok uzak tozu sönümle
    vFade = smoothstep(1.0, 5.0, dist) * smoothstep(70.0, 30.0, dist);
    vFade *= 0.5 + 0.5 * sin(uTime * 0.8 + aPhase * 6.28);

    gl_PointSize = aSize * uPixelRatio * (90.0 / max(dist, 1.0));
  }
`,Ye=`
  varying float vFade;
  uniform vec3 uColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float a = exp(-d * 6.0) * vFade * 0.6;
    gl_FragColor = vec4(uColor, a);
    #include <colorspace_fragment>
  }
`;function Xe({count:e,spread:t=46,color:n=`#9ec9ff`}){let r=(0,D.useRef)(null),i=(0,D.useMemo)(()=>{let n=new Float32Array(e*3),r=new Float32Array(e),i=new Float32Array(e),a=new Float32Array(e);for(let o=0;o<e;o++){let e=Math.random()*Math.PI*2,s=3+Math.random()*24;n[o*3]=Math.cos(e)*s,n[o*3+1]=(Math.random()-.5)*t,n[o*3+2]=Math.sin(e)*s,r[o]=.5+Math.random()*1.6,i[o]=.4+Math.random()*1.4,a[o]=Math.random()}let o=new T;return o.setAttribute(`position`,new y(n,3)),o.setAttribute(`aSize`,new y(r,1)),o.setAttribute(`aSpeed`,new y(i,1)),o.setAttribute(`aPhase`,new y(a,1)),o.boundingSphere=new g(new E,t),o},[e,t]),a=(0,D.useMemo)(()=>({uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uSpread:{value:t},uColor:{value:new b(n)}}),[t,n]);return o((e,t)=>{a.uTime.value+=Math.min(t,.05),r.current&&(r.current.rotation.y+=Math.min(t,.05)*.012)}),(0,Y.jsx)(`points`,{ref:r,geometry:i,frustumCulled:!1,children:(0,Y.jsx)(`shaderMaterial`,{vertexShader:Je,fragmentShader:Ye,uniforms:a,transparent:!0,depthWrite:!1,blending:2})})}var Ze=`
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;

  uniform float uTime;
  uniform float uPulse;

  // Yüzeyi hafifçe dalgalandır
  float wave(vec3 p) {
    return sin(p.x * 3.0 + uTime * 0.7)
         * sin(p.y * 2.6 - uTime * 0.5)
         * sin(p.z * 3.4 + uTime * 0.6);
  }

  void main() {
    vec3 pos = position;
    float w = wave(normalize(position) * 1.6);
    pos += normal * w * 0.035 * (0.6 + uPulse * 0.8);

    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vPosition = pos;
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`,Qe=`
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;

  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uInner;
  uniform vec3 uOuter;

  // Damarlanma deseni için basit 3B gürültü
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 n = normalize(vNormal);
    float fres = pow(1.0 - clamp(dot(n, normalize(vViewDir)), 0.0, 1.0), 2.4);

    // Yavaşça akan enerji damarları
    vec3 q = vPosition * 2.2 + vec3(0.0, uTime * 0.12, uTime * 0.07);
    float veins = fbm(q);
    veins = smoothstep(0.42, 0.72, veins);

    // İçten dışa doğru renk geçişi
    vec3 col = mix(uInner, uOuter, fres);
    col += uOuter * veins * (0.5 + uPulse * 0.9);
    col += vec3(0.55, 0.78, 1.0) * fres * (0.7 + uPulse * 0.5);

    // Nabız
    col *= 0.75 + uPulse * 0.55;

    float alpha = clamp(0.42 + fres * 0.7 + veins * 0.35, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`,$e=`
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`,et=`
  varying vec3 vNormal;
  varying vec3 vView;
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uStrength;

  void main() {
    float fres = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0), uPower);
    float a = fres * uStrength;
    gl_FragColor = vec4(uColor * a, a);
    #include <colorspace_fragment>
  }
`;function tt({intensity:e=1,crystals:t=!0,quality:n=`high`}){let r=(0,D.useRef)(null),i=(0,D.useRef)(null),a=(0,D.useRef)(null),s=(0,D.useRef)(0),c=n===`low`?48:n===`mid`?80:128,l=(0,D.useMemo)(()=>({uTime:{value:0},uPulse:{value:.5},uInner:{value:new b(`#0b1f45`)},uOuter:{value:new b(`#4d9fff`)}}),[]),u=(0,D.useMemo)(()=>({uColor:{value:new b(`#4d9fff`)},uPower:{value:3},uStrength:{value:.55}}),[]),d=(0,D.useMemo)(()=>({uColor:{value:new b(`#7cc4ff`)},uPower:{value:4.5},uStrength:{value:.3}}),[]),f=(0,D.useMemo)(()=>{let e=n===`low`?7:n===`mid`?11:16;return Array.from({length:e},(t,n)=>{let r=(n+.5)/e,i=Math.acos(1-2*r),a=Math.PI*(1+Math.sqrt(5))*n,o=1.62+Math.random()*.32;return{position:[o*Math.sin(i)*Math.cos(a),o*Math.cos(i)*.75,o*Math.sin(i)*Math.sin(a)],rotation:[Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI],scale:.1+Math.random()*.19,speed:.25+Math.random()*.5,phase:Math.random()*Math.PI*2}})},[n]);return o((t,n)=>{let o=Math.min(n,.05),c=t.clock.elapsedTime;l.uTime.value=c;let p=Math.sin(c*.9)*.5+.5,m=Math.sin(c*2.3+1.1)*.5+.5;if(s.current=(p*.72+m*.28)*e,l.uPulse.value=s.current,u.uStrength.value=(.42+s.current*.3)*e,d.uStrength.value=(.16+s.current*.16)*e,r.current){r.current.rotation.y+=o*.055;let t=.97+s.current*.045;r.current.scale.setScalar(t*e)}i.current&&(i.current.rotation.y-=o*.09,i.current.rotation.x=Math.sin(c*.13)*.14,i.current.children.forEach((e,t)=>{let n=f[t];if(!n)return;e.rotation.x+=o*n.speed*.4,e.rotation.z+=o*n.speed*.3;let r=Math.sin(c*n.speed+n.phase)*.09;e.position.setY(n.position[1]+r)})),a.current&&(a.current.rotation.y-=o*.16,a.current.rotation.z+=o*.05)}),(0,Y.jsxs)(`group`,{ref:r,children:[(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`icosahedronGeometry`,{args:[1,n===`low`?4:6]}),(0,Y.jsx)(`shaderMaterial`,{vertexShader:Ze,fragmentShader:Qe,uniforms:l,transparent:!0,side:0})]}),(0,Y.jsx)(`group`,{ref:a,children:(0,Y.jsxs)(`mesh`,{scale:1.18,children:[(0,Y.jsx)(`icosahedronGeometry`,{args:[1,1]}),(0,Y.jsx)(`meshBasicMaterial`,{color:`#7cc4ff`,wireframe:!0,transparent:!0,opacity:.14*e,blending:2,depthWrite:!1})]})}),(0,Y.jsxs)(`mesh`,{scale:1.42,children:[(0,Y.jsx)(`sphereGeometry`,{args:[1,c/2,c/2]}),(0,Y.jsx)(`shaderMaterial`,{vertexShader:$e,fragmentShader:et,uniforms:u,transparent:!0,side:1,depthWrite:!1,blending:2})]}),(0,Y.jsxs)(`mesh`,{scale:1.95,children:[(0,Y.jsx)(`sphereGeometry`,{args:[1,c/3,c/3]}),(0,Y.jsx)(`shaderMaterial`,{vertexShader:$e,fragmentShader:et,uniforms:d,transparent:!0,side:1,depthWrite:!1,blending:2})]}),t&&(0,Y.jsx)(`group`,{ref:i,children:f.map((t,n)=>(0,Y.jsxs)(`mesh`,{position:t.position,rotation:t.rotation,scale:[t.scale*.55,t.scale*1.7,t.scale*.55],children:[(0,Y.jsx)(`octahedronGeometry`,{args:[1,0]}),(0,Y.jsx)(`meshPhysicalMaterial`,{color:`#5aa8ff`,emissive:`#7cc4ff`,emissiveIntensity:1.5*e,metalness:.1,roughness:.14,clearcoat:1,clearcoatRoughness:.06,transparent:!0,opacity:.7,flatShading:!0})]},n))}),(0,Y.jsx)(`pointLight`,{color:`#4d9fff`,intensity:14*e,distance:38,decay:2}),(0,Y.jsx)(`pointLight`,{color:`#d6ecff`,intensity:5*e,distance:14,decay:2})]})}var X=(e,t,n)=>new E(e,t,n),nt={gate:{position:X(0,.2,8.6),lookAt:X(0,0,0),fov:42,ease:.9,parallax:.5},breach:{position:X(0,0,-1.2),lookAt:X(0,0,-30),fov:96,ease:2.6,parallax:.1},hub:{position:X(0,2.2,21),lookAt:X(0,0,0),fov:50,ease:1.1,parallax:1},questions:{position:X(0,5.6,9.5),lookAt:X(0,1.2,0),fov:46,ease:1,parallax:.35},finale:{position:X(0,7.5,30),lookAt:X(0,1.5,0),fov:52,ease:.5,parallax:.6}};function rt({stage:e,pointer:t,travelTarget:n,isMobile:r,reducedMotion:i}){let{camera:a}=c(),s=(0,D.useRef)(new E(0,.2,26)),l=(0,D.useRef)(new E(0,0,0)),u=(0,D.useRef)(new E),d=(0,D.useRef)(new E),f=(0,D.useRef)(new _),p=(0,D.useRef)(0);return o((o,c)=>{let m=Math.min(c,.05),h=o.clock.elapsedTime,g=a,_=nt[e]??nt.hub;if(e===`travel`&&n){let e=n.clone().normalize();_={position:n.clone().add(e.multiplyScalar(2.2)),lookAt:n,fov:78,ease:1.5,parallax:.15}}let v=u.current.copy(_.position);e===`hub`?g.aspect<.85?v.set(0,0,20.5):r&&(v.multiplyScalar(1.18),v.y=_.position.y*.75):r&&e===`finale`&&v.multiplyScalar(1.18);let y=1-Math.exp(-_.ease*1.9*m);s.current.lerp(v,y),l.current.lerp(d.current.copy(_.lookAt),y);let b=t.current,x=i?0:_.parallax*(r?.6:1);f.current.x+=(b.x*x-f.current.x)*m*2.2,f.current.y+=(b.y*x-f.current.y)*m*2.2;let S=i?0:Math.sin(h*.21)*.24*_.parallax,C=i?0:Math.cos(h*.17)*.16*_.parallax,w=i?0:Math.sin(h*.13)*.3*_.parallax;g.position.set(s.current.x+f.current.x*1.5+S,s.current.y+f.current.y*1.1+C,s.current.z+w),g.lookAt(l.current.x+f.current.x*.35,l.current.y+f.current.y*.25,l.current.z);let T=i?0:f.current.x*-.035+Math.sin(h*.11)*.012;p.current+=(T-p.current)*m*2,g.rotation.z+=p.current;let E=1-Math.exp(-_.ease*1.6*m);g.fov+=(_.fov-g.fov)*E,g.updateProjectionMatrix()}),null}var it=`
  attribute vec3 aDir;
  attribute float aSpeed;
  attribute float aSize;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vAlpha;

  void main() {
    // Dışa doğru hızla açılıp yavaşlayan patlama
    float t = clamp(uTime, 0.0, 1.0);
    float ease = 1.0 - pow(1.0 - t, 2.6);
    vec3 pos = position + aDir * ease * aSpeed * 26.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Hızlı parlayıp sönme
    vAlpha = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.35, 1.0, t));

    float dist = -mv.z;
    gl_PointSize = aSize * uPixelRatio * (150.0 / max(dist, 1.0)) * (1.0 - t * 0.5);
  }
`,at=`
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.3, 0.0, d);
    float halo = exp(-d * 6.0);
    float a = (core * 0.8 + halo * 0.7) * vAlpha;
    gl_FragColor = vec4(uColor * (1.0 + core * 1.5), a);
    #include <colorspace_fragment>
  }
`;function ot({active:e,count:t=600,color:n=`#bfe0ff`}){let r=(0,D.useRef)(null),i=(0,D.useRef)(0),a=(0,D.useRef)(!1),s=(0,D.useMemo)(()=>{let e=new Float32Array(t*3),n=new Float32Array(t*3),r=new Float32Array(t),i=new Float32Array(t);for(let a=0;a<t;a++){let t=Math.random(),o=Math.random(),s=t*Math.PI*2,c=Math.acos(2*o-1),l=Math.sin(c)*Math.cos(s),u=Math.cos(c),d=Math.sin(c)*Math.sin(s),f=.6+Math.random()*.5;e[a*3]=l*f,e[a*3+1]=u*f,e[a*3+2]=d*f,n[a*3]=l,n[a*3+1]=u,n[a*3+2]=d,r[a]=.35+Math.random()*.95,i[a]=1.4+Math.random()*3.4}let a=new T;return a.setAttribute(`position`,new y(e,3)),a.setAttribute(`aDir`,new y(n,3)),a.setAttribute(`aSpeed`,new y(r,1)),a.setAttribute(`aSize`,new y(i,1)),a.boundingSphere=new g(new E,40),a},[t]),c=(0,D.useMemo)(()=>({uTime:{value:1},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uColor:{value:new b(n)}}),[n]);return o((t,n)=>{e&&!a.current&&(i.current=0,a.current=!0),e||(a.current=!1),i.current<1.2&&(i.current+=Math.min(n,.05)*.75,c.uTime.value=i.current)}),(0,Y.jsx)(`points`,{ref:r,geometry:s,frustumCulled:!1,visible:e,children:(0,Y.jsx)(`shaderMaterial`,{vertexShader:it,fragmentShader:at,uniforms:c,transparent:!0,depthWrite:!1,blending:2})})}function st({color:e,accent:t,hover:n}){let r=(0,D.useRef)(null),i=(0,D.useRef)(null),a=(0,D.useMemo)(()=>Array.from({length:9},(e,t)=>{let n=t/9*Math.PI*2,r=.3+t%3*.11;return{pos:[Math.cos(n)*r,Math.sin(n*1.7)*.16,Math.sin(n)*r],size:.022+t%4*.011,speed:.4+t%5*.16}}),[]),s=(0,D.useMemo)(()=>{let e=[];for(let t of[0,3,6,1,4,7,2,5,8,0]){let n=a[t];e.push(new E(...n.pos))}return new T().setFromPoints(e)},[a]);return o((e,t)=>{let a=Math.min(t,.05);r.current&&(r.current.rotation.y+=a*(.22+n*.5),r.current.rotation.x=Math.sin(e.clock.elapsedTime*.3)*.18),i.current&&(i.current.rotation.y-=a*.4)}),(0,Y.jsxs)(`group`,{ref:r,children:[(0,Y.jsx)(`group`,{ref:i,children:(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`icosahedronGeometry`,{args:[.14,1]}),(0,Y.jsx)(`meshStandardMaterial`,{color:e,emissive:t,emissiveIntensity:1.4+n*1.8,roughness:.25,metalness:.5})]})}),(0,Y.jsxs)(`line`,{children:[(0,Y.jsx)(`primitive`,{object:s,attach:`geometry`}),(0,Y.jsx)(`lineBasicMaterial`,{color:t,transparent:!0,opacity:.12+n*.32,blending:2,depthWrite:!1})]}),a.map((e,n)=>(0,Y.jsxs)(`mesh`,{position:e.pos,children:[(0,Y.jsx)(`sphereGeometry`,{args:[e.size,10,10]}),(0,Y.jsx)(`meshBasicMaterial`,{color:t,toneMapped:!1})]},n))]})}function ct({color:e,accent:t,hover:n}){let r=(0,D.useRef)(null),i=(0,D.useMemo)(()=>Array.from({length:5},(e,t)=>{let n=t/5*Math.PI*2;return{pos:[Math.cos(n)*.26,(t-2)*.075,Math.sin(n)*.26],rot:[0,-n+Math.PI/2,(Math.random()-.5)*.24],size:[.2+t%2*.05,.26+t%3*.04],phase:t*1.25}}),[]);return o((e,t)=>{let a=Math.min(t,.05);if(!r.current)return;r.current.rotation.y+=a*(.16+n*.34);let o=e.clock.elapsedTime;r.current.children.forEach((e,t)=>{let n=i[t];n&&e.position.setY(n.pos[1]+Math.sin(o*.7+n.phase)*.045)})}),(0,Y.jsx)(`group`,{ref:r,children:i.map((r,i)=>(0,Y.jsxs)(`group`,{position:r.pos,rotation:r.rot,children:[(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`planeGeometry`,{args:r.size}),(0,Y.jsx)(`meshPhysicalMaterial`,{color:e,emissive:t,emissiveIntensity:.25+n*.7,roughness:.1,metalness:.1,transmission:.7,thickness:.3,transparent:!0,opacity:.55,side:2})]}),(0,Y.jsxs)(`lineSegments`,{children:[(0,Y.jsx)(`edgesGeometry`,{args:[new C(r.size[0],r.size[1])]}),(0,Y.jsx)(`lineBasicMaterial`,{color:t,transparent:!0,opacity:.4+n*.5,blending:2})]})]},i))})}function lt({color:e,accent:t,hover:n}){let r=(0,D.useRef)(null),i=(0,D.useRef)(null),a=(0,D.useMemo)(()=>Array.from({length:7},(e,t)=>.13+t*.036),[]);return o((e,t)=>{let a=Math.min(t,.05),o=e.clock.elapsedTime;r.current&&(r.current.rotation.z-=a*(1.1+n*1.6)),i.current&&i.current.children.forEach((e,t)=>{let r=(o*.5+t*.33)%1,i=.3+r*.55;e.scale.setScalar(i);let a=e.material;a.opacity=(1-r)*(.16+n*.4)})}),(0,Y.jsxs)(`group`,{rotation:[Math.PI/2-.32,0,0],children:[(0,Y.jsxs)(`group`,{ref:r,children:[(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`cylinderGeometry`,{args:[.34,.34,.012,48]}),(0,Y.jsx)(`meshPhysicalMaterial`,{color:`#050d1e`,roughness:.22,metalness:.75,clearcoat:1,clearcoatRoughness:.1})]}),a.map((e,r)=>(0,Y.jsxs)(`mesh`,{position:[0,.008,0],rotation:[-Math.PI/2,0,0],children:[(0,Y.jsx)(`ringGeometry`,{args:[e,e+.004,48]}),(0,Y.jsx)(`meshBasicMaterial`,{color:t,transparent:!0,opacity:.1+n*.22,side:2,blending:2,depthWrite:!1})]},r)),(0,Y.jsxs)(`mesh`,{position:[0,.009,0],rotation:[-Math.PI/2,0,0],children:[(0,Y.jsx)(`circleGeometry`,{args:[.1,32]}),(0,Y.jsx)(`meshStandardMaterial`,{color:e,emissive:t,emissiveIntensity:1.1+n*1.6,roughness:.4})]})]}),(0,Y.jsx)(`group`,{ref:i,rotation:[-Math.PI/2,0,0],children:[0,1,2].map(e=>(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`ringGeometry`,{args:[.44,.46,56]}),(0,Y.jsx)(`meshBasicMaterial`,{color:t,transparent:!0,opacity:.2,side:2,blending:2,depthWrite:!1})]},e))})]})}function ut({color:e,accent:t,hover:n}){let r=(0,D.useRef)(null),i=(0,D.useRef)(null),a=(0,D.useRef)(null),s=(0,D.useMemo)(()=>{let e=new Float32Array(72);for(let t=0;t<24;t++){let n=Math.random()*Math.PI*2,r=.05+Math.random()*.16;e[t*3]=Math.cos(n)*r,e[t*3+1]=Math.random()*.3,e[t*3+2]=Math.sin(n)*r}let t=new T;return t.setAttribute(`position`,new y(e,3)),t},[]);return o((e,t)=>{let o=Math.min(t,.05),s=e.clock.elapsedTime;if(r.current&&(r.current.rotation.y+=o*(.3+n*.6),r.current.position.setY(Math.sin(s*.8)*.03)),i.current){let e=n*.12;i.current.position.y+=(.19+e-i.current.position.y)*o*4,i.current.rotation.y+=o*.2}if(a.current){a.current.rotation.y-=o*.5;let e=a.current.material;e.opacity=.25+n*.6+Math.sin(s*3)*.1}}),(0,Y.jsxs)(`group`,{ref:r,children:[(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`boxGeometry`,{args:[.36,.36,.36]}),(0,Y.jsx)(`meshPhysicalMaterial`,{color:`#0a1c3c`,emissive:e,emissiveIntensity:.35+n*.7,roughness:.15,metalness:.4,transmission:.4,thickness:.6,transparent:!0,opacity:.82})]}),(0,Y.jsxs)(`lineSegments`,{children:[(0,Y.jsx)(`edgesGeometry`,{args:[new S(.361,.361,.361)]}),(0,Y.jsx)(`lineBasicMaterial`,{color:t,transparent:!0,opacity:.45+n*.5,blending:2})]}),(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`icosahedronGeometry`,{args:[.13,1]}),(0,Y.jsx)(`meshBasicMaterial`,{color:t,toneMapped:!1,transparent:!0,opacity:.85})]}),(0,Y.jsx)(`group`,{ref:i,position:[0,.19,0],children:(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`boxGeometry`,{args:[.4,.05,.4]}),(0,Y.jsx)(`meshPhysicalMaterial`,{color:`#0d2450`,emissive:e,emissiveIntensity:.5+n*.9,roughness:.12,metalness:.55})]})}),(0,Y.jsx)(`points`,{ref:a,geometry:s,position:[0,.08,0],children:(0,Y.jsx)(`pointsMaterial`,{color:t,size:.022,transparent:!0,opacity:.4,blending:2,depthWrite:!1,toneMapped:!1})})]})}function dt({color:e,accent:t,hover:n}){let r=(0,D.useRef)(null),i=(0,D.useRef)(null),a=(0,D.useRef)(null),s=(0,D.useRef)(null);o((e,t)=>{let o=Math.min(t,.05),c=e.clock.elapsedTime,l=1+n*1.4;if(r.current&&(r.current.rotation.x+=o*.4*l,r.current.rotation.y+=o*.26*l),i.current&&(i.current.rotation.y-=o*.34*l,i.current.rotation.z+=o*.22*l),a.current&&(a.current.rotation.z-=o*.3*l,a.current.rotation.x+=o*.18*l),s.current){let e=.12+Math.sin(c*1.6)*.018+n*.04;s.current.scale.setScalar(e/.12)}});let c=r=>(0,Y.jsx)(`meshStandardMaterial`,{color:e,emissive:t,emissiveIntensity:.8+n*1.5,roughness:.2,metalness:.7,transparent:!0,opacity:r});return(0,Y.jsxs)(`group`,{children:[(0,Y.jsxs)(`mesh`,{ref:r,children:[(0,Y.jsx)(`torusGeometry`,{args:[.34,.011,12,64]}),c(.85)]}),(0,Y.jsxs)(`mesh`,{ref:i,rotation:[Math.PI/3,0,0],children:[(0,Y.jsx)(`torusGeometry`,{args:[.27,.009,12,64]}),c(.7)]}),(0,Y.jsxs)(`mesh`,{ref:a,rotation:[0,Math.PI/3,Math.PI/4],children:[(0,Y.jsx)(`torusGeometry`,{args:[.2,.007,12,64]}),c(.6)]}),(0,Y.jsxs)(`mesh`,{ref:s,children:[(0,Y.jsx)(`sphereGeometry`,{args:[.12,24,24]}),(0,Y.jsx)(`meshBasicMaterial`,{color:t,toneMapped:!1})]}),(0,Y.jsx)(`pointLight`,{color:t,intensity:1.6+n*2.5,distance:3,decay:2})]})}var ft={stars:st,memories:ct,music:lt,surprise:ut,questions:dt},pt=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,mt=`
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uHover;
  uniform float uReveal;

  void main() {
    // Halka boyunca dolaşan parlak yay
    float a = vUv.x;
    float sweep = fract(a - uTime * 0.12);
    float arc = smoothstep(0.0, 0.16, sweep) * smoothstep(0.34, 0.16, sweep);

    // İkinci, ters yönde ilerleyen yay
    float sweep2 = fract(a + uTime * 0.07 + 0.5);
    float arc2 = smoothstep(0.0, 0.1, sweep2) * smoothstep(0.22, 0.1, sweep2);

    // Kesitin kenarlarına doğru sönme
    float edge = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.6, vUv.y);

    float base = 0.16 + uHover * 0.3;
    float glow = base + arc * (0.55 + uHover * 0.9) + arc2 * (0.25 + uHover * 0.4);

    vec3 col = mix(uColor, uAccent, arc * 0.8 + uHover * 0.3);
    float alpha = glow * edge * uReveal;

    gl_FragColor = vec4(col * (1.0 + arc * 1.4), alpha);
    #include <colorspace_fragment>
  }
`,ht=`
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uHover;
  uniform float uReveal;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
  }

  void main() {
    vec2 c = vUv - 0.5;
    float d = length(c) * 2.0;
    if (d > 1.0) discard;

    // İçe doğru çekilen girdap
    float ang = atan(c.y, c.x);
    float swirl = noise(vec2(ang * 1.6 + uTime * 0.18, d * 3.0 - uTime * 0.35));
    float ripple = sin(d * 14.0 - uTime * 1.4) * 0.5 + 0.5;

    float mask = smoothstep(1.0, 0.25, d);
    float density = (swirl * 0.6 + ripple * 0.22) * mask;

    float alpha = density * (0.1 + uHover * 0.26) * uReveal;
    gl_FragColor = vec4(uColor * (0.8 + swirl * 0.9), alpha);
    #include <colorspace_fragment>
  }
`;function gt({world:e,position:t,focused:n,dimmed:r,reveal:i,onHover:a,onSelect:s,showLabels:c,quality:l}){let u=(0,D.useRef)(null),d=(0,D.useRef)(null),f=(0,D.useRef)(null),[m,h]=(0,D.useState)(!1),g=(0,D.useRef)(0),_=(0,D.useMemo)(()=>new E(...t),[t]),v=(0,D.useMemo)(()=>Math.random()*Math.PI*2,[]),x=ft[e.id]??ft.stars,S=(0,D.useMemo)(()=>({uTime:{value:Math.random()*40},uColor:{value:new b(e.color)},uAccent:{value:new b(e.accent)},uHover:{value:0},uReveal:{value:0}}),[e.color,e.accent]),C=(0,D.useMemo)(()=>({uTime:{value:Math.random()*40},uColor:{value:new b(e.color)},uHover:{value:0},uReveal:{value:0}}),[e.color]),w=(0,D.useMemo)(()=>{let e=l===`low`?18:l===`mid`?34:56,t=new Float32Array(e*3),n=new Float32Array(e);for(let r=0;r<e;r++){let e=Math.random()*Math.PI*2,i=.75+Math.random()*.55;t[r*3]=Math.cos(e)*i,t[r*3+1]=(Math.random()-.5)*.7,t[r*3+2]=Math.sin(e)*i,n[r]=Math.random()}let r=new T;return r.setAttribute(`position`,new y(t,3)),r.setAttribute(`aSeed`,new y(n,1)),r},[l]),O=t=>{t!==m&&(h(t),a(t?e.id:null),t?(G(520+Math.random()*120,.1,.028),document.body.style.cursor=`pointer`):document.body.style.cursor=``)};o((e,t)=>{let a=Math.min(t,.05),o=e.clock.elapsedTime;g.current+=((m||n?1:0)-g.current)*a*5;let s=g.current;if(S.uTime.value=o,S.uHover.value=s,S.uReveal.value=i,C.uTime.value=o,C.uHover.value=s,C.uReveal.value=i,u.current){let t=Math.sin(o*.55+v)*.18,n=_.clone().normalize().multiplyScalar(-s*.9);u.current.position.set(_.x+n.x,_.y+t+s*.12,_.z+n.z),u.current.quaternion.copy(e.camera.quaternion),u.current.rotateZ(Math.sin(o*.35+v)*.05),u.current.rotateX(Math.sin(o*.27+v*1.3)*.04);let a=(1.25+s*.22)*i*(r?.92:1);u.current.scale.setScalar(a)}if(d.current&&(d.current.rotation.y+=a*.1),f.current){f.current.rotation.y+=a*(.14+s*.5),f.current.rotation.x=Math.sin(o*.25+v)*.2;let e=f.current.material;e.opacity=(.18+s*.55)*i,e.size=.016+s*.014}});let k=r?.35:1;return(0,Y.jsxs)(`group`,{ref:u,position:t,onPointerOver:e=>{e.stopPropagation(),O(!0)},onPointerOut:()=>O(!1),onClick:t=>{t.stopPropagation(),G(760,.22,.05),s(e.id)},children:[(0,Y.jsx)(`mesh`,{visible:!1,children:(0,Y.jsx)(`circleGeometry`,{args:[1.05,16]})}),(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`circleGeometry`,{args:[.92,l===`low`?32:64]}),(0,Y.jsx)(`shaderMaterial`,{vertexShader:pt,fragmentShader:ht,uniforms:C,transparent:!0,depthWrite:!1,blending:2,side:2})]}),(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`torusGeometry`,{args:[.95,.028,8,l===`low`?64:128]}),(0,Y.jsx)(`meshStandardMaterial`,{color:e.color,emissive:e.accent,emissiveIntensity:(.6+g.current*1.8)*k,roughness:.15,metalness:.8,transparent:!0,opacity:i*k})]}),(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`torusGeometry`,{args:[.95,.075,8,l===`low`?48:96]}),(0,Y.jsx)(`shaderMaterial`,{vertexShader:pt,fragmentShader:mt,uniforms:S,transparent:!0,depthWrite:!1,blending:2,side:2})]}),(0,Y.jsxs)(`mesh`,{children:[(0,Y.jsx)(`torusGeometry`,{args:[1.06,.005,6,72]}),(0,Y.jsx)(`meshBasicMaterial`,{color:e.accent,transparent:!0,opacity:(.12+g.current*.4)*i*k,blending:2,depthWrite:!1,toneMapped:!1})]}),(0,Y.jsx)(`group`,{ref:d,children:(0,Y.jsx)(x,{color:e.color,accent:e.accent,hover:g.current})}),(0,Y.jsx)(`points`,{ref:f,geometry:w,children:(0,Y.jsx)(`pointsMaterial`,{color:e.accent,size:.016,transparent:!0,opacity:.2,blending:2,depthWrite:!1,toneMapped:!1,sizeAttenuation:!0})}),(0,Y.jsx)(`pointLight`,{color:e.accent,intensity:(.8+g.current*3.2)*i,distance:6,decay:2}),c&&(0,Y.jsx)(p,{center:!0,position:[0,-1.34,0],zIndexRange:[10,0],style:{pointerEvents:`none`},occlude:!1,children:(0,Y.jsxs)(`div`,{className:`portal-label ${m||n?`is-active`:``}`,children:[(0,Y.jsx)(`span`,{className:`portal-label-index`,children:e.index}),(0,Y.jsx)(`span`,{className:`portal-label-title`,children:e.title}),(0,Y.jsx)(`span`,{className:`portal-label-desc`,children:e.description})]})})]})}var _t=`
  attribute float aProgress;
  attribute float aLine;

  uniform float uTime;
  uniform float uReveal;
  uniform float uFocus;
  uniform float uLineCount;

  varying float vAlpha;
  varying float vProgress;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    // Çizgi boyunca ilerleyen enerji darbesi
    float pulse = fract(aProgress - uTime * 0.16 + aLine * 0.21);
    float head = smoothstep(0.0, 0.05, pulse) * smoothstep(0.2, 0.05, pulse);

    // Uçlara doğru sönme
    float ends = smoothstep(0.0, 0.12, aProgress) * smoothstep(1.0, 0.82, aProgress);

    // Odaklanılan çizgi belirginleşir
    float focused = step(abs(aLine - uFocus), 0.5);
    float base = 0.055 + focused * 0.16;

    vAlpha = (base + head * (0.45 + focused * 0.6)) * ends * uReveal;
    vProgress = pulse;
  }
`,vt=`
  varying float vAlpha;
  varying float vProgress;
  uniform vec3 uColor;
  uniform vec3 uAccent;

  void main() {
    vec3 col = mix(uColor, uAccent, smoothstep(0.15, 0.0, vProgress));
    gl_FragColor = vec4(col, vAlpha);
    #include <colorspace_fragment>
  }
`;function yt({targets:e,reveal:t,focusIndex:n}){let r=(0,D.useRef)(-1),i=(0,D.useMemo)(()=>{let t=[],n=[],r=[];e.forEach((e,i)=>{let a=e.clone().multiplyScalar(.5),o=new E(-e.z,e.y*.5+1.2,e.x).normalize().multiplyScalar(e.length()*.16);a.add(o);let s=new h(new E(0,0,0),a,e).getPoints(48);for(let e=0;e<s.length;e++)t.push(s[e].x,s[e].y,s[e].z),n.push(e/48),r.push(i)});let i=new T;i.setAttribute(`position`,new v(t,3)),i.setAttribute(`aProgress`,new v(n,1)),i.setAttribute(`aLine`,new v(r,1));let a=[];return e.forEach((e,t)=>{let n=t*49;for(let e=0;e<48;e++)a.push(n+e,n+e+1)}),i.setIndex(a),i},[e]),a=(0,D.useMemo)(()=>({uTime:{value:0},uReveal:{value:0},uFocus:{value:-1},uLineCount:{value:e.length},uColor:{value:new b(`#2a6fc4`)},uAccent:{value:new b(`#bfe0ff`)}}),[e.length]);return o((e,i)=>{let o=Math.min(i,.05);a.uTime.value+=o,a.uReveal.value+=(t-a.uReveal.value)*o*2,r.current+=(n-r.current)*o*8,a.uFocus.value=n>=0?n:-5}),(0,Y.jsx)(`lineSegments`,{geometry:i,frustumCulled:!1,children:(0,Y.jsx)(`shaderMaterial`,{vertexShader:_t,fragmentShader:vt,uniforms:a,transparent:!0,depthWrite:!1,blending:2})})}var Z=64;function bt({count:e,spawnKey:t}){let n=(0,D.useRef)(null),r=(0,D.useRef)(new Float32Array(Z)),i=(0,D.useRef)(0),{geometry:a,uniforms:s}=(0,D.useMemo)(()=>{let e=new Float32Array(192),t=new Float32Array(Z),n=new Float32Array(Z),i=new Float32Array(Z),a=new Float32Array(Z);for(let r=0;r<Z;r++){let o=(r+.5)/Z,s=Math.acos(1-2*o),c=Math.PI*(1+Math.sqrt(5))*r,l=2.6+r%4*.55;e[r*3]=l*Math.sin(s)*Math.cos(c),e[r*3+1]=l*Math.cos(s)*.6,e[r*3+2]=l*Math.sin(s)*Math.sin(c),t[r]=Math.random(),n[r]=l,i[r]=-999,a[r]=r}let o=new T;return o.setAttribute(`position`,new y(e,3)),o.setAttribute(`aSeed`,new y(t,1)),o.setAttribute(`aRadius`,new y(n,1)),o.setAttribute(`aBorn`,new y(i,1)),o.setAttribute(`aIndex`,new y(a,1)),o.boundingSphere=new g(new E,8),r.current=i,{geometry:o,uniforms:{uTime:{value:0},uCount:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uColor:{value:new b(`#d6ecff`)},uAccent:{value:new b(`#4d9fff`)}}}},[]);return(0,D.useEffect)(()=>{let t=e-1;if(t<0||t>=Z)return;r.current[t]=i.current;let n=a.getAttribute(`aBorn`);n.needsUpdate=!0,s.uCount.value=e},[e,t,a,s]),(0,D.useEffect)(()=>{s.uCount.value=e},[e,s]),o((e,t)=>{let r=Math.min(t,.05);i.current+=r,s.uTime.value=i.current,n.current&&(n.current.rotation.y+=r*.045)}),(0,Y.jsx)(`points`,{ref:n,geometry:a,frustumCulled:!1,children:(0,Y.jsx)(`shaderMaterial`,{vertexShader:`
    attribute float aSeed;
    attribute float aRadius;
    attribute float aBorn;
    attribute float aIndex;

    uniform float uTime;
    uniform float uCount;
    uniform float uPixelRatio;

    varying float vAlpha;
    varying float vBirth;

    void main() {
      // Yalnızca cevaplanmış soru sayısı kadar parça görünür
      float visible = step(aIndex, uCount - 0.5);

      // Doğum animasyonu: 0 → 1 (1.6 saniye)
      float age = uTime - aBorn;
      float birth = clamp(age / 1.6, 0.0, 1.0);
      vBirth = birth;

      vec3 pos = position;

      // Merkezden dışa doğru fırlayarak yerine oturur
      float ease = 1.0 - pow(1.0 - birth, 3.0);
      pos *= mix(0.05, 1.0, ease);

      // Yörüngede yavaşça dolaş
      float orbit = uTime * (0.06 + aSeed * 0.09);
      float c = cos(orbit), s = sin(orbit);
      pos.xz = mat2(c, -s, s, c) * pos.xz;

      // Dikey salınım
      pos.y += sin(uTime * 0.4 + aSeed * 6.28) * 0.28;

      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mv;

      float twinkle = 0.6 + 0.4 * sin(uTime * 1.4 + aSeed * 6.28);
      vAlpha = visible * twinkle * birth;

      float dist = -mv.z;
      // Doğum anında büyük, sonra normale döner
      float pop = 1.0 + (1.0 - birth) * 3.5;
      gl_PointSize = (3.2 + aSeed * 2.4) * pop * uPixelRatio * (110.0 / max(dist, 1.0)) * visible;
    }
  `,fragmentShader:`
    varying float vAlpha;
    varying float vBirth;
    uniform vec3 uColor;
    uniform vec3 uAccent;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      if (d > 0.5) discard;

      float core = smoothstep(0.22, 0.0, d);
      float halo = exp(-d * 5.5);

      // Doğum anında beyaza yakın, sonra maviye yerleşir
      vec3 col = mix(vec3(1.0), mix(uAccent, uColor, 0.6), smoothstep(0.0, 0.7, vBirth));

      float a = (core * 0.9 + halo * 0.6) * vAlpha;
      gl_FragColor = vec4(col * (1.0 + core), a);
      #include <colorspace_fragment>
    }
  `,uniforms:s,transparent:!0,depthWrite:!1,blending:2})})}function xt(e,t){return(0,D.useMemo)(()=>M.map(n=>{let r=Math.cos(n.angle)*e,i=Math.sin(n.angle)*e*.42,a=n.height*1.5;if(!t)return new E(r,a,i);let o=M.indexOf(n),s=3.15,c=(M.length-1)/2*s;return new E((o%2==0?-1:1)*1.85,c-o*s,i*.55)}),[e,t])}function St({stage:e,pointer:t,device:n,onSelectWorld:r}){let i=V(e=>e.focused),a=V(e=>e.traveling),s=V(e=>e.answers.length),{tier:l,isMobile:u,particleScale:d,reducedMotion:f}=n,p=c(e=>e.size),m=p.width/p.height<.85,h=xt(u?7.4:9.4,m),g=e===`hub`||e===`travel`,_=g,v=e!==`loading`,y=(0,D.useRef)(0),[b,x]=(0,D.useState)(0),S=(0,D.useRef)(1),[C,w]=(0,D.useState)(1);o((t,n)=>{let r=Math.min(n,.05);y.current+=(+!!_-y.current)*r*2.4,Math.abs(y.current-b)>.004&&x(y.current),S.current+=((e===`breach`?2.2:e===`questions`?.7:e===`finale`?1.3:1)-S.current)*r*2,Math.abs(S.current-C)>.01&&w(S.current)});let T=i?M.findIndex(e=>e.id===i):-1,E=a?h[M.findIndex(e=>e.id===a)]??null:null,O=Math.floor(3600*d),k=Math.floor(900*d),A=Math.floor(700*d);return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`color`,{attach:`background`,args:[`#01030a`]}),(0,Y.jsx)(`fog`,{attach:`fog`,args:[`#01030a`,22,130]}),(0,Y.jsx)(`ambientLight`,{intensity:.12,color:`#2a4a7a`}),(0,Y.jsx)(`directionalLight`,{position:[8,12,6],intensity:.35,color:`#7cc4ff`}),(0,Y.jsx)(`directionalLight`,{position:[-10,-4,-8],intensity:.18,color:`#1e4a8a`}),(0,Y.jsx)(rt,{stage:e,pointer:t,travelTarget:E,isMobile:u,reducedMotion:f}),(0,Y.jsx)(Ue,{count:O,reveal:e===`loading`?.2:1}),(0,Y.jsx)(qe,{layers:l===`low`?2:l===`mid`?3:4}),(0,Y.jsx)(Xe,{count:k}),v&&(0,Y.jsx)(`group`,{scale:m&&g?.62:.82,position:m&&g?[0,0,-16]:[0,0,0],children:(0,Y.jsx)(tt,{intensity:C,crystals:l!==`low`,quality:l})}),(0,Y.jsx)(ot,{active:e===`breach`,count:A}),(e===`questions`||e===`finale`||e===`hub`)&&s>0&&(0,Y.jsx)(bt,{count:s,spawnKey:s}),b>.01&&!m&&(0,Y.jsx)(yt,{targets:h,reveal:b,focusIndex:T}),b>.01&&M.map((t,n)=>(0,Y.jsx)(gt,{world:t,position:[h[n].x,h[n].y,h[n].z],focused:i===t.id,dimmed:i!=null&&i!==t.id,reveal:b,onHover:t=>e===`hub`&&B.focus(t),onSelect:r,showLabels:b>.55&&e===`hub`,quality:l},t.id)),(0,Y.jsx)(Ct,{stage:e,device:n})]})}function Ct({stage:e,device:t}){let n=(0,D.useRef)(new _(4e-4,4e-4)),r=(0,D.useRef)(null);return o((t,i)=>{let a=Math.min(i,.05),o=e===`breach`?.006:e===`travel`?.0022:5e-4;if(n.current.x+=(o-n.current.x)*a*3,n.current.y=n.current.x,r.current){let t=e===`breach`?1.9:e===`gate`?1.15:.95;r.current.intensity+=(t-r.current.intensity)*a*2.5}}),t.heavyFx?(0,Y.jsxs)(l,{enableNormalPass:!1,multisampling:t.tier===`high`?2:0,children:[(0,Y.jsx)(s,{ref:r,intensity:1,luminanceThreshold:.18,luminanceSmoothing:.62,kernelSize:t.tier===`high`?x.LARGE:x.MEDIUM,mipmapBlur:!0,resolutionScale:.6}),(0,Y.jsx)(a,{offset:n.current}),(0,Y.jsx)(d,{offset:.25,darkness:.82}),(0,Y.jsx)(u,{premultiply:!0,blendFunction:w.OVERLAY,opacity:.055})]}):(0,Y.jsx)(l,{enableNormalPass:!1,multisampling:0,children:(0,Y.jsx)(s,{intensity:.8,luminanceThreshold:.22,luminanceSmoothing:.5,kernelSize:x.MEDIUM,mipmapBlur:!0})})}function wt({visible:e,progress:t}){return(0,Y.jsx)(n,{children:e&&(0,Y.jsxs)(i.div,{className:`loader`,initial:{opacity:1},exit:{opacity:0},transition:{duration:1,ease:[.16,1,.3,1]},children:[(0,Y.jsxs)(i.div,{className:`loader-mark`,initial:{opacity:0},animate:{opacity:1},transition:{duration:1.6},children:[A.first,` `,A.separator,` `,A.second]}),(0,Y.jsx)(`div`,{className:`loader-bar`,children:(0,Y.jsx)(`span`,{style:{width:`${t}%`}})}),(0,Y.jsx)(`div`,{className:`loader-pct`,children:String(Math.round(t)).padStart(3,`0`)})]})})}function Tt(e){let t=e=>e.normalize(`NFC`).trim();return t(e)===t(k)}function Et({onUnlock:e}){let[t,r]=(0,D.useState)(``),[a,o]=(0,D.useState)(!1),[s,c]=(0,D.useState)(0),[l,u]=(0,D.useState)(!1),d=(0,D.useRef)(null);return(0,D.useEffect)(()=>{let e=setTimeout(()=>d.current?.focus(),2200);return()=>clearTimeout(e)},[]),(0,Y.jsx)(n,{children:!l&&(0,Y.jsx)(i.div,{className:`gate`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,filter:`blur(14px)`,scale:1.08},transition:{duration:.7,ease:[.16,1,.3,1]},children:(0,Y.jsxs)(`div`,{className:`gate-inner`,children:[(0,Y.jsxs)(i.div,{className:`gate-title`,initial:{opacity:0,y:24,letterSpacing:`0.9em`},animate:{opacity:1,y:0,letterSpacing:`0.34em`},transition:{duration:1.8,delay:.5,ease:[.16,1,.3,1]},children:[(0,Y.jsx)(`span`,{children:A.first}),(0,Y.jsx)(i.span,{className:`gate-sep`,initial:{opacity:0,rotate:-90},animate:{opacity:1,rotate:0},transition:{duration:1.4,delay:1.1,ease:[.16,1,.3,1]},children:A.separator}),(0,Y.jsx)(`span`,{children:A.second})]}),(0,Y.jsx)(i.p,{className:`gate-subtitle`,initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:1.4,delay:1.5,ease:[.16,1,.3,1]},children:j.subtitle}),(0,Y.jsx)(i.div,{className:`gate-rule`,initial:{scaleX:0,opacity:0},animate:{scaleX:1,opacity:1},transition:{duration:1.6,delay:1.9,ease:[.16,1,.3,1]}}),(0,Y.jsxs)(i.form,{className:`gate-form`,onSubmit:n=>{n?.preventDefault(),!(l||!t.trim())&&(Tt(t)?(o(!1),u(!0),G(880,.5,.07),setTimeout(()=>G(1320,.7,.05),140),setTimeout(e,720)):(o(!0),c(e=>e+1),G(180,.3,.04),setTimeout(()=>o(!1),620)))},initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:1.2,delay:2.2,ease:[.16,1,.3,1]},children:[(0,Y.jsxs)(`div`,{className:`gate-field-wrap`,children:[(0,Y.jsx)(`input`,{ref:d,type:`password`,className:`field gate-field ${a?`shake`:``}`,placeholder:j.placeholder,value:t,onChange:e=>r(e.target.value),autoComplete:`off`,autoCapitalize:`off`,autoCorrect:`off`,spellCheck:!1,"aria-label":`Şifre`}),(0,Y.jsx)(`span`,{className:`gate-field-glow`,"aria-hidden":!0})]}),(0,Y.jsx)(`button`,{type:`submit`,className:`btn gate-btn`,disabled:!t.trim(),children:j.button}),(0,Y.jsx)(`div`,{className:`gate-msg-slot`,"aria-live":`polite`,children:(0,Y.jsxs)(n,{mode:`wait`,children:[a&&(0,Y.jsx)(i.span,{className:`gate-msg`,initial:{opacity:0,y:-4},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.5},children:j.error},`err`),!a&&s>=3&&(0,Y.jsx)(i.span,{className:`gate-msg gate-msg-hint`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.9},children:j.hint},`hint`)]})})]})]})})})}var Dt={initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-6}};function Ot({visible:e,isMobile:t,answersCount:r,totalQuestions:a}){let o=V(e=>e.focused),s=o?M.find(e=>e.id===o):null;return(0,Y.jsx)(n,{children:e&&(0,Y.jsxs)(i.div,{className:`hub-ui no-pointer`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.1,delay:.5},children:[(0,Y.jsxs)(i.header,{className:`hub-header`,...Dt,transition:{duration:1.2,delay:.9,ease:[.16,1,.3,1]},children:[(0,Y.jsxs)(`div`,{className:`hub-mark`,children:[A.first,(0,Y.jsx)(`span`,{children:A.separator}),A.second]}),(0,Y.jsx)(`div`,{className:`hub-mark-sub`,children:ee.title})]}),(0,Y.jsx)(`div`,{className:`hub-footer`,children:(0,Y.jsx)(n,{mode:`wait`,children:s?(0,Y.jsxs)(i.div,{className:`hub-focus`,initial:{opacity:0,y:14,filter:`blur(6px)`},animate:{opacity:1,y:0,filter:`blur(0px)`},exit:{opacity:0,y:-8,filter:`blur(6px)`},transition:{duration:.5,ease:[.16,1,.3,1]},children:[(0,Y.jsx)(`span`,{className:`hub-focus-index`,style:{color:s.accent},children:s.index}),(0,Y.jsx)(`h2`,{className:`hub-focus-title`,children:s.title}),(0,Y.jsx)(`p`,{className:`hub-focus-desc`,children:s.description}),s.kind===`link`&&(0,Y.jsx)(`span`,{className:`hub-focus-tag`,children:`yeni sekmede açılır`})]},s.id):(0,Y.jsx)(i.p,{className:`hub-hint`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.6},children:t?ee.mobileHint:ee.desktopHint},`hint`)})}),(0,Y.jsx)(n,{children:r>0&&(0,Y.jsxs)(i.div,{className:`hub-progress`,initial:{opacity:0,x:12},animate:{opacity:1,x:0},exit:{opacity:0,x:12},transition:{duration:.8,delay:1.2},children:[(0,Y.jsx)(`span`,{className:`hub-progress-label`,children:`yıldızlar`}),(0,Y.jsxs)(`span`,{className:`hub-progress-count`,children:[String(r).padStart(2,`0`),(0,Y.jsxs)(`em`,{children:[`/`,String(a).padStart(2,`0`)]})]})]})}),(0,Y.jsxs)(`div`,{className:`hub-corners`,"aria-hidden":!0,children:[(0,Y.jsx)(`span`,{className:`c tl`}),(0,Y.jsx)(`span`,{className:`c tr`}),(0,Y.jsx)(`span`,{className:`c bl`}),(0,Y.jsx)(`span`,{className:`c br`})]})]})})}var Q=[.16,1,.3,1];function kt({onComplete:e,onExit:t}){let r=V(e=>e.answers),[a,o]=(0,D.useState)(()=>Math.min(r.length,N.length-1)),[s,c]=(0,D.useState)(r.length>0?`asking`:`intro`),[l,u]=(0,D.useState)(``),[d,f]=(0,D.useState)(!1),p=(0,D.useRef)(null),m=N.length,h=N[a],g=a/m*100;(0,D.useEffect)(()=>{if(s!==`asking`)return;let e=setTimeout(()=>p.current?.focus(),900);return()=>clearTimeout(e)},[s,a]),(0,D.useEffect)(()=>{let e=p.current;e&&(e.style.height=`auto`,e.style.height=`${Math.min(e.scrollHeight,190)}px`)},[l]);let _=t=>{d||(f(!0),G(700+a*28,.26,.045),B.addAnswer(h,t),setTimeout(()=>{u(``),f(!1),a+1>=m?e():o(e=>e+1)},720))},v=e=>{e?.preventDefault();let t=l.trim();t&&_(t)};return(0,Y.jsx)(`div`,{className:`q-root`,children:(0,Y.jsxs)(n,{mode:`wait`,children:[s===`intro`&&(0,Y.jsxs)(i.div,{className:`q-intro`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,filter:`blur(10px)`,y:-20},transition:{duration:.9,ease:Q},children:[(0,Y.jsx)(i.p,{className:`q-intro-text`,initial:{opacity:0,y:22,filter:`blur(8px)`},animate:{opacity:1,y:0,filter:`blur(0px)`},transition:{duration:1.6,delay:.5,ease:Q},children:P.intro}),(0,Y.jsx)(i.button,{className:`btn q-intro-btn`,onClick:()=>{G(820,.3,.05),c(`asking`)},initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:1.1,delay:1.9,ease:Q},children:P.introButton}),(0,Y.jsx)(i.button,{className:`btn-ghost q-exit`,onClick:t,initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:2.6},children:P.back})]},`intro`),s===`asking`&&(0,Y.jsxs)(i.div,{className:`q-stage`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,filter:`blur(12px)`},transition:{duration:.8,ease:Q},children:[(0,Y.jsxs)(`div`,{className:`q-progress`,children:[(0,Y.jsxs)(`div`,{className:`q-counter`,children:[(0,Y.jsx)(`span`,{className:`q-counter-now`,children:String(a+1).padStart(2,`0`)}),(0,Y.jsx)(`span`,{className:`q-counter-sep`,children:`/`}),(0,Y.jsx)(`span`,{className:`q-counter-total`,children:String(m).padStart(2,`0`)})]}),(0,Y.jsx)(`div`,{className:`q-bar`,children:(0,Y.jsx)(i.span,{animate:{width:`${g}%`},transition:{duration:.9,ease:Q}})})]}),(0,Y.jsx)(`div`,{className:`q-body`,children:(0,Y.jsx)(n,{mode:`wait`,children:(0,Y.jsxs)(i.div,{className:`q-card`,initial:{opacity:0,y:30,filter:`blur(10px)`},animate:{opacity:1,y:0,filter:`blur(0px)`},exit:{opacity:0,y:-26,filter:`blur(10px)`},transition:{duration:.75,ease:Q},children:[(0,Y.jsx)(`h2`,{className:`q-question`,children:h}),(0,Y.jsxs)(`form`,{className:`q-form`,onSubmit:v,children:[(0,Y.jsxs)(`div`,{className:`q-field-wrap`,children:[(0,Y.jsx)(`textarea`,{ref:p,className:`field q-field`,placeholder:P.placeholder,value:l,onChange:e=>u(e.target.value),onKeyDown:e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),v())},rows:1,maxLength:600,disabled:d,"aria-label":h}),(0,Y.jsx)(`span`,{className:`q-field-line`,"aria-hidden":!0})]}),(0,Y.jsxs)(`div`,{className:`q-actions`,children:[(0,Y.jsx)(`button`,{type:`submit`,className:`btn q-submit`,disabled:!l.trim()||d,children:P.submit}),(0,Y.jsx)(`button`,{type:`button`,className:`btn-ghost`,onClick:()=>_(``),disabled:d,children:P.skip})]})]})]},a)})}),(0,Y.jsx)(n,{children:d&&(0,Y.jsx)(i.div,{className:`q-spark no-pointer`,initial:{opacity:0,scale:.2,y:0},animate:{opacity:[0,1,0],scale:[.2,1.1,.4],y:-220},exit:{opacity:0},transition:{duration:.75,ease:Q}})}),(0,Y.jsx)(`button`,{className:`btn-ghost q-exit q-exit-fixed`,onClick:t,children:P.back})]},`asking`)]})})}var $=[.16,1,.3,1];function At({onExit:e}){let t=V(e=>e.answers),[r,a]=(0,D.useState)(!1),o=t.filter(e=>e.answer.trim().length>0);return(0,Y.jsx)(`div`,{className:`fin-root`,children:(0,Y.jsx)(n,{mode:`wait`,children:r?(0,Y.jsxs)(i.div,{className:`fin-answers`,initial:{opacity:0,y:24},animate:{opacity:1,y:0},exit:{opacity:0,filter:`blur(10px)`},transition:{duration:.8,ease:$},children:[(0,Y.jsx)(`h2`,{className:`fin-answers-title`,children:`Söylediklerin`}),(0,Y.jsx)(`div`,{className:`fin-answers-list`,children:o.map((e,t)=>(0,Y.jsxs)(i.article,{className:`fin-answer`,initial:{opacity:0,x:-14},animate:{opacity:1,x:0},transition:{duration:.7,delay:.1+t*.07,ease:$},children:[(0,Y.jsx)(`span`,{className:`fin-answer-index`,children:String(t+1).padStart(2,`0`)}),(0,Y.jsxs)(`div`,{className:`fin-answer-body`,children:[(0,Y.jsx)(`p`,{className:`fin-answer-q`,children:e.question}),(0,Y.jsx)(`p`,{className:`fin-answer-a`,children:e.answer})]})]},e.at))}),(0,Y.jsx)(`button`,{className:`btn-ghost fin-back`,onClick:()=>a(!1),children:`geri`})]},`answers`):(0,Y.jsxs)(i.div,{className:`fin-inner`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,filter:`blur(12px)`},transition:{duration:.9,ease:$},children:[(0,Y.jsx)(i.p,{className:`fin-headline`,initial:{opacity:0,y:26,filter:`blur(12px)`},animate:{opacity:1,y:0,filter:`blur(0px)`},transition:{duration:2,delay:.9,ease:$},children:F.headline}),(0,Y.jsx)(i.div,{className:`fin-rule`,initial:{scaleX:0,opacity:0},animate:{scaleX:1,opacity:1},transition:{duration:2,delay:2.6,ease:$}}),(0,Y.jsxs)(i.div,{className:`fin-names`,initial:{opacity:0,letterSpacing:`0.9em`},animate:{opacity:1,letterSpacing:`0.42em`},transition:{duration:2.4,delay:3.1,ease:$},children:[(0,Y.jsx)(`span`,{children:A.first}),(0,Y.jsx)(`span`,{className:`fin-sep`,children:A.separator}),(0,Y.jsx)(`span`,{children:A.second})]}),(0,Y.jsx)(i.p,{className:`fin-quote`,initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:2.2,delay:4.4,ease:$},children:F.quote}),(0,Y.jsxs)(i.div,{className:`fin-actions`,initial:{opacity:0},animate:{opacity:1},transition:{duration:1.6,delay:6.2},children:[o.length>0&&(0,Y.jsx)(`button`,{className:`btn-ghost`,onClick:()=>a(!0),children:F.review}),(0,Y.jsx)(`button`,{className:`btn-ghost`,onClick:e,children:F.again})]})]},`finale`)})})}function jt({visible:e}){let t=V(e=>e.muted),[r,a]=(0,D.useState)(!1);return(0,D.useEffect)(()=>{if(!e)return;let t=!1,n=()=>{t||(t=!0,pe().then(()=>{a(!0),me(B.get().muted)}))};return window.addEventListener(`pointerdown`,n,{once:!0}),window.addEventListener(`keydown`,n,{once:!0}),()=>{window.removeEventListener(`pointerdown`,n),window.removeEventListener(`keydown`,n)}},[e]),(0,Y.jsx)(n,{children:e&&(0,Y.jsx)(i.button,{className:`audio-btn ${t?`is-muted`:``}`,onClick:()=>{let e=!t;B.setMuted(e),r?me(e):pe().then(()=>{a(!0),me(e)})},initial:{opacity:0,scale:.85},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.85},transition:{duration:.8,delay:1.6},"aria-label":t?`Sesi aç`:`Sesi kapat`,title:t?`Sesi aç`:`Sesi kapat`,children:(0,Y.jsxs)(`span`,{className:`audio-bars`,"aria-hidden":!0,children:[(0,Y.jsx)(`i`,{style:{animationDelay:`0ms`}}),(0,Y.jsx)(`i`,{style:{animationDelay:`180ms`}}),(0,Y.jsx)(`i`,{style:{animationDelay:`90ms`}}),(0,Y.jsx)(`i`,{style:{animationDelay:`260ms`}})]})})})}function Mt({world:e}){return(0,Y.jsx)(n,{children:e&&(0,Y.jsxs)(i.div,{className:`travel`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},children:[(0,Y.jsx)(i.div,{className:`travel-flash`,style:{background:`radial-gradient(circle at 50% 50%, ${e.accent}55 0%, ${e.color}22 35%, transparent 68%)`},initial:{opacity:0,scale:.4},animate:{opacity:1,scale:2.4},transition:{duration:1.5,ease:[.16,1,.3,1]}}),(0,Y.jsx)(`div`,{className:`travel-streaks`,"aria-hidden":!0,children:Array.from({length:14},(t,n)=>(0,Y.jsx)(i.span,{style:{left:`${n/14*100+(n%2?2:-2)}%`,background:`linear-gradient(180deg, transparent, ${e.accent}, transparent)`},initial:{scaleY:0,opacity:0},animate:{scaleY:1,opacity:[0,.55,0]},transition:{duration:.9,delay:.1+n%5*.06,ease:[.16,1,.3,1]}},n))}),(0,Y.jsxs)(i.div,{className:`travel-caption`,initial:{opacity:0,y:12,filter:`blur(8px)`},animate:{opacity:1,y:0,filter:`blur(0px)`},transition:{duration:.9,delay:.35,ease:[.16,1,.3,1]},children:[(0,Y.jsx)(`span`,{className:`travel-index`,style:{color:e.accent},children:e.index}),(0,Y.jsx)(`h2`,{className:`travel-title`,children:e.title}),(0,Y.jsx)(i.div,{className:`travel-bar`,initial:{scaleX:0},animate:{scaleX:1},transition:{duration:1.25,delay:.4,ease:[.4,0,.2,1]},style:{background:`linear-gradient(90deg, transparent, ${e.accent}, transparent)`}})]})]})})}function Nt(){let e=V(e=>e.stage),t=V(e=>e.progress),n=V(e=>e.traveling),r=V(e=>e.answers),i=se(),a=ce(!i.reducedMotion),o=(0,D.useRef)(null),s=(0,D.useRef)(!1);(0,D.useEffect)(()=>{if(e!==`loading`)return;let t=0,n=!1,r=!1,i=performance.now();document.fonts?.ready.then(()=>{n=!0});let a=window.setTimeout(()=>{n=!0,s.current=!0},5e3),o=()=>{r||(r=!0,B.setProgress(100),window.setTimeout(()=>B.setStage(`gate`),480))},c=window.setInterval(()=>{let e=performance.now(),r=Math.min((e-i)/1e3,.25);i=e;let a=s.current&&n?100:86;if(t+=(a-t)*r*2.1+r*26,t>=99.4){o();return}B.setProgress(t)},1e3/30);return()=>{window.clearInterval(c),window.clearTimeout(a)}},[e]);let c=(0,D.useCallback)(()=>{B.setStage(`breach`),setTimeout(()=>{B.setStage(`hub`),G(520,.6,.04)},1650)},[]),l=(0,D.useCallback)(e=>{let t=M.find(t=>t.id===e);t&&B.get().stage===`hub`&&(B.travel(e),W(.1,1.2),o.current&&window.clearTimeout(o.current),t.kind===`questions`?o.current=window.setTimeout(()=>{B.set({stage:`questions`,traveling:null,focused:null}),W(.18,2)},1500):t.url&&(o.current=window.setTimeout(()=>{window.open(t.url,`_blank`,`noopener,noreferrer`),setTimeout(()=>{B.set({stage:`hub`,traveling:null,focused:null}),W(B.get().muted?0:.28,2)},700)},1550)))},[]),u=(0,D.useCallback)(()=>{B.setStage(`finale`),G(1040,.9,.05),Be(B.get().answers)},[]),d=(0,D.useCallback)(()=>{B.set({stage:`hub`,traveling:null,focused:null}),W(B.get().muted?0:.28,1.6)},[]);(0,D.useEffect)(()=>{let e=e=>{if(e.key!==`Escape`)return;let t=B.get().stage;(t===`questions`||t===`finale`)&&d()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[d]),(0,D.useEffect)(()=>()=>{o.current&&window.clearTimeout(o.current)},[]),(0,D.useEffect)(()=>{if(e!==`gate`)return;let t=B.get().answers;t.length>=N.length&&Be(t)},[e]);let p=n?M.find(e=>e.id===n)??null:null,m=e!==`loading`;return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`div`,{className:`fill`,children:(0,Y.jsx)(f,{dpr:i.dpr,gl:{antialias:i.tier===`high`,alpha:!1,powerPreference:`high-performance`,stencil:!1,depth:!0},camera:{position:[0,.2,26],fov:46,near:.1,far:400},onCreated:({gl:e})=>{e.setClearColor(`#01030a`,1),s.current=!0},children:(0,Y.jsx)(D.Suspense,{fallback:null,children:(0,Y.jsx)(St,{stage:e,pointer:a,device:i,onSelectWorld:l})})})}),(0,Y.jsx)(`div`,{className:`vignette`}),(0,Y.jsx)(`div`,{className:`grain`}),(0,Y.jsx)(wt,{visible:e===`loading`,progress:t}),e===`gate`&&(0,Y.jsx)(Et,{onUnlock:c}),(0,Y.jsx)(Ot,{visible:e===`hub`,isMobile:i.isMobile,answersCount:r.length,totalQuestions:N.length}),(0,Y.jsx)(Mt,{world:p}),e===`questions`&&(0,Y.jsx)(kt,{onComplete:u,onExit:d}),e===`finale`&&(0,Y.jsx)(At,{onExit:d}),(0,Y.jsx)(jt,{visible:m})]})}(0,O.createRoot)(document.getElementById(`root`)).render((0,Y.jsx)(D.StrictMode,{children:(0,Y.jsx)(Nt,{})}));