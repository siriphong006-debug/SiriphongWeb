// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
// Highlight active link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ===== SMOOTH SCROLL =====
// Smooth scroll for anchor links
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

// ===== SCROLL ANIMATIONS =====
// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.feature-card, .preview-card, .type-card, .modern-card, ' +
    '.tip-card, .variation-card, .benefit-card, ' +
    '.consideration-card, .skill-card, .stat-card'
);

animatedElements.forEach(el => observer.observe(el));

// ===== NAVBAR SCROLL EFFECT =====
// Change navbar style on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== BACK TO TOP BUTTON =====
// Create and add back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Style the back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
`;
document.head.appendChild(style);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll to top on click
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== LAZY LOADING FOR IMAGES =====
// Implement lazy loading for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== FORM VALIDATION (if any forms exist) =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#E74C3C';
            } else {
                input.style.borderColor = '#ECF0F1';
            }
        });
        
        if (isValid) {
            // Form is valid, you can submit it here
            alert('Form submitted successfully!');
            form.reset();
        }
    });
});

// ===== INTERACTIVE CARDS =====
// Add click effect to cards
const cards = document.querySelectorAll(
    '.feature-card, .preview-card, .type-card, .modern-card, ' +
    '.tip-card, .variation-card, .benefit-card, ' +
    '.consideration-card, .skill-card, .stat-card'
);

cards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        cards.forEach(c => c.classList.remove('card-active'));
        // Add active class to clicked card
        this.classList.add('card-active');
    });
});

// Add style for card active state
const cardStyle = document.createElement('style');
cardStyle.textContent = `
    .card-active {
        transform: translateY(-10px) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
    }
