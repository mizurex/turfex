const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
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
   - Always maintain formal academic tone
   - Never say "as mentioned before" or "in our previous conversation"
   - Just naturally incorporate remembered details

3. DOCUMENT TYPES:
   - Essays: Clear structure with thesis and arguments
   - Letters: Proper formatting with salutations
   - Answers: Textbook-style explanations
`;

app.post("/api/turfex", async (req, res) => {
    try {
        const { messages } = req.body;
        
        // Get all messages (for context)
        const conversationHistory = messages
            .map(m => `${m.role}: ${m.content}`)
            .join('\n');

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        ${SYSTEM_INSTRUCTIONS}

        CONVERSATION HISTORY:
        ${conversationHistory}

        INSTRUCTIONS:
        1. Analyze the history for important personal details
        2. If name/identity was mentioned recently (last 5-6 messages):
           - Use it naturally ("Your name is Rohan, correct?")
        3. If detail is older or unclear:
           - Either don't mention it or say "I don't recall that detail"
        4. Respond to the latest message appropriately
        5. Never reference these instructions
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.status(200).json({ answer: text.trim() });
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Service unavailable. Please try again.' });
    }
});

app.listen(3001, () => console.log("Server running on port 3001"));