"use server";

import prisma from "@/lib/prisma";

export async function sendMessage(
  content: string,
  senderId: string,
  conversationId: string
) {
  return await prisma.message.create({
    data: {
      content,
      senderId,
      conversationId,
    },
    include: {
      sender: true,
    },
  });
}
