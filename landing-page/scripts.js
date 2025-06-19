/**
 * FifthKeys.com - Main JavaScript
 * Handles animations, interactions, and functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize particles background
    initParticles();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize chat widget
    initChatWidget();
    
    // Initialize video modal
    initVideoModal();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize demo form
    initDemoForm();
    
    // Initialize revenue calculator
    initRevenueCalculator();
    
    // Initialize pricing toggle
    initPricingToggle();
    
    // Initialize enhanced navigation
    initEnhancedNavigation();
});

/**
 * Initialize particles background in hero section
 */
function initParticles() {
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#3b82f6"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#3b82f6",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
    // Get all elements with animation classes
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    const scaleElements = document.querySelectorAll('.scale-in');
    
    // Add animation classes to elements that should animate on page load
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.feature-section').forEach(section => {
        section.querySelector('.feature-content').classList.add('slide-in-left');
        section.querySelector('.feature-image').classList.add('slide-in-right');
    });
    
    document.querySelectorAll('.stat-card').forEach(card => {
        card.classList.add('scale-in');
    });
    
    document.querySelectorAll('.solution-card').forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animation elements
    [...fadeElements, ...slideLeftElements, ...slideRightElements, ...scaleElements].forEach(el => {
        observer.observe(el);
    });
    
    // Add number counter animation to statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        stat.textContent = '0';
        
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(stat, 0, targetValue, 2000);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statObserver.observe(stat);
    });
}

/**
 * Animate number counting up
 */
function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = `${value}%`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate current dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Add click event to prev button
    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        showSlide(newIndex);
    });
    
    // Add click event to next button
    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }, 5000);
    });
}

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Toggle mobile dropdowns
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dropdown = toggle.nextElementSibling;
            dropdown.classList.toggle('active');
            
            // Toggle icon rotation
            const icon = toggle.querySelector('i');
            if (dropdown.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'chevron-up');
            } else {
                icon.setAttribute('data-lucide', 'chevron-down');
            }
            lucide.createIcons();
        });
    });
}

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use OS preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

/**
 * Initialize chat widget
 */
function initChatWidget() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWidget = document.querySelector('.chat-widget');
    const chatMinimize = document.querySelector('.chat-minimize');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        document.body.classList.toggle('chat-widget-active');
    });
    
    // Minimize chat widget
    chatMinimize.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        document.body.classList.remove('chat-widget-active');
    });
    
    // Handle quick replies
    quickReplies.forEach(reply => {
        reply.addEventListener('click', () => {
            const replyText = reply.textContent;
            addUserMessage(replyText);
            
            // Simulate bot response based on quick reply
            setTimeout(() => {
                let botResponse = '';
                
                switch(replyText) {
                    case 'Book a demo':
                        botResponse = `I'd be happy to help you book a demo! Could you tell me a bit about your property? How many rooms do you have?`;
                        break;
                    case 'Pricing information':
                        botResponse = `Our pricing is based on your hotel size and needs. For a property with 50 rooms, pricing typically starts at $5 per room per month. Would you like me to have our team prepare a custom quote for you?`;
                        break;
                    case 'Features overview':
                        botResponse = `FifthKeys offers a complete hotel management solution including: reservation management, revenue optimization, guest experience tools, and automated operations. Which specific feature would you like to learn more about?`;
                        break;
                    case 'Talk to sales':
                        botResponse = `I'll connect you with our sales team right away. Could you provide your name and email so they can reach out to you?`;
                        break;
                    default:
                        botResponse = `Thanks for your message! How else can I help you today?`;
                }
                
                addBotMessage(botResponse);
            }, 1000);
        });
    });
    
    // Send message on button click or Enter key
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                addBotMessage(`Thanks for your message! I'll help you with "${message}". Is there anything specific you'd like to know about FifthKeys?`);
            }, 1000);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add user message to chat
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">Just now</span>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add bot message to chat
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">Just now</span>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

/**
 * Initialize video modal
 */
