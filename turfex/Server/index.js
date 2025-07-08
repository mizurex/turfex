import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';
import { buildPrompt } from './utils/BuildPrompt.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/turfex", async (req, res) => {
  try {
    const { messages, tone , length, level,language } = req.body;

    const prompt = buildPrompt({ messages, tone, level, length, language });

    const result = await ai.models.generateContent({
      model:"gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

console.dir(result, { depth: null }); // optional debug

const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

if (text) {
  res.status(200).json({ answer: text.trim() });
} else {
  res.status(200).json({ answer: "No text found in Gemini response." });
}
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Service unavailable. Please try again.' });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
