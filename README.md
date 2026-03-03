# HoliAI — AI-Powered Festival of Colors Greetings

Create stunning, personalized Holi greetings with AI. Choose from 8 beautiful templates and customize with natural language prompts.

![HoliAI](https://img.shields.io/badge/HoliAI-Festival%20of%20Colors-ff3cac?style=for-the-badge)

## ✨ Features

- 🎨 **8 Beautiful Templates** — Vibrant, Dark, Pastel, Cosmic, Watercolor, Minimal, Retro, Neon
- 🤖 **AI-Powered Editing** — Customize greetings with natural language via Google Gemini
- 🎛️ **6 AI Modes** — Enhance, Rewrite, Poetic, Funny, Formal, For Kids
- 🎚️ **Creativity Slider** — Control how creative the AI gets (1-10)
- 📥 **Download as PNG** — Export your greeting card
- 🔒 **Secure** — API keys stored server-side, rate limiting, helmet security headers
- 📱 **Responsive** — Works on desktop, tablet, and mobile

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and add your Gemini API key:

```bash
# Get a free key at https://aistudio.google.com/apikey
GEMINI_API_KEY=your_key_here
PORT=3000
```

> **Note:** The app works without an API key — it falls back to local greeting generation. The Gemini free tier allows 15,000 requests/day.

### 3. Run the App

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
holi-ai/
├── server.js              # Express.js server with API proxy
├── package.json
├── .env                   # Your API keys (git-ignored)
├── .env.example           # Template for environment variables
├── .gitignore
├── README.md
└── public/
    ├── index.html         # Main HTML page
    ├── css/
    │   └── styles.css     # All styles
    └── js/
        ├── cursor.js      # Custom cursor animations
        ├── canvas.js      # Background floating orbs
        ├── animations.js  # GSAP animations & scroll effects
        ├── templates.js   # Template data & rendering
        ├── editor.js      # AI editor logic
        ├── ui.js          # Toast, modal, particles, download
        └── app.js         # Main initialization
```

## 🔒 Security

- **API keys** are server-side only (never sent to client)
- **Helmet** security headers
- **CORS** configured for same-origin in production
- **Rate limiting** — 20 requests/minute per IP
- **Input validation** — prompt length limited to 500 chars

## 🌐 Deployment

### Render / Railway / Fly.io

1. Push to GitHub
2. Connect your repo to the platform
3. Set environment variables: `GEMINI_API_KEY`, `PORT`, `NODE_ENV=production`
4. Deploy — the `npm start` script runs `node server.js`

### Docker (optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 📄 License

MIT — Made with ♥ for the Festival of Colors by XploreAIQ
