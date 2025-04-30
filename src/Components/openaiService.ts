export async function fetchCareerResults(answers: string[], quizType: 'basic' | 'detailed'): Promise<string> {
    const key = localStorage.getItem("MYKEY");
    if (!key) throw new Error("API key not found in local storage.");
  
    const parsedKey = JSON.parse(key);
  
    const systemPrompt = {
      role: "system",
      content: `You are a helpful career advisor AI. You will receive answers to a ${quizType} career quiz. Based on the user's answers, recommend suitable career paths. Explain your reasoning.`
    };
  
    const userPrompt = {
      role: "user",
      content: `Here are the answers to the ${quizType} quiz:\n\n${answers.map((a, i) => `Q${i + 1}: ${a}`).join('\n')}`
    };
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", //now works with free/default keys
        messages: [systemPrompt, userPrompt],
        temperature: 0.7
      })
    });
  
    const data = await response.json();
  
    if (!response.ok || !data.choices) {
      throw new Error(data.error?.message || "Failed to fetch GPT response.");
    }
  
    return data.choices[0].message.content;
  }
  