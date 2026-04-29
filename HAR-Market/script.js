// VivaFreshStore JavaScript

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentFilter = 'all';

// DOM Elements
const navMenu = document.getElementById('nav-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const userBtn = document.getElementById('user-btn');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const searchInput = document.querySelector('.search-input');
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');

// Modal elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const cartModal = document.getElementById('cart-modal');
const productModal = document.getElementById('product-modal');
const closeBtns = document.querySelectorAll('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    updateCartCount();
    updateUserStatus();
});

// Initialize application
function initializeApp() {
    // Sample products data
    products = [
        {
            id: 1,
            name: "Banane Organike",
            category: "fruits",
            price: 2.99,
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Banane të freskëta organike nga fermat lokale. Të pasura me kalium dhe perfekte për smoothie ose si ushqim i shpejtë.",
            badge: "Organike",
            stock: 50
        },
        {
            id: 2,
            name: "Luleshtrydhe të Freskëta",
            category: "fruits",
            price: 4.99,
            image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Luleshtrydhe të ëmbla dhe të lëngshme, perfekte për ëmbëlsira ose konsum të freskët.",
            badge: "Freskëta",
            stock: 30
        },
        {
            id: 3,
            name: "Spinaq i Fresket",
            category: "vegetables",
            price: 3.49,
            image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Fresh organic spinach leaves, packed with nutrients and perfect for salads or cooking.",
            badge: "Organic",
            stock: 40
        },
        {
            id: 4,
            name: "Fresh Milk",
            category: "dairy",
            price: 3.99,
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Fresh whole milk from local dairy farms. Rich and creamy taste.",
            badge: "Fresh",
            stock: 25
        },
        {
            id: 5,
            name: "Buke Artizanale",
            category: "bakery",
            price: 4.49,
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Freshly baked artisan bread with a crispy crust and soft interior.",
            badge: "Fresh",
            stock: 20
        },
        {
            id: 6,
            name: "Gjoks Pule i Fresket",
            category: "meat",
            price: 12.99,
            image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Premium organic chicken breast, free-range and hormone-free.",
            badge: "Organic",
            stock: 15
        },
        {
            id: 7,
            name: "Vaj Ulliri",
            category: "pantry",
            price: 8.99,
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Premium extra virgin olive oil, cold-pressed and unfiltered.",
            badge: "Premium",
            stock: 35
        },
        {
            id: 8,
            name: "Molla Organike",
            category: "fruits",
            price: 3.99,
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Crisp organic apples, perfect for snacking or baking.",
            badge: "Organic",
            stock: 45
        },
        {
            id: 9,
            name: "Domate te Fresketa",
            category: "vegetables",
            price: 2.99,
            image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Ripe and juicy tomatoes, perfect for salads and cooking.",
            badge: "Fresh",
            stock: 60
        },
        {
            id: 10,
            name: "Greek Yogurt",
            category: "dairy",
            price: 5.49,
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Creamy Greek yogurt, high in protein and perfect for breakfast.",
            badge: "High Protein",
            stock: 30
        },
        {
            id: 11,
            name: "Croissants",
            category: "bakery",
            price: 6.99,
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Buttery and flaky croissants, baked fresh daily.",
            badge: "Fresh",
            stock: 25
        },
        {
            id: 12,
            name: "Salmon Fillet",
            category: "meat",
            price: 18.99,
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Fresh Atlantic salmon fillet, rich in omega-3 fatty acids.",
            badge: "Fresh",
            stock: 12
        },
        {
            id: 13,
            name: "Coca-Cola",
            category: "beverages",
            price: 1.99,
            image: "https://media.istockphoto.com/id/458120031/photo/isolated-chilled-coca-cola.jpg?s=612x612&w=0&k=20&c=JKZw7K_t-nV8raQj2H9aLX42j6scpktKzXX0bm-lUyk=",
            description: "The classic Coca-Cola taste that everyone loves. Perfect for any occasion.",
            badge: "Popular",
            stock: 100
        },
        {
            id: 14,
            name: "Pepsi Max",
            category: "beverages",
            price: 1.99,
            image: "https://media.istockphoto.com/id/171300031/photo/pepsi-max-can-with-drops.jpg?s=612x612&w=0&k=20&c=YtrNeoUzWP_LdOGhfOazjgxcFuvAUjZ9i6K6x_ufWcg=",
            description: "Zero sugar, maximum taste. The perfect choice for health-conscious soda lovers.",
            badge: "Zero Sugar",
            stock: 80
        },
        {
            id: 15,
            name: "Lay's Classic Chips",
            category: "snacks",
            price: 3.49,
            image: "https://media.istockphoto.com/id/458987231/photo/potato-chips.jpg?s=612x612&w=0&k=20&c=m4YCW4b7wrbbATJOH1a7TJswox4oEt2BsznopxTpCBY=",
            description: "Crispy and delicious potato chips with the perfect amount of salt.",
            badge: "Classic",
            stock: 75
        },
        {
            id: 16,
            name: "Doritos Nacho Cheese",
            category: "snacks",
            price: 4.29,
            image: "https://media.istockphoto.com/id/516035904/photo/dorito-chips.jpg?s=612x612&w=0&k=20&c=oQLuHQi75gP09EecIFf3hEVTRAaLPm99Bf5qHfWXDN4=",
            description: "Bold nacho cheese flavor with crunchy tortilla chips. Perfect for parties!",
            badge: "Bold Flavor",
            stock: 60
        },
        {
            id: 17,
            name: "Pringles Original",
            category: "snacks",
            price: 3.99,
            image: "https://media.istockphoto.com/id/458647385/photo/pringles-original.jpg?s=612x612&w=0&k=20&c=VDLotTcV9cHPhcZ9FDkygKKKUG4YVXHsYy_tOSyeeRc=",
            description: "Stackable potato crisps with the original salty taste. Once you pop, you can't stop!",
            badge: "Stackable",
            stock: 45
        },
        {
            id: 18,
            name: "M&M's Chocolate",
            category: "snacks",
            price: 2.99,
            image: "https://media.istockphoto.com/id/458531839/photo/m-ms.jpg?s=612x612&w=0&k=20&c=e9taOFyk6zXy-aFmgT8gRjSb-hJHrNdxUXxWOjPJAHg=",
            description: "Colorful chocolate candies with a crispy shell. Perfect for sharing or snacking.",
            badge: "Colorful",
            stock: 90
        },
        {
            id: 19,
            name: "Snickers Bar",
            category: "snacks",
            price: 1.49,
            image: "https://media.istockphoto.com/id/529240903/photo/snickers-chocolate-bar-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=IJG7PzXzMXAU2-PHrfI4gKZgPJqqVOxDxvLLEv9QwTo=",
            description: "Chocolate, caramel, nougat, and peanuts. Satisfy your hunger with this classic treat.",
            badge: "Satisfying",
            stock: 120
        },
        {
            id: 20,
            name: "Red Bull Energy Drink",
            category: "beverages",
            price: 2.99,
            image: "https://media.istockphoto.com/id/458473367/photo/can-of-red-bull-energy-drink.jpg?s=612x612&w=0&k=20&c=8MngnfgpB3hdAnxzmQR6HGzY6ebt_agvFIhfdCXFAxM=",
            description: "Gives you wings! High-energy drink with taurine and caffeine for that extra boost.",
            badge: "Energy",
            stock: 70
        },
        {
            id: 21,
            name: "Monster Energy",
            category: "beverages",
            price: 2.79,
            image: "https://media.istockphoto.com/id/458584187/photo/monster-energy-drink.jpg?s=612x612&w=0&k=20&c=nvnjdzY7Y0m1SpbjnDGfLT1L50bO8Vcll-4h3AXN4vQ=",
            description: "Unleash the beast! High-performance energy drink for extreme energy needs.",
            badge: "Extreme",
            stock: 65
        },
        {
            id: 22,
            name: "Cheetos Flamin' Hot",
            category: "snacks",
            price: 3.79,
            image: "https://media.istockphoto.com/id/499621987/photo/cheetos-crunchy-snack.jpg?s=612x612&w=0&k=20&c=uVLL4CLDLZ-zduwBbbBvwQR7fGTb881yfZIX9l5KJpA=",
            description: "Spicy and crunchy cheese snacks that pack a punch. Not for the faint of heart!",
            badge: "Spicy",
            stock: 55
        },
        {
            id: 23,
            name: "Oreo Cookies",
            category: "snacks",
            price: 3.29,
            image: "https://media.istockphoto.com/id/503257367/photo/nabisco-oreo-milks-favorite-cookie-family-size-package.jpg?s=612x612&w=0&k=20&c=Tj2XBpV8w86xB76Zo-0nuENY7DvqNKZ2gxgv8jAZxWI=",
            description: "America's favorite cookie! Chocolate wafers with sweet cream filling. Twist, lick, dunk!",
            badge: "Classic",
            stock: 85
        },
        {
            id: 24,
            name: "Twix Chocolate Bar",
            category: "snacks",
            price: 1.79,
            image: "https://media.istockphoto.com/id/537889421/photo/twix-cookie-bars-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=wIcT2Vptg50Y7STggCwFqQ50Q1yfuA01D-Fs13znI_s=",
            description: "Two crispy cookie bars covered in caramel and milk chocolate. Left or right?",
            badge: "Twin Pack",
            stock: 95
        },
        {
            id: 25,
            name: "Sprite Lemon-Lime",
            category: "beverages",
            price: 1.89,
            image: "https://media.istockphoto.com/id/513932730/photo/sprite-plastic-bottle.jpg?s=612x612&w=0&k=20&c=pmdKnZchXVeoBxV9bc0rprDwpi2lSczCztKh7Fm1aHk=",
            description: "Clear, crisp, and refreshing lemon-lime soda. Obey your thirst!",
            badge: "Refreshing",
            stock: 88
        },
        {
            id: 26,
            name: "Fanta Orange",
            category: "beverages",
            price: 1.89,
            image: "https://media.istockphoto.com/id/519573232/photo/fanta-orange-can.jpg?s=612x612&w=0&k=20&c=U3JsZo2s52ssSwNkX9sk_i6CksBnWKTuIWqGOqH2nc8=",
            description: "Bold orange flavor with a fun, fruity taste. The colorful soft drink!",
            badge: "Fruity",
            stock: 72
        },
        {
            id: 27,
            name: "KitKat Chocolate",
            category: "snacks",
            price: 1.99,
            image: "https://media.istockphoto.com/id/458701489/photo/kitkat-chocolate-candy-bar-unwrapped.jpg?s=612x612&w=0&k=20&c=qB0HgAfa1iAzjCKx6Wj3u5iaTFV65A1umtXFq0ZM5PA=",
            description: "Crispy wafer fingers covered in smooth milk chocolate. Have a break, have a KitKat!",
            badge: "Break Time",
            stock: 110
        },
        {
            id: 28,
            name: "Reese's Peanut Butter Cups",
            category: "snacks",
            price: 2.19,
            image: "https://media.istockphoto.com/id/458701491/photo/reeses-peanut-butter-cups-candy-unwrapped.jpg?s=612x612&w=0&k=20&c=xdTCidaxHN1ks6jUC3bANR4txvTLzkNrYb_bXk6BPG8=",
            description: "Perfect combination of chocolate and peanut butter. Two great tastes that taste great together!",
            badge: "Perfect Pair",
            stock: 78
        },
        {
            id: 29,
            name: "Mountain Dew",
            category: "beverages",
            price: 1.99,
            image: "https://media.istockphoto.com/id/537663023/photo/can-of-mountain-dew-drink-isolated-on-white.jpg?s=612x612&w=0&k=20&c=qdzlyFmd4njecJWGOloP2WYw1E7TjcegKL0zL9uSXDA=",
            description: "Do the Dew! Citrus-flavored soda with a kick of caffeine and bold taste.",
            badge: "Bold",
            stock: 82
        },
        {
            id: 30,
            name: "Skittles Rainbow",
            category: "snacks",
            price: 2.49,
            image: "https://media.istockphoto.com/id/459007933/photo/skittles-candy.jpg?s=612x612&w=0&k=20&c=8WhN1WbpdR2Y_mmzg4qNUqQbmaMN2hWhzjrh45B0xWc=",
            description: "Taste the rainbow! Colorful fruit-flavored candies with a chewy texture.",
            badge: "Rainbow",
            stock: 68
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // User button
    userBtn.addEventListener('click', toggleUserModal);
    
    // Cart button
    cartBtn.addEventListener('click', openCartModal);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
    
    // Modal close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('contact-form').addEventListener('submit', handleContact);
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    
    // Modal navigation
    document.getElementById('show-signup').addEventListener('click', showSignupModal);
    document.getElementById('show-login').addEventListener('click', showLoginModal);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Load and display products
function loadProducts(filter = 'all', searchTerm = '') {
    let filteredProducts = products;
    
    // Apply category filter
    if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Display products
    displayProducts(filteredProducts);
}

// Display products in grid
function displayProducts(productsToShow) {
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>Nuk u gjetën produkte</h3>
                <p>Provoni të ndryshoni kriteret e kërkimit ose filtrit</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="view-details" onclick="viewProductDetails(${product.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    loadProducts(currentFilter, searchTerm);
}

// Handle filter
function handleFilter(e) {
    const filter = e.target.dataset.filter;
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Load filtered products
    loadProducts(filter, searchInput.value.trim());
}

// Handle category click
function handleCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    currentFilter = category;
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    
    // Load filtered products
    loadProducts(category, searchInput.value.trim());
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification('Produkti u shtua në shportë!', 'success');
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Open cart modal
function openCartModal() {
    displayCartItems();
    cartModal.style.display = 'block';
}

// Display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Shporta juaj është bosh</h3>
                <p>Shtoni disa produkte për të filluar!</p>
            </div>
        `;
        cartTotal.innerHTML = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    showNotification('Produkti u hoq nga shporta!', 'info');
}

// View product details
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-detail-actions">
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <input type="number" id="product-quantity" value="1" min="1" max="${product.stock}">
                </div>
                <button class="btn btn-primary" onclick="addToCartWithQuantity(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
            <div class="product-stock">
                <p><strong>Stock:</strong> ${product.stock} units available</p>
            </div>
        </div>
    `;
    
    productModal.style.display = 'block';
}

// Add to cart with quantity
function addToCartWithQuantity(productId) {
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const product = products.find(p => p.id === productId);
    
    if (!product || quantity <= 0) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeAllModals();
    showNotification(`${quantity} ${product.name} added to cart!`, 'success');
}

// User authentication
function toggleUserModal() {
    if (currentUser) {
        // Show user menu or logout
        if (confirm('Do you want to logout?')) {
            logout();
        }
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    closeAllModals();
    loginModal.style.display = 'block';
}

function showSignupModal() {
    closeAllModals();
    signupModal.style.display = 'block';
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || 'user@example.com';
    const password = formData.get('password') || 'password';
    
    // Simulate login
    currentUser = {
        id: 1,
        name: 'John Doe',
        email: email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserStatus();
    closeAllModals();
    showNotification('Hyrja u krye me sukses!', 'success');
}

function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || 'New User';
    const email = formData.get('email') || 'user@example.com';
    
    // Simulate signup
    currentUser = {
        id: 1,
        name: name,
        email: email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserStatus();
    closeAllModals();
    showNotification('Llogaria u krijua me sukses!', 'success');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserStatus();
    showNotification('Dolat me sukses!', 'info');
}

function updateUserStatus() {
    const userIcon = userBtn.querySelector('i');
    if (currentUser) {
        userIcon.classList.remove('fa-user');
        userIcon.classList.add('fa-user-check');
        userBtn.title = `Mirësevini, ${currentUser.name}`;
    } else {
        userIcon.classList.remove('fa-user-check');
        userIcon.classList.add('fa-user');
        userBtn.title = 'Hyr / Regjistrohu';
    }
}

// Contact form
function handleContact(e) {
    e.preventDefault();
    showNotification('Mesazhi u dërgua me sukses! Do t\'ju kontaktojmë së shpejti.', 'success');
    e.target.reset();
}

// Checkout
function handleCheckout() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Shporta juaj është bosh!', 'warning');
        return;
    }
    
    // Simulate checkout process
    showNotification('Duke ju ridrejtuar te pagesa...', 'info');
    setTimeout(() => {
        alert('Funksionaliteti i pagesës do të implementohet këtu me integrimin e portës së pagesës.');
        // Clear cart after successful checkout
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        closeAllModals();
    }, 2000);
}

// Utility functions
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll functions
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function scrollToCategories() {
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .no-products {
        text-align: center;
        padding: 3rem;
        color: #666;
    }
    
    .no-products i {
        font-size: 3rem;
        color: #ddd;
        margin-bottom: 1rem;
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    .empty-cart i {
        font-size: 3rem;
        color: #ddd;
        margin-bottom: 1rem;
    }
    
    .remove-item {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 8px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .remove-item:hover {
        background: #c0392b;
    }
    
    .product-stock {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
`;
document.head.appendChild(style); 