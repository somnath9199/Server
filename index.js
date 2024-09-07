// Backend (Node.js)
const express = require('express');
const dotenv = require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors')
const app = express();

app.use(cors());
// Set up Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// API route to handle user prompts and generate AI response
app.use(express.json());

app.post('/api/generate-response', async (req, res) => {
    const userPrompt = req.body.userPrompt;
    const prompt = `You are an AI assistant that helps users improve their English through conversation. Respond naturally, correct grammar gently with explanations, offer feedback on request, and encourage users with positive reinforcement. Provide additional challenges to enhance learning, but do not include any introductory or repetitive messages in your responses  and do not include any emoji in you response so the user input is  ${userPrompt}`; 

    try {
        const result = await model.generateContent(prompt);
        const aiResponse = result.response.candidates[0].content.parts[0].text;
        return res.json({ aiResponse });
    } catch (error) {
        res.status(500).json({ error: "Error generating AI response" +error });
    }
});

app.get('/api/somnath',(req,res)=>{
  res.status(200).json({"message":"Hey there"})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
