// Interceptor
import http from "@/utils/interceptor";

export async function ToggleNotificationSetting(payload: {
  id: string;
  on: boolean;
}) {
  try {
    const response = await http.put(
      `/targeted-notifications/settings/${payload.id}`,
      {
        criteria: {
          on: payload.on,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error editing notification setting:", error);
    throw error;
  }
}
