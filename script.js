/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FONT LOADING & INITIALIZATION
    if (document.fonts) {
        document.fonts.ready.then(() => {
            const monogram = document.querySelector('.ghost-monogram');
            if (monogram) monogram.style.opacity = '0.025';
            startTypewriter();
            initAtmosphericFlow(); // Start background animation
        });
    } else {
        setTimeout(() => {
            startTypewriter();
            initAtmosphericFlow();
        }, 1200);
    }

    // 2. INTELLIGENT NAVIGATION (PRESERVED)
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

    // 3. REVEAL ENTRANCE LOGIC (PRESERVED)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. TYPEWRITER — NODE-WALKING LOGIC (PRESERVED)
    function startTypewriter() {
        const typewriterTarget = document.querySelector('.anchor-text');
        if (!typewriterTarget || typewriterTarget.getAttribute('data-started')) return;

        typewriterTarget.setAttribute('data-started', 'true');

        const queue = [];
        typewriterTarget.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const chars = node.textContent.split('');
                chars.forEach(ch => queue.push({ type: 'char', value: ch }));
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                queue.push({ type: 'node', value: node.cloneNode(true) });
            }
        });

        typewriterTarget.innerHTML = '';
        typewriterTarget.style.opacity = '1';

        let i = 0;
        function type() {
            if (i >= queue.length) return;

            const item = queue[i];
            i++;

            if (item.type === 'node') {
                typewriterTarget.appendChild(item.value);
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

    // 5. ATMOSPHERIC FLOW (NEW BACKGROUND SYSTEM)
    function initAtmosphericFlow() {
        const canvas = document.getElementById('neuralCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let nodes = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class AtmosphericNode {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 450 + 250; 
                this.vx = (Math.random() - 0.5) * 0.12;
                this.vy = (Math.random() - 0.5) * 0.12;
                this.color = Math.random() > 0.5 ? '244, 241, 238' : '122, 140, 132';
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < -300 || this.x > canvas.width + 300) this.vx *= -1;
                if (this.y < -300 || this.y > canvas.height + 300) this.vy *= -1;
            }
            draw() {
                const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                g.addColorStop(0, `rgba(${this.color}, 0.25)`);
                g.addColorStop(0.6, `rgba(${this.color}, 0.04)`);
                g.addColorStop(1, `rgba(${this.color}, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach(n => { n.update(); n.draw(); });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        for(let i=0; i<8; i++) nodes.push(new AtmosphericNode());
        animate();
    }
});
