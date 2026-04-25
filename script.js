/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 * Updated with Luminous Orbital Flow
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INITIALIZATION
    if (document.fonts) {
        document.fonts.ready.then(() => {
            const monogram = document.querySelector('.ghost-monogram');
            if (monogram) monogram.style.opacity = '0.025';
            startTypewriter();
            initLuxuryFlow(); // UPDATED
        });
    } else {
        setTimeout(() => {
            startTypewriter();
            initLuxuryFlow();
        }, 1200);
    }

    // 2. INTELLIGENT NAVIGATION
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

    // 3. REVEAL ENTRANCE LOGIC
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. TYPEWRITER
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

    // 5. LUMINOUS ORBITAL FLOW (ELEVATED BACKGROUND)
    function initLuxuryFlow() {
        const canvas = document.getElementById('luxuryCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let orbs = [];
        const orbCount = 7; // Low count for cleaner aesthetic

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class LightOrb {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Barely perceptible movement
                this.vx = (Math.random() - 0.5) * 0.25;
                this.vy = (Math.random() - 0.5) * 0.25;
                this.radius = Math.random() * 350 + 250;
                // Using #7a8c84 base with ultra-low opacity
                this.color = {
                    r: 122, g: 140, b: 132,
                    a: Math.random() * 0.12 + 0.05
                };
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Seamless looping
                if (this.x < -this.radius) this.x = canvas.width + this.radius;
                if (this.x > canvas.width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = canvas.height + this.radius;
                if (this.y > canvas.height + this.radius) this.y = -this.radius;
            }

            draw() {
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0, 
                    this.x, this.y, this.radius
                );
                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`);
                gradient.addColorStop(1, 'rgba(6, 20, 16, 0)');

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createOrbs() {
            orbs = [];
            for (let i = 0; i < orbCount; i++) {
                orbs.push(new LightOrb());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Screen blend mode adds a "light bleed" luxury effect
            ctx.globalCompositeOperation = 'screen';
            orbs.forEach(orb => {
                orb.update();
                orb.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            createOrbs();
        });

        resize();
        createOrbs();
        animate();
    }
});
