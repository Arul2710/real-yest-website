document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }


    // 2. COUNTER ANIMATION (For Index/About Page)
    
    const achievementsSection = document.querySelector('.achievements-section') || document.querySelector('.stats-section');
    
    if (achievementsSection) {
        const counters = document.querySelectorAll('.counter, .stat-number');
        
        const runCounters = () => {
            counters.forEach(counter => {
                const targetText = counter.getAttribute('data-target') || counter.innerText;
                // Check if text has non-numeric chars (like 10K+)
                const target = parseInt(targetText.replace(/[^0-9]/g, '')); 
                
                if(!target) return; 

                const speed = 200; 
                const increment = target / speed;
                let count = 0;

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.ceil(count) + (targetText.includes('K') ? 'K' : '') + (targetText.includes('+') ? '+' : '');
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = targetText; 
                    }
                };
                updateCount();
            });
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(achievementsSection);
    }

    
    // 3. PROGRESS BAR ANIMATION (For Index Page)
document.addEventListener("DOMContentLoaded", function() {
    
    const qualitySection = document.querySelector('.quality-qsection');

    if (qualitySection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    const progressItems = entry.target.querySelectorAll('.progress-item');

                    // Loop start panrom
                    progressItems.forEach((item, index) => {
                        
                        const bar = item.querySelector('.progress-fill');
                        const percentageText = item.querySelector('.progress-percentage');
                        const targetWidth = bar.getAttribute('data-width');
                        const targetNumber = parseInt(targetWidth);
                        setTimeout(() => {
                            
                            // 1. Bar Animate
                            bar.style.width = targetWidth;

                            // 2. Number Counter Animate
                            animateCounter(percentageText, 0, targetNumber, 1000); // 1 sec speed

                        }, index * 600); 
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(qualitySection);
    }
});

// Counter Function
function animateCounter(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

    // {/* // ==========================================
    // // 4. CONTACT FORM SUBMISSION
    // // ========================================== */}

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 1500);
        });
    }

    // ==========================================
    // 5. BUTTON CLICKS (Placeholder)
    // ==========================================
    document.querySelectorAll('.property-btn, .hero-btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevent if it's inside an anchor tag
            if(this.closest('a')) return;
            
            alert('Listing details feature coming soon!');
        });
    });
});








