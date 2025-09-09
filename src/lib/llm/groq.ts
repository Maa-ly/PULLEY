/* eslint-disable @typescript-eslint/no-explicit-any */
// Simple Groq client without LangChain dependencies
export const createGroqModel = () => {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
  
  if (!apiKey) {
    console.warn("GROQ_API_KEY is not set; Groq will not work.");
  }

  const invoke = async (messages: any[]) => {
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not set");
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Groq API error:", error);
      throw error;
    }
  };

  return {
    model: model,
    temperature: 0.2,
    apiKey,
    invoke,
  };
};


