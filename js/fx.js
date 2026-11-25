(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,root=document.documentElement,g=window.gsap,ST=window.ScrollTrigger,curtain=$('.curtain');
window.__fx=true;
/* Thème clair / sombre */
const btn=$('#theme-toggle');
const paint=()=>{const l=root.dataset.theme==='light';const i=btn&&$('i',btn);if(i)i.className='fas '+(l?'fa-sun':'fa-moon');const m=$('meta[name=theme-color]');if(m)m.content=l?'#f7f3f3':'#0d0d0d'};
const setTheme=t=>{root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}paint()};
paint();
if(btn)btn.addEventListener('click',()=>{const t=root.dataset.theme==='light'?'dark':'light';document.startViewTransition&&!RM?document.startViewTransition(()=>setTheme(t)):setTheme(t)});
if(!g||RM){if(curtain)curtain.style.display='none';return}
if(ST)g.registerPlugin(ST);
/* Transitions de pages (rideau rouge) */
g.to(curtain,{yPercent:-100,duration:.9,ease:'power4.inOut',delay:.3});
addEventListener('pageshow',e=>{if(e.persisted)g.set(curtain,{yPercent:-100})});
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank'||a.hasAttribute('download'))return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin||/\.pdf$/i.test(u.pathname)||(u.pathname===location.pathname&&u.hash))return;
 e.preventDefault();g.fromTo(curtain,{yPercent:100},{yPercent:0,duration:.7,ease:'power4.inOut',onComplete:()=>{location.href=u.href}})});
/* Défilement fluide */
if(window.Lenis){const l=new Lenis({lerp:.1});if(ST)l.on('scroll',ST.update);g.ticker.add(t=>l.raf(t*1000));g.ticker.lagSmoothing(0)}
/* Compteurs */
if(ST)$$('.count-container .box h3').forEach(h=>{const m=h.textContent.trim().match(/^(\d+)(.*)$/);if(!m)return;const n={v:0};h.textContent='0'+m[2];
 ST.create({trigger:h,start:'top 92%',once:true,onEnter:()=>g.to(n,{v:+m[1],duration:1.8,ease:'power2.out',onUpdate:()=>{h.textContent=Math.round(n.v)+m[2]}})})});
/* Parallaxe du portrait */
if(ST&&$('.portrait-frame'))g.to('.portrait-frame',{yPercent:-8,ease:'none',scrollTrigger:{trigger:'.home',start:'top top',end:'bottom top',scrub:true}});
/* Inclinaison 3D des cartes */
if(window.VanillaTilt)VanillaTilt.init($$('.skills .box,.portfolio .box,.blogs .box,.count-container .box,.leader .box'),{max:9,glare:true,'max-glare':.2,scale:1.03});
/* Curseur anneau + boutons magnétiques */
if(matchMedia('(pointer:fine)').matches){const ring=$('.ring'),qx=g.quickTo(ring,'x',{duration:.4}),qy=g.quickTo(ring,'y',{duration:.4});
 addEventListener('pointermove',e=>{qx(e.clientX);qy(e.clientY)},{passive:true});
 $$('a,button,.box').forEach(el=>{el.addEventListener('pointerenter',()=>ring.classList.add('on'));el.addEventListener('pointerleave',()=>ring.classList.remove('on'))});
 $$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();g.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.3,duration:.3})});b.addEventListener('pointerleave',()=>g.to(b,{x:0,y:0,duration:.8,ease:'elastic.out(1,.4)'}))})}
/* Fond 3D : particules + icosaèdre filaire (Three.js) */
if(window.THREE){try{const cv=$('#bg'),r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
 const s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100);cam.position.z=6;
 const n=innerWidth<700?600:1400,p=new Float32Array(n*3);for(let i=0;i<n*3;i++)p[i]=(Math.random()-.5)*26;
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(p,3));
 const pm=new THREE.PointsMaterial({color:0xdc143c,size:.035,transparent:true}),pts=new THREE.Points(geo,pm);s.add(pts);
 const wm=new THREE.MeshBasicMaterial({color:0xdc143c,wireframe:true,transparent:true}),m=new THREE.Mesh(new THREE.IcosahedronGeometry(1.7,1),wm);s.add(m);
 let mx=0,my=0,pr=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
 addEventListener('scroll',()=>{pr=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)},{passive:true});
 const rs=()=>{r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};rs();addEventListener('resize',rs);
 (function loop(t){const k=t*.0002,l=root.dataset.theme==='light';pm.opacity=l?.55:.8;wm.opacity=l?.22:.35;
  pts.rotation.y=k+mx*.4;pts.rotation.x=my*.3+pr*2;m.rotation.x=k*3+pr*6;m.rotation.y=k*2;m.position.x=(innerWidth>900?2.6:0)-pr*5;m.scale.setScalar(1+pr*.8);r.render(s,cam);requestAnimationFrame(loop)})(0)}catch(e){}}

/* Textes qui apparaissent et disparaissent */
if(ST)$$('.leader .box,.card-role').forEach(el=>g.from(el,{y:40,opacity:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
const rot=$('.rot');
if(rot){const R=JSON.parse(rot.dataset.roles);let i=0;const show=()=>{rot.innerHTML=R[i].split('').map(c=>'<i>'+(c===' '?'&nbsp;':c)+'</i>').join('');const ch=$$('i',rot);
 g.timeline({onComplete:()=>{i=(i+1)%R.length;show()}}).fromTo(ch,{yPercent:100,opacity:0,rotate:6},{yPercent:0,opacity:1,rotate:0,stagger:.025,duration:.5,ease:'power3.out'}).to(ch,{yPercent:-100,opacity:0,stagger:.015,duration:.4,ease:'power2.in',delay:1.9})};show()}
const st=$('.stage');
if(st&&ST){root.classList.add('fx');const L=$$('.line',st);
 L.forEach(l=>{let red=false;l.innerHTML=l.dataset.t.split(' ').map(w=>{if(w[0]==='*')red=true;const c=red;if(w.endsWith('*'))red=false;return '<span class="w'+(c?' r':'')+'">'+w.replace(/\*/g,'')+'</span>'}).join(' ')});
 const tl=g.timeline({scrollTrigger:{trigger:st,start:'top top',end:'+='+L.length*90+'%',pin:true,scrub:1}});
 L.forEach(l=>{const w=$$('.w',l);tl.set(l,{autoAlpha:1}).fromTo(w,{opacity:0,y:60,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',stagger:.1,duration:1}).to(w,{opacity:0,y:-60,filter:'blur(10px)',stagger:.06,duration:1},'+=1').set(l,{autoAlpha:0})})}
})();
