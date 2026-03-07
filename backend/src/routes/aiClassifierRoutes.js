import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/classify", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.json({ category: "other" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Classify this message into one category: work, school, finance, travel, social, or other. Reply with only one word from the allowed categories in lowercase."
          },
          {
            role: "user",
            content: text
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "PriorityHub Hackathon"
        }
      }
    );

    let category = "other";
    const responseData = response.data;
    
    if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
      const result = responseData.choices[0].message.content.trim().toLowerCase();
      // Ensure it's one of the valid categories
      if (['work', 'school', 'finance', 'travel', 'social', 'other'].includes(result)) {
        category = result;
      }
    }

    res.json({ category });

  } catch (error) {
    console.error("OpenRouter classify error:", error?.response?.data || error.message);
    res.json({ category: "other" });
  }
});

export default router;
