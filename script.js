// Y2K K-Pop Store Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
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
        });
    });

    // Play button functionality for album covers
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create a sound wave animation
            createSoundWave(this);
            
            // Show a temporary message
            showNotification('♪ Playing preview... ♪');
        });
    });

    // Album card hover effects
    const albumCards = document.querySelectorAll('.album-card');
    albumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
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

    // CTA button special effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Create a cyber explosion effect
            createCyberExplosion(this);
            showNotification('Welcome to the Matrix! 🚀');
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Helper Functions

function createRippleEffect(element) {
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
}

function createSoundWave(element) {
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
}

function createCyberExplosion(element) {
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
}

function createMatrixEffect() {
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
}

function createMatrixColumn(container) {
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
}

function showNotification(message) {
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