`;
document.head.appendChild(cardStyle);

// ===== TIMELINE ANIMATION =====
// Animate timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
});

// ===== HERO ANIMATION =====
// Animate hero content on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 100);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 300);
    }
});

// ===== COUNTER ANIMATION =====
// Animate numbers in stats
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const isPercentage = finalValue.includes('%');
            const isInfinite = finalValue === '∞';
            
            if (isInfinite) {
                target.style.animation = 'pulse 2s infinite';
                return;
            }
            
            const numericValue = parseInt(finalValue);
            let current = 0;
            const increment = numericValue / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    target.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(current) + (isPercentage ? '%' : '');
                }
            }, stepTime);
            
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(pulseStyle);

// ===== IMAGE HOVER EFFECT =====
// Add subtle zoom effect on image hover
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
        this.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== KEYBOARD NAVIGATION =====
// Improve keyboard accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Tab key focuses on first interactive element
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll events
const debouncedScroll = debounce(() => {
    // Add any scroll-dependent logic here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===== CONSOLE MESSAGE =====
// Add a friendly console message
console.log('%c🌌 Welcome to Solar System Website! 🌌', 'font-size: 20px; font-weight: bold; color: #6C63FF;');
console.log('%cThis website was created with ❤️ by a student', 'font-size: 14px; color: #E8F4F8;');
console.log('%cFeel free to explore and learn about our solar system!', 'font-size: 14px; color: #E8F4F8;');
// เพิ่มโค้ดนี้ในส่วนท้ายของไฟล์ script.js ก่อน `document.addEventListener('DOMContentLoaded', () => {`

// ===== COSMIC EFFECTS GENERATOR =====
function createCosmicEffects() {
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'cosmic-effects';
    effectsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(effectsContainer);
    
    // Create nebula background
    const nebula = document.createElement('div');
    nebula.className = 'nebula-bg';
    effectsContainer.appendChild(nebula);
    
    // Create warp grid
    const warpGrid = document.createElement('div');
    warpGrid.className = 'warp-grid';
    effectsContainer.appendChild(warpGrid);
    
    // Create cosmic particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        particle.style.cssText = `
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation-duration: ${Math.random() * 20 + 10}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        effectsContainer.appendChild(particle);
    }
    
    // Create space dust
    for (let i = 0; i < 30; i++) {
        const dust = document.createElement('div');
        dust.className = 'space-dust';
        dust.style.cssText = `
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation-duration: ${Math.random() * 30 + 20}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        effectsContainer.appendChild(dust);
    }
    
    // Create occasional meteors
    setInterval(() => {
        if (Math.random() > 0.7) {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.cssText = `
                top: ${Math.random() * 50}vh;
                left: ${Math.random() * 100}vw;
                animation-duration: ${Math.random() * 2 + 1}s;
            `;
            effectsContainer.appendChild(meteor);
            
            setTimeout(() => meteor.remove(), 2000);
        }
    }, 3000);
    
    // Create laser beams
    const laserBeams = [
        { top: '20%', delay: '0s' },
        { top: '50%', delay: '1.5s' },
        { top: '80%', delay: '3s' }
    ];
    
    laserBeams.forEach(beam => {
        const laser = document.createElement('div');
        laser.className = 'laser-beam';
        laser.style.cssText = `
            top: ${beam.top};
            animation-delay: ${beam.delay};
        `;
        effectsContainer.appendChild(laser);
    });
    
    // Create quantum dots
    for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.className = 'quantum-dot';
        dot.style.cssText = `
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            animation-delay: ${Math.random() * 3}s;
        `;
        effectsContainer.appendChild(dot);
    }
}

// ===== ENHANCED CARD EFFECTS =====
function enhanceCards() {
    const cards = document.querySelectorAll('.feature-card, .preview-card, .type-card, .modern-card, .tip-card, .variation-card, .benefit-card, .skill-card');
    
    cards.forEach(card => {
        // Add 3D effect
        card.classList.add('card-3d');
        card.classList.add('card-hologram');
        
        // Create content wrapper for 3D effect
        const content = card.querySelector('.type-content') || card.querySelector('.card-content') || card;
        content.classList.add('card-content');
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'rotateY(10deg) rotateX(5deg) translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-lg), var(--shadow-glow), 0 0 30px rgba(108, 99, 255, 0.5)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// ===== ENHANCED BUTTONS =====
function enhanceButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(btn => {
        btn.classList.add('btn-cosmic');
        
        // Add ripple effect
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== ENHANCED NAVIGATION =====
function enhanceNavigation() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.add('nav-glow');
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-primary);
        width: 0%;
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px var(--primary-color);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===== ENHANCED IMAGES =====
function enhanceImages() {
    const images = document.querySelectorAll('img:not(.no-enhance)');
    
    images.forEach(img => {
        img.classList.add('image-3d');
        
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.animation = 'imageLoad 0.5s ease';
        });
    });
    
    // Add image loading animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes imageLoad {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        img {
            transition: opacity 0.3s ease;
        }
        
        img.loading {
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);
}

// ===== ENHANCED TABLES =====
function enhanceTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        table.classList.add('table-glow');
        
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            // Add staggered animation
            row.style.animationDelay = `${index * 0.1}s`;
            
            // Add hover effect
            row.addEventListener('mouseenter', () => {
                row.style.transform = 'scale(1.01)';
                row.style.transition = 'all 0.3s ease';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.transform = 'scale(1)';
            });
        });
    });
}

// ===== ENHANCED TEXT ANIMATIONS =====
function enhanceText() {
    // Add floating animation to titles
    const titles = document.querySelectorAll('h1, h2, .section-title');
    titles.forEach(title => {
        if (!title.classList.contains('floating')) {
            title.classList.add('text-float');
        }
    });
    
    // Add glow effect to neon text
    const neonTexts = document.querySelectorAll('.neon-text');
    neonTexts.forEach(text => {
        text.classList.add('text-glow');
    });
}

// ===== PARALLAX SCROLLING =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== LOADING ANIMATION =====
function showLoadingAnimation() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-cosmos';
    loadingDiv.innerHTML = `
        <div class="cosmic-loader"></div>
    `;
    document.body.appendChild(loadingDiv);
    
    // Hide loading after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingDiv.classList.add('hidden');
            setTimeout(() => {
                loadingDiv.remove();
            }, 500);
        }, 1000);
    });
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Spacebar - Toggle dark mode
        if (e.code === 'Space' && e.ctrlKey) {
            e.preventDefault();
            document.body.classList.toggle('dark-mode');
        }
        
        // Escape - Close all modals
        if (e.code === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.style.display = 'none');
        }
        
        // Arrow keys - Navigate cards
        if (e.code.startsWith('Arrow')) {
            const cards = document.querySelectorAll('.feature-card, .preview-card');
            const current = document.activeElement;
            const index = Array.from(cards).indexOf(current);
            
            if (index !== -1) {
                let nextIndex;
                if (e.code === 'ArrowRight') nextIndex = (index + 1) % cards.length;
                if (e.code === 'ArrowLeft') nextIndex = (index - 1 + cards.length) % cards.length;
                if (e.code === 'ArrowDown') nextIndex = (index + 2) % cards.length;
                if (e.code === 'ArrowUp') nextIndex = (index - 2 + cards.length) % cards.length;
                
                cards[nextIndex].focus();
            }
        }
    });
}

// ===== MOUSE TRAIL EFFECT =====
function createMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transform: scale(${1 - (i / trailLength * 0.8)});
            transition: opacity 0.1s, transform 0.1s;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = Array(trailLength).fill(mouseX);
    let trailY = Array(trailLength).fill(mouseY);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX.unshift(mouseX);
        trailY.unshift(mouseY);
        
        trailX = trailX.slice(0, trailLength);
        trailY = trailY.slice(0, trailLength);
        
        trail.forEach((dot, i) => {
            dot.style.left = trailX[i] - 5 + 'px';
            dot.style.top = trailY[i] - 5 + 'px';
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// ===== SOUND EFFECTS (OPTIONAL) =====
function initSoundEffects() {
    const sounds = {
        click: new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ='),
        hover: new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=')
    };
    
    // Add click sound to buttons
    document.querySelectorAll('button, .btn, a[href]').forEach(el => {
        el.addEventListener('click', () => {
            sounds.click.currentTime = 0;
            sounds.click.play().catch(() => {});
        });
        
        el.addEventListener('mouseenter', () => {
            sounds.hover.currentTime = 0;
            sounds.hover.play().catch(() => {});
        });
    });
}

// ===== WEBSITE TOUR =====
function initWebsiteTour() {
    const tourSteps = [
        { element: '.hero', text: 'ยินดีต้อนรับสู่เว็บไซต์ระบบสุริยะ!', position: 'bottom' },
        { element: '.navbar', text: 'ใช้เมนูนี้เพื่อนำทางไปยังส่วนต่าง ๆ', position: 'bottom' },
        { element: '.features', text: 'เรียนรู้เกี่ยวกับความสำคัญของการสำรวจอวกาศ', position: 'top' },
        { element: '.preview-card:first-child', text: 'คลิกที่การ์ดเพื่อเรียนรู้เพิ่มเติม', position: 'right' }
    ];
    
    const startTourBtn = document.createElement('button');
    startTourBtn.className = 'tour-btn';
    startTourBtn.innerHTML = '🚀 ค้นพบเว็บไซต์';
    startTourBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(startTourBtn);
    
    let currentStep = 0;
    
    startTourBtn.addEventListener('click', () => {
        if (currentStep < tourSteps.length) {
            const step = tourSteps[currentStep];
            const element = document.querySelector(step.element);
            
            if (element) {
                // Highlight element
                element.style.boxShadow = '0 0 0 4px var(--primary-color)';
                element.style.transition = 'box-shadow 0.3s ease';
                
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'tour-tooltip';
                tooltip.innerHTML = `
                    <div class="tour-content">
                        <p>${step.text}</p>
                        <button class="tour-next">ต่อไป</button>
                    </div>
                `;
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(13, 27, 42, 0.95);
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: var(--shadow-xl);
                    z-index: 1001;
                    max-width: 300px;
                `;
                
                const rect = element.getBoundingClientRect();
                switch (step.position) {
                    case 'top':
                        tooltip.style.top = rect.top - 120 + 'px';
                        tooltip.style.left = rect.left + 'px';
                        break;
                    case 'bottom':
                        tooltip.style.top = rect.bottom + 20 + 'px';
                        tooltip.style.left = rect.left + 'px';
                        break;
                    case 'right':
                        tooltip.style.top = rect.top + 'px';
                        tooltip.style.left = rect.right + 20 + 'px';
                        break;
                }
                
                document.body.appendChild(tooltip);
                
                // Next button
                tooltip.querySelector('.tour-next').addEventListener('click', () => {
                    element.style.boxShadow = '';
                    tooltip.remove();
                    currentStep++;
                    
                    if (currentStep >= tourSteps.length) {
                        startTourBtn.innerHTML = '🎉 สำเร็จ!';
                        setTimeout(() => {
                            startTourBtn.remove();
                        }, 2000);
                    }
                });
            }
        }
    });
}

