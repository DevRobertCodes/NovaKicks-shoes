// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links
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
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .feature-card, .section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        const colorOptions = card.querySelectorAll('.color-option');
        const productImage = card.querySelector('.product-image img');
        
        // Color option selection
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Add ripple effect
                addRippleEffect(this);
                
                // Simulate image change based on color (in real app, you'd change the src)
                productImage.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
                setTimeout(() => {
                    productImage.style.filter = 'none';
                }, 300);
            });
        });
        
        // Add to cart animation
        const actionBtns = card.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (this.querySelector('svg path[d*="M3 3H5L5.4 5M7 13H17"]')) {
                    // This is the cart button
                    addToCartAnimation(this);
                    updateCartCount();
                } else {
                    // This is the wishlist button
                    toggleWishlist(this);
                }
            });
        });
        
        // Quick view functionality
        const quickViewBtn = card.querySelector('.quick-view-btn');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showQuickView(card);
            });
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            showSearchModal();
        });
    }
    
    // Scroll to top functionality
    createScrollToTop();
    
    // Loading animations for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    // Parallax effect for hero elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroElements = document.querySelectorAll('.floating-element');
        heroElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Auto-play hero statistics counter
    animateCounters();
    
    // Initialize tooltips for features
    initializeTooltips();
    
    // Keyboard navigation
    initializeKeyboardNavigation();
});

// Helper Functions

function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addToCartAnimation(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '✓';
    button.style.background = '#4CAF50';
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    const currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.animation = 'bounce 0.5s ease';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        cartIcon.style.animation = '';
    }, 1000);
}

function toggleWishlist(button) {
    const isActive = button.classList.contains('active');
    
    if (isActive) {
        button.classList.remove('active');
        button.style.color = '';
        showNotification('Removed from wishlist', 'info');
    } else {
        button.classList.add('active');
        button.style.color = '#ff6b6b';
        showNotification('Added to wishlist', 'success');
    }
    
    // Add heart animation
    button.style.animation = 'heartBeat 0.5s ease';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

function showQuickView(productCard) {
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;
    const productImage = productCard.querySelector('.product-image img').src;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-product">
                    <img src="${productImage}" alt="${productName}">
                    <div class="modal-info">
                        <h3>${productName}</h3>
                        <p class="modal-price">${productPrice}</p>
                        <div class="size-selector">
                            <label>Size:</label>
                            <select>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                            </select>
                        </div>
                        <button class="btn btn-primary modal-add-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });
    
    function closeModal() {
        modal.remove();
        document.body.style.overflow = '';
    }
    
    // Add to cart from modal
    const modalAddCart = modal.querySelector('.modal-add-cart');
    modalAddCart.addEventListener('click', function() {
        updateCartCount();
        showNotification('Added to cart!', 'success');
        closeModal();
    });
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    
    // Animate cart
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.animation = 'pulse 0.3s ease';
    setTimeout(() => {
        cartIcon.style.animation = '';
    }, 300);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${colors[type]};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSearchModal() {
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="search-overlay">
            <div class="search-container">
                <input type="text" placeholder="Search for shoes..." class="search-input">
                <button class="search-close">&times;</button>
            </div>
            <div class="search-results"></div>
        </div>
    `;
    
    document.body.appendChild(searchModal);
    document.body.style.overflow = 'hidden';
    
    const searchInput = searchModal.querySelector('.search-input');
    const searchClose = searchModal.querySelector('.search-close');
    const searchResults = searchModal.querySelector('.search-results');
    
    searchInput.focus();
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            // Simulate search results
            const mockResults = [
                'Classic Runner - Athletic Sneakers',
                'Urban Walker - Casual Sneakers',
                'Elite Pro - Performance Running',
                'Comfort Plus - Lifestyle Sneakers'
            ].filter(item => item.toLowerCase().includes(query));
            
            searchResults.innerHTML = mockResults.map(result => 
                `<div class="search-result-item">${result}</div>`
            ).join('');
        } else {
            searchResults.innerHTML = '';
        }
    });
    
    searchClose.addEventListener('click', function() {
        searchModal.remove();
        document.body.style.overflow = '';
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchModal.remove();
            document.body.style.overflow = '';
        }
    });
}

function createScrollToTop() {
    const scrollToTop = document.createElement('button');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '↑';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 20px;
        font-weight: bold;
    `;
    
    document.body.appendChild(scrollToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.transform = 'translateY(0)';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.transform = 'translateY(10px)';
        }
    });
    
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent.replace(/[^\d]/g, '');
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = counter.textContent.replace(/\d+/, target);
                        clearInterval(timer);
                    } else {
                        counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                    }
                }, 20);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 10000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            this.addEventListener('mousemove', function(e) {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 30 + 'px';
            });
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            });
        });
    });
}

function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === '/') {
            e.preventDefault();
            showSearchModal();
        }
        
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.quick-view-modal, .search-modal');
            modals.forEach(modal => modal.remove());
            document.body.style.overflow = '';
        }
    });
}

// Add CSS animations for JavaScript effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes heartBeat {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .quick-view-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
    }
    
    .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 600px;
        width: 100%;
        position: relative;
        animation: fadeInUp 0.3s ease;
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: #666;
    }
    
    .modal-product {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        align-items: center;
    }
    
    .modal-product img {
        width: 100%;
        border-radius: 10px;
    }
    
    .modal-info h3 {
        font-size: 24px;
        margin-bottom: 10px;
    }
    
    .modal-price {
        font-size: 20px;
        font-weight: bold;
        color: #667eea;
        margin-bottom: 20px;
    }
    
    .size-selector {
        margin-bottom: 20px;
    }
    
    .size-selector label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
    }
    
    .size-selector select {
        width: 100%;
        padding: 10px;
        border: 2px solid #eee;
        border-radius: 8px;
        font-size: 16px;
    }
    
    .search-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
    }
    
    .search-overlay {
        background: rgba(0, 0, 0, 0.9);
        width: 100%;
        height: 100%;
        padding: 50px 20px;
    }
    
    .search-container {
        max-width: 600px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 30px;
    }
    
    .search-input {
        width: 100%;
        padding: 20px;
        border: none;
        border-radius: 50px;
        font-size: 18px;
        outline: none;
    }
    
    .search-close {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: #666;
    }
    
    .search-results {
        max-width: 600px;
        margin: 0 auto;
    }
    
    .search-result-item {
        background: white;
        padding: 15px 20px;
        margin-bottom: 5px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .search-result-item:hover {
        background: #f0f0f0;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    @media (max-width: 768px) {
        .modal-product {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .modal-content {
            margin: 20px;
            padding: 20px;
        }
        
        .search-container {
            margin-bottom: 20px;
        }
        
        .search-input {
            padding: 15px;
            font-size: 16px;
        }
    }
`;

document.head.appendChild(style);