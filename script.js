document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add class after scrolling 50px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // --- Smooth scroll for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Tabbed Interface for Core Capabilities ---
    const tabs = document.querySelectorAll('.tab-item');
    const panes = document.querySelectorAll('.content-pane');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabTarget = tab.getAttribute('data-tab');
            tabs.forEach(item => item.classList.remove('active'));
            panes.forEach(pane => pane.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabTarget).classList.add('active');
        });
    });

    // --- Accordion Logic for Vision Section ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const currentlyActive = document.querySelector('.accordion-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                    currentlyActive.querySelector('.accordion-icon').textContent = '+';
                }
                item.classList.toggle('active');
                const icon = item.querySelector('.accordion-icon');
                icon.textContent = item.classList.contains('active') ? '–' : '+';
            });
        });
    }

    // --- Interactive Chat Section Logic ---
    const chatSlider = document.querySelector('.chat-slider');
    if (chatSlider) {
        const slides = document.querySelectorAll('.chat-slide');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        let currentIndex = 0;
        const totalSlides = slides.length;

        const conversations = [
            { user: "Based on my Dataset, which day is the most profitable and what is the margin?", ai: "Wednesday has the highest profit with a margin of +12%." },
            { user: "My sales data has a lot of missing 'Region' values. How can I fix this?", ai: "You can use our Smart-Impute feature. It uses machine learning to predict and fill in the missing values with high accuracy." },
            { user: "Can you write me a SQL query to find the top 5 customers by total sales in Q4 2024?", ai: "Of course. Here is the SQL query: SELECT customer_id, SUM(sales) AS total_sales FROM sales WHERE sale_date BETWEEN '2024-10-01' AND '2024-12-31' GROUP BY customer_id ORDER BY total_sales DESC LIMIT 5;" }
        ];

        const typeText = (element, text, onComplete) => {
            element.textContent = '';
            element.classList.remove('done');
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    element.classList.add('done');
                    if(onComplete) onComplete();
                }
            }, 30);
        };

        const playConversation = async (slide, conversation) => {
            const userMsg = slide.querySelector('.user-message'), aiMsg = slide.querySelector('.ai-message');
            const userTextEl = userMsg.querySelector('.typing-text'), aiTextEl = aiMsg.querySelector('.typing-text');
            const thinkingIndicator = aiMsg.querySelector('.thinking-indicator');
            
            [userMsg, aiMsg].forEach(el => el.classList.remove('visible'));
            [userTextEl, aiTextEl].forEach(el => { el.textContent = ''; el.style.display = 'none'; });
            thinkingIndicator.style.display = 'none';

            await new Promise(res => setTimeout(res, 300));
            userMsg.classList.add('visible');
            userTextEl.style.display = 'block';
            await new Promise(res => typeText(userTextEl, conversation.user, res));
            await new Promise(res => setTimeout(res, 500));

            aiMsg.classList.add('visible');
            thinkingIndicator.style.display = 'block';
            await new Promise(res => setTimeout(res, 1500));
            thinkingIndicator.style.display = 'none';
            aiTextEl.style.display = 'block';
            await new Promise(res => typeText(aiTextEl, conversation.ai, res));
        };

        const goToSlide = (index) => {
            chatSlider.style.transform = `translateX(-${index * 100}%)`;
            playConversation(slides[index], conversations[index]);
        };

        nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % totalSlides; goToSlide(currentIndex); });
        prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; goToSlide(currentIndex); });
        
        goToSlide(0);
    }

    // --- Particle.js Background Logic ---
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 }},
                "color": {
                    "value": "#674ea7" // CHANGED from "#cccccc"
                },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8E7CC3", // CHANGED from "#e0e0e0"
                    "opacity": 0.4,
                    "width": 1
                },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }},
            "retina_detect": true
        });
    }

    // --- Navbar Scroll Effect & Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.anim-fade-up'); // Use a general class for all animations

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Re-organize Observer to handle all animated elements ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('start-animation'); // Use a generic trigger class
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, {
        threshold: 0.2 // Start animation when 20% visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});