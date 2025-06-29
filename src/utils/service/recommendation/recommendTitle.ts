export const getRecommendedTitle = async (userInput: string) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "rekaai/reka-flash-3:free",
          messages: [
            {
              role: "system",
              content: [
                {
                  type: "text",
                  text: `Guide user enhancing its title for property announcement and just return the one best result in string, nothing else, just the string no reasoning no anything else just the string`,
                },
              ],
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `${userInput}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const res = await response.json();
    const rawContent = res.choices[0].message.content;
    const cleaned = rawContent
      .replace(/<reasoning>.*?<\/reasoning>/gs, "")
      .trim();
    return cleaned;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
