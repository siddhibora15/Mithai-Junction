// Main JavaScript functionality
class MithaiJunction {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.updateCartDisplay();
    }

    // Mobile Navigation
    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Smooth scrolling for internal links
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.product-card, .feature-card, .value-card, .team-member');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Cart functionality
    addToCart(product, price) {
        const existingItem = this.cart.find(item => item.product === product);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                product: product,
                price: parseFloat(price),
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Item added to cart!');
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(index);
        } else {
            this.cart[index].quantity = quantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');

        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="products.html">Browse products</a> to add items.</p>';
            } else {
                cartItems.innerHTML = this.cart.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.product}</h4>
                            <p>₹${item.price} per kg</p>
                        </div>
                        <div class="cart-item-controls">
                            <button onclick="app.updateQuantity(${index}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="app.updateQuantity(${index}, ${item.quantity + 1})">+</button>
                            <button onclick="app.removeFromCart(${index})" class="remove-btn">×</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update totals
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = subtotal > 0 ? 50 : 0;
        const total = subtotal + deliveryFee;

        if (subtotalElement) subtotalElement.textContent = `₹${subtotal}`;
        if (totalElement) totalElement.textContent = `₹${total}`;
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.innerHTML = `<p>${message}</p>`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Utility method to get cart total
    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Clear cart
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}

// Initialize the app
const app = new MithaiJunction();

// Global functions for HTML onclick handlers
window.app = app;

// Form validation utility
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border)';
        }
    });
    
    return isValid;
}

// Date utility - set minimum date to today
document.addEventListener('DOMContentLoaded', () => {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.min = today;
    });
});