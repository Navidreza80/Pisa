import { HouseItemsInterface } from "@/types/house";

export const getRecommendation = async (
  userInput: string,
  budget: number | undefined,
  houses: HouseItemsInterface[]
) => {
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
          model: "deepseek/deepseek-r1-0528:free",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: [
                {
                  type: "text",
                  text: `You are a real estate assistant. Return the suggested house ID in JSON format like: { "houseId": 123, "reason": "" } the reason should be in user language, Just include the JSON and nothing else. Available houses: ${JSON.stringify(houses)}`,
                },
              ],
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `${userInput} budget: ${budget}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const res = await response.json();
    const rawContent = res.choices[0].message.content;
    const cleanedJson = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsedData = JSON.parse(cleanedJson);
    return parsedData;
  } catch (error) {
    throw error;
  }
};
