## Turfex AI – Drop‑in AI Chat UI Template

Turfex AI is a clean, minimal template that ships a ready‑to‑use AI chat interface. Users can plug in their own API key (stored locally, never sent to our servers), chat with the model, view responses in Markdown, and customize the UI easily.

Use it as a starting point for your own product, internal tool, portfolio demo, or an AI playground.

---

### Highlights

- **Plug‑and‑play UI**: A polished chat interface out of the box
- **Bring your own key**: Users paste their own Gemini API key; it’s saved in localStorage
- **Markdown rendering**: Clean, responsive Markdown with GFM (tables, lists, code, links)
- **Personal notes**: Save model outputs as notes and export to PDF
- **Config controls**: Tone, length, academic level, language hooks in the prompt
- **Local and server keys**: Optionally run with a server key as a fallback
- **Modern stack**: React + Vite + Tailwind, Node/Express backend

---

## Quick Start

Clone and install both apps (client + server):

```bash
git clone <this-repo>
cd tufexai/turfex/Server && npm i
cd ../Client && npm i
```

Run the server (port 3001):
```bash
cd tufexai/turfex/Server
cp .env.example .env   # create if you want a server fallback key
# .env
# GEMINI_API_KEY=your_server_side_key
npm start
```

Run the client (Vite dev server):
```bash
cd tufexai/turfex/Client
npm run dev
```

Open the app (printed URL, typically `http://localhost:5173`).

---

## Using Your Own API Key (Client‑Side)

- Click the settings icon in the chat header
- Paste your Google Gemini API key and press Add
- Your key is stored in the browser (localStorage) and used directly from the client
- You can delete the key any time; the server fallback key (if configured) will be used instead

Get a Gemini key from `https://aistudio.google.com/app/apikey`.

---

## Project Structure

```
turfex/
  Client/                 # React app (Vite + Tailwind)
    src/
      components/
        ChatInput.jsx     # Prompt bar with model selector and actions
        Response.jsx       # Streaming/rendered responses (Markdown)
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

Client (`turfex/Client/.env` – optional):
- `VITE_CLERK_PUBLISHABLE_KEY` – if set, Clerk UI (auth) is enabled; otherwise it is hidden.

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

## Deploying

- Client: any static hosting (Vercel, Netlify). Build with `npm run build`.
- Server: any Node host (Render, Railway, Fly.io, VPS). Ensure `GEMINI_API_KEY` is set.

---

## Roadmap Ideas (make it yours)

- Add history and named conversations
- Streaming tokens and partial rendering
- More models/providers (OpenAI, Claude, local)
- Image/file uploads and RAG
- Theming (dark mode, brand colors)

---

## License

MIT – use it freely, modify anything, ship products.
