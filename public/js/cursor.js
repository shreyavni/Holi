// ============================================
// HoliAI — Custom Cursor Module
// ============================================

const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursorDot, { x: mouseX - 3, y: mouseY - 3, duration: 0.1 });
});

gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    gsap.set(cursor, { x: cursorX - 10, y: cursorY - 10 });
});

// Enlarge cursor on interactive elements
function initCursorHovers() {
    document.querySelectorAll('button, a, .template-card, .chip, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.8, duration: 0.3 }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
    });
}

// Re-init after dynamic content renders
window.initCursorHovers = initCursorHovers;
