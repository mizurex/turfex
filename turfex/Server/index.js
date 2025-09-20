import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "./utils/BuildPrompt.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const defaultAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/turfex", async (req, res) => {
  try {
    const { messages, tone, length, level, language, apiKey } = req.body;
    const prompt = buildPrompt({ messages, tone, level, length, language });

    if (apiKey) {
      // user provided a key → try with it
      try {
        const testAi = new GoogleGenAI({ apiKey });
        const result = await testAi.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        return res.status(200).json({ answer: text?.trim() || "No text found" });
      } catch (err) {
        console.error("Gemini error:", err);

        if (err.status === 400) {
          return res.status(400).json({ error: "Invalid API key" });
        } else if (err.status === 429) {
          return res.status(429).json({ error: "Rate limit exceeded" });
        } else {
          return res.status(500).json({ error: "Gemini service error" });
        }
      }
    }

    // no user key → use default key
    const result = await defaultAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.status(200).json({ answer: text?.trim() || "No text found" });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Service unavailable. Please try again." });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
