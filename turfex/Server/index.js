const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
console.log("Server Started")

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/turfex", async (req , res)=>{
    try{
        const {question} = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


        const improvmentPrompt = `You are an expert
        answer this question ${question}  in 200 words`

        const finalPrompt = await model.generateContent(improvmentPrompt);
        const response = finalPrompt.response;
        const finalResponse = response.text();

        res.json(finalResponse);
    }
    catch(error){
        console.error('Error in getting response back:', error);
        res.status(500).json({ error: 'Failed to get response from ai' });
    }
});

app.listen(3001,()=> console.log("backend working"));