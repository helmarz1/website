/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 * Intelligent Navigation, Scroll Reveals, and Natural Typewriter Logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INTELLIGENT NAVIGATION (Fixed Active State Logic)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Adjusted rootMargin to ensure the highlight triggers exactly when the section title is near the top
    const navObserverOptions = {
        threshold: 0,
        rootMargin: "-20% 0px -75% 0px" 
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const isCurrent = link.getAttribute('href') === `#${id}`;
                    link.style.opacity = isCurrent ? '1' : '0.5';
                    link.style.letterSpacing = isCurrent ? '0.45em' : '0.35em';
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

    // 3. REFINED NATURAL TYPEWRITER EFFECT (Preserved)
    const typewriterTarget = document.querySelector('.anchor-text');
    if (typewriterTarget) {
        const fullText = typewriterTarget.innerHTML;
        typewriterTarget.innerHTML = ''; 
        typewriterTarget.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < fullText.length) {
                let char = fullText.charAt(i);
                
                if (char === '<') {
                    const tagEnd = fullText.indexOf('>', i) + 1;
                    typewriterTarget.innerHTML += fullText.substring(i, tagEnd);
                    i = tagEnd;
                    type(); 
                    return;
                }

                typewriterTarget.innerHTML += char;
                i++;

                let delay = Math.floor(Math.random() * 30) + 25; 
                
                if (char === '.' || char === '—' || char === '–') {
                    delay = 600; 
                } else if (char === ',') {
                    delay = 300; 
                }

                setTimeout(type, delay);
            }
        }
        setTimeout(type, 1200);
    }
});
