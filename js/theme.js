(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}
if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
document.documentElement.dataset.theme=t;
setTimeout(function(){var c=document.querySelector('.curtain');if(c&&!window.__fx)c.style.display='none'},4000)})();
