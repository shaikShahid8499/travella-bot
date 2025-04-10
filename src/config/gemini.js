export const getGeminiResponse = async (prompt) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "",
        "Content-Type": "application/json",
        "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
        "X-Title": "<YOUR_SITE_NAME>", // Optional
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-distill-llama-70b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response received";
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw error;
  }
};
