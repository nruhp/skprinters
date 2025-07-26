// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initContactForm();
    initProductHoverEffects();
    initScrollHeaderEffect();
    init3DBoxAnimation();
    initParallaxEffect();
    initLoadingAnimation();
    initScrollToTop();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const ctaButtons = document.querySelectorAll('.hero__cta[href^="#"], .hero__cta-secondary[href^="#"]');
    
    const allSmoothLinks = [...navLinks, ...ctaButtons];

    allSmoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Clicking link:', targetId, 'Target found:', !!targetSection);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                console.log('Scrolling to position:', targetPosition);
                
                // Use both scrollTo and scrollIntoView as fallback
                try {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    // Fallback for older browsers
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Product Hover Effects - Enhanced Implementation
function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.product__card');
    
    productCards.forEach((card, index) => {
        // Add loading class for staggered animation
        card.classList.add('loading');
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            console.log('Product card hover entered');
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            this.style.borderColor = 'rgba(230, 126, 34, 0.3)';
            
            // Animate the icon
            const icon = this.querySelector('.product__icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            }

            // Animate the image background
            const imageContainer = this.querySelector('.product__image');
            if (imageContainer) {
                imageContainer.style.background = 'linear-gradient(135deg, var(--color-bg-2), var(--color-bg-3))';
                imageContainer.style.transform = 'scale(1.05)';
            }

            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(230, 126, 34, 0.2), 0 0 30px rgba(230, 126, 34, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            console.log('Product card hover left');
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
            this.style.borderColor = 'var(--color-card-border)';
            
            // Reset icon
            const icon = this.querySelector('.product__icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }

            // Reset image background
            const imageContainer = this.querySelector('.product__image');
            if (imageContainer) {
                imageContainer.style.background = 'var(--color-bg-2)';
                imageContainer.style.transform = 'scale(1)';
            }
        });

        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            }, 150);
        });

        // Add tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / (rect.height / 2)) * -5;
            const rotateY = (mouseX / (rect.width / 2)) * 5;
            
            this.style.transform = `translateY(-12px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.product__card, .capability__card, .stat, .certification__item, .contact__item'
    );
    
    // Add fade-in class to elements
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Section title animations
    const sectionTitles = document.querySelectorAll('.section__title, .section__subtitle');
    sectionTitles.forEach(title => {
        title.classList.add('fade-in');
        observer.observe(title);
    });
}

// Counter Animations for Statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat__number');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;

        console.log('Starting counter animations');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    const displayValue = Math.ceil(current);
                    
                    // Format number with commas for thousands
                    if (displayValue >= 1000) {
                        counter.textContent = displayValue.toLocaleString();
                    } else {
                        counter.textContent = displayValue;
                    }
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    // Final formatting
                    if (target >= 1000) {
                        counter.textContent = target.toLocaleString();
                    } else {
                        counter.textContent = target;
                    }
                }
            };

            // Add a slight delay for each counter
            setTimeout(() => updateCounter(), Math.random() * 500);
        });
    };

    // Observer for counter animation
    const statsSection = document.querySelector('.about__stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Stats section visible, starting counters');
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('Contact form submitted');
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            if (message.length < 10) {
                showFormMessage('Please provide a more detailed message (at least 10 characters).', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                showFormMessage(
                    'Thank you for your message! Our team will get back to you within 24 hours.',
                    'success'
                );
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 2000);
        });

        // Real-time validation
        const emailInput = document.getElementById('email');
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }

        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                if (this.value.trim().length < 2) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }

        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                if (this.value.trim().length < 10) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    }
}

// Form Message Display
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message status status--${type}`;
    messageDiv.textContent = message;
    messageDiv.style.marginTop = 'var(--space-16)';
    messageDiv.style.animation = 'fadeInUp 0.5s ease-out';
    
    // Insert message after form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Remove message after 6 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => messageDiv.remove(), 500);
        }, 6000);
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Header Scroll Effect
function initScrollHeaderEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    const updateHeader = throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = 'none';
        }

        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
        
        lastScrollY = currentScrollY;
    }, 16);
    
    window.addEventListener('scroll', updateHeader);
}

