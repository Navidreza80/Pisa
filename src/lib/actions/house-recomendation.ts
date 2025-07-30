// app/actions/house-recommendation.ts
"use server";

import { HouseItemsInterface } from "@/types/house";
import { fetchHouses } from "@/utils/service/house/get";

interface HouseSuggestionResponse {
  houseId: string;
  message: string;
  reasoning: string;
}

export async function getHouseRecommendation(): Promise<HouseSuggestionResponse> {
  try {
    const houses: HouseItemsInterface[] = await fetchHouses({
      transactionType: "",
    });
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
          messages: [
            {
              role: "system",
              content: [
                {
                  type: "text",
                  text: `Guide user buying house by these data and return the house id that you suggest. Response in persian. Response in JSON format. Available houses: ${JSON.stringify(houses)}`,
                },
              ],
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "یک خانه در تهران",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    return {
      houseId: result.houseId,
      message: result.message,
      reasoning: result.reasoning,
    };
  } catch (error) {
    console.error("House recommendation failed:", error);
    throw new Error("Failed to get house recommendation");
  }
}
