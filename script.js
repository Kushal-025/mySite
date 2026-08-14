/**
 * Portfolio Interactive Script
 * Author: Kushal Banerjee
 * 
 * Features:
 * - EmailJS contact form integration
 * - Scroll progress bar
 * - Active nav section detection
 * - Staggered scroll reveal animations
 * - Hero text character animation
 * - Custom cursor with hover states
 * - Interactive 3D tilt cards
 * - Mouse particle trail
 * - Stats counter with easing
 * - Back-to-top button
 * - Magnetic button hover
 * - Project category filter
 */

// ==========================================
// EmailJS Configuration
// Replace these with your actual EmailJS credentials
// ==========================================
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',     // Get from emailjs.com → Account → API Keys
    serviceId: 'YOUR_SERVICE_ID',     // Get from emailjs.com → Email Services
    templateId: 'YOUR_TEMPLATE_ID'    // Get from emailjs.com → Email Templates
};

// Track mouse coordinates globally for shared components (cursor and particle canvas)
let globalMouseX = 0;
let globalMouseY = 0;

document.addEventListener('DOMContentLoaded', () => {
    initEmailJS();
    initCustomCursor();
    initParticleCanvas();
    initThemeSwitcher();
    initMobileMenu();
    initScrollNavbar();
    initScrollReveal();
    initStaggerReveal();
    initProjectFilter();
    initStatsCounter();
    initContactForm();
    initInteractiveEffects();
    initScrollProgress();
    initActiveNavDetection();
    initBackToTop();
    initHeroTextAnimation();
    initMagneticButtons();
});

/* ==========================================
   0. EMAILJS INIT
   ========================================== */
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

/* ==========================================
   1. CUSTOM CURSOR
   ========================================== */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (!dot || !outline) return;

    let outlineX = 0, outlineY = 0;
    
    // Speed of cursor outline interpolation (lerp)
    const speed = 0.15;

    window.addEventListener('mousemove', (e) => {
        globalMouseX = e.clientX;
        globalMouseY = e.clientY;
        
        // Immediate move for dot
        dot.style.transform = `translate3d(${globalMouseX}px, ${globalMouseY}px, 0)`;
    });

    function animateOutline() {
        // Lerp formula: current = current + (target - current) * speed
        outlineX += (globalMouseX - outlineX) * speed;
        outlineY += (globalMouseY - outlineY) * speed;
        
        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
        requestAnimationFrame(animateOutline);
    }
    
    animateOutline();

    // Hover states for links, buttons, and custom triggers
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .theme-toggle, .hamburger, .social-icon');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hovering');
            outline.classList.add('hovering');
            
            // Special hover effect for mix-blend mode differences
            if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.classList.contains('social-icon')) {
                outline.classList.add('blend-mode');
            }
        });
        
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hovering');
            outline.classList.remove('hovering');
            outline.classList.remove('blend-mode');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    });
}

/* ==========================================
   2. THEME SWITCHER (DARK / LIGHT)
   ========================================== */
function initThemeSwitcher() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;
    
    const icon = toggleBtn.querySelector('i');
    
    // Check local storage preference or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.classList.add('light-theme');
        if (icon) {
            icon.className = 'fa-solid fa-moon';
        }
    } else {
        document.body.classList.remove('light-theme');
        if (icon) {
            icon.className = 'fa-solid fa-sun';
        }
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        
        // Dynamic icon rotation & change animation
        toggleBtn.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            if (icon) {
                icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            }
            toggleBtn.style.transform = 'scale(1) rotate(360deg)';
        }, 150);
        
        setTimeout(() => {
            toggleBtn.style.transform = '';
        }, 300);
    });
}

/* ==========================================
   3. MOBILE DRAWER MENU
   ========================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navlinks = document.getElementById('navlinks');
    const navlinksItems = document.querySelectorAll('.navlinks li a');
    
    if (!hamburger || !navlinks) return;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navlinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navlinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navlinks.classList.remove('active');
        }
    });

    // Close menu when clicking items
    navlinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navlinks.classList.remove('active');
        });
    });
}

/* ==========================================
   4. SCROLL NAVBAR GLASSMORPHISM
   ========================================== */
