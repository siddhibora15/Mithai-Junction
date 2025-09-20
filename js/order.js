// Order page functionality
class OrderManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupOrderForm();
        this.updateDeliveryFee();
    }

    setupOrderForm() {
        const orderForm = document.getElementById('orderForm');
        
        if (orderForm) {
            orderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleOrderSubmit(orderForm);
            });

            // Update delivery fee based on order type
            const orderTypeSelect = document.getElementById('orderType');
            if (orderTypeSelect) {
                orderTypeSelect.addEventListener('change', () => {
                    this.updateDeliveryFee();
                });
            }
        }
    }

    updateDeliveryFee() {
        const orderType = document.getElementById('orderType')?.value;
        const deliveryFeeElement = document.getElementById('delivery-fee');
        const totalElement = document.getElementById('total');
        
        if (deliveryFeeElement && totalElement) {
            const subtotal = app.getCartTotal();
            let deliveryFee = 0;
            
            if (orderType === 'delivery' && subtotal > 0) {
                deliveryFee = subtotal < 500 ? 50 : 0; // Free delivery for orders above ₹500
            }
            
            deliveryFeeElement.textContent = `₹${deliveryFee}`;
            totalElement.textContent = `₹${subtotal + deliveryFee}`;
        }
    }

    handleOrderSubmit(form) {
        // Check if cart is empty
        if (app.cart.length === 0) {
            app.showNotification('Your cart is empty. Please add items before placing an order.', 'error');
            return;
        }

        if (!validateForm(form)) {
            app.showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const orderData = {
            customer: {
                name: formData.get('customerName'),
                phone: formData.get('customerPhone'),
                email: formData.get('customerEmail'),
                address: formData.get('customerAddress')
            },
            order: {
                type: formData.get('orderType'),
                deliveryDate: formData.get('deliveryDate'),
                timeSlot: formData.get('timeSlot'),
                specialInstructions: formData.get('specialInstructions')
            },
            items: app.cart,
            total: this.calculateOrderTotal()
        };

        this.submitOrder(orderData, form);
    }

    calculateOrderTotal() {
        const subtotal = app.getCartTotal();
        const orderType = document.getElementById('orderType')?.value;
        const deliveryFee = (orderType === 'delivery' && subtotal > 0 && subtotal < 500) ? 50 : 0;
        
        return {
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            total: subtotal + deliveryFee
        };
    }

    async submitOrder(orderData, form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Placing Order...';
        submitBtn.disabled = true;

        try {
            // Simulate order processing
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            // Generate order ID
            const orderId = 'MJ' + Date.now().toString().slice(-6);
            orderData.orderId = orderId;
            
            // Log order data (in a real app, this would be sent to a server)
            console.log('Order placed:', orderData);
            
            // Clear cart and show success
            app.clearCart();
            this.showOrderSuccess(orderId);
            form.reset();
            
        } catch (error) {
            app.showNotification('Failed to place order. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showOrderSuccess(orderId) {
        const notification = document.getElementById('order-notification');
        if (notification) {
            notification.innerHTML = `
                <div>
                    <h3>Order Placed Successfully! 🎉</h3>
                    <p>Your order ID is: <strong>${orderId}</strong></p>
                    <p>We'll contact you soon to confirm your order.</p>
                </div>
            `;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 6000);
        }
    }
}

// Initialize order manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('orderForm')) {
        new OrderManager();
    }
});

// Add cart item styles
const cartStyles = `
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--border);
        margin-bottom: 1rem;
    }
    
    .cart-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .cart-item-info h4 {
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
    }
    
    .cart-item-info p {
        margin: 0;
        color: var(--text-light);
        font-size: 0.9rem;
    }
    
    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .cart-item-controls button {
        width: 30px;
        height: 30px;
        border: 1px solid var(--border);
        background: var(--white);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .cart-item-controls button:hover {
        background: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
    }
    
    .remove-btn {
        background: var(--error) !important;
        color: var(--white) !important;
        border-color: var(--error) !important;
    }
    
    .remove-btn:hover {
        background: #DC2626 !important;
    }
`;

// Inject cart styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);