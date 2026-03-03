// ============================================
// HoliAI — Templates Data & Rendering Module
// ============================================

// ========================
// TEMPLATE DATA
// ========================
const templates = [
    {
        id: 'vibrant', name: 'Vibrant Holi', style: 'Vibrant · Colorful', category: 'vibrant',
        bgClass: 't-vibrant',
        title: '🎨 Happy Holi!',
        message: 'May your life be filled with the colors of joy!',
    },
    {
        id: 'dark-elegance', name: 'Dark Elegance', style: 'Dark · Luxurious', category: 'dark',
        bgClass: 't-dark',
        title: '✨ Happy Holi',
        message: 'Wishing you a colorful and blessed festival',
    },
    {
        id: 'pastel-dream', name: 'Pastel Dream', style: 'Soft · Pastel', category: 'minimal',
        bgClass: 't-pastel',
        title: '🌸 Happy Holi',
        message: 'Celebrating the festival of colors with you',
    },
    {
        id: 'cosmic-holi', name: 'Cosmic Holi', style: 'Cosmic · Mystical', category: 'special',
        bgClass: 't-cosmic',
        title: '🌌 Happy Holi',
        message: 'Let the universe shower you with colors',
    },
    {
        id: 'watercolor', name: 'Watercolor Splash', style: 'Artistic · Watercolor', category: 'vibrant',
        bgClass: 't-watercolor',
        title: '🎨 Happy Holi!',
        message: 'Colors of love, joy and togetherness',
    },
    {
        id: 'minimal-clean', name: 'Clean Minimal', style: 'Minimal · Modern', category: 'minimal',
        bgClass: 't-minimal',
        title: '🎉 Happy Holi',
        message: 'Spreading joy one color at a time',
    },
    {
        id: 'retro-holi', name: 'Retro Festival', style: 'Retro · Vintage', category: 'dark',
        bgClass: 't-retro',
        title: '★ HAPPY HOLI ★',
        message: 'A vintage celebration of colors',
    },
    {
        id: 'neon-glow', name: 'Neon Glow', style: 'Neon · Electric', category: 'special',
        bgClass: 't-neon',
        title: '⚡ HAPPY HOLI',
        message: 'Light up the festival with electric colors',
    },
];

let selectedTemplate = templates[0];

// ========================
// HELPER GENERATORS
// ========================
function createSplashBg(colors) {
    return colors.map((c, i) =>
        `<div style="position:absolute;width:${40 + i * 20}px;height:${40 + i * 20}px;background:${c};border-radius:50%;opacity:0.2;top:${10 + i * 15}%;left:${5 + i * 20}%;filter:blur(8px)"></div>`
    ).join('');
}

function createStarField() {
    return Array.from({ length: 20 }, () =>
        `<div style="position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;top:${Math.random() * 100}%;left:${Math.random() * 100}%;opacity:${0.3 + Math.random() * 0.7}"></div>`
    ).join('');
}

function createWatercolorBlobs() {
    const colors = ['rgba(255,215,0,0.3)', 'rgba(0,200,81,0.3)', 'rgba(255,60,172,0.3)'];
    return colors.map((c, i) =>
        `<div style="position:absolute;width:120px;height:80px;background:${c};border-radius:60% 40% 70% 30%;top:${i * 30}%;left:${i * 25}%;filter:blur(15px)"></div>`
    ).join('');
}

// ========================
// STYLE HELPERS
// ========================
function getH2Style(cls) {
    const styles = {
        't-vibrant': "font-family:'Playfair Display',serif;font-size:1.6rem;color:#fff;text-shadow:2px 2px 8px rgba(0,0,0,0.4)",
        't-dark': "font-family:'Playfair Display',serif;font-size:1.5rem;background:linear-gradient(135deg,#FF3CAC,#FFD700);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text",
        't-pastel': "font-family:'Playfair Display',serif;font-size:1.5rem;color:#5c2a7a",
        't-cosmic': "font-family:'Playfair Display',serif;font-size:1.5rem;color:#fff;text-shadow:0 0 15px rgba(255,215,0,0.5)",
        't-watercolor': "font-family:'Playfair Display',serif;font-size:1.5rem;color:#fff;font-style:italic;text-shadow:2px 2px 10px rgba(0,0,0,0.3)",
        't-minimal': "font-family:'Playfair Display',serif;font-size:1.7rem;color:#1a0030",
        't-retro': "font-family:'Playfair Display',serif;font-size:1.5rem;color:#FFD700;letter-spacing:2px",
        't-neon': "font-family:'Poppins',sans-serif;font-size:1.4rem;color:#00C851;text-shadow:0 0 15px #00C851;font-weight:800",
    };
    return styles[cls] || "font-size:1.5rem;color:#fff";
}

function getPStyle(cls) {
    const styles = {
        't-vibrant': "color:rgba(255,255,255,0.9);font-size:0.8rem;margin-top:8px",
        't-dark': "color:rgba(255,255,255,0.7);font-size:0.8rem;margin-top:8px",
        't-pastel': "color:#7a4a8a;font-size:0.8rem;margin-top:8px",
        't-cosmic': "color:rgba(255,215,0,0.8);font-size:0.8rem;margin-top:8px",
        't-watercolor': "color:rgba(255,255,255,0.95);font-size:0.8rem;margin-top:8px",
        't-minimal': "color:#666;font-size:0.8rem;margin-top:8px",
        't-retro': "color:#FF6B35;font-size:0.8rem;margin-top:8px;font-weight:600",
        't-neon': "color:#FF3CAC;font-size:0.8rem;margin-top:8px;text-shadow:0 0 8px #FF3CAC",
    };
    return styles[cls] || "font-size:0.8rem;margin-top:8px;color:rgba(255,255,255,0.7)";
}