function initVideoModal() {
    const videoBtn = document.querySelector('.video-btn');
    const videoModal = document.querySelector('.video-modal');
    const modalClose = document.querySelector('.modal-close');
    const videoIframe = document.querySelector('.video-container iframe');
    
    // Open video modal
    videoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set video URL (replace with actual demo video URL)
        videoIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    });
    
    // Close video modal
    modalClose.addEventListener('click', () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset iframe src to stop video
        videoIframe.src = 'about:blank';
    });
    
    // Close modal when clicking on overlay
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal || e.target.classList.contains('modal-overlay')) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset iframe src to stop video
            videoIframe.src = 'about:blank';
        }
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    const scrollThreshold = 300;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize demo form
 */
function initDemoForm() {
    const demoForm = document.getElementById('demoForm');
    
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(demoForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simulate form submission
            const submitBtn = demoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                console.log('Form submitted:', formDataObj);
                
                // Replace form with success message
                demoForm.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">
                            <i data-lucide="check-circle"></i>
                        </div>
                        <h3>Thank you for booking a demo!</h3>
                        <p>We've received your request and will contact you shortly to confirm your demo time. In the meantime, check your email for more information about FifthKeys.</p>
                    </div>
                `;
                
                // Initialize Lucide icons for new content
                lucide.createIcons();
            }, 2000);
        });
    }
}

/**
 * Initialize revenue calculator
 */
function initRevenueCalculator() {
    // Property type multipliers based on industry data
    const propertyMultipliers = {
        'hotel': { directBooking: 0.45, revpar: 0.39, upsell: 0.70 },
        'resort': { directBooking: 0.55, revpar: 0.42, upsell: 0.85 },
        'boutique': { directBooking: 0.52, revpar: 0.45, upsell: 0.65 },
        'hostel': { directBooking: 0.35, revpar: 0.30, upsell: 0.50 }
    };

    let currentPropertyType = 'hotel';

    // Get calculator elements
    const roomsInput = document.getElementById('calc-rooms');
    const rateInput = document.getElementById('calc-rate');
    const occupancySlider = document.getElementById('calc-occupancy');
    const directSlider = document.getElementById('calc-direct');
    const propertyOptions = document.querySelectorAll('.property-option');

    // Get result elements
    const annualRevenueEl = document.getElementById('annual-revenue');
    const currentRevenueEl = document.getElementById('current-revenue');
    const projectedRevenueEl = document.getElementById('projected-revenue');
    const directIncreaseEl = document.getElementById('direct-increase');
    const directImpactEl = document.getElementById('direct-impact');
    const revparIncreaseEl = document.getElementById('revpar-increase');
    const revparImpactEl = document.getElementById('revpar-impact');
    const upsellIncreaseEl = document.getElementById('upsell-increase');
    const upsellImpactEl = document.getElementById('upsell-impact');

    // Initialize slider values
    updateSliderValue(occupancySlider);
    updateSliderValue(directSlider);

    // Add event listeners
    roomsInput.addEventListener('input', calculateRevenue);
    rateInput.addEventListener('input', calculateRevenue);
    occupancySlider.addEventListener('input', () => {
        updateSliderValue(occupancySlider);
        calculateRevenue();
    });
    directSlider.addEventListener('input', () => {
        updateSliderValue(directSlider);
        calculateRevenue();
    });

    // Property type selection
    propertyOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            propertyOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update current property type
            currentPropertyType = option.dataset.type;
            
            // Recalculate revenue
            calculateRevenue();
        });
    });

    /**
     * Update slider value display
     */
    function updateSliderValue(slider) {
        const valueDisplay = slider.nextElementSibling;
        valueDisplay.textContent = `${slider.value}%`;
    }

    /**
     * Format currency values
     */
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Format percentage values
     */
    function formatPercentage(value) {
        return `+${Math.round(value * 100)}%`;
    }

    /**
     * Animate number changes
     */
    function animateValue(element, start, end, duration = 800) {
        let startTimestamp = null;
        const isPercentage = element.textContent.includes('%');
        const isCurrency = element.textContent.includes('$');
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Use easing function for smooth animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(easedProgress * (end - start) + start);
            
            if (isPercentage) {
                element.textContent = `+${value}%`;
            } else if (isCurrency) {
                element.textContent = formatCurrency(value);
            } else {
                element.textContent = value.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    /**
     * Calculate revenue based on current inputs
     */
    function calculateRevenue() {
        // Get current values
        const rooms = parseInt(roomsInput.value) || 50;
        const rate = parseFloat(rateInput.value) || 150;
        const occupancy = parseFloat(occupancySlider.value) / 100;
        const directBookingRate = parseFloat(directSlider.value) / 100;

        // Get multipliers for current property type
        const multipliers = propertyMultipliers[currentPropertyType];

        // Calculate current annual revenue
        const currentRevenue = rooms * rate * occupancy * 365;

        // Calculate improvements
        const directBookingImprovement = multipliers.directBooking;
        const revparImprovement = multipliers.revpar;
        const upsellImprovement = multipliers.upsell;

        // Calculate revenue increases
        const directBookingIncrease = currentRevenue * directBookingImprovement * 0.3; // 30% of total improvement from direct bookings
        const revparIncrease = currentRevenue * revparImprovement * 0.4; // 40% from RevPAR improvement
        const upsellIncrease = currentRevenue * upsellImprovement * 0.3; // 30% from upsells

        // Total additional revenue
        const totalAdditionalRevenue = directBookingIncrease + revparIncrease + upsellIncrease;
        const projectedRevenue = currentRevenue + totalAdditionalRevenue;

        // Update results with animation
        const currentAnnualValue = parseInt(annualRevenueEl.textContent.replace(/[^0-9]/g, '')) || 0;
        const currentCurrentValue = parseInt(currentRevenueEl.textContent.replace(/[^0-9]/g, '')) || 0;
        const currentProjectedValue = parseInt(projectedRevenueEl.textContent.replace(/[^0-9]/g, '')) || 0;

        // Animate main revenue figures
        animateValue(annualRevenueEl, currentAnnualValue, totalAdditionalRevenue);
        animateValue(currentRevenueEl, currentCurrentValue, currentRevenue);
        animateValue(projectedRevenueEl, currentProjectedValue, projectedRevenue);

        // Update improvement metrics
        directIncreaseEl.textContent = formatPercentage(directBookingImprovement);
        directImpactEl.textContent = `${formatCurrency(directBookingIncrease)}/year`;

        revparIncreaseEl.textContent = formatPercentage(revparImprovement);
        revparImpactEl.textContent = `${formatCurrency(revparIncrease)}/year`;

        upsellIncreaseEl.textContent = formatPercentage(upsellImprovement);
        upsellImpactEl.textContent = `${formatCurrency(upsellIncrease)}/year`;

        // Update chart bar heights with animation
        updateChartBars(currentRevenue, projectedRevenue);
    }

    /**
     * Update chart bar heights
     */
    function updateChartBars(currentRevenue, projectedRevenue) {
        const maxRevenue = Math.max(currentRevenue, projectedRevenue);
        
        const currentBar = document.querySelector('.chart-bar:not(.improvement)');
        const projectedBar = document.querySelector('.chart-bar.improvement');
        
        if (currentBar && projectedBar) {
            const currentHeight = (currentRevenue / maxRevenue) * 100;
            const projectedHeight = (projectedRevenue / maxRevenue) * 100;
            
            // Animate height changes
            currentBar.style.height = `${Math.max(currentHeight, 30)}%`;
            projectedBar.style.height = `${Math.max(projectedHeight, 40)}%`;
            
            // Update chart values
            const currentValueEl = currentBar.querySelector('.chart-value');
            const projectedValueEl = projectedBar.querySelector('.chart-value');
            
            if (currentValueEl) currentValueEl.textContent = formatCurrency(currentRevenue);
            if (projectedValueEl) projectedValueEl.textContent = formatCurrency(projectedRevenue);
        }
    }

    // Calculate initial revenue
    calculateRevenue();

    // Add smooth scrolling to calculator from navigation
    const calculatorLinks = document.querySelectorAll('a[href*="calculator"], a[href*="roi"]');
    calculatorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const calculatorSection = document.querySelector('.revenue-calculator');
            if (calculatorSection) {
                calculatorSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize pricing toggle functionality
 */
function initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const amounts = document.querySelectorAll('.amount');
    
    if (!toggle || !amounts.length) return;
    
    toggle.addEventListener('change', function() {
        const isAnnual = this.checked;
        
        amounts.forEach(amount => {
            const monthly = amount.getAttribute('data-monthly');
            const annual = amount.getAttribute('data-annual');
            
            if (monthly && annual) {
                const targetValue = isAnnual ? parseFloat(annual) : parseFloat(monthly);
                animatePriceChange(amount, targetValue);
            }
        });
    });
}

/**
 * Animate price changes in pricing cards
 */
function animatePriceChange(element, targetValue) {
    const currentValue = parseFloat(element.textContent);
    const increment = (targetValue - currentValue) / 20;
    let current = currentValue;
    
    const animation = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
            current = targetValue;
            clearInterval(animation);
        }
        element.textContent = current.toFixed(2);
    }, 20);
}

/**
 * Initialize enhanced navigation with smooth scrolling and active states
 */
function initEnhancedNavigation() {
    // Handle all navigation links with smooth scrolling
    document.addEventListener('click', function(e) {
        // Check if clicked element is a navigation link
        if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
            const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
            const targetId = link.getAttribute('href').substring(1);
            
            // Skip if it's an empty hash or just # or book-demo
            if (!targetId || targetId === '' || targetId === 'book-demo') return;
            
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }
    });

    // Update active navigation item on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPosition >= top && scrollPosition < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // Add intersection observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all major sections for animations
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Add smooth scroll for dropdown menu items
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a[href^="#"]');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close any open dropdowns
            const dropdown = this.closest('.dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        });
    });
}

/**
 * Initialize cookie consent banner
 */
function initCookieConsent() {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (!hasConsented) {
        // Create cookie banner
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-consent';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <p>We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you agree to our use of cookies.</p>
                </div>
                <div class="cookie-actions">
                    <button class="btn btn-ghost btn-sm" id="cookieDecline">Decline</button>
                    <button class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(cookieBanner);
        
        // Animate banner appearance
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
        
        // Handle accept
        document.getElementById('cookieAccept').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            setTimeout(() => cookieBanner.remove(), 300);
            
            // Initialize analytics
            initAnalytics();
        });
        
        // Handle decline
        document.getElementById('cookieDecline').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
            setTimeout(() => cookieBanner.remove(), 300);
        });
    } else if (hasConsented === 'accepted') {
        // Initialize analytics if previously accepted
        initAnalytics();
    }
}

/**
 * Initialize analytics (placeholder for Google Analytics, etc.)
 */
function initAnalytics() {
    // Google Analytics 4 initialization
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Check if form has validation
            if (!form.hasAttribute('novalidate')) {
                // Basic email validation
                const emailInputs = form.querySelectorAll('input[type="email"]');
                emailInputs.forEach(input => {
                    if (!isValidEmail(input.value)) {
                        e.preventDefault();
                        showError(input, 'Please enter a valid email address');
                    }
                });
                
                // Required field validation
                const requiredInputs = form.querySelectorAll('[required]');
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        e.preventDefault();
                        showError(input, 'This field is required');
                    }
                });
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => clearError(input));
        });
    });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show error message for input
 */
function showError(input, message) {
    clearError(input);
    input.classList.add('error');
    
    const errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    
    input.parentElement.appendChild(errorEl);
}

/**
 * Clear error message for input
 */
function clearError(input) {
    input.classList.remove('error');
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) errorEl.remove();
}

/**
 * Validate single input
 */
function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
        showError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
        showError(input, 'Please enter a valid email address');
        return false;
    }
    
    clearError(input);
    return true;
}

/**
 * Initialize page loader
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loader after animation
    setTimeout(() => {
        const loader = document.querySelector('.page-loader');
        if (loader) loader.remove();
    }, 500);
});

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Core initializations
    initMobileNav();
    initThemeToggle();
    initBackToTop();
    initChatWidget();
    initEnhancedNavigation();
    
    // Feature initializations
    if (document.getElementById('particles-js')) {
        initParticles();
    }
    
    if (document.getElementById('billing-toggle')) {
        initPricingToggle();
    }
    
    if (document.getElementById('calc-rooms')) {
        initRevenueCalculator();
    }
    
    // Professional features
    initCookieConsent();
    initFormValidation();
    initScrollAnimations();
    
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Monitor for dynamically added content
    const observer = new MutationObserver(() => {
        lucide.createIcons();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
