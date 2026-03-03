// ============================================
// HoliAI — Background Canvas Orbs Module
// ============================================

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const orbs = Array.from({ length: 8 }, (_, i) => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 150 + Math.random() * 200,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    color: ['#FF3CAC', '#784BA0', '#2B86C5', '#FF6B35', '#FFD700', '#00C851', '#FF3CAC', '#FF6B35'][i],
    alpha: 0.06 + Math.random() * 0.08,
}));

function drawOrbs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, o.color + 'CC');
        g.addColorStop(1, o.color + '00');
        ctx.fillStyle = g;
        ctx.globalAlpha = o.alpha;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawOrbs);
}

drawOrbs();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