// ===== INITIALIZE ALL ENHANCEMENTS =====
function initializeEnhancements() {
    // Create cosmic effects
    createCosmicEffects();
    
    // Enhance UI components
    enhanceCards();
    enhanceButtons();
    enhanceNavigation();
    enhanceImages();
    enhanceTables();
    enhanceText();
    
    // Initialize features
    initParallax();
    initKeyboardShortcuts();
    
    // Optional effects (comment out if not needed)
    // createMouseTrail();
    // initSoundEffects();
    // initWebsiteTour();
    
    // Show loading animation
    showLoadingAnimation();
    
    console.log('%c✨ Website Enhancements Initialized! ✨', 'font-size: 16px; color: #6C63FF; font-weight: bold;');
    console.log('%cAll cosmic effects and UI enhancements are now active.', 'color: #4A90E2;');
}

// Add to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Original initialization
    console.log('Solar System Website initialized successfully!');
    document.body.classList.add('loaded');
    
    // New enhancements
    initializeEnhancements();
});

// Add to window load event for final touches
window.addEventListener('load', () => {
    // Add parallax class to hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('parallax');
        heroImage.dataset.speed = '0.3';
    }
    
    // Add parallax to some sections
    document.querySelectorAll('section:nth-child(odd)').forEach(section => {
        section.classList.add('parallax');
        section.dataset.speed = '0.1';
    });
    
    // Final console message
    console.log('%c🚀 Website fully loaded and enhanced! 🚀', 
        'font-size: 18px; background: linear-gradient(90deg, #6C63FF, #4A90E2); color: white; padding: 10px; border-radius: 5px;');
});

// Export functions for global access (optional)
window.websiteEnhancements = {
    initializeEnhancements,
    enhanceCards,
    enhanceButtons,
    createCosmicEffects
};
// ===== INITIALIZATION =====
// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Solar System Website initialized successfully!');
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// Add loaded style
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadedStyle);
