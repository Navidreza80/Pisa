import http from "@/utils/interceptor";
import { useMutation } from "@tanstack/react-query";

interface PaymentRequest {
  amount: number;
  description: string;
  callbackUrl: string;
  bookingId: number;
}



export async function sendPaymentRequest(data: PaymentRequest) {
  const response = await http.post("/payments", data);
  return response.data;
}

export const usePayment = () => {
  return useMutation({
    mutationFn: sendPaymentRequest,
  });
};
