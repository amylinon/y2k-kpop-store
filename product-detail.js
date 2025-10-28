// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Product Detail Page Loaded');
    
    // Initialize quantity controls
    initializeQuantityControls();
    
    // Initialize variant selection
    initializeVariantSelection();
    
    // Initialize image thumbnails
    initializeImageThumbnails();
    
    // Initialize add to cart functionality
    initializeAddToCart();
    
    // Initialize buy now functionality
    initializeBuyNow();
    
    // Initialize play preview
    initializePlayPreview();
    
    // Initialize related products
    initializeRelatedProducts();
    
    // Track page view events
    trackPageView();
});

// Quantity Controls
function initializeQuantityControls() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                trackQuantityChange(quantityInput.value);
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            const maxValue = parseInt(quantityInput.getAttribute('max'));
            if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
                trackQuantityChange(quantityInput.value);
            }
        });
        
        quantityInput.addEventListener('change', function() {
            const value = parseInt(this.value);
            const min = parseInt(this.getAttribute('min'));
            const max = parseInt(this.getAttribute('max'));
            
            if (value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
            
            trackQuantityChange(this.value);
        });
    }
}

// Variant Selection
function initializeVariantSelection() {
    const variantBtns = document.querySelectorAll('.variant-btn');
    
    variantBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            variantBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Track variant selection
            const variant = this.getAttribute('data-variant');
            trackVariantSelection(variant);
            
            // Update price based on variant
            updatePriceForVariant(variant);
        });
    });
}

// Image Thumbnails
function initializeImageThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const variant = this.getAttribute('data-variant');
            if (mainImage) {
                mainImage.setAttribute('data-variant', variant);
                trackImageVariantView(variant);
            }
        });
    });
}

// Add to Cart Functionality
function initializeAddToCart() {
    const addToCartBtn = document.getElementById('add-to-cart-main');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = document.getElementById('quantity').value;
            const variant = document.querySelector('.variant-btn.active').getAttribute('data-variant');
            const price = getCurrentPrice();
            
            // Add to cart animation
            addToCartAnimation();
            
            // Track add to cart event
            trackAddToCart(quantity, variant, price);
            
            // Show success notification
            showNotification('Added to cart!', 'success');
        });
    }
}

// Buy Now Functionality
function initializeBuyNow() {
    const buyNowBtn = document.getElementById('buy-now');
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            const quantity = document.getElementById('quantity').value;
            const variant = document.querySelector('.variant-btn.active').getAttribute('data-variant');
            const price = getCurrentPrice();
            
            // Track buy now event
            trackBuyNow(quantity, variant, price);
            
            // Show checkout notification
            showNotification('Redirecting to checkout...', 'info');
            
            // Simulate checkout redirect
            setTimeout(() => {
                showNotification('Checkout functionality would open here!', 'info');
            }, 1000);
        });
    }
}

// Play Preview Functionality
function initializePlayPreview() {
    const playBtn = document.querySelector('.play-preview-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Track play preview event
            trackPlayPreview();
            
            // Show preview notification
            showNotification('Playing preview: Scientist by TWICE', 'info');
            
            // Simulate audio preview
            simulateAudioPreview();
        });
    }
}

// Related Products
function initializeRelatedProducts() {
    const relatedItems = document.querySelectorAll('.related-item');
    
    relatedItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-product')) {
                const productName = this.querySelector('h4').textContent;
                trackRelatedProductClick(productName);
            }
        });
    });
}

// Price Update Functions
function updatePriceForVariant(variant) {
    const currentPriceEl = document.querySelector('.current-price');
    const originalPriceEl = document.querySelector('.original-price');
    const discountEl = document.querySelector('.discount');
    
    if (variant === 'limited') {
        if (currentPriceEl) currentPriceEl.textContent = '$29.99';
        if (originalPriceEl) originalPriceEl.textContent = '$34.99';
        if (discountEl) discountEl.textContent = 'Save 14%';
    } else {
        if (currentPriceEl) currentPriceEl.textContent = '$24.99';
        if (originalPriceEl) originalPriceEl.textContent = '$29.99';
        if (discountEl) discountEl.textContent = 'Save 17%';
    }
}

function getCurrentPrice() {
    const currentPriceEl = document.querySelector('.current-price');
    return currentPriceEl ? currentPriceEl.textContent : '$24.99';
}

// Animation Functions
function addToCartAnimation() {
    const btn = document.getElementById('add-to-cart-main');
    if (btn) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    }
}

function simulateAudioPreview() {
    // Create visual audio waveform effect
    const playBtn = document.querySelector('.play-preview-btn');
    if (playBtn) {
        const originalText = playBtn.textContent;
        playBtn.textContent = '⏸ Stop Preview';
        
        // Create waveform animation
        createWaveformEffect();
        
        // Reset after 3 seconds
        setTimeout(() => {
            playBtn.textContent = originalText;
            removeWaveformEffect();
        }, 3000);
    }
}

function createWaveformEffect() {
    const productImage = document.querySelector('.product-image');
    if (productImage) {
        productImage.style.animation = 'waveform 0.5s ease-in-out infinite alternate';
    }
}

