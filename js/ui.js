// js/ui.js  -> banner slider + tiles filter wiring
let si = 0; // slide index

function initSlider(){
  const slides = [...document.querySelectorAll('.slide')];
  const dotsWrap = document.getElementById('dots');
  if (!slides.length) return;

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
  setInterval(()=> show((si+1)%slides.length), 4000);
}

function initTiles(){
  // clicking a tile sets category and scrolls to products
  document.querySelectorAll('.tile').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cat = btn.dataset.cat || 'all';
      window.CURRENT_CAT = cat; // use global from render.js
      const search = document.getElementById('search');
      if (search) search.value = '';
      // trigger re-render
      if (typeof window.render === 'function') window.render();
      // smooth scroll to products
      document.getElementById('product-grid')?.scrollIntoView({behavior:'smooth'});
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initSlider();
  initTiles();
});
