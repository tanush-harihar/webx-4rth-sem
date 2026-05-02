const allItems = {
    'pizza': 250,
    'burger': 120,
    'pasta': 180,
    'frenchfries': 90,
    'sandwich': 110,
    'coldcoffee': 80,
    'milkshake': 130,
    'biryani': 200,
    'paneertikka': 220
};

let itemsInCart = [];
let currentTotal = 0;

function updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = itemsInCart.length;
}

function updateEmptyState() {
    const emptyEl = document.getElementById('cartEmpty');
    if (!emptyEl) return;
    emptyEl.style.display = itemsInCart.length === 0 ? 'block' : 'none';
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function addToCart(foodItem) {
    const price = allItems[foodItem];
    if (!price) return;

    itemsInCart.push(foodItem);
    currentTotal += price;

    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.dataset.item = foodItem;
        li.innerHTML = `
            <span class="cart-item-name">${capitalize(foodItem)}</span>
            <span class="cart-item-price">₹${price}</span>
            <button onclick="removeFromCart('${foodItem}', this)">✕</button>
        `;
        cartItems.appendChild(li);
    }

    const totalEl = document.getElementById('total');
    if (totalEl) totalEl.textContent = currentTotal;

    updateCartCount();
    updateEmptyState();
    showToast(`${capitalize(foodItem)} added to cart!`);

    // Persist cart to localStorage
    saveCart();
}

function removeFromCart(foodItem, btn) {
    const price = allItems[foodItem];

    // Find the specific li element
    const li = btn ? btn.closest('.cart-item') : null;
    if (li) {
        li.classList.add('removing');
        setTimeout(() => li.remove(), 250);
    }

    // Remove only the first occurrence from itemsInCart
    const idx = itemsInCart.indexOf(foodItem);
    if (idx !== -1) itemsInCart.splice(idx, 1);

    currentTotal = Math.max(0, currentTotal - price);

    const totalEl = document.getElementById('total');
    if (totalEl) totalEl.textContent = currentTotal;

    updateCartCount();
    updateEmptyState();
    saveCart();
}

function checkout() {
    if (currentTotal === 0) {
        showToast('Your cart is empty!');
        return;
    }
    saveCart();
    window.location.href = 'completed.html';
}

function saveCart() {
    localStorage.setItem('tommato_cart', JSON.stringify(itemsInCart));
    localStorage.setItem('tommato_total', currentTotal);
}

function onStart() {
    // Load cart from localStorage (for completed.html)
    const saved = localStorage.getItem('tommato_cart');
    const savedTotal = localStorage.getItem('tommato_total');

    if (saved) itemsInCart = JSON.parse(saved);
    if (savedTotal) currentTotal = parseInt(savedTotal);

    const cartList = document.getElementById('checkoutCart');
    const totalEl = document.getElementById('total');

    if (cartList) {
        cartList.innerHTML = '';
        if (itemsInCart.length === 0) {
            cartList.innerHTML = '<li style="color:#999">No items ordered.</li>';
        } else {
            itemsInCart.forEach(item => {
                cartList.innerHTML += `<li><span>${capitalize(item)}</span><span>₹${allItems[item]}</span></li>`;
            });
        }
    }
    if (totalEl) totalEl.textContent = currentTotal;

    // Clear cart after showing
    localStorage.removeItem('tommato_cart');
    localStorage.removeItem('tommato_total');
}

function filterFood(query) {
    const cards = document.querySelectorAll('.food-card');
    const q = query.toLowerCase().trim();
    cards.forEach(card => {
        const name = card.dataset.name || '';
        card.style.display = name.includes(q) ? '' : 'none';
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
