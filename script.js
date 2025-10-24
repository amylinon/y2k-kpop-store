// Y2K K-Pop Store Interactive Elements with Enhanced Statsig Debugging

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Starting initialization...');
    
    // Initialize Amplitude tracking for interactive elements
    function trackAmplitudeEvent(eventName, properties = {}) {
        try {
            if (typeof window.amplitude !== 'undefined') {
                window.amplitude.track(eventName, {
                    ...properties,
                    timestamp: new Date().toISOString(),
                    page: 'Y2K K-Pop Store'
                });
                console.log('📊 Amplitude event tracked:', eventName, properties);
            } else {
                console.warn('⚠️ Amplitude not available for tracking:', eventName);
            }
        } catch (error) {
            console.error('❌ Amplitude tracking error:', error);
        }
    }

    // Enhanced Statsig tracking with debugging
    function trackStatsigEvent(eventName, value = null, metadata = {}) {
        try {
            if (typeof window.myStatsigClient !== 'undefined') {
                console.log('📈 Sending Statsig event:', eventName, value, metadata);
                window.myStatsigClient.logEvent(eventName, value, metadata);
                console.log('✅ Statsig event logged:', eventName, value, metadata);
                
                // Flush immediately for testing
                window.myStatsigClient.flush().then(() => {
                    console.log('🔄 Statsig events flushed');
                }).catch(err => {
                    console.error('❌ Statsig flush error:', err);
                });
            } else {
                console.warn('⚠️ Statsig client not available for tracking:', eventName);
                console.log('Available window properties:', Object.keys(window).filter(k => k.includes('Statsig')));
            }
        } catch (error) {
            console.error('❌ Statsig tracking error:', error);
        }
    }

    // Wait for Statsig to initialize
    const waitForStatsig = () => {
        return new Promise((resolve) => {
            const checkStatsig = () => {
                if (typeof window.myStatsigClient !== 'undefined') {
                    console.log('✅ Statsig client found');
                    resolve();
                } else {
                    console.log('⏳ Waiting for Statsig client...');
                    setTimeout(checkStatsig, 500);
                }
            };
            checkStatsig();
        });
    };

    // Initialize tracking after Statsig is ready
    waitForStatsig().then(() => {
        console.log('🎯 Starting event tracking...');
        
        // Track page view
        trackAmplitudeEvent('Page View', {
            page_title: 'Y2K K-Pop Store',
            section: 'home'
        });
        trackStatsigEvent('page_view', 'Y2K K-Pop Store', {
            page_title: 'Y2K K-Pop Store',
            section: 'home',
            timestamp: new Date().toISOString()
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Track navigation clicks
            trackAmplitudeEvent('Navigation Click', {
                link_text: this.textContent,
                target_section: targetId
            });
            trackStatsigEvent('navigation_click', targetId, {
                link_text: this.textContent,
                target_section: targetId,
                timestamp: new Date().toISOString()
            });
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add to cart functionality with both tracking
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            try {
                // Get product info
                const albumCard = this.closest('.album-card, .merch-item');
                const productName = albumCard.querySelector('.album-title, h4')?.textContent || 'Unknown Product';
                const productPrice = albumCard.querySelector('.album-price, .price')?.textContent || 'Unknown Price';
                const artist = albumCard.querySelector('.album-artist')?.textContent || 'Unknown Artist';
                const productType = albumCard.classList.contains('album-card') ? 'album' : 'merchandise';
                
                // Track add to cart event with Amplitude
                trackAmplitudeEvent('Add to Cart', {
                    product_name: productName,
                    product_price: productPrice,
                    artist: artist,
                    product_type: productType
                });
                
                // Track add to cart event with Statsig
                trackStatsigEvent('add_to_cart', productName, {
                    price: productPrice,
                    item_name: productName,
                    artist: artist,
                    product_type: productType,
                    timestamp: new Date().toISOString()
                });
                
                // Create a visual feedback
                const originalText = this.textContent;
                this.textContent = 'Added! ✓';
                this.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
                
                // Add a ripple effect
                createRippleEffect(this);
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'linear-gradient(45deg, #ff00ff, #00ffff)';
                }, 2000);
            } catch (error) {
                console.error('Add to cart error:', error);
            }
        });
    });

    // Play button functionality for album covers with both tracking
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            try {
                // Get album info
                const albumCard = this.closest('.album-card');
                const albumName = albumCard.querySelector('.album-title')?.textContent || 'Unknown Album';
                const artist = albumCard.querySelector('.album-artist')?.textContent || 'Unknown Artist';
                
                // Track play button click with Amplitude
                trackAmplitudeEvent('Play Button Click', {
                    album_name: albumName,
                    artist: artist
                });
                
                // Track play button click with Statsig
                trackStatsigEvent('play_button_click', albumName, {
                    album_name: albumName,
                    artist: artist,
                    timestamp: new Date().toISOString()
                });
                
                // Create a sound wave animation
                createSoundWave(this);
                
                // Show a temporary message
                showNotification('♪ Playing preview... ♪');
            } catch (error) {
                console.error('Play button error:', error);
            }
        });
    });

    // Album card hover effects with both tracking
    const albumCards = document.querySelectorAll('.album-card');
    albumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            try {
                const albumName = this.querySelector('.album-title')?.textContent || 'Unknown Album';
                const artist = this.querySelector('.album-artist')?.textContent || 'Unknown Artist';
                
                // Track album hover with Amplitude
                trackAmplitudeEvent('Album Hover', {
                    album_name: albumName,
                    artist: artist
                });
                
                // Track album hover with Statsig
                trackStatsigEvent('album_hover', albumName, {
                    album_name: albumName,
                    artist: artist,
                    timestamp: new Date().toISOString()
                });
                
                this.style.transform = 'translateY(-10px) scale(1.02)';
            } catch (error) {
                console.error('Album hover error:', error);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA button special effect with both tracking
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            try {
                // Track CTA click with Amplitude
                trackAmplitudeEvent('CTA Button Click', {
                    button_text: this.textContent,
                    section: 'hero'
                });
                
                // Track CTA click with Statsig
                trackStatsigEvent('cta_button_click', this.textContent, {
                    button_text: this.textContent,
                    section: 'hero',
                    timestamp: new Date().toISOString()
                });
                
                // Create a cyber explosion effect
                createCyberExplosion(this);
                showNotification('Welcome to the Matrix! 🚀');
            } catch (error) {
                console.error('CTA button error:', error);
            }
        });
    }

    // Track section views as user scrolls with both tracking
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                try {
                    // Track section view with Amplitude
                    trackAmplitudeEvent('Section View', {
                        section_id: entry.target.id,
                        section_name: entry.target.querySelector('h2, h3')?.textContent || entry.target.id
                    });
                    
                    // Track section view with Statsig
                    trackStatsigEvent('section_view', entry.target.id, {
                        section_id: entry.target.id,
                        section_name: entry.target.querySelector('h2, h3')?.textContent || entry.target.id,
                        timestamp: new Date().toISOString()
                    });
                } catch (error) {
                    console.error('Section view error:', error);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Matrix-style background animation
    createMatrixEffect();

    // Glitch effect for the main title
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.style.animation = 'none';
            setTimeout(() => {
                glitchTitle.style.animation = '';
            }, 100);
        }, 3000);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Enhanced Statsig event flushing
    setInterval(async () => {
        try {
            if (typeof window.myStatsigClient !== 'undefined') {
                await window.myStatsigClient.flush();
                console.log('🔄 Statsig events flushed (periodic)');
            }
        } catch (error) {
            console.error('❌ Statsig flush error:', error);
        }
    }, 5000); // Flush every 5 seconds for testing
});

