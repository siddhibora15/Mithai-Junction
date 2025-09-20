// Contact page functionality
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });
        }
    }

    handleFormSubmit(form) {
        if (!validateForm(form)) {
            app.showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simulate form submission
        this.submitForm(data, form);
    }

    async submitForm(data, form) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            this.showSuccessNotification();
            form.reset();
            
            // Log the form data (in a real app, this would be sent to a server)
            console.log('Contact form submitted:', data);
            
        } catch (error) {
            app.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showSuccessNotification() {
        const notification = document.getElementById('form-notification');
        if (notification) {
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        } else {
            app.showNotification('Thank you! Your message has been sent successfully.');
        }
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contactForm')) {
        new ContactManager();
    }
});