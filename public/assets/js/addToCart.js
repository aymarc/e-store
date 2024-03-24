document.addEventListener("DOMContentLoaded", function () {
    // Function to update cart and totals
    function updateCart() {
        const cartItems = document.querySelector(".cart-items");
        const subtotalElement = document.querySelector("#subtotal");
        const vatElement = document.querySelector("#vat");
        const totalElement = document.querySelector("#total");

        let subtotal = 0;

        // Clear the current content of the cart
        cartItems.innerHTML = "";

        // Retrieve cart items from local storage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Loop through each item in the cart
        cart.forEach(item => {
            const cartItem = document.createElement("li");
            cartItem.classList.add("single-cart-item");

            cartItem.innerHTML = `
                <div class="cart-img">
                    <a href="#"><img src="${item.image}" alt=""></a>
                </div>
                <div class="cart-content">
                    <h5 class="product-name">${item.name}</h5>
                    <span class="product-quantity">1 ×</span>
                    <span class="product-price">&euro; ${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-remove">
                    <a title="Remove" href="" onclick="removeItem(${item.id})"><i class="fa fa-trash"></i></a>
                </div>
            `;

            cartItems.appendChild(cartItem);

            // Update subtotal
            subtotal += item.price;
        });

        // Update totals
        const vat = subtotal * 0.23;
        const total = subtotal + vat;

        subtotalElement.textContent = subtotal.toFixed(2);
        vatElement.textContent = vat.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }

    // Function to add item to cart
    function addItemToCart(id, name, price, image) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item is already in the cart
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            // If item already exists, update quantity
            existingItem.quantity++;
        } else {
            // If item doesn't exist, add it to the cart
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1,
                image: image
            });
        }

        // Save updated cart to local storage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart display
        updateCart();
    }

    // Function to remove item from cart
    window.removeItem = function (id) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Remove item from cart
        const updatedCart = cart.filter(item => {
            return Number(item.id) !== Number(id)
        });
        // console.log("new cart ", updatedCart)
        // Save updated cart to local storage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Update the cart display
        updateCart();
    };

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            //const productItem = this.closest(".product-item");
            const productImage = button.dataset.image;
            const productId = button.dataset.id;
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);
            // Add item to cart
            addItemToCart(productId, productName, productPrice, productImage);
        });
    });

    // Initial update of the cart
    updateCart();
});
