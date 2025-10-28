// js/render.js
let ALL_ITEMS = [];
let CURRENT_CAT = 'all';

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return [...document.querySelectorAll(sel)]; }

async function loadProducts() {
  const grid = $('#product-grid');
  const countEl = $('#count');
  grid.innerHTML = '<p>Loading products…</p>';

  try {
    const res = await fetch('/data/products.json');
    ALL_ITEMS = await res.json();
    render();
    countEl.textContent = `${ALL_ITEMS.length} items`;
  } catch (e) {
    console.error(e);
    grid.innerHTML = '<p>Could not load products.</p>';
  }
}

function render() {
  const grid = $('#product-grid');
  const q = ($('#search').value || '').toLowerCase();

  let items = ALL_ITEMS.filter(p =>
    (CURRENT_CAT === 'all' ? true : p.category === CURRENT_CAT) &&
    (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  );

  const sort = $('#sort')?.value || 'reco';
  if (sort === 'price-asc') items.sort((a,b)=>a.price-b.price);
  if (sort === 'price-desc') items.sort((a,b)=>b.price-a.price);
  if (sort === 'name-asc') items.sort((a,b)=>a.name.localeCompare(b.name));

  if (items.length === 0) {
    grid.innerHTML = '<p>No products found.</p>';
    return;
  }

  grid.innerHTML = items.map(p => `
    <div class="card">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="content">
        <h3>${p.name}</h3>
        <p class="muted">${p.brand} • ${p.unit}</p>
        <div class="row">
          <span class="price">₹${p.price}</span>
          <button onclick="addToCart('${p.id}','${p.name}',${p.price},'${p.img}')">Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id, name, price, img){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const it = cart.find(x=>x.id===id);
  if (it) it.qty += 1; else cart.push({id,name,price,img,qty:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateBadges();
}

function updateBadges(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const n = cart.reduce((s,i)=>s+i.qty,0);
  const badge = $('#cart-badge');
  const fab = $('#fab-badge');
  if (badge) badge.textContent = n;
  if (fab) fab.textContent = n;
}

function wireUI(){
  // search actions
  $('#search').addEventListener('keyup', (e)=>{ if(e.key==='Enter') render(); });
  $('#searchBtn')?.addEventListener('click', ()=> render());
  $('#sort')?.addEventListener('change', ()=> render());

  // chips
  $all('.chip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      $all('.chip').forEach(c=>c.classList.remove('active'));
      btn.classList.add('active');
      CURRENT_CAT = btn.dataset.cat;
      render();
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  wireUI();
  loadProducts();
  updateBadges();
});
