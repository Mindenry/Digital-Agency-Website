// Main JavaScript for Nexus Digital Agency Website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initThemeSwitcher();
    initHeroAnimation();
    initScrollAnimations();
    initCounters();
    initPortfolioFilters();
    initTestimonialSlider();
    initContactForm();
    initBarbaTransitions();
    initAdvancedCursor();
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hero animations
    const heroTitle = document.querySelector('.hero-title');
    const animateTextElements = document.querySelectorAll('.animate-text');
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    const fadeInElements = document.querySelectorAll('.animate-fade-in');
    
    // Trigger animations after a short delay
    setTimeout(() => {
      // Animate text elements
      animateTextElements.forEach(element => {
        element.classList.add('is-animated');
      });
      
      // Fade up elements
      fadeUpElements.forEach(element => {
        element.classList.add('is-animated');
      });
      
      // Fade in elements
      fadeInElements.forEach(element => {
        element.classList.add('is-animated');
      });
      
      // Add class to trigger highlight animation
      if (heroTitle) {
        heroTitle.classList.add('animate-in');
      }
    }, 300);
    
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    const buttons = document.querySelectorAll('.btn');
    
    if (cursor) {
      // Show cursor when mouse moves
      document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
      
      // Hide cursor when it leaves the window
      document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
      });
      
      // Button hover effects
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          cursor.style.width = '50px';
          cursor.style.height = '50px';
          cursor.style.mixBlendMode = 'normal';
          cursor.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
          cursor.style.width = '30px';
          cursor.style.height = '30px';
          cursor.style.mixBlendMode = 'difference';
          cursor.style.backgroundColor = 'transparent';
        });
      });
    }
    
    // Parallax effect for shapes
    const shapes = document.querySelectorAll('.hero-shape');
    
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      shapes.forEach(shape => {
        const speed = shape.getAttribute('data-speed');
        
        // Calculate translation values based on mouse position and speed
        const translateX = (x - 0.5) * 100 * speed;
        const translateY = (y - 0.5) * 100 * speed;
        
        // Apply transform with existing animation
        shape.style.transform = `translate(${translateX}px, ${translateY}px) translateY(var(--float-y, 0)) rotate(var(--float-r, 0deg))`;
      });
    });
    
    // Scroll indicator interaction
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      });
      
      scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      });
    }
  });

