// src/Components/openaiService.ts
import axios from 'axios';

const saveKeyData = "MYKEY";

/**
 * Fetches career suggestions from GPT based on user quiz responses.
 * Reads API key from localStorage, builds prompt, and calls OpenAI's Chat API.
 */
export async function getCareerSuggestionsFromGPT(userResponses: string[]): Promise<string> {
  const apiKeyString = localStorage.getItem(saveKeyData);

  if (!apiKeyString) {
    return "No API key found. Please enter your API key first.";
  }

  let apiKey: string;
  try {
    apiKey = JSON.parse(apiKeyString);
  } catch (e) {
    return "Stored API key is invalid. Please re-enter your API key.";
  }

  const prompt = `
You are a helpful career advisor AI.

Based on the following quiz answers, suggest 5-6 careers that match the user's skills, interests, and preferences.

**Instructions**:
- First, list the career titles with their average salary in a clean numbered list.
- Only put career name + salary — NO descriptions yet.
- Example:
    1. Software Engineer ($110,000)
    2. Data Analyst ($75,000)

Quiz Answers: ${userResponses.join(", ")}
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful career recommendation assistant."
          },
          {
            role: "user",
            content: prompt
          }
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
    return "Failed to fetch GPT-4 response. Please check your API key or your internet connection.";
  }
}