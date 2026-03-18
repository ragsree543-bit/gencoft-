document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       Custom Cursor Logic
       ========================================================================== */
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
    
    // Check if device supports hover
    const matchMedia = window.matchMedia("(any-hover: hover)");
    
    if (matchMedia.matches) {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move small cursor instantly
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        });
        
        // Smooth follow for the larger circle
        const updateFollower = () => {
            // Easing equation for smooth follow
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            cursorFollower.style.left = followerX + "px";
            cursorFollower.style.top = followerY + "px";
            
            requestAnimationFrame(updateFollower);
        };
        
        updateFollower();
        
        // Add hover effects on interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, .service-card");
        
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.classList.add("hovered");
                cursorFollower.classList.add("hovered");
            });
            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("hovered");
                cursorFollower.classList.remove("hovered");
            });
        });
    }

    /* ==========================================================================
       Header Scroll Effect
       ========================================================================== */
    const header = document.getElementById("header");
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.add("scrolled");
            header.classList.remove("scrolled"); // Fix so it defaults transparent, waits. 
            // Wait, I want it to be scrolled when > 50
            if(window.scrollY > 50) {
                 header.classList.add("scrolled");
            } else {
                 header.classList.remove("scrolled");
            }
        }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init

    /* ==========================================================================
       Intersection Observer for Animations
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // If it contains counters, start counter animation
                const counters = entry.target.querySelectorAll(".counter");
                if(counters.length > 0 && !entry.target.classList.contains("counted")) {
                     entry.target.classList.add("counted");
                     startCounters(counters);
                }
                
                // observer.unobserve(entry.target); // Uncomment to animate only once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach(el => animateOnScroll.observe(el));

    /* ==========================================================================
       Counter Animation
       ========================================================================== */
    function startCounters(counters) {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const duration = 2000; // ms
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            
            const increment = target > 100 ? Math.ceil(target / 50) : 1;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = current;
                }
            }, stepTime);
        });
    }

    /* ==========================================================================
       Mobile Menu Toggle (Simple placeholder logic)
       ========================================================================== */
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    
    mobileBtn.addEventListener("click", () => {
        const isHidden = getComputedStyle(navLinks).display === "none";
        
        if (isHidden) {
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "100%";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.background = "var(--bg-primary)";
            navLinks.style.padding = "2rem";
            navLinks.style.borderBottom = "1px solid var(--glass-border)";
            
            // Fix hamburger icon
            mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navLinks.style.display = "";
            navLinks.style.flexDirection = "";
            navLinks.style.position = "";
            // Restore icon
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                navLinks.style.display = "";
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
});
