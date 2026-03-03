// ============================================
// HoliAI — Main Application Entry Point
// ============================================

// This file runs after all other modules are loaded.
// It wires up ALL event listeners (CSP-safe: no inline handlers).

document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // HERO BUTTONS
    // ========================
    const btnBrowse = document.getElementById('btn-browse-templates');
    if (btnBrowse) btnBrowse.addEventListener('click', () => scrollToSection('templates'));

    const btnEditor = document.getElementById('btn-ai-editor');
    if (btnEditor) btnEditor.addEventListener('click', () => scrollToSection('editor'));

    // ========================
    // CREATIVITY SLIDER
    // ========================
    const slider = document.getElementById('creativity-slider');
    const sliderVal = document.getElementById('creativity-val');
    if (slider && sliderVal) {
        slider.addEventListener('input', function () {
            sliderVal.textContent = this.value;
        });
    }

    // ========================
    // MODE PILLS
    // ========================
    document.querySelectorAll('.mode-pill').forEach(pill => {
        pill.addEventListener('click', function () {
            selectMode(this);
        });
    });

    // ========================
    // GENERATE & CLEAR BUTTONS
    // ========================
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) generateBtn.addEventListener('click', () => generateWithAI());

    const clearBtn = document.getElementById('btn-clear-prompt');
    if (clearBtn) clearBtn.addEventListener('click', () => clearPrompt());

    // ========================
    // SUGGESTION CHIPS
    // ========================
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function () {
            useChip(this);
        });
    });

    // ========================
    // PREVIEW CONTROLS
    // ========================
    const btnDownload = document.getElementById('btn-download');
    if (btnDownload) btnDownload.addEventListener('click', () => downloadGreeting());

    const btnShare = document.getElementById('btn-share');
    if (btnShare) btnShare.addEventListener('click', () => shareGreeting());

    const btnUseThis = document.getElementById('btn-use-this');
    if (btnUseThis) btnUseThis.addEventListener('click', () => openModal());

    // ========================
    // MODAL BUTTONS
    // ========================
    const btnModalDownload = document.getElementById('btn-modal-download');
    if (btnModalDownload) btnModalDownload.addEventListener('click', () => {
        downloadGreeting();
        closeModal();
    });

    const btnModalClose = document.getElementById('btn-modal-close');
    if (btnModalClose) btnModalClose.addEventListener('click', () => closeModal());

    // ========================
    // AUTO-SELECT FIRST TEMPLATE
    // ========================
    if (typeof selectTemplate === 'function' && typeof templates !== 'undefined' && templates.length > 0) {
        selectTemplate(templates[0].id);
    }

    // ========================
    // CHECK AI STATUS
    // ========================
    if (typeof checkAIStatus === 'function') {
        checkAIStatus();
    }

    // ========================
    // INIT CURSOR HOVERS
    // ========================
    if (typeof initCursorHovers === 'function') {
        initCursorHovers();
    }

    // ========================
    // CTRL+ENTER TO GENERATE
    // ========================
    const promptEl = document.getElementById('ai-prompt');
    if (promptEl) {
        promptEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                generateWithAI();
            }
        });
    }
});
