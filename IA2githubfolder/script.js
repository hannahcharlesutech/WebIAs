//toggle menu btn mobile

const menuBtn = document.getElementById("togglemenu");
const sidemenu = document.getElementById("sidenavbar");

menuBtn.addEventListener("click", function() {
    sidemenu.classList.toggle("active");
    
});

//login validation

   const loginForm = document.querySelector(".login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter username and password.");
            return;
        }

        alert("Login Successful!");
    });
}


  /*register*/


const regForm = document.querySelector(".register-form");

if (regForm) {
    regForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let fname = document.getElementById("fname").value.trim();
        let lname = document.getElementById("lname").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let email = document.getElementById("email").value.trim();
        let address = document.getElementById("address").value.trim();
        let city = document.getElementById("city").value.trim();
        let parish = document.getElementById("parish").value;
        let pass = document.getElementById("password_reg").value.trim();
        let confirm = document.getElementById("confirm_password").value.trim();

        if (!fname || !lname || !phone || !email || !address || !city || !parish || !pass || !confirm) {
            alert("Please fill in all required fields.");
            return;
        }

        if (pass !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        alert("Registration successful!");
    });
}



/*add to cart*/

const addButtons = document.querySelectorAll(".add-to-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const productName = button.parentElement.querySelector("h3").textContent;
        const productPriceText = button.parentElement.querySelector(".price").textContent;
        const productPrice = parseFloat(productPriceText.replace("$",""));

        // Check if item already in cart
        let item = cart.find(p => p.id === id);
        if (item) {
            item.qty += 1;
        } else {
            cart.push({ id, name: productName, price: productPrice, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${productName} added to cart!`);
    });
});

/*cart page js :(*/


const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout-btn");

let cartData = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cartData.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${item.qty}" data-index="${index}" class="qty-input">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button class="remove-btn" data-index="${index}">X</button></td>
        `;

        cartItemsContainer.appendChild(tr);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    addCartEvents();
}

// Update quantity or remove item
function addCartEvents() {
    const qtyInputs = document.querySelectorAll(".qty-input");
    const removeBtns = document.querySelectorAll(".remove-btn");

    qtyInputs.forEach(input => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            let qty = parseInt(e.target.value);
            if (qty < 1) qty = 1;
            cartData[index].qty = qty;
            localStorage.setItem("cart", JSON.stringify(cartData));
            renderCart();
        });
    });

    removeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cartData.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartData));
            renderCart();
        });
    });
}

// Clear  cart
if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        cartData = [];
        localStorage.setItem("cart", JSON.stringify(cartData));
        renderCart();
    });
}

// Checkout button
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cartData.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        // Redirect to checkout page
        window.location.href = "checkout.html";
    });
}


renderCart();


//checkout cart js

const checkoutItemsContainer = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");
const cancelBtn = document.getElementById("cancel-btn");
const clearBtn = document.getElementById("clear-btn");

let checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];


function renderCheckout() {
    if (!checkoutItemsContainer) return;
    checkoutItemsContainer.innerHTML = "";
    let total = 0;

    checkoutCart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        checkoutItemsContainer.appendChild(tr);
    });

    checkoutTotal.textContent = `Total: $${total.toFixed(2)}`;
}

renderCheckout();

// Confirm order
if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(e) {
        e.preventDefault();

        
        const name = document.getElementById("fullName").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const parish = document.getElementById("parish").value;
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !address || !city || !parish || !phone || !email) {
            alert("Please fill in all required fields.");
            return;
        }

        alert("Thank you! Your order has been confirmed.");
        localStorage.removeItem("cart");
        window.location.href = "index.html"; // redirect to home
    });
}

// Cancel button
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        window.location.href = "cart.html";
    });
}

// Clear all button
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        checkoutCart = [];
        localStorage.removeItem("cart");
        renderCheckout();
        alert("Cart cleared.");
    });
}
