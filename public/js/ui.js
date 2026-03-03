// ============================================
// HoliAI — UI Utilities Module
// ============================================

// ========================
// TOAST NOTIFICATIONS
// ========================
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

// ========================
// SCROLL
// ========================
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ========================
// COLOR PARTICLES
// ========================
function spawnColorParticles() {
    const colors = ['#FF3CAC', '#FFD700', '#00C851', '#2B86C5', '#FF6B35', '#784BA0', '#fff'];
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'color-particle';
        p.style.cssText = `
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;
      top:${Math.random() * 50}%;
      animation-delay:${Math.random() * 0.5}s;
      width:${6 + Math.random() * 12}px;
      height:${6 + Math.random() * 12}px;
    `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 3500);
    }
}

// ========================
// MODAL
// ========================
function openModal() {
    const fp = document.getElementById('final-preview');
    const mp = document.getElementById('modal-preview');
    mp.style.background = fp.style.background;
    mp.innerHTML = fp.innerHTML;
    document.getElementById('modal').classList.add('open');
}

function closeModal() {
    document.getElementById('modal').classList.remove('open');
}

// Close modal on backdrop click
(function initModalBackdrop() {
    const modalEl = document.getElementById('modal');
    if (modalEl) {
        modalEl.addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            const m = document.getElementById('modal');
            if (m) m.addEventListener('click', function (e) {
                if (e.target === this) closeModal();
            });
        });
    }
})();

// ========================
// DOWNLOAD & SHARE
// ========================
function downloadGreeting() {
    // Use html2canvas approach for better download
    const fp = document.getElementById('final-preview');
    const canvas = document.createElement('canvas');
    canvas.width = 680;
    canvas.height = 560;
    const ctx = canvas.getContext('2d');

    // Draw background color
    ctx.fillStyle = fp.style.background || '#1a0030';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get text content
    const h2 = fp.querySelector('h2');
    const p = fp.querySelector('p');

    if (h2) {
        ctx.textAlign = 'center';
        ctx.font = 'bold 36px "Playfair Display", serif';
        ctx.fillStyle = h2.style.color || '#fff';
        ctx.fillText(h2.textContent, canvas.width / 2, canvas.height / 2 - 20);
    }
    if (p) {
        ctx.font = '18px "Poppins", sans-serif';
        ctx.fillStyle = p.style.color || 'rgba(255,255,255,0.8)';
        ctx.fillText(p.textContent, canvas.width / 2, canvas.height / 2 + 30);
    }

    // Trigger download
    const link = document.createElement('a');
    link.download = 'holi-greeting.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast('📥 Greeting downloaded!');
}

function shareGreeting() {
    if (navigator.share) {
        navigator.share({
            title: 'Happy Holi!',
            text: 'Check out my Holi greeting made with HoliAI!',
            url: window.location.href,
        });
    } else {
        navigator.clipboard?.writeText(window.location.href);
        showToast('🔗 Link copied to clipboard!');
    }
}

// ========================
// AI STATUS CHECK
// ========================
async function checkAIStatus() {
    try {
        const res = await fetch('/api/health');
        const data = await res.json();
        const badge = document.getElementById('ai-status');
        if (data.aiEnabled) {
            badge.classList.remove('disconnected');
            badge.innerHTML = '<span class="dot"></span> AI Ready';
        } else {
            badge.classList.add('disconnected');
            badge.innerHTML = '<span class="dot"></span> AI Offline';
        }
    } catch {
        const badge = document.getElementById('ai-status');
        if (badge) {
            badge.classList.add('disconnected');
            badge.innerHTML = '<span class="dot"></span> Offline';
        }
    }
}

// Expose globally
window.showToast = showToast;
window.scrollToSection = scrollToSection;
window.spawnColorParticles = spawnColorParticles;
window.openModal = openModal;
window.closeModal = closeModal;
window.downloadGreeting = downloadGreeting;
window.shareGreeting = shareGreeting;
window.checkAIStatus = checkAIStatus;
