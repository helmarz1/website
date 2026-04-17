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

    // 4. NATURAL TYPEWRITER LOGIC (REVISED FOR EM DASH STABILITY)
    function startTypewriter() {
        const typewriterTarget = document.querySelector('.anchor-text');
        if (!typewriterTarget || typewriterTarget.getAttribute('data-started')) return;
        
        typewriterTarget.setAttribute('data-started', 'true');
        
        // Use a hidden temporary div to decode entities so we get the real "—" symbol
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = typewriterTarget.innerHTML;
        const fullText = tempDiv.textContent || tempDiv.innerText;

        typewriterTarget.innerHTML = ''; 
        typewriterTarget.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < fullText.length) {
                let char = fullText.charAt(i);
                
                // If it's an em dash or similar long dash, type it and skip the delay
                typewriterTarget.innerHTML += char;
                i++;

                let delay = Math.floor(Math.random() * 30) + 25; 
                
                // Em Dash (—) or En Dash (–) Check
                if (char === '—' || char === '–' || char === '-') {
                    delay = 600; // Keep the dramatic pause, but the symbol is already in
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
