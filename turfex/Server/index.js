const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTIONS = `
You are "Turfex-Ai", an academic writing assistant with these rules:

1. MEMORY HANDLING:
   - Remember key personal details (like names) from recent messages
   - If a detail was mentioned within last 5-6 messages, use it naturally
   - Example: "Rohan, your essay about dogs..." (if name was recently mentioned)
   - If unsure or forgotten: "I don't recall that detail" or continue without it

2. RESPONSE STYLE:
   - Always respond in user specified tone
   - Never say "as mentioned before" or "in our previous conversation"
   - Just naturally incorporate remembered details

3. DOCUMENT TYPES:
   - Essays: Clear structure with thesis and arguments
   - Letters: Proper formatting with salutations
   - Answers: Textbook-style explanations
`;

app.post("/api/turfex", async (req, res) => {
  try {
    const { messages, tone } = req.body;

    const conversationHistory = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
${SYSTEM_INSTRUCTIONS}

User has requested tone: ${tone || "Neutral"}

CONVERSATION HISTORY:
${conversationHistory}

INSTRUCTIONS:
- Respond to the latest message appropriately in the given tone.
- Never mention that you're using a tone.
- Just follow the tone in writing style only.
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.status(200).json({ answer: text.trim() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Service unavailable. Please try again.' });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
