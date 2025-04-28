// src/Services/openaiService.ts
import axios from 'axios';

const saveKeyData = "MYKEY";

export async function getCareerSuggestionsFromGPT(userResponses: string[]): Promise<string> {
  const apiKeyString = localStorage.getItem(saveKeyData);
  if (!apiKeyString) {
    throw new Error("No API key found. Please enter your API key first.");
  }

  const apiKey = JSON.parse(apiKeyString);

  const prompt = `
You are a helpful career advisor AI. Based on the following quiz answers, suggest 2-3 career paths that would match the user's skills, interests, and preferences.
Answers: ${userResponses.join(", ")}
Provide your suggestions in a friendly, short paragraph. Give me just the career options as a bulleted list but the ret keep in sentence/paragraph form.
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful career recommendation assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch GPT-4 response. Please check your API key or network.");
  }
}