// Advanced Custom Cursor with Trail, Magnetic Effect and Custom Behaviors
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedCursor();
  });
  
  function initAdvancedCursor() {
    // Check if it's a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return; // Exit early for touch devices
    }
  
    // Create cursor elements if they don't exist
    if (!document.querySelector('.cursor-system')) {
      const cursorSystem = document.createElement('div');
      cursorSystem.className = 'cursor-system';
  
      const cursorDot = document.createElement('div');
      cursorDot.className = 'cursor-dot';
  
      const cursorOutline = document.createElement('div');
      cursorOutline.className = 'cursor-outline';
  
      cursorSystem.appendChild(cursorDot);
      cursorSystem.appendChild(cursorOutline);
      document.body.appendChild(cursorSystem);
  
      // Create trail container
      const trailContainer = document.createElement('div');
      trailContainer.className = 'cursor-trail-container';
      document.body.appendChild(trailContainer);
  
      // Create trail dots
      const trailLength = getComputedStyle(document.documentElement)
        .getPropertyValue('--cursor-trail-length')
        .trim();
      
      for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trailContainer.appendChild(trail);
      }
    }
  
    // Cache elements
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const trailDots = document.querySelectorAll('.cursor-trail');
  
    // Cache DOM queries for performance
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let dotX = 0;
    let dotY = 0;
    
    let requestAnimationFrameId = null;
    
    // Explicitly make sure all elements have cursor: none
    forceNoCursorOnAll();
    
    // Trails position history
    const trailPositions = Array(trailDots.length).fill().map(() => ({ x: 0, y: 0 }));
    
    // Track cursor position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Custom behaviors based on element type
    setupCustomBehaviors();
    
    // Handle cursor when leaving/entering window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
      trailDots.forEach(dot => {
        dot.style.opacity = '0';
      });
    });
    
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });
    
    // Main animation loop
    function animateCursor() {
      // Smooth lerp for main cursor
      const dotEasing = 0.2;
      const outlineEasing = 0.15;
      
      dotX = lerp(dotX, mouseX, dotEasing);
      dotY = lerp(dotY, mouseY, dotEasing);
      
      outlineX = lerp(outlineX, mouseX, outlineEasing);
      outlineY = lerp(outlineY, mouseY, outlineEasing);
      
      // Apply transforms
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      
      // Update trail positions
      for (let i = 0; i < trailDots.length; i++) {
        // Delay each trail dot
        const delay = 0.05 * (i + 1);
        
        // Get the previous position (or current mouse position for the first dot)
        const prevPosition = i === 0 ? { x: dotX, y: dotY } : trailPositions[i - 1];
        
        // Interpolate to previous position
        trailPositions[i].x = lerp(trailPositions[i].x, prevPosition.x, delay);
        trailPositions[i].y = lerp(trailPositions[i].y, prevPosition.y, delay);
        
        // Apply the position
        trailDots[i].style.transform = `translate(${trailPositions[i].x}px, ${trailPositions[i].y}px)`;
        
        // Set opacity based on distance
        const distance = Math.sqrt(
          Math.pow(trailPositions[i].x - dotX, 2) + 
          Math.pow(trailPositions[i].y - dotY, 2)
        );
        
        const opacity = Math.max(0, 1 - (distance / 200));
        trailDots[i].style.opacity = opacity;
      }
      
      // Loop animation
      requestAnimationFrameId = requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Linear interpolation helper
    function lerp(start, end, amount) {
      return (1 - amount) * start + amount * end;
    }
    
    // Force no cursor on all elements
    function forceNoCursorOnAll() {
      // Get all elements in the document
      const allElements = document.querySelectorAll('*');
      
      // Add a style tag to ensure cursor: none is applied broadly
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px), (pointer: coarse) {
          * {
            cursor: auto;
          }
          a, button, input[type="submit"], input[type="button"], select {
            cursor: pointer;
          }
          input, textarea {
            cursor: text;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
    
    // Setup element-specific behaviors
    function setupCustomBehaviors() {
      // Interactive elements (links, buttons)
      const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, input, textarea');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.classList.add('cursor-active');
          cursorOutline.classList.add('cursor-active');
        });
        
        el.addEventListener('mouseleave', () => {
          cursorDot.classList.remove('cursor-active');
          cursorOutline.classList.remove('cursor-active');
        });
      });
      
      // Text elements
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span:not(.icon), blockquote');
      textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.classList.add('cursor-text');
          cursorOutline.classList.add('cursor-text');
        });
        
        el.addEventListener('mouseleave', () => {
          cursorDot.classList.remove('cursor-text');
          cursorOutline.classList.remove('cursor-text');
        });
      });
      
      // Images and portfolio items
      const imageElements = document.querySelectorAll('img, .portfolio-image, .case-study-image, .gallery-item');
      imageElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.classList.add('cursor-magnify');
          cursorOutline.classList.add('cursor-magnify');
        });
        
        el.addEventListener('mouseleave', () => {
          cursorDot.classList.remove('cursor-magnify');
          cursorOutline.classList.remove('cursor-magnify');
        });
      });
      
      // Buttons
      const buttonElements = document.querySelectorAll('button, .button, .cta');
      buttonElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.classList.add('cursor-button');
          cursorOutline.classList.add('cursor-button');
        });
        
        el.addEventListener('mouseleave', () => {
          cursorDot.classList.remove('cursor-button');
          cursorOutline.classList.remove('cursor-button');
        });
      });
      
      // Draggable elements
      const draggableElements = document.querySelectorAll('[draggable], .draggable, .slider');
      draggableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.classList.add('cursor-drag');
          cursorOutline.classList.add('cursor-drag');
        });
        
        el.addEventListener('mouseleave', () => {
          cursorDot.classList.remove('cursor-drag');
          cursorOutline.classList.remove('cursor-drag');
        });
      });
      
      // Add magnetic effect to buttons and CTAs
      const magneticElements = document.querySelectorAll('.magnetic, .cta, .hero-button, .main-cta');
      magneticElements.forEach(el => {
        el.addEventListener('mousemove', e => {
          // Get element dimensions and position
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Calculate distance from mouse to center
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;
          
          // Calculate magnetic pull (stronger when closer to center)
          const magnetStrength = 0.3;
          const magneticPullX = distanceX * magnetStrength;
          const magneticPullY = distanceY * magnetStrength;
          
          // Apply magnetic effect to element
          el.style.transform = `translate(${magneticPullX}px, ${magneticPullY}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
          // Reset position when mouse leaves
          el.style.transform = '';
        });
      });
    }
    
    // Check for dark mode to update cursor colors
    function checkDarkMode() {
      // Check if dark mode is active via class, data attribute or media query
      const isDarkMode = document.body.classList.contains('dark-mode') || 
                        document.body.dataset.theme === 'dark' ||
                        window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
    
    // Initialize dark mode check
    checkDarkMode();
    
    // Listen for theme changes
    const darkModeToggle = document.querySelector('.theme-toggle, #dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', checkDarkMode);
    }
    
    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode);
    
    // Monitor for dynamically added elements
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          setupCustomBehaviors();
          forceNoCursorOnAll();
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Cleanup function
    return function cleanupCursor() {
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
      document.body.style.cursor = '';
      observer.disconnect();
    };
  }

// Theme Switcher
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}


// Hero Section Animation
function initHeroAnimation() {
    // Split text animation
    const heroTitle = document.querySelector('.hero-title.split-text');
    
    if (heroTitle) {
        // Create a timeline for sequenced animations
        const tl = gsap.timeline();
        
        // Animate each span in the hero title
        tl.from(heroTitle.querySelectorAll('span'), {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
        
        // Animate hero subtitle
        tl.from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
        
        // Animate CTA buttons
        tl.from('.hero-cta .btn', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.2");
        
        // Animate hero shapes
        tl.from('.hero-shape', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.5");
        
        // Animate scroll indicator
        tl.from('.scroll-indicator', {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.3");
        
        // Add a loop animation to the scroll indicator
        gsap.to('.scroll-line', {
            y: 10,
            opacity: 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".testimonial-slide"); // เลือกทุกสไลด์
    const dots = document.querySelectorAll(".dot"); // เลือก dots
    let currentIndex = 0; // เริ่มที่สไลด์แรก

    // ฟังก์ชันในการแสดงสไลด์
    function showSlide(index) {
        // ซ่อนทุกสไลด์
        slides.forEach((slide) => {
            slide.classList.remove("active");  // ลบคลาส .active จากทุกสไลด์
        });

        // แสดงสไลด์ที่เลือก
        slides[index].classList.add("active");  // เพิ่มคลาส .active ให้กับสไลด์ที่เลือก

        // อัปเดต dots
        dots.forEach((dot) => {
            dot.classList.remove("active");  // ลบคลาส .active จากทุก dot
        });

        // แสดง dot ที่ตรงกับสไลด์ที่เลือก
        dots[index].classList.add("active");  // เพิ่ม .active ให้กับ dot ที่ตรงกับสไลด์ที่เลือก
    }

    // คลิกปุ่ม "Next"
    document.querySelector(".testimonial-next").addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % slides.length;  // ไปยังสไลด์ถัดไป
        showSlide(currentIndex);
    });

    // คลิกปุ่ม "Previous"
    document.querySelector(".testimonial-prev").addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;  // กลับไปยังสไลด์ก่อนหน้า
        showSlide(currentIndex);
    });

    // คลิก dot เพื่อไปยังสไลด์ที่เลือก
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // เริ่มต้นการแสดงสไลด์แรก
    showSlide(currentIndex);
});


// Scroll Animations
// Scroll Animations
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section headers on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate about image
    gsap.from('.about-image', {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-image',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Animate service cards
    gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.services-grid',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Animate portfolio items
    gsap.from('.portfolio-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // **Remove GSAP animation for testimonial-slide** 
    // Don't animate the slides with GSAP, just use CSS to control visibility
    // gsap.from('.testimonial-slide', {
    //     scale: 0.9,
    //     opacity: 0,
    //     duration: 0.8,
    //     stagger: 0.2,
    //     scrollTrigger: {
    //         trigger: '.testimonial-slider',
    //         start: "top 80%",
    //         toggleActions: "play none none none"
    //     }
    // });

    // Animate contact items
    gsap.from('.contact-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.contact-content',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Animate contact form
    gsap.from('.contact-form-container', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-form-container',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Parallax effect for hero section
    gsap.to('.hero-visual', {
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}


// Counters Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / duration * 10; // Update every 10ms
        
        let current = 0;
        
        // Create ScrollTrigger for each counter
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                const timer = setInterval(() => {
                    current += step;
                    counter.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 10);
            },
            once: true
        });
    });
}

// Portfolio Filters
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter portfolio items
            if (filter === 'all') {
                // Show all items
                portfolioItems.forEach(item => {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            } else {
                // Filter items
                portfolioItems.forEach(item => {
                    if (item.getAttribute('data-category') === filter) {
                        gsap.to(item, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(item, {
                            scale: 0.9,
                            opacity: 0.3,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            }
        });
    });
}

function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    let activeIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    showSlide(activeIndex);

    document.querySelector('.testimonial-next').addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % slides.length;
        showSlide(activeIndex);
    });

    document.querySelector('.testimonial-prev').addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        showSlide(activeIndex);
    });
}


// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (!slider || slides.length === 0) return;
    
    let currentIndex = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Initialize
    updateSlider();
    
    // Event listeners
    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);
    
    // Auto play
    let autoPlayTimer = setInterval(goToNextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayTimer);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoPlayTimer = setInterval(goToNextSlide, 5000);
    });
    
    // Functions
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        // Hide all slides
        slides.forEach(slide => {
            gsap.to(slide, {
                opacity: 0,
                x: 100,
                duration: 0.5,
                ease: "power2.inOut"
            });
        });
        
        // Show current slide
        gsap.to(slides[currentIndex], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.inOut"
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Here you would typically send the data to your server
                // For demo purposes, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success-message');
                successMessage.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3>Message Sent Successfully!</h3>
                    <p>We'll get back to you as soon as possible.</p>
                `;
                
                // Replace form with success message
                form.style.height = `${form.offsetHeight}px`;
                form.innerHTML = '';
                form.appendChild(successMessage);
                
                // Animate success message
                gsap.from(successMessage, {
                    y: 30,
                    opacity: 0,
                    duration: 0.5
                });
                
                // Reset form height after animation
                setTimeout(() => {
                    form.style.height = 'auto';
                }, 500);
            }
        });
        
        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.id === 'email' && field.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        field.classList.add('error');
                    }
                }
            });
            
            field.addEventListener('focus', () => {
                field.classList.remove('error');
            });
        });
    }
}

