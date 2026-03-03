// ============================================
// HoliAI — Express.js Server
// ============================================

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================
// SECURITY MIDDLEWARE
// ========================

// Helmet — secure HTTP headers (relaxed CSP for inline styles & CDN scripts)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "blob:"],
            connectSrc: ["'self'"],
        }
    },
    crossOriginEmbedderPolicy: false,
}));

// CORS — allow same-origin only in production
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? false  // same-origin only
        : '*',   // allow all in dev
    methods: ['GET', 'POST'],
}));

// Body parser
app.use(express.json({ limit: '10kb' }));

// Rate limiter for API routes
const apiLimiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 20,               // 20 requests per IP per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please wait a moment and try again.' },
});

// ========================
// STATIC FILES
// ========================
app.use(express.static(path.join(__dirname, 'public')));

// ========================
// API ROUTES
// ========================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        aiEnabled: !!process.env.GEMINI_API_KEY,
    });
});

// AI Generation endpoint
app.post('/api/generate', apiLimiter, async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(503).json({
                error: 'AI generation is not configured. Set GEMINI_API_KEY in .env',
                fallback: true,
            });
        }

        const {
            prompt,
            templateName,
            templateStyle,
            templateBgClass,
            currentTitle,
            currentMessage,
            mode = 'enhance',
            creativity = 7,
        } = req.body;

        if (!prompt || typeof prompt !== 'string' || prompt.length > 500) {
            return res.status(400).json({ error: 'Invalid prompt. Must be 1-500 characters.' });
        }

        // Build temperature from creativity level
        const temperatureMap = { 1: 0.3, 2: 0.4, 3: 0.5, 4: 0.6, 5: 0.7, 6: 0.8, 7: 0.9, 8: 1.0, 9: 1.1, 10: 1.2 };
        const temperature = temperatureMap[creativity] || 0.9;

        const modeInstructions = {
            enhance: 'Enhance and beautify the greeting. Add vivid imagery, emotional depth, and festive energy. Make it memorable.',
            rewrite: 'Completely rewrite the greeting with fresh, original phrasing. Keep the Holi theme but bring a new creative angle.',
            poetic: 'Write in poetic, lyrical style — use metaphors of color, light, and celebration. Can use rhyme or free verse.',
            funny: 'Make it lighthearted and fun! Add humor, wordplay, or a witty twist while keeping it warm and festive.',
            formal: 'Use an elegant, formal tone suitable for professional or official Holi wishes. Dignified and gracious.',
            kids: 'Simple, joyful, and exciting language perfect for children. Use playful words and fun imagery.',
        };

        const creativityNote = creativity >= 8
            ? 'BE VERY CREATIVE. Surprise with unexpected metaphors, vivid imagery, and truly original phrasing.'
            : creativity >= 5
                ? 'Be creatively expressive. Go beyond generic phrases. Add vivid, specific details.'
                : 'Make tasteful, polished improvements while staying close to the user intent.';

        const systemPrompt = `You are an expert Holi festival greeting card designer and creative copywriter.
The user will describe how they want their greeting card customized.

CURRENT TEMPLATE: "${templateName}" (style: ${templateStyle}, bgClass: ${templateBgClass})
CURRENT TITLE: "${currentTitle}"
CURRENT MESSAGE: "${currentMessage}"

AI MODE: ${modeInstructions[mode] || modeInstructions.enhance}

CREATIVITY LEVEL: ${creativity}/10. ${creativityNote}

CRITICAL RULES:
1. Return ONLY a valid JSON object — no markdown, no backticks, no explanation whatsoever.
2. The JSON must have exactly these keys:
   - title: string (main greeting, max 40 chars, emojis welcome)
   - message: string (subtitle, max 100 chars, must be meaningfully different from what the user typed)
   - bg: CSS background value (gradient or color matching the template's mood: ${templateBgClass})
   - titleColor: CSS color value
   - messageColor: CSS color value
   - titleStyle: extra CSS string for the title element (optional, can be "")
   - glow: box-shadow value for the card (optional, can be "")
3. NEVER copy the user's prompt text verbatim into the message field. Transform it into a beautiful, crafted greeting.
4. The greeting should feel genuinely creative and appropriate for Holi festival.
5. Keep the visual style consistent with the selected template's mood.`;

        const userMsg = `User wants: "${prompt}"

Generate a creative, expressive Holi greeting card that goes beyond the literal words above. Make it beautiful and surprising.`;

        // Call Gemini API
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const geminiRes = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: [{ role: 'user', parts: [{ text: userMsg }] }],
                generationConfig: {
                    temperature,
                    maxOutputTokens: 600,
                    topP: 0.95,
                    responseMimeType: 'application/json',
                },
            }),
        });

        if (!geminiRes.ok) {
            const errData = await geminiRes.json();
            console.error('[Gemini Error]', errData);
            return res.status(502).json({
                error: 'AI service returned an error: ' + (errData.error?.message || 'Unknown error'),
                fallback: true,
            });
        }

        const data = await geminiRes.json();
        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        if (!raw) {
            return res.status(502).json({
                error: 'AI returned an empty response.',
                fallback: true,
            });
        }

        // Clean and parse
        const clean = raw.replace(/```json|```/g, '').trim();
        const result = JSON.parse(clean);

        // Validate required fields
        const requiredKeys = ['title', 'message', 'bg', 'titleColor', 'messageColor'];
        for (const key of requiredKeys) {
            if (!result[key]) {
                return res.status(502).json({
                    error: `AI response missing required field: ${key}`,
                    fallback: true,
                });
            }
        }

        res.json(result);

    } catch (err) {
        console.error('[Generate Error]', err.message);
        res.status(500).json({
            error: 'An unexpected error occurred during generation.',
            fallback: true,
        });
    }
});

// ========================
// FALLBACK — Serve index.html for SPA
// ========================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
    console.log(`\n  ✦ HoliAI Server running at http://localhost:${PORT}`);
    console.log(`  ✦ AI Enabled: ${!!process.env.GEMINI_API_KEY ? 'Yes (Gemini)' : 'No — set GEMINI_API_KEY in .env'}`);
    console.log(`  ✦ Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
