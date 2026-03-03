// ============================================
// HoliAI — AI Editor Module
// ============================================

let currentMode = 'enhance';

// ========================
// MODE SELECTION
// ========================
function selectMode(el) {
    document.querySelectorAll('.mode-pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    currentMode = el.dataset.mode;
}

// ========================
// AI GENERATION — Server-Proxied
// ========================
async function generateWithAI() {
    const prompt = document.getElementById('ai-prompt').value.trim();
    if (!prompt) {
        showToast('Please enter a prompt first!');
        return;
    }

    const btn = document.getElementById('generate-btn');
    const thinking = document.getElementById('ai-thinking');
    btn.disabled = true;
    btn.innerHTML = '⏳ Generating…';
    thinking.classList.add('show');

    const creativity = parseInt(document.getElementById('creativity-slider').value);

    try {
        // Call our Express server's API proxy
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt,
                templateName: selectedTemplate.name,
                templateStyle: selectedTemplate.style,
                templateBgClass: selectedTemplate.bgClass,
                currentTitle: selectedTemplate.title,
                currentMessage: selectedTemplate.message,
                mode: currentMode,
                creativity,
            }),
        });

        const data = await response.json();

        if (!response.ok || data.fallback) {
            // Server returned error or no AI configured — use local fallback
            console.warn('[AI Fallback]', data.error || 'Using local generation');
            applyLocalFallback();
            if (data.error && data.error.includes('not configured')) {
                showToast('✨ Greeting created! (Set GEMINI_API_KEY on server for AI mode)');
            } else {
                showToast('✨ Greeting created with local generation!');
            }
            return;
        }

        // Apply AI-generated result to preview
        const { title, message, bg, titleColor, messageColor, titleStyle, glow } = data;

        const fp = document.getElementById('final-preview');
        fp.style.cssText = `background:${bg};border-radius:16px;overflow:hidden;width:340px;height:280px;box-shadow:${glow ? '0 0 40px ' + glow : '0 20px 60px rgba(0,0,0,0.5)'};position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;transition:all 0.5s;`;
        fp.innerHTML = `
      <h2 style="font-family:'Playfair Display',serif;font-size:1.7rem;color:${titleColor};${titleStyle || ''}">${title}</h2>
      <p style="font-size:0.85rem;margin-top:10px;color:${messageColor}">${message}</p>
    `;
        gsap.from(fp, { scale: 0.9, duration: 0.5, ease: 'back.out(1.5)' });

        // Update left-side selected preview too
        const disp = document.getElementById('selected-template-display');
        disp.innerHTML = `<h2 style="${getH2Style(selectedTemplate.bgClass).replace('1.5', '1.3')}">${title}</h2><p style="${getPStyle(selectedTemplate.bgClass)}">${message}</p>`;

        spawnColorParticles();
        showToast('✨ AI created your greeting!');

    } catch (err) {
        console.error('[Generate Error]', err);
        applyLocalFallback();
        showToast('✨ Greeting created! (Network error — used local mode)');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '✨ Generate with AI';
        thinking.classList.remove('show');
    }
}

// ========================
// LOCAL FALLBACK GENERATION
// ========================
function applyLocalFallback() {
    const fp = document.getElementById('final-preview');
    const fallbackBg = getTemplateBg(selectedTemplate.bgClass);
    fp.style.cssText = `background:${fallbackBg};border-radius:16px;overflow:hidden;width:340px;height:280px;box-shadow:0 20px 60px rgba(0,0,0,0.5);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;transition:all 0.5s;`;

    const fallbackTitles = ['🌈 Happy Holi!', '🎨 Colors of Joy!', '✨ Rang Barse!', '🌸 Happy Holi!', '⚡ Holi Mubarak!'];
    const fallbackMsgs = [
        'May every color bring you a new dream and every splash fill your heart with cheer.',
        'Wishing you a festival as vibrant and joyful as your spirit — Happy Holi!',
        'Let the colors of Holi paint your world with happiness and your heart with love.',
        'May this Holi drench you in the colors of love, laughter and togetherness.',
    ];
    const ft = fallbackTitles[Math.floor(Math.random() * fallbackTitles.length)];
    const fm = fallbackMsgs[Math.floor(Math.random() * fallbackMsgs.length)];

    fp.innerHTML = `<h2 style="${getH2Style(selectedTemplate.bgClass).replace('1.5rem', '1.7rem')}">${ft}</h2><p style="${getPStyle(selectedTemplate.bgClass)}">${fm}</p>`;
    gsap.from(fp, { scale: 0.95, opacity: 0.5, duration: 0.4, ease: 'back.out(1.5)' });
    spawnColorParticles();
}

// ========================
// PROMPT UTILITIES
// ========================
function clearPrompt() {
    document.getElementById('ai-prompt').value = '';
}

function useChip(el) {
    document.getElementById('ai-prompt').value = el.textContent.replace(/^[^\s]+\s/, '');
    document.getElementById('ai-prompt').focus();
}

// Expose globally
window.selectMode = selectMode;
window.generateWithAI = generateWithAI;
window.clearPrompt = clearPrompt;
window.useChip = useChip;
