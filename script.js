// Catalog with relevant images
const PRODUCTS = [
  { id:1, name:'Full Cream Milk (1L)', price:28, category:'dairy', desc:'Fresh creamy milk for daily use.', img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=60', badge:'Fresh' },
  { id:2, name:'Tea Powder (250g)', price:90, category:'beverages', desc:'Rich aroma Assam blend.', img:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=60', badge:'Best Seller' },
  { id:3, name:'Brown Bread', price:35, category:'bakery', desc:'Soft, healthy whole wheat loaf.', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=60' },
  { id:4, name:'Honey Jar (250g)', price:180, category:'essentials', desc:'Pure natural honey.', img:'https://images.unsplash.com/photo-1517260739337-6799d152e0f5?auto=format&fit=crop&w=1000&q=60' },
  { id:5, name:'Cooking Oil (1L)', price:140, category:'essentials', desc:'Refined sunflower oil.', img:'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&w=1000&q=60' },
  { id:6, name:'Sugar (1kg)', price:48, category:'essentials', desc:'Fine white sugar.', img:'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1000&q=60' },
  { id:7, name:'Biscuit Pack', price:20, category:'snacks', desc:'Crispy tea-time biscuits.', img:'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=60' },
  { id:8, name:'Curd (500g)', price:45, category:'dairy', desc:'Thick & fresh curd.', img:'https://images.unsplash.com/photo-1563630423918-bde5a52379b0?auto=format&fit=crop&w=1000&q=60' },
  { id:9, name:'Boost (500g)', price:230, category:'beverages', desc:'Health drink with cocoa.', img:'https://images.unsplash.com/photo-1526312426976-593c2d0fb1a5?auto=format&fit=crop&w=1000&q=60', badge:'New' },
  { id:10, name:'Basmati Rice (5kg)', price:520, category:'essentials', desc:'Long-grain fragrant rice.', img:'https://images.unsplash.com/photo-1543339308-43f2b2a51668?auto=format&fit=crop&w=1000&q=60' },
  { id:11, name:'Toor Dal (1kg)', price:140, category:'essentials', desc:'Premium arhar dal.', img:'https://images.unsplash.com/photo-1623065425900-3bf1e4d984ca?auto=format&fit=crop&w=1000&q=60' },
  { id:12, name:'Table Salt (1kg)', price:22, category:'essentials', desc:'Free-flow iodized salt.', img:'https://images.unsplash.com/photo-1615486363871-494b5779d1c1?auto=format&fit=crop&w=1000&q=60' }
];

function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
function setCart(c){ localStorage.setItem('cart', JSON.stringify(c)); updateCartCount(); }
function updateCartCount(){ const el=document.getElementById('cart-count'); if(el) el.textContent=getCart().reduce((s,i)=>s+i.qty,0); }

// Product grid render
const listEl = document.getElementById('product-list');
let activeCategory='all', currentList=PRODUCTS.slice();

function cardHTML(p){
  return `<div class="card">
    <div style="position:relative">
      ${p.badge?`<span class='badge'>${p.badge}</span>`:''}
      <img src="${p.img}" alt="${p.name}" loading="lazy"/>
    </div>
    <div class="pad">
      <h3>${p.name}</h3>
      <p class="muted small">${p.desc}</p>
      <div class="row">
        <span class="price">₹ ${p.price}</span>
        <div style="display:flex;gap:8px">
          <button class="ghost" onclick="view(${p.id})">View</button>
          <button class="primary" onclick="addToCart(${p.id})">Add</button>
        </div>
      </div>
    </div>
  </div>`;
}

function render(list){
  if(!listEl) return;
  document.getElementById('result-count').textContent = `${list.length} items`;
  listEl.innerHTML = list.map(cardHTML).join('');
}

function filterCategory(cat){
  activeCategory = cat;
  const q = (document.getElementById('search')?.value || '').toLowerCase();
  currentList = PRODUCTS.filter(p => (cat==='all'||p.category===cat) && p.name.toLowerCase().includes(q));
  render(currentList);
}
function filterCategoryFromChip(e){
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  e.target.classList.add('active');
  const cat = e.target.getAttribute('data-cat');
  filterCategory(cat);
}
function filterProducts(){ filterCategory(activeCategory); }

function sortProducts(){
  const val = document.getElementById('sort').value;
  const arr = currentList.slice();
  if (val==='price-asc') arr.sort((a,b)=>a.price-b.price);
  if (val==='price-desc') arr.sort((a,b)=>b.price-a.price);
  if (val==='name-asc') arr.sort((a,b)=>a.name.localeCompare(b.name));
  currentList = arr;
  render(currentList);
}

function view(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('m-img').src=p.img;
  document.getElementById('m-title').textContent=p.name;
  document.getElementById('m-desc').textContent=p.desc;
  document.getElementById('m-price').textContent='₹ '+p.price;
  document.getElementById('m-add').onclick=()=>{ addToCart(id); closeModal(); };
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal(){ document.getElementById('modal').classList.add('hidden'); }

function addToCart(id){
  const item = PRODUCTS.find(p=>p.id===id); if(!item) return;
  const cart = getCart();
  const ex = cart.find(x=>x.id===id);
  if(ex) ex.qty += 1; else cart.push({id:item.id, name:item.name, price:item.price, img:item.img, qty:1});
  setCart(cart);
}

function renderCart(){
  updateCartCount();
  const wrap = document.getElementById('cart-items'); if(!wrap) return;
  const empty = document.getElementById('cart-empty');
  const sum = document.getElementById('cart-summary');
  const cart = getCart();
  wrap.innerHTML='';
  if(cart.length===0){ empty.style.display='block'; sum.classList.add('hidden'); return; }
  empty.style.display='none'; sum.classList.remove('hidden');
  let total=0;
  cart.forEach((it,idx)=>{
    total += it.price*it.qty;
    const div = document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`
      <img src="${it.img}" alt="${it.name}"/>
      <div>
        <strong>${it.name}</strong>
        <div class="muted small">₹ ${it.price} each</div>
      </div>
      <div class="qty">
        <button onclick="decQty(${idx})">-</button>
        <strong>${it.qty}</strong>
        <button onclick="incQty(${idx})">+</button>
        <button onclick="removeItem(${idx})" class="ghost" style="margin-left:8px">Remove</button>
      </div>`;
    wrap.appendChild(div);
  });
  document.getElementById('sub-total').textContent=total;
  document.getElementById('cart-total').textContent=total;
}
function incQty(i){ const c=getCart(); c[i].qty++; setCart(c); renderCart(); }
function decQty(i){ const c=getCart(); c[i].qty=Math.max(1,c[i].qty-1); setCart(c); renderCart(); }
function removeItem(i){ const c=getCart(); c.splice(i,1); setCart(c); renderCart(); }

function placeOrder(e){
  e.preventDefault();
  const name=document.getElementById('fullName').value.trim();
  const address=document.getElementById('address').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const payment=document.getElementById('payment').value;
  if(!name||!address||!phone){ alert('Please fill all details'); return false; }
  const total=getCart().reduce((s,i)=>s+i.price*i.qty,0);
  alert(`Thank you, ${name}! Your order total is ₹${total}.\nPayment: ${payment.toUpperCase()}\n(This is a demo.)`);
  setCart([]);
  window.location.href='index.html';
  return false;
}

// init
document.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();
  if (document.getElementById('product-list')) filterCategory('all');
  if (document.getElementById('cart-items')) renderCart();
});
