import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO7yFIllU3udhAtJP0f6wFu7QvsXXzP1o",
    authDomain: "ksp-traffic-control-ff5ac.firebaseapp.com",
    projectId: "ksp-traffic-control-ff5ac",
    storageBucket: "ksp-traffic-control-ff5ac.appspot.com",
    messagingSenderId: "307072623604",
    appId: "1:307072623604:web:62ee9977aa9634bece0fa1",
    measurementId: "G-TYW5L6YZNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let allSweets = [];

// Products page functionality
class ProductsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupCategoryFilter();
        this.setupAddToCart();
        this.fetchSweets();
    }

    setupCategoryFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productItems = document.querySelectorAll('.product-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter products
                const category = button.getAttribute('data-category');
                
                productItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                        // Add staggered animation
                        setTimeout(() => {
                            item.classList.add('fade-in-up');
                        }, Math.random() * 200);
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    setupAddToCart() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const product = button.getAttribute('data-product');
                const price = button.getAttribute('data-price');
                
                // Add loading state
                button.textContent = 'Adding...';
                button.disabled = true;
                
                setTimeout(() => {
                    app.addToCart(product, price);
                    button.textContent = 'Added ✓';
                    
                    setTimeout(() => {
                        button.textContent = 'Add to Cart';
                        button.disabled = false;
                    }, 1500);
                }, 500);
            });
        });
    }

    async fetchSweets() {
        const productsGrid = document.getElementById('products-grid');
        try {
            const querySnapshot = await getDocs(collection(db, "sweets"));
            allSweets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.renderSweets(allSweets);
        } catch (error) {
            console.error("Error fetching sweets: ", error);
            productsGrid.innerHTML = '<p>Could not load sweets. Please try again later.</p>';
        }
    }

    renderSweets(sweets) {
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = '';

        if (sweets.length === 0) {
            productsGrid.innerHTML = '<p>No sweets found.</p>';
            return;
        }

        sweets.forEach(sweet => {
            const productCard = `
                <div class="product-card">
                    <img src="${sweet.imageUrl}" alt="${sweet.name}" loading="lazy">
                    <div class="product-info">
                        <h3>${sweet.name}</h3>
                        <p>${sweet.description}</p>
                        <span class="price">₹${sweet.price}/kg</span>
                    </div>
                </div>
            `;
            productsGrid.innerHTML += productCard;
        });
    }
}

// Initialize products manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.products-section')) {
        new ProductsManager();
    }

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredSweets = allSweets.filter(sweet => 
            sweet.name.toLowerCase().includes(searchTerm) ||
            sweet.description.toLowerCase().includes(searchTerm)
        );
        renderSweets(filteredSweets);
    });
});