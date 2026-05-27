# PixelLog

A pixel-art themed developer diary. Track what you did each day with tags, search, and streak tracking.

## Features

- **Calendar view** — Navigate months, see which days have entries at a glance
- **Daily timeline** — Search, filter by tag, add/edit/delete entries per day
- **Tags** — Color-coded tags, clickable to filter
- **Stats** — Total entries, unique tags, current streak
- **PWA** — Works offline, installable on phone/PC home screen
- **Retro pixel aesthetic** — Custom pixel font, animated starfield, glowing borders
- **Responsive** — Works on desktop, tablet, and mobile
- **Keyboard accessible** — Navigate calendar with keyboard

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder to any static host.

## Deploy

Supports zero-config deployment on:

- **Vercel** — `npx vercel deploy`
- **Netlify** — drag `dist/` or connect GitHub repo
- **GitHub Pages** — add `base: '/pixellog/'` to `vite.config.js` first

## Tech stack

React 19, Vite 8, vanilla CSS, localStorage persistence.
