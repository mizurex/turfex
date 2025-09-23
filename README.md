## Turfex AI – Instant AI Chat Template (Fork & Go)

This is a casual, plug‑and‑play template for an AI chat app. Fork it, run it, change a few things, and you’ve got an instant API interface you can use for a project, a demo, or just for fun. Bring your own key, or wire it to your own server. Enjoy.

---

### Why this template

- **Instant UI**: Clean chat interface out of the box
- **Bring your own key**: Paste your Gemini API key (stored locally)
- **Markdown answers**: Tables, lists, code blocks, links handled nicely
- **Take notes**: Save outputs and export as PDF
- **Tweak the prompt**: Tone, length, level, language
- **Flexible**: Use client key, server key, or both

---

## Fork & Go (quick guide)

Clone your fork and install deps (client + server):

```bash
git clone <your-fork-url>
cd tufexai/turfex/Server && npm i
cd ../Client && npm i
```

Run the server (port 3001):
```bash
cd tufexai/turfex/Server
# If you want a server fallback key, create .env with:
# GEMINI_API_KEY=your_server_side_key
npm start
```

Run the client (Vite dev server):
```bash
cd tufexai/turfex/Client
npm run dev
```

Open the app (printed URL, usually `http://localhost:5173`).

---

## Use your own API key (client‑side)

- Click the settings icon in the chat header
- Paste your Google Gemini API key and press Add
- Your key is stored in the browser (localStorage) and used directly from the client
- You can delete the key any time; the server fallback key (if configured) will be used instead

Grab a Gemini key from `https://aistudio.google.com/app/apikey`.

---

## Make it yours (edit anything)

### Server (Express)
- Where: `turfex/Server/index.js`, helpers in `turfex/Server/utils/*`
- Do what you want: change routes, add endpoints, call any provider, add auth/rate limits
- Return whatever shape you like; the client just needs text content for the chat
- Edit System Prompts

Default API we ship:
```http
POST /api/turfex
{ messages, tone, length, level, language, apiKey? }
```
Behavior:
- If a client key is present, use it
- Otherwise use the server key (if set)
- Uses `@google/genai` with `gemini-2.5-flash` by default

### Client (React + Vite + Tailwind)
- Where: `turfex/Client/src`
- Edit models and actions: `components/chat-input.jsx`
- Response rendering (Markdown, buttons): `components/chat-response.jsx`
- Markdown styles/components: `components/markdown.jsx`
- Main page & modals: `pages/Chat.jsx`
- API call: `api/turfex.js`
- Local key store (Zustand): `stores/apistore.js`

Tip: The Markdown renderer is already mobile‑friendly and supports code blocks, tables, images, and safe links.

## Project Structure

```
turfex/
  Client/                 # React app (Vite + Tailwind)
    src/
      components/
        chat-input.jsx     # Prompt bar with model selector and actions
        chat-response.jsx  # Rendered responses (Markdown + buttons)
        markdown.jsx       # Markdown renderer (GFM, responsive)
      pages/
        Chat.jsx          # Main chat page (notes modal, settings modal)
      api/turfex.js       # Client -> Server API call
      stores/apistore.js  # localStorage-backed API key store (Zustand)
  Server/
    index.js              # Express server, Gemini call, server key fallback
    utils/BuildPrompt.js  # Prompt builder (tone/length/level/language)
```

---

## Configuration

Server (`turfex/Server/.env`):
- `GEMINI_API_KEY` – optional. If provided, the server will use it when the user hasn’t added a client key.


Nothing else is required to try the template.

---

## Customize the UI

- All UI is plain React + Tailwind. Update components in `src/components` and `src/pages`.
- Swap icons (Lucide), tweak colors, spacing, and typography.
- Replace the model list in `ChatInput.jsx` with your own choices.
- Edit the settings modal content in `pages/Chat.jsx`.
- Replace the gradient/glow around the input or remove it entirely.

Tip: The Markdown renderer (`components/markdown.jsx`) already includes mobile-friendly typography, code scrolling, tables, images, and safe links.

---

## Notes & PDF Export

- From each response, you can save text into Notes
- Notes are persisted locally and can be exported to PDF (`jspdf`)

---

## How Requests Work

The client builds a structured prompt (tone, length, academic level, language) and calls the server:

```
POST /api/turfex
{ messages, tone, length, level, language, apiKey? }
```

- If a client API key is provided, the server uses it.
- Otherwise, it falls back to the server key (if set).

The server uses `@google/genai` to call `gemini-2.5-flash` and returns clean text.

---

## Deploy

- Client: any static hosting (Vercel, Netlify). Build with `npm run build`.
- Server: any Node host (Render, Railway, Fly.io, VPS). Ensure `GEMINI_API_KEY` is set.

---