function getTemplateBg(cls) {
    const bgs = {
        't-vibrant': 'linear-gradient(135deg,#FF6B35,#FFD700,#FF3CAC)',
        't-dark': '#1a0030',
        't-pastel': 'linear-gradient(135deg,#FFB3C6,#FFDAB9,#B8F0D3)',
        't-cosmic': 'radial-gradient(ellipse,#0d0d2b,#1a0040)',
        't-watercolor': 'linear-gradient(135deg,rgba(255,107,53,0.8),rgba(120,75,160,0.8),rgba(43,134,197,0.8))',
        't-minimal': '#fff',
        't-retro': '#2d1b00',
        't-neon': '#000',
    };
    return bgs[cls] || '#1a0030';
}

// ========================
// RENDER TEMPLATES
// ========================
function renderTemplates(filter = 'all') {
    const grid = document.getElementById('templates-grid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? templates : templates.filter(t => t.category === filter);

    filtered.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.dataset.tplId = t.id;
        card.innerHTML = `
      <div class="template-canvas ${t.bgClass}" id="tcard-${t.id}">
        <div class="template-overlay">
          <button class="template-action use-btn" data-tpl="${t.id}">Use Template</button>
          <button class="template-action edit-btn" data-tpl="${t.id}">AI Edit</button>
        </div>
      </div>
      <div class="template-info">
        <div class="template-name">${t.name}</div>
        <div class="template-style">${t.style}</div>
      </div>
    `;

        // Attach event listeners (CSP-safe, no inline onclick)
        card.querySelector('.use-btn').addEventListener('click', () => selectTemplate(t.id));
        card.querySelector('.edit-btn').addEventListener('click', () => selectAndEdit(t.id));

        const canvasDiv = card.querySelector(`#tcard-${t.id}`);
        const inner = document.createElement('div');
        inner.style.cssText = 'width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;';
        inner.innerHTML = `<h2 style="${getH2Style(t.bgClass)}">${t.title}</h2><p style="${getPStyle(t.bgClass)}">${t.message}</p>`;

        const overlay = canvasDiv.querySelector('.template-overlay');
        canvasDiv.insertBefore(inner, overlay);

        grid.appendChild(card);

        // Stagger animate cards
        gsap.from(card, {
            y: 50, opacity: 0, duration: 0.5,
            delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '#templates-section', start: 'top 80%' },
        });
    });

    // Re-init cursor hovers for new elements
    if (window.initCursorHovers) window.initCursorHovers();
}

// Re-apply .selected class after re-render (e.g. filter change)
function reapplySelectedState() {
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    if (selectedTemplate) {
        const card = document.querySelector(`[data-tpl-id="${selectedTemplate.id}"]`);
        if (card) card.classList.add('selected');
    }
}

// ========================
// TEMPLATE SELECTION
// ========================
function selectTemplate(id) {
    selectedTemplate = templates.find(t => t.id === id);
    window.selectedTemplate = selectedTemplate;

    // Mark card as selected visually
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    const card = document.querySelector(`[data-tpl-id="${id}"]`);
    if (card) card.classList.add('selected');

    // Show badge
    document.getElementById('active-tpl-badge').style.display = 'inline-flex';
    document.getElementById('active-tpl-name').textContent = selectedTemplate.name;

    updateSelectedPreview();
    updateFinalPreview(selectedTemplate.title, selectedTemplate.message);
    scrollToSection('editor');
    spawnColorParticles();
    showToast(`"${selectedTemplate.name}" selected!`);
}

function selectAndEdit(id) {
    selectTemplate(id);
    document.getElementById('ai-prompt').focus();
}

function updateSelectedPreview() {
    const el = document.getElementById('selected-template-display');
    el.innerHTML = `<h2 style="${getH2Style(selectedTemplate.bgClass)}">${selectedTemplate.title}</h2><p style="${getPStyle(selectedTemplate.bgClass)}">${selectedTemplate.message}</p>`;
    el.className = '';
    el.style.cssText = 'width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;';
    document.getElementById('selected-template-display').parentElement.style.background = getTemplateBg(selectedTemplate.bgClass);
}

function updateFinalPreview(title, message) {
    const fp = document.getElementById('final-preview');
    fp.style.cssText = `background:${getTemplateBg(selectedTemplate.bgClass)};border-radius:16px;overflow:hidden;width:340px;height:280px;box-shadow:0 20px 60px rgba(0,0,0,0.5);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;transition:all 0.5s;`;
    fp.innerHTML = `<h2 style="${getH2Style(selectedTemplate.bgClass).replace('1.5rem', '1.7rem').replace('1.4rem', '1.6rem')}">${title}</h2><p style="${getPStyle(selectedTemplate.bgClass)}">${message}</p>`;
    gsap.from(fp, { scale: 0.95, opacity: 0.5, duration: 0.4, ease: 'back.out(1.5)' });
}

// Expose globally for onclick handlers
window.selectTemplate = selectTemplate;
window.selectAndEdit = selectAndEdit;
window.selectedTemplate = selectedTemplate;
window.templates = templates;
window.getH2Style = getH2Style;
window.getPStyle = getPStyle;
window.getTemplateBg = getTemplateBg;

// ========================
// FILTER BUTTONS & INITIAL RENDER
// (Wait for DOM to be ready)
// ========================
function initTemplates() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderTemplates(this.dataset.filter);
            reapplySelectedState();
        });
    });

    // Initial render
    renderTemplates();
}

// Run immediately if DOM is already loaded, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTemplates);
} else {
    initTemplates();
}
