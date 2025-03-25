const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.GEMINI_API_KEY;

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/ask-gemini", async (req, res) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${API_KEY}`,
            { prompt: { text: req.body.prompt } },
            { headers: { "Content-Type": "application/json" } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from Gemini API" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
