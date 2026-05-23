# P39.Studio

Premium one-page portfolio landing for P39.Studio.

## Visual Direction

Use `Референс 2.png` as the primary source of truth: graphite, matte black, monochrome first, with only tiny purple details. `Референс 1.png` is secondary. Avoid the older purple-heavy direction.

For the dark theme background, match `Как надо.png`: smooth black with a soft graphite glow. Do not add visible grain, noise, grid, or cell texture over the dark background.

## Run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3002`.

## Dev Stability

Development and production outputs are intentionally separated in `next.config.mjs`: dev writes to `.next-dev`, while `npm run build` writes to `.next-build`. This prevents a production build from overwriting the static CSS/JS files used by a running dev server.

## Telegram Delivery

Create `.env.local` from `.env.example`:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

Submitted terminal requests are sent through `app/api/contact/route.js`.

## Visual Check

With the dev server running on port `3002`, run:

```bash
npm run verify:visual
```

It writes preview screenshots for RU, light theme, and the terminal modal.
