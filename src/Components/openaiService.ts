import axios from 'axios';

const saveKeyData = "MYKEY";

export async function getCareerSuggestionsFromGPT(userResponses: string[]): Promise<string> {
  const apiKeyString = localStorage.getItem(saveKeyData);

  if (!apiKeyString) {
    return "No API key found. Please enter your API key first.";
  }

  let apiKey;
  try {
    apiKey = JSON.parse(apiKeyString);
  } catch (e) {
    return "Stored API key is invalid. Please re-enter your API key.";
  }

  const prompt = `
You are a helpful career advisor AI. Based on the following quiz answers, suggest 2-3 career paths that would match the user's skills, interests, and preferences.
Answers: ${userResponses.join(", ")}
Provide your suggestions in a friendly, short paragraph. Give me just the career options as a bulleted list but the rest keep in sentence/paragraph form.
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
    return "Failed to fetch GPT-4 response. Please check your API key or your internet connection.";
  }
}
