// js/render.js
async function loadProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = '<p>Loading products…</p>';

  try {
    const res = await fetch('/data/products.json');
    if (!res.ok) throw new Error('products.json not found');
    const items = await res.json();

    const q = (new URLSearchParams(location.search).get('q') || '').toLowerCase();

    const filtered = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      grid.innerHTML = '<p>No products found.</p>';
      return;
    }

    // ✅ Product Card UI Code
    grid.innerHTML = filtered.map(p => `
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

  } catch (e) {
    console.error(e);
    grid.innerHTML = '<p>Could not load products.</p>';
  }
}

function addToCart(id, name, price, img) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const found = cart.find(i => i.id === id);
  if (found) found.qty += 1;
  else cart.push({ id, name, price, img, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = count;
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateCartBadge();
});
