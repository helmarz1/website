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

    // 4. TYPEWRITER — NODE-WALKING FIX FOR CHROME MOBILE EM DASH RENDERING
    //
    // Root cause: extracting textContent strips the <span class="stable-dash"> wrappers.
    // Chrome mobile cannot render em dashes as glyphs inside Bodoni Moda italic,
    // so they go invisible. The fix: walk child nodes and build a typed queue that
    // preserves span elements wholesale — they are inserted as complete nodes,
    // while plain text nodes are typed character-by-character as before.
    function startTypewriter() {
        const typewriterTarget = document.querySelector('.anchor-text');
        if (!typewriterTarget || typewriterTarget.getAttribute('data-started')) return;

        typewriterTarget.setAttribute('data-started', 'true');

        // Build an ordered queue from child nodes:
        // - For a TEXT_NODE: split into individual character entries
        // - For an ELEMENT_NODE (e.g. <span class="stable-dash">): push as a whole node
        const queue = [];
        typewriterTarget.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const chars = node.textContent.split('');
                chars.forEach(ch => queue.push({ type: 'char', value: ch }));
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                queue.push({ type: 'node', value: node.cloneNode(true) });
            }
        });

        // Clear the container and make it visible
        typewriterTarget.innerHTML = '';
        typewriterTarget.style.opacity = '1';

        let i = 0;
        function type() {
            if (i >= queue.length) return;

            const item = queue[i];
            i++;

            if (item.type === 'node') {
                // Insert the entire span (stable-dash) — Inter font renders the dash correctly
                typewriterTarget.appendChild(item.value);
                // Dramatic pause after the em dash span
                setTimeout(type, 600);
            } else {
                const char = item.value;
                typewriterTarget.appendChild(document.createTextNode(char));

                let delay = Math.floor(Math.random() * 30) + 25;
                if (char === '.' ) delay = 600;
                if (char === ',') delay = 300;

                setTimeout(type, delay);
            }
        }
        type();
    }
});
