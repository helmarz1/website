/**
 * HELEN MARZEC — STRATEGIC INTERACTION SCRIPT
 * Updated with Neural Connection Proximity Background
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INITIALIZATION
    if (document.fonts) {
        document.fonts.ready.then(() => {
            const monogram = document.querySelector('.ghost-monogram');
            if (monogram) monogram.style.opacity = '0.025';
            startTypewriter();
            initNeuralCircuitry(); // The new background logic
        });
    } else {
        setTimeout(() => {
            startTypewriter();
            initNeuralCircuitry();
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

    // 4. TYPEWRITER (PRESERVED)
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

    // 5. NEURAL CIRCUITRY (ELEVATED PROXIMITY BACKGROUND)
    function initNeuralCircuitry() {
        const canvas = document.getElementById('neuralCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = window.innerWidth < 768 ? 40 : 100;
        const maxDistance = 150; // Distance at which lines appear

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(244, 241, 238, 0.5)';
                ctx.fill();
            }
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(122, 140, 132, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        resize();
        createParticles();
        animate();
    }
});