// Helper Functions

function createRippleEffect(element) {
    try {
        const ripple = document.createElement('div');
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
    } catch (error) {
        console.error('Ripple effect error:', error);
    }
}

function createSoundWave(element) {
    try {
        const waves = [];
        for (let i = 0; i < 5; i++) {
            const wave = document.createElement('div');
            wave.style.position = 'absolute';
            wave.style.border = '2px solid #00ffff';
            wave.style.borderRadius = '50%';
            wave.style.left = '50%';
            wave.style.top = '50%';
            wave.style.transform = 'translate(-50%, -50%)';
            wave.style.animation = `soundWave ${0.5 + i * 0.1}s ease-out forwards`;
            wave.style.pointerEvents = 'none';
            
            element.parentElement.style.position = 'relative';
            element.parentElement.appendChild(wave);
            waves.push(wave);
        }
        
        setTimeout(() => {
            waves.forEach(wave => wave.remove());
        }, 1000);
    } catch (error) {
        console.error('Sound wave error:', error);
    }
}

function createCyberExplosion(element) {
    try {
        const particles = [];
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = ['#00ffff', '#ff00ff', '#ffff00'][Math.floor(Math.random() * 3)];
            particle.style.borderRadius = '50%';
            particle.style.left = element.offsetLeft + element.offsetWidth / 2 + 'px';
            particle.style.top = element.offsetTop + element.offsetHeight / 2 + 'px';
            particle.style.animation = `cyberExplosion ${1 + Math.random()}s ease-out forwards`;
            particle.style.pointerEvents = 'none';
            
            document.body.appendChild(particle);
            particles.push(particle);
        }
        
        setTimeout(() => {
            particles.forEach(particle => particle.remove());
        }, 2000);
    } catch (error) {
        console.error('Cyber explosion error:', error);
    }
}

function createMatrixEffect() {
    try {
        const matrixContainer = document.createElement('div');
        matrixContainer.style.position = 'fixed';
        matrixContainer.style.top = '0';
        matrixContainer.style.left = '0';
        matrixContainer.style.width = '100%';
        matrixContainer.style.height = '100%';
        matrixContainer.style.pointerEvents = 'none';
        matrixContainer.style.zIndex = '-1';
        matrixContainer.style.overflow = 'hidden';
        
        document.body.appendChild(matrixContainer);
        
        // Create falling characters
        for (let i = 0; i < 50; i++) {
            createMatrixColumn(matrixContainer);
        }
    } catch (error) {
        console.error('Matrix effect error:', error);
    }
}

function createMatrixColumn(container) {
    try {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = Math.random() * 100 + '%';
        column.style.top = '-100px';
        column.style.color = '#00ff00';
        column.style.fontFamily = 'monospace';
        column.style.fontSize = '14px';
        column.style.lineHeight = '14px';
        column.style.opacity = '0.7';
        
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        
        container.appendChild(column);
        
        // Animate the column
        let position = -100;
        const speed = 1 + Math.random() * 2;
        
        function animate() {
            position += speed;
            column.style.top = position + 'px';
            
            if (position < window.innerHeight + 100) {
                requestAnimationFrame(animate);
            } else {
                column.remove();
                createMatrixColumn(container); // Create a new column
            }
        }
        
        animate();
    } catch (error) {
        console.error('Matrix column error:', error);
    }
}

function showNotification(message) {
    try {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = 'linear-gradient(45deg, #ff00ff, #00ffff)';
        notification.style.color = '#000';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '25px';
        notification.style.fontWeight = '700';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideInRight 0.5s ease-out';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    } catch (error) {
        console.error('Notification error:', error);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes soundWave {
        to {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
    
    @keyframes cyberExplosion {
        to {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
    
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
`;
document.head.appendChild(style);