// Barba.js Page Transitions
function initBarbaTransitions() {
    // Only initialize if Barba is loaded
    if (typeof barba !== 'undefined') {
        // Initialize Barba with default transitions
        barba.init({
            transitions: [{
                name: 'opacity-transition',
                leave(data) {
                    // ปรับให้ไม่ทำ opacity transition กับ testimonial
                    if (!data.current.container.querySelector('.testimonial-slider')) {
                        return gsap.to(data.current.container, {
                            opacity: 0,
                            duration: 0.5
                        });
                    }
                },
                enter(data) {
                    // ทำ transition เฉพาะที่ container ที่มี testimonial-slider
                    if (!data.next.container.querySelector('.testimonial-slider')) {
                        return gsap.from(data.next.container, {
                            opacity: 0,
                            duration: 0.5
                        });
                    }
                }
            }]
        });

        // Hook ที่จะทำการ reinitialize ทุกครั้งที่หน้าใหม่โหลด
        barba.hooks.after(() => {
            // Reinitialize components for new page
            initScrollAnimations();
            initCounters();
            initPortfolioFilters();
            initTestimonialSlider();  // Reinitialize testimonial slider
            initContactForm();
        });
    }
}



// Helper function for smooth scrolling
// This requires the ScrollToPlugin for GSAP
// If you haven't included it, you should add:
// <script src="https://unpkg.com/gsap@3.9.1/dist/ScrollToPlugin.min.js"></script>
if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
}