function removeWaveformEffect() {
    const productImage = document.querySelector('.product-image');
    if (productImage) {
        productImage.style.animation = 'none';
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00ff00, #00ffff)' : 
                    type === 'error' ? 'linear-gradient(45deg, #ff0000, #ff00ff)' : 
                    'linear-gradient(45deg, #ffff00, #ff00ff)'};
        color: #000;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: 700;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 255, 255, 0.5);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Event Tracking Functions
function trackPageView() {
    try {
        // Amplitude tracking
        if (window.amplitude) {
            window.amplitude.track('product_detail_view', {
                product_id: 'TWICE_Formula_of_Love',
                product_name: 'Formula of Love',
                artist: 'TWICE',
                page_type: 'product_detail',
                timestamp: new Date().toISOString()
            });
            console.log('📊 Amplitude product detail view tracked');
        }
        
        // Statsig tracking
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('product_detail_view', 'TWICE_Formula_of_Love', {
                product_id: 'TWICE_Formula_of_Love',
                product_name: 'Formula of Love',
                artist: 'TWICE',
                page_type: 'product_detail',
                timestamp: new Date().toISOString()
            });
            window.myStatsigClient.flush();
            console.log('📈 Statsig product detail view tracked');
        }
    } catch (error) {
        console.error('❌ Error tracking page view:', error);
    }
}

function trackQuantityChange(quantity) {
    try {
        if (window.amplitude) {
            window.amplitude.track('quantity_changed', {
                product_id: 'TWICE_Formula_of_Love',
                quantity: quantity,
                timestamp: new Date().toISOString()
            });
        }
        
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('quantity_changed', 'TWICE_Formula_of_Love', {
                product_id: 'TWICE_Formula_of_Love',
                quantity: quantity,
                timestamp: new Date().toISOString()
            });
            window.myStatsigClient.flush();
        }
        
        console.log(`📊 Quantity changed to: ${quantity}`);
    } catch (error) {
        console.error('❌ Error tracking quantity change:', error);
    }
}

function trackVariantSelection(variant) {
    try {
        if (window.amplitude) {
            window.amplitude.track('variant_selected', {
                product_id: 'TWICE_Formula_of_Love',
                variant: variant,
                timestamp: new Date().toISOString()
            });
        }
        
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('variant_selected', 'TWICE_Formula_of_Love', {
                product_id: 'TWICE_Formula_of_Love',
                variant: variant,
                timestamp: new Date().toISOString()
            });
            window.myStatsigClient.flush();
        }
        
        console.log(`📊 Variant selected: ${variant}`);
    } catch (error) {
        console.error('❌ Error tracking variant selection:', error);
    }
}

function trackImageVariantView(variant) {
    try {
        if (window.amplitude) {
            window.amplitude.track('image_variant_viewed', {
                product_id: 'TWICE_Formula_of_Love',
                image_variant: variant,
                timestamp: new Date().toISOString()
            });
        }
        
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('image_variant_viewed', 'TWICE_Formula_of_Love', {
                product_id: 'TWICE_Formula_of_Love',
                image_variant: variant,
                timestamp: new Date().toISOString()
            });
            window.myStatsigClient.flush();
        }
        
        console.log(`📊 Image variant viewed: ${variant}`);
    } catch (error) {
        console.error('❌ Error tracking image variant view:', error);
    }
}

function trackAddToCart(quantity, variant, price) {
    try {
        const eventData = {
            product_id: 'TWICE_Formula_of_Love',
            product_name: 'Formula of Love',
            artist: 'TWICE',
            quantity: quantity,
            variant: variant,
            price: price,
            timestamp: new Date().toISOString()
        };
        
        if (window.amplitude) {
            window.amplitude.track('add_to_cart', eventData);
            console.log('📊 Amplitude add to cart tracked');
        }
        
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('add_to_cart', 'TWICE_Formula_of_Love', eventData);
            window.myStatsigClient.flush();
            console.log('📈 Statsig add to cart tracked');
        }
    } catch (error) {
        console.error('❌ Error tracking add to cart:', error);
    }
}

function trackBuyNow(quantity, variant, price) {
    try {
        const eventData = {
            product_id: 'TWICE_Formula_of_Love',
            product_name: 'Formula of Love',
            artist: 'TWICE',
            quantity: quantity,
            variant: variant,
            price: price,
            timestamp: new Date().toISOString()
        };
        
        if (window.amplitude) {
            window.amplitude.track('buy_now', eventData);
            console.log('📊 Amplitude buy now tracked');
        }
        
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('buy_now', 'TWICE_Formula_of_Love', eventData);
            window.myStatsigClient.flush();
            console.log('📈 Statsig buy now tracked');
        }
    } catch (error) {
        console.error('❌ Error tracking buy now:', error);
    }
}

function trackPlayPreview() {
    try {
        if (window.amplitude) {
            window.amplitude.track('play_preview', {
                product_id: 'TWICE_Formula_of_Love',
                track_name: 'Scientist',
                artist: 'TWICE',
                timestamp: new Date().toISOString()
            });
        }
        
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('play_preview', 'TWICE_Formula_of_Love', {
                product_id: 'TWICE_Formula_of_Love',
                track_name: 'Scientist',
                artist: 'TWICE',
                timestamp: new Date().toISOString()
            });
            window.myStatsigClient.flush();
        }
        
        console.log('📊 Play preview tracked');
    } catch (error) {
        console.error('❌ Error tracking play preview:', error);
    }
}

function trackRelatedProductClick(productName) {
    try {
        if (window.amplitude) {
            window.amplitude.track('related_product_clicked', {
                clicked_product: productName,
                current_product: 'Formula of Love',
                timestamp: new Date().toISOString()
            });
        }
        
        if (window.myStatsigClient) {
            window.myStatsigClient.logEvent('related_product_clicked', productName, {
                clicked_product: productName,
                current_product: 'Formula of Love',
                timestamp: new Date().toISOString()
            });
            window.myStatsigClient.flush();
        }
        
        console.log(`📊 Related product clicked: ${productName}`);
    } catch (error) {
        console.error('❌ Error tracking related product click:', error);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes waveform {
        0% {
            box-shadow: 0 0 20px #00ffff;
        }
        100% {
            box-shadow: 0 0 40px #ff00ff, 0 0 60px #00ffff;
        }
    }
`;
document.head.appendChild(style);
