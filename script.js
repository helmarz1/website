/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FONT LOADING SHIELD (Preserved)
    if (document.fonts) {
        document.fonts.ready.then(() => {
            const monogram = document.querySelector('.ghost-monogram');
            if (monogram) monogram.style.opacity = '0.025';
            startTypewriter();
        });
    } else {
        setTimeout(startTypewriter, 1200);
    }

    // 2. INTELLIGENT NAVIGATION (Preserved)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], footer[id]');

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

    // 3. REVEAL ENTRANCE LOGIC (Preserved)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. NATURAL TYPEWRITER LOGIC (CHROME MOBILE STABILITY FIX)
    function startTypewriter() {
        const typewriterTarget = document.querySelector('.anchor-text');
        if (!typewriterTarget || typewriterTarget.getAttribute('data-started')) return;
        
        typewriterTarget.setAttribute('data-started', 'true');
        
        // Step 1: Get the text content correctly
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = typewriterTarget.innerHTML;
        const fullText = tempDiv.textContent || tempDiv.innerText;

        // Step 2: Clear and prepare
        typewriterTarget.innerHTML = ''; 
        typewriterTarget.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < fullText.length) {
                let char = fullText.charAt(i);
                
                // CRITICAL FIX FOR CHROME MOBILE:
                // If it's a dash, we use an inline-block span to ensure Chrome "sees" it.
                if (char === '—' || char === '–') {
                    typewriterTarget.insertAdjacentHTML('beforeend', `<span style="display:inline-block; width:auto; min-width:0.7em; visibility:visible !important; opacity:1 !important;">${char}</span>`);
                } else {
                    typewriterTarget.innerHTML += char;
                }
                
                i++;

                let delay = Math.floor(Math.random() * 30) + 25; 
                
                if (char === '—' || char === '–' || char === '-') {
                    delay = 600; 
                } else if (char === '.') {
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
