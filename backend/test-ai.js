import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // load from root

async function testSummary() {
  console.log("USING KEY:", process.env.OPENROUTER_API_KEY);
  try {
    const text = "Meeting at 5pm with the board members.";
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Summarize the following email in ONE short sentence explaining what action is needed."
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
    console.log("SUCCESS:", response.data.choices[0].message.content);
  } catch (error) {
    console.error("ERROR:");
    console.error(error.response ? error.response.data : error.message);
  }
}

testSummary();
