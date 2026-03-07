import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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"
});

router.post("/summary", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.json({ summary: "No content to summarize." });
    }

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize notifications in one concise sentence."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    const summary =
      response.choices?.[0]?.message?.content ||
      "Summary unavailable";

    res.json({ summary });

  } catch (error) {
    console.error("OpenAI summary error:", error);
    res.json({ summary: "AI summary failed." });
  }
});

export default router;
