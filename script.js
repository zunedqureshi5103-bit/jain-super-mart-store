
// Simple catalog
const PRODUCTS = [
  { id:1, name:'Full Cream Milk (1L)', price:28, category:'dairy', desc:'Fresh and creamy milk for daily use.', img:'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=60' },
  { id:2, name:'Tea Powder (250g)', price:90, category:'beverages', desc:'Strong aroma tea leaves.', img:'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=60' },
  { id:3, name:'Brown Bread', price:35, category:'bakery', desc:'Soft and fresh bread loaf.', img:'https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=800&q=60' },
  { id:4, name:'Honey Jar (250g)', price:180, category:'essentials', desc:'Pure natural honey.', img:'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=60' },
  { id:5, name:'Cooking Oil (1L)', price:140, category:'essentials', desc:'Refined sunflower oil.', img:'https://images.unsplash.com/photo-1582719478177-3b5d4b5b9b2c?auto=format&fit=crop&w=800&q=60' },
  { id:6, name:'Sugar (1kg)', price:48, category:'essentials', desc:'Fine white sugar.', img:'https://images.unsplash.com/photo-1542444459-db5c79a4b0d9?auto=format&fit=crop&w=800&q=60' },
  { id:7, name:'Biscuit Pack', price:20, category:'snacks', desc:'Crispy tea-time biscuits.', img:'https://images.unsplash.com/photo-1511381939415-c1c76d23b1b1?auto=format&fit=crop&w=800&q=60' },
  { id:8, name:'Curd (500g)', price:45, category:'dairy', desc:'Thick and fresh curd.', img:'https://images.unsplash.com/photo-1604908554038-18d0f4a2009d?auto=format&fit=crop&w=800&q=60' }
];

// LocalStorage helpers
function getCart() { return JSON.parse(localStorage.getItem('cart') || '[]'); }
function setCart(c) { localStorage.setItem('cart', JSON.stringify(c)); updateCartCount(); }
function updateCartCount() {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
}

// Render products (index page)
const listEl = document.getElementById('product-list');
let activeCategory = 'all';
let currentList = PRODUCTS.slice();

function render(list) {
  if (!listEl) return;
  listEl.innerHTML = '';
  document.getElementById('result-count').textContent = `${list.length} items`;
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">₹ ${p.price}</p>
      <div class="btnrow">
        <button class="ghost" onclick="view(${p.id})">View</button>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function filterCategory(cat) {
  activeCategory = cat;
  const q = (document.getElementById('search')?.value || '').toLowerCase();
  currentList = PRODUCTS.filter(p => (cat==='all' || p.category===cat) && p.name.toLowerCase().includes(q));
  render(currentList);
}

function filterProducts() {
  filterCategory(activeCategory);
}

function sortProducts() {
  const val = document.getElementById('sort').value;
  const arr = currentList.slice();
  if (val==='price-asc') arr.sort((a,b)=>a.price-b.price);
  if (val==='price-desc') arr.sort((a,b)=>b.price-a.price);
  if (val==='name-asc') arr.sort((a,b)=>a.name.localeCompare(b.name));
  render(arr);
  currentList = arr;
}

function view(id) {
  const m = document.getElementById('modal');
  const p = PRODUCTS.find(x=>x.id===id);
  if (!m || !p) return;
  document.getElementById('m-img').src = p.img;
  document.getElementById('m-title').textContent = p.name;
  document.getElementById('m-desc').textContent = p.desc;
  document.getElementById('m-price').textContent = '₹ ' + p.price;
  document.getElementById('m-add').onclick = () => { addToCart(id); closeModal(); };
  m.classList.remove('hidden');
}

function closeModal(){ document.getElementById('modal').classList.add('hidden'); }

function addToCart(id) {
  const item = PRODUCTS.find(p => p.id === id);
  if (!item) return;
  const cart = getCart();
  const ex = cart.find(x => x.id === id);
  if (ex) ex.qty += 1; else cart.push({ id:item.id, name:item.name, price:item.price, qty:1 });
  setCart(cart);
  alert(item.name + ' added to cart ✅');
}

// Cart Page rendering
function renderCart() {
  updateCartCount();
  const table = document.getElementById('cart-table');
  const body = document.getElementById('cart-body');
  const empty = document.getElementById('cart-empty');
  const summary = document.getElementById('cart-summary');
  if (!table || !body) return;

  const cart = getCart();
  body.innerHTML = '';
  if (cart.length === 0) {
    empty.classList.remove('hidden');
    table.classList.add('hidden');
    summary.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  table.classList.remove('hidden');
  summary.classList.remove('hidden');

  let total = 0;
  cart.forEach((it, idx) => {
    const sub = it.price * it.qty;
    total += sub;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${it.name}</td>
      <td>₹ ${it.price}</td>
      <td class="qty">
        <button onclick="decQty(${idx})">-</button>
        <span>${it.qty}</span>
        <button onclick="incQty(${idx})">+</button>
      </td>
      <td>₹ ${sub}</td>
      <td><button onclick="removeItem(${idx})">Remove</button></td>
    `;
    body.appendChild(tr);
  });
  document.getElementById('cart-total').textContent = total;
}

function incQty(i){ const c=getCart(); c[i].qty++; setCart(c); renderCart(); }
function decQty(i){ const c=getCart(); c[i].qty = Math.max(1, c[i].qty-1); setCart(c); renderCart(); }
function removeItem(i){ const c=getCart(); c.splice(i,1); setCart(c); renderCart(); }

// Checkout
function placeOrder(e){
  e.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const payment = document.getElementById('payment').value;
  if (!name || !address || !phone) { alert('Please fill all details'); return false; }
  const total = getCart().reduce((s,i)=>s+i.price*i.qty,0);
  alert(`Thank you, ${name}!\nYour order total is ₹${total}.\nPayment: ${payment.toUpperCase()}.\n( demo only )`);
  setCart([]);
  window.location.href = 'index.html';
  return false;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (listEl) { filterCategory('all'); }
  if (document.getElementById('cart-table')) { renderCart(); }
});