function initScrollNavbar() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init
}

/* ==========================================
   5. SCROLL-REVEAL OBSERVING (Multiple variants)
   ========================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    if (reveals.length === 0) return;
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================
   5b. STAGGER CHILDREN REVEAL
   ========================================== */
function initStaggerReveal() {
    const staggerContainers = document.querySelectorAll('.stagger-children');
    
    if (staggerContainers.length === 0) return;
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    staggerContainers.forEach(el => staggerObserver.observe(el));
}

/* ==========================================
   6. PROJECT CATEGORY FILTER
   ========================================== */
function initProjectFilter() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (tabButtons.length === 0 || projectCards.length === 0) return;
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Hide with transition, then toggle display, then show
                if (filterValue === 'all' || category === filterValue) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85) translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'block';
                        // Trigger reflow
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 200);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85) translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ==========================================
   7. STATS COUNT-UP ANIMATION (with easing)
   ========================================== */
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-container');
    const counters = document.querySelectorAll('.stat-number');
    
    if (!statsSection || counters.length === 0) return;
    
    let animated = false;
    
    // Easing function for smooth deceleration
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2200; // ms
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const currentValue = Math.floor(easedProgress * target);
                
                counter.innerText = currentValue + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target + suffix;
                }
            }
            
            requestAnimationFrame(update);
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animated) {
            countUp();
            animated = true;
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
}

/* ==========================================
   8. CONTACT FORM (EmailJS Integration)
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    if (!form || inputs.length === 0) return;
    
    // Rate limiting: prevent spam submissions
    let lastSubmitTime = 0;
    const SUBMIT_COOLDOWN = 10000; // 10 seconds between submissions
    
    // Add active styling to floating label parent
    inputs.forEach(input => {
        // Init state check (for autocomplete)
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation on input
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                clearFieldError(input);
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Rate limit check
        const now = Date.now();
        if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
            showToastNotification('Please wait a few seconds before sending another message.', 'error');
            return;
        }
        
        // Basic Validation (do NOT mutate input values with escapeHTML)
        let hasError = false;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && input.value.trim() === '') {
                showFieldError(input, 'This field is required');
                hasError = true;
            } else if (input.type === 'email' && input.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    showFieldError(input, 'Enter a valid email address');
                    hasError = true;
                } else {
                    clearFieldError(input);
                }
            } else {
                clearFieldError(input);
            }
        });
        
        if (hasError) {
            // Shake the submit button as feedback
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.classList.add('error-shake');
                setTimeout(() => submitBtn.classList.remove('error-shake'), 500);
            }
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            
            // Send via EmailJS
            if (typeof emailjs !== 'undefined') {
                const templateParams = {
                    from_name: form.querySelector('#formName').value.trim(),
                    from_email: form.querySelector('#formEmail').value.trim(),
                    subject: form.querySelector('#formSubject').value.trim(),
                    message: form.querySelector('#formMessage').value.trim()
                };
                
                emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
                    .then(() => {
                        lastSubmitTime = Date.now();
                        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                        submitBtn.classList.add('success-state');
                        
                        showToastNotification('Thank you! Your message was sent successfully.', 'success');
                        
                        // Reset form
                        form.reset();
                        inputs.forEach(input => input.parentElement.classList.remove('focused'));
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('success-state');
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error);
                        submitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Failed to Send';
                        submitBtn.classList.add('error-shake');
                        
                        showToastNotification('Error sending message. Please try again or email directly.', 'error');
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('error-shake');
                        }, 3000);
                    });
            } else {
                // Fallback: EmailJS not loaded — open mailto
                const name = form.querySelector('#formName').value.trim();
                const email = form.querySelector('#formEmail').value.trim();
                const subject = form.querySelector('#formSubject').value.trim();
                const message = form.querySelector('#formMessage').value.trim();
                
                const mailtoLink = `mailto:kushalbanerjee025@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
                window.open(mailtoLink, '_blank');
                
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Email Client...';
                submitBtn.classList.add('success-state');
                
                showToastNotification('Opening your email client. EmailJS not configured yet.', 'success');
                
                form.reset();
                inputs.forEach(input => input.parentElement.classList.remove('focused'));
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success-state');
                }, 3000);
            }
        }
    });
}

function showFieldError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('has-error');
    
    let errorMsg = parent.querySelector('.error-msg');
    if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-msg';
        parent.appendChild(errorMsg);
    }
    errorMsg.innerText = message;
}

function clearFieldError(input) {
    const parent = input.parentElement;
    parent.classList.remove('has-error');
    const errorMsg = parent.querySelector('.error-msg');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showToastNotification(message, type = 'success') {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast-notification${type === 'error' ? ' error' : ''}`;
    
    const icon = type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/* ==========================================
   9. INTERACTIVE 3D TILT & HOVER
   ========================================== */