// Update Active Nav Link on Scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced 3D Box Animation Control
function init3DBoxAnimation() {
    const box3D = document.querySelector('.box-3d');
    
    if (box3D) {
        let isHovered = false;
        
        box3D.addEventListener('mouseenter', () => {
            isHovered = true;
            box3D.style.animationPlayState = 'paused';
        });
        
        box3D.addEventListener('mouseleave', () => {
            isHovered = false;
            box3D.style.animationPlayState = 'running';
            box3D.style.transform = '';
        });
        
        // Add interactive rotation on mouse move
        box3D.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            
            const rect = box3D.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = (e.clientX - centerX) / (rect.width / 2);
            const mouseY = (e.clientY - centerY) / (rect.height / 2);
            
            const rotateY = mouseX * 25;
            const rotateX = -mouseY * 25;
            
            box3D.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Add click interaction
        box3D.addEventListener('click', () => {
            box3D.style.animation = 'none';
            box3D.style.transform = 'scale(1.2) rotateX(360deg) rotateY(360deg)';
            
            setTimeout(() => {
                box3D.style.animation = 'rotate3d 20s infinite linear';
                box3D.style.transform = '';
            }, 1000);
        });
    }
}

// Parallax Effect
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero__background');
    
    if (heroBackground) {
        const parallaxUpdate = throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        }, 16);
        
        window.addEventListener('scroll', parallaxUpdate);
    }
}

// Loading Animation
function initLoadingAnimation() {
    const elements = document.querySelectorAll('section, .nav');
    
    // Initially hide elements
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    window.addEventListener('load', () => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background: var(--color-industrial-orange);
        color: white;
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(230, 126, 34, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    const toggleScrollButton = throttle(() => {
        if (window.pageYOffset > 400) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
            scrollButton.style.transform = 'scale(1)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
            scrollButton.style.transform = 'scale(0.8)';
        }
    }, 100);
    
    window.addEventListener('scroll', toggleScrollButton);
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'scale(1.1)';
        scrollButton.style.boxShadow = '0 12px 35px rgba(230, 126, 34, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'scale(1)';
        scrollButton.style.boxShadow = '0 8px 25px rgba(230, 126, 34, 0.3)';
    });
}

// Capability Card Interactions
function initCapabilityCardInteractions() {
    const capabilityCards = document.querySelectorAll('.capability__card');
    
    capabilityCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            const icon = this.querySelector('.capability__icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.capability__icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize capability card interactions after DOM is loaded
document.addEventListener('DOMContentLoaded', initCapabilityCardInteractions);

// Utility Functions
function throttle(func, wait) {
    let timeout;
    let previous = 0;
    
    return function executedFunction(...args) {
        const now = Date.now();
        
        if (now - previous > wait) {
            func.apply(this, args);
            previous = now;
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Add CSS animations and styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav__link.active {
        color: var(--color-industrial-orange);
    }
    
    .nav__link.active::after {
        width: 100%;
    }

    .product__card {
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
    }

    .product__icon {
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .product__image {
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
`;
document.head.appendChild(style);

// Performance optimization: Intersection Observer for expensive animations
function initPerformantAnimations() {
    const expensiveElements = document.querySelectorAll('.box-3d, .product__card');
    
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform';
            } else {
                entry.target.style.willChange = 'auto';
            }
        });
    }, { threshold: 0.1 });
    
    expensiveElements.forEach(element => {
        performanceObserver.observe(element);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', initPerformantAnimations);

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Skip links for accessibility
    if (e.key === 'Tab' && e.altKey) {
        const firstSection = document.querySelector('#home');
        if (firstSection) {
            firstSection.focus();
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add focus styles for better accessibility
const accessibilityStyles = document.createElement('style');
accessibilityStyles.textContent = `
    .nav__link:focus,
    .btn:focus,
    .form-control:focus {
        outline: 2px solid var(--color-industrial-orange);
        outline-offset: 2px;
    }
    
    .product__card:focus,
    .capability__card:focus {
        outline: 2px solid var(--color-industrial-orange);
        outline-offset: 4px;
        transform: translateY(-8px);
    }

    .product__card:focus .product__icon {
        transform: scale(1.2) rotate(5deg);
    }
`;
document.head.appendChild(accessibilityStyles);