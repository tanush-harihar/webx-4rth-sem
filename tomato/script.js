allItems = {
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
itemsInCart = [];
currentTotal = 0;
function addToCart(foodItem) {
    const price = allItems[foodItem];
    const totalPriceElement = document.getElementById('total');
    currentTotal = parseInt(totalPriceElement.innerHTML) + price;

     if (price) {
        let cartItems = document.getElementById('cartItems');
        cartItems.innerHTML += `<li class = "cart-item">${foodItem} - ₹${price} 
        <button onclick="removeFromCart('${foodItem}')">Remove</button></li>`;
        totalPriceElement.innerHTML = `${currentTotal}`;
        itemsInCart.push(foodItem);
   
    }
}
function removeFromCart(foodItem) {
    let cartItems = document.getElementById('cartItems');
    const items = cartItems.getElementsByClassName('cart-item');
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.includes(foodItem)) {
            cartItems.removeChild(items[i]);
            break;
        }
    }
    itemsInCart.pop(itemsInCart.indexOf(foodItem));
    currentTotal = parseInt(document.getElementById('total').innerHTML);
    currentTotal = currentTotal - allItems[foodItem];
    const totalPriceElement = document.getElementById('total');
    totalPriceElement.innerHTML = `${currentTotal}`;
}
function checkout() {
    if (currentTotal > 0) {
        alert(`Thank you for your order! Your total is ₹${currentTotal}.`);
        window.location.href = "completed.html";

        currentTotal = 0;
    }
}

function onStart() {
    let cartItems = document.getElementById('checkoutCart');
    cartItems.innerHTML = '';
    itemsInCart.forEach(item => {
        cartItems.innerHTML += `<li>${item} - ₹${allItems[item]}</li>`;
    });

}