function initInteractiveEffects() {
    // 3D tilt effect on profile card and contact details
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle (max 10 degrees)
            const angleX = (centerY - y) / centerY * 10;
            const angleY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // Parallax scroll effect on hero content
    const heroContent = document.querySelector('.hero-text');
    const heroPic = document.querySelector('.hero-pic');
    
    if (heroContent || heroPic) {
        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            if (scrollVal < 600) {
                if (heroContent) heroContent.style.transform = `translateY(${scrollVal * 0.15}px)`;
                if (heroPic) heroPic.style.transform = `translateY(${scrollVal * 0.1}px)`;
            }
        });
    }
}

/* ==========================================
   10. CANVAS MOUSE PARTICLES TRAIL
   ========================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    const maxParticles = 120;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1; // 1 to 4px
            this.speedX = Math.random() * 2 - 1; // -1 to 1
            this.speedY = Math.random() * 2 - 1.4; // drift slightly upwards
            this.color = color;
            this.opacity = 1;
            this.decay = Math.random() * 0.015 + 0.008; // fade speed
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= this.decay;
            if (this.size > 0.1) this.size -= 0.02;
        }
        
        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    function addParticles(x, y) {
        // Spawn particles
        for (let i = 0; i < 2; i++) {
            if (particlesArray.length >= maxParticles) {
                particlesArray.shift();
            }
            const isCyan = Math.random() > 0.5;
            const color = isCyan ? 'rgba(6, 182, 212, 0.8)' : 'rgba(99, 102, 241, 0.8)';
            particlesArray.push(new Particle(x, y, color));
        }
    }
    
    window.addEventListener('mousemove', (e) => {
        addParticles(e.clientX, e.clientY);
    });
    
    window.addEventListener('scroll', () => {
        addParticles(globalMouseX, globalMouseY);
    });
    
    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            if (particlesArray[i].opacity <= 0) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(handleParticles);
    }
    
    handleParticles();
}

/* ==========================================
   11. SCROLL PROGRESS BAR
   ========================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

/* ==========================================
   12. ACTIVE NAV SECTION DETECTION
   ========================================== */
function initActiveNavDetection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active to matching nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
}

/* ==========================================
   13. BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    
    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================
   14. HERO TEXT CHARACTER ANIMATION
   ========================================== */
function initHeroTextAnimation() {
    const heading = document.querySelector('.hero-heading');
    if (!heading) return;
    
    // Split text into individual characters with span wrappers
    const originalHTML = heading.innerHTML;
    
    // We need to handle the <span> inside carefully
    // Split approach: process text nodes and preserve HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    let charIndex = 0;
    
    function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const fragment = document.createDocumentFragment();
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ') {
                    fragment.appendChild(document.createTextNode(' '));
                } else {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char;
                    span.style.animationDelay = `${0.3 + charIndex * 0.03}s`;
                    charIndex++;
                    fragment.appendChild(span);
                }
            }
            
            node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Process children of elements (like <span>)
            const children = Array.from(node.childNodes);
            children.forEach(child => processNode(child));
        }
    }
    
    const children = Array.from(tempDiv.childNodes);
    children.forEach(child => processNode(child));
    
    heading.innerHTML = tempDiv.innerHTML;
}

/* ==========================================
   15. MAGNETIC BUTTON HOVER EFFECT
   ========================================== */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtle magnetic pull (max 5px displacement)
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}
