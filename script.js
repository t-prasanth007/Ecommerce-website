document.addEventListener('DOMContentLoaded', () => {
    // --- Header Search Logic ---
    const searchContainer = document.getElementById('searchContainer');
    const searchBtn = document.getElementById('searchBtn');

    if (searchContainer && searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                const searchInput = searchContainer.querySelector('.search-input');
                if (searchInput) searchInput.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }

    // --- E-Commerce Core Logic ---
    updateHomeButtonsState(); // Check cart instantly on load to fix home button text
    
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            const addBtn = e.target.closest('.add-to-cart-btn');
            if (!addBtn) return;

            const card = addBtn.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent.trim();

            let cart = JSON.parse(localStorage.getItem('apexCart')) || [];
            const existingIndex = cart.findIndex(item => item.name === productName);

            if (existingIndex === -1) {
                // If it doesn't exist, create it with quantity 1
                const product = {
                    name: productName,
                    price: card.querySelector('.product-price').textContent.trim(),
                    image: card.querySelector('.product-image img').getAttribute('src'),
                    quantity: 1
                };
                cart.push(product);
                localStorage.setItem('apexCart', JSON.stringify(cart));
            }
            
            // Lock state to permanently added on home page
            updateHomeButtonsState();
        });
    }

    // --- Cart Page Specific Event Listeners ---
    const cartContainer = document.getElementById('cartItemContainer');
    if (cartContainer) {
        cartContainer.addEventListener('click', (e) => {
            let cart = JSON.parse(localStorage.getItem('apexCart')) || [];
            
            // Handle Quantity Increase (+)
            if (e.target.closest('.qty-plus')) {
                const index = e.target.closest('.qty-plus').getAttribute('data-index');
                cart[index].quantity += 1;
                localStorage.setItem('apexCart', JSON.stringify(cart));
                displayCartItems();
            }
            
            // Handle Quantity Decrease (-)
            if (e.target.closest('.qty-minus')) {
                const index = e.target.closest('.qty-minus').getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                }
                localStorage.setItem('apexCart', JSON.stringify(cart));
                displayCartItems();
            }

            // Handle Trash Can Delete
            if (e.target.closest('.remove-item-btn')) {
                const index = e.target.closest('.remove-item-btn').getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('apexCart', JSON.stringify(cart));
                displayCartItems();
            }
        });
        
        // Initial render if viewing the cart page
        displayCartItems();
    }
});

// Function to enforce the button state on home page
const productCards = document.querySelectorAll('.product-card');
function updateHomeButtonsState() {
    
    if (productCards.length === 0) return;

    let cart = JSON.parse(localStorage.getItem('apexCart')) || [];

    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.trim();
        const addBtn = card.querySelector('.add-to-cart-btn');
        if (!addBtn) return;

        const isInCart = cart.some(item => item.name === productName);

        if (isInCart) {
            addBtn.innerHTML = `<i class="fas fa-check"></i> Added`;
            addBtn.style.backgroundColor = '#10b981'; // Green status color
            addBtn.disabled = true; // Prevents spam clicking since quantity handles it inside cart
            addBtn.style.cursor = 'default';
        } else {
            addBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Add`;
            addBtn.style.backgroundColor = ''; // Reverts to original blue theme CSS rule
            addBtn.disabled = false;
            addBtn.style.cursor = 'pointer';
        }
    });
}

// Function to handle layout render in shop.html
function displayCartItems() {
    const cartContainer = document.getElementById('cartItemContainer');
    const cartTotal = document.getElementById('cartTotalValue');
    const cartFinalTotal = document.getElementById('cartFinalTotal');
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem('apexCart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart-text">Your cart is currently empty.</p>';
        if (cartTotal) cartTotal.textContent = '₹0';
        if (cartFinalTotal) cartFinalTotal.textContent = '₹0';
        return;
    }

    let runningTotal = 0;

    cart.forEach((item, index) => {
        const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
        runningTotal += numericPrice * item.quantity;

        const cartItemHTML = `
            <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div class="cart-item-details">
                        <h4 style="margin: 0 0 5px 0; color: #1e293b;">${item.name}</h4>
                        <p style="margin: 0; color: #64748b; font-size: 0.9rem;">${item.price}</p>
                    </div>
                </div>
                
                <!-- Quantity Controls & Actions -->
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="display: flex; align-items: center; background-color: #f1f5f9; border-radius: 6px; padding: 4px;">
                        <button class="qty-minus" data-index="${index}"  ${item.quantity === 1 ? 'disabled style="opacity: 0.4; cursor: not-allowed; background: none; border: none; padding: 0 8px; font-weight: bold; color: #64748b;"' : 'style="background: none; border: none; cursor: pointer; padding: 0 8px; font-weight: bold; color: #64748b;"'}>-</button>
                        <span style="font-weight: 600; min-width: 20px; text-align: center; font-size: 0.95rem;">${item.quantity}</span>
                        <button class="qty-plus" data-index="${index}" style="background: none; border: none; cursor: pointer; padding: 0 8px; font-weight: bold; color: #64748b;">+</button>
                    </div>
                    <button class="remove-item-btn" data-index="${index}" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem; padding: 5px;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    const formattedPrice = '₹' + runningTotal.toLocaleString('en-IN');
    if (cartTotal) cartTotal.textContent = formattedPrice;
    if (cartFinalTotal) cartFinalTotal.textContent = formattedPrice;
}