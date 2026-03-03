// ============================================
// HoliAI — GSAP Animations Module
// ============================================

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ========================
// HERO ENTRANCE
// ========================
const heroTimeline = gsap.timeline({ delay: 0.3 });
heroTimeline
    .from('#hero-badge', { y: 30, opacity: 0, duration: 0.6, ease: 'back.out(2)' })
    .from('#hero-line1', { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .from('#hero-line2', { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .from('#hero-sub', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .from('#hero-cta', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');

// ========================
// FLOATING LOGO
// ========================
gsap.to('.logo', {
    y: -3, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
});

// ========================
// SECTION SCROLL ANIMATIONS
// ========================
gsap.from('#tpl-label, #tpl-title', {
    scrollTrigger: { trigger: '#templates', start: 'top 75%' },
    y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
});

// ========================
// HERO SPLASHES
// ========================
function createHeroSplashes() {
    const container = document.getElementById('hero-splashes');
    const colors = ['#FF3CAC', '#FFD700', '#00C851', '#2B86C5', '#FF6B35', '#784BA0'];
    for (let i = 0; i < 15; i++) {
        const s = document.createElement('div');
        s.className = 'splash';
        const size = 20 + Math.random() * 60;
        s.style.cssText = `
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      opacity:${0.1 + Math.random() * 0.3};
      filter:blur(${Math.random() * 4}px);
    `;
        container.appendChild(s);
        gsap.to(s, {
            y: (Math.random() - 0.5) * 100,
            x: (Math.random() - 0.5) * 60,
            scale: 0.5 + Math.random(),
            duration: 3 + Math.random() * 4,
            repeat: -1, yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2,
        });
    }
}

createHeroSplashes();

// ========================
// NAV SCROLL EFFECT
// ========================
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.background = window.scrollY > 50
        ? 'rgba(10,0,18,0.95)'
        : 'rgba(10,0,18,0.6)';
});

// ========================
// PARALLAX ON HERO SPLASHES
// ========================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.splash').forEach((s, i) => {
        const speed = 0.1 + (i % 3) * 0.08;
        s.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
