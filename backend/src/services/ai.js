import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a one-sentence summary for an email using OpenAI API.
 * 
 * @param {String} subject - The subject line of the email
 * @param {String} body - The body snippet of the email
 * @returns {Promise<String>} - The AI generated one-sentence summary
 */
export const generateAISummary = async (subject, body) => {
  try {
    const prompt = `
      Summarize the following email in exactly one short, punchy sentence. Focus on the actionable item or core message.
      
      Subject: ${subject}
      Body: ${body}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can use gpt-4 if preferred
      messages: [
        { role: "system", content: "You are a highly efficient executive assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 60,
      temperature: 0.3, // Lower temperature for more direct, concise answers
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    
    // Fallback in case of API limits or errors
    if (subject.toLowerCase().includes('urgent')) return 'Requires immediate attention based on subject.';
    return `Sender discussed: ${subject}.`;
  }
};
