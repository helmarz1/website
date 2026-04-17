/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 * Handles Reveal Animations, Intelligent Navigation, and Typewriter Effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INTELLIGENT NAVIGATION (Active State)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const navObserverOptions = {
        threshold: 0.3, // Highlights when 30% of the section is visible
        rootMargin: "-10% 0px -70% 0px" 
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
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

    // 3. EXECUTIVE TYPEWRITER EFFECT
    const typewriterTarget = document.querySelector('.anchor-text');
    if (typewriterTarget) {
        const fullText = typewriterTarget.innerHTML;
        typewriterTarget.innerHTML = ''; // Clear for effect
        typewriterTarget.style.opacity = '1';
        
        let i = 0;
        // Use a faster interval for a professional "teletype" feel
        function type() {
            if (i < fullText.length) {
                // Check if we're hitting an HTML tag (like <span>) to render it instantly
                if (fullText.charAt(i) === '<') {
                    const tagEnd = fullText.indexOf('>', i) + 1;
                    typewriterTarget.innerHTML += fullText.substring(i, tagEnd);
                    i = tagEnd;
                } else {
                    typewriterTarget.innerHTML += fullText.charAt(i);
                    i++;
                }
                setTimeout(type, 15); 
            }
        }
        
        // Start typing after a brief delay for page load
        setTimeout(type, 1000);
    }
});
