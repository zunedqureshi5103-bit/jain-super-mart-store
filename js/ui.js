// js/ui.js  — reliable banner + tiles hookup
let si = 0; // current slide

function preload(url){
  const img = new Image();
  img.src = url;
}

function initSlider(){
  const slides = [...document.querySelectorAll('.slide')];
  const dotsWrap = document.getElementById('dots');
  if (!slides.length) return;

  // set background images from data-bg and preload
  slides.forEach(s=>{
    const url = s.getAttribute('data-bg');
    if (url) {
      s.style.backgroundImage = `url("${url}")`;
      s.style.backgroundSize = 'cover';
      s.style.backgroundPosition = 'center';
      s.style.backgroundRepeat = 'no-repeat';
      preload(url);
    }
  });

  // dots
  slides.forEach((_,i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=>show(i));
    dotsWrap.appendChild(b);
  });

  function show(i){
    si = i;
    slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
    [...dotsWrap.children].forEach((d,idx)=> d.classList.toggle('active', idx===i));
  }

  show(0);
  setInterval(()=> show((si+1) % slides.length), 4000);
}

function initTiles(){
  document.querySelectorAll('.tile').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cat = btn.dataset.cat || 'all';
      window.CURRENT_CAT = cat;             // from render.js
      const search = document.getElementById('search');
      if (search) search.value = '';
      if (typeof window.render === 'function') window.render();
      document.getElementById('product-grid')?.scrollIntoView({behavior:'smooth'});
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initSlider();
  initTiles();
});
