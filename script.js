document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INITIALIZATION AFTER FONT LOADING
    if (document.fonts) {
        document.fonts.ready.then(() => {
            const monogram = document.querySelector('.ghost-monogram');
            if (monogram) monogram.style.opacity = '0.025';
            startTypewriter();
            initFlow();
        });
    } else {
        setTimeout(() => {
            startTypewriter();
            initFlow();
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

    // 4. TYPEWRITER — NODE-WALKING FIX FOR CHROME MOBILE EM DASH RENDERING
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
            const item = queue[i++];

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

    // 5. GAUSSIAN FLOW BACKGROUND ANIMATION
    function initFlow() {
        const canvas = document.getElementById('neuralCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Node {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 250 + 150;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < -200 || this.x > canvas.width + 200) this.vx *= -1;
                if (this.y < -200 || this.y > canvas.height + 200) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                let g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                g.addColorStop(0, 'rgba(244, 241, 238, 0.4)');
                g.addColorStop(1, 'rgba(6, 20, 16, 0)');
                ctx.fillStyle = g; ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        for(let i=0; i<20; i++) particles.push(new Node());
        animate();
    }
});
