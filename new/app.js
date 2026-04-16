/* =============================================
   HARI BAGAVATH PORTFOLIO - app.js
   ============================================= */

// ── Particle Background ──────────────────────
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const PARTICLE_COUNT = 60;
    const PRIMARY = '0, 240, 255';
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 0.5,
            a: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${PRIMARY}, ${p.a})`;
            ctx.fill();
        });

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    const alpha = (1 - dist / 140) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${PRIMARY}, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });
})();


// ── Typing Animation ─────────────────────────
(function initTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const phrases = [
        'Python Developer',
        'Ethical Hacking Enthusiast',
        'Database Designer',
        'B.Com (CA) Graduate'
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
        const phrase = phrases[pi];
        if (!deleting) {
            el.textContent = phrase.slice(0, ci + 1);
            ci++;
            if (ci === phrase.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
        } else {
            el.textContent = phrase.slice(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
        }
        setTimeout(type, deleting ? 55 : 90);
    }

    type();
})();


// ── Scroll Reveal ────────────────────────────
(function initReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


// ── Navbar scroll state ──────────────────────
(function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });
})();


// ── Mobile menu ──────────────────────────────
(function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
})();


// ── Smooth scroll for all anchor links ───────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 90,
            behavior: 'smooth'
        });
    });
});


// ── Contact Form ─────────────────────────────
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');
    if (!form || !btn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const original = btn.innerHTML;
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Message Sent!
            `;
            btn.style.background = '#22c55e';
            btn.style.boxShadow = '0 8px 30px rgba(34,197,94,0.4)';
            btn.style.opacity = '1';
            form.reset();

            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
            }, 3500);
        }, 1500);
    });
})();
