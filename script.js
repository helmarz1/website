/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FONT LOADING SHIELD (Fixes the Cursive Flicker)
    if (document.fonts) {
        document.fonts.ready.then(() => {
            // Once fonts are loaded, show the monogram and start the experience
            const monogram = document.querySelector('.ghost-monogram');
            if (monogram) monogram.style.opacity = '0.025';
            startTypewriter();
        });
    } else {
        // Fallback for older browsers
        setTimeout(startTypewriter, 1200);
    }

    // 2. INTELLIGENT NAVIGATION (Active State)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], footer[id]'); // Added footer[id]

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

    // 3. REVEAL ENTRANCE LOGIC
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. NATURAL TYPEWRITER LOGIC
    function startTypewriter() {
        const typewriterTarget = document.querySelector('.anchor-text');
        if (!typewriterTarget || typewriterTarget.getAttribute('data-started')) return;
        
        typewriterTarget.setAttribute('data-started', 'true');
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
        type();
    }
});
