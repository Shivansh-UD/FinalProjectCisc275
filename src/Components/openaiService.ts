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
You are a professional, friendly career advisor AI.

Based on the user's quiz answers, generate a personalized and beautifully formatted list of career recommendations. Your goal is to inspire and inform the user with clear, encouraging guidance.

**Instructions**:
1. Start with a warm, motivational 2–3 sentence introduction.
2. Group careers into 2–3 relevant categories (like Technology, Creative, Healthcare, Business, etc.) depending on the user's answers.
3. Under each category, list 2–3 career suggestions.
4. For each career, provide:
   - The job title in **bold**
   - A 3–4 sentence description that explains:
     - What the career involves
     - Who it’s suited for
     - What makes it impactful or appealing
   - The average U.S. salary in parentheses

**Formatting Example** (Markdown):

---

🎯 **Your Personalized Career Path Recommendations**

You're full of promise, and the future is wide open! Based on your responses, here are some career paths that align with your unique strengths and passions:

### 💻 Technology & Innovation

1. **Software Engineer**  
   Software engineers design and build computer applications, websites, and systems that power the digital world. This role is great for problem-solvers who enjoy logic, structure, and creativity in coding. Software engineers work in industries ranging from healthcare to finance to gaming. (Average Salary: $110,000)

2. **UX Designer**  
   UX Designers craft user-friendly digital experiences by focusing on how products look, feel, and function. They blend creativity with psychology and research to make interfaces intuitive and enjoyable. Ideal for empathetic thinkers with an eye for design. (Average Salary: $90,000)

### 🎨 Creative & Communication

1. **Content Strategist**  
   Content strategists plan and create compelling written and multimedia content for brands and organizations. They work closely with designers, marketers, and researchers to ensure messaging aligns with audience needs. Great for storytellers who think analytically. (Average Salary: $72,000)

2. **Marketing Manager**  
   Marketing managers lead campaigns that promote products and connect with audiences across digital and traditional channels. They use both creative thinking and data insights to develop branding strategies and measure success. (Average Salary: $85,000)

---

**Quiz Answers**: ${userResponses.join(", ")}
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
        max_tokens: 1000
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
