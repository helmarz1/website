/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 * Intelligent Navigation, Scroll Reveals, and Natural Typewriter Logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INTELLIGENT NAVIGATION (Active State Highlighter)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: "-10% 0px -70% 0px" 
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    // Highlights the current section link, dims others
                    link.style.opacity = link.getAttribute('href') === `#${id}` ? '1' : '0.5';
                    link.style.letterSpacing = link.getAttribute('href') === `#${id}` ? '0.45em' : '0.35em';
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // 2. REVEAL ENTRANCE LOGIC (Preserved)
    const revealObserverOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealObserverOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. REFINED NATURAL TYPEWRITER EFFECT
    const typewriterTarget = document.querySelector('.anchor-text');
    if (typewriterTarget) {
        const fullText = typewriterTarget.innerHTML;
        typewriterTarget.innerHTML = ''; 
        typewriterTarget.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < fullText.length) {
                let char = fullText.charAt(i);
                
                // Instantly render HTML tags (like <span>) to maintain structure
                if (char === '<') {
                    const tagEnd = fullText.indexOf('>', i) + 1;
                    typewriterTarget.innerHTML += fullText.substring(i, tagEnd);
                    i = tagEnd;
                    type(); 
                    return;
                }

                typewriterTarget.innerHTML += char;
                i++;

                // NATURAL CADENCE: Variable speed + Punctuation pauses
                let delay = Math.floor(Math.random() * 30) + 25; // Random speed between 25ms-55ms
                
                if (char === '.' || char === '—' || char === '–') {
                    delay = 600; // Deep pause for dashes and periods
                } else if (char === ',') {
                    delay = 300; // Brief pause for commas
                }

                setTimeout(type, delay);
            }
        }
        
        // Initial delay before typing begins
        setTimeout(type, 1200);
    }
});
