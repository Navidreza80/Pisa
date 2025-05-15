"use server";
// Dependencies
import prisma from "@/lib/prisma";

/**
 * Server action to create message.
 * @params - content, senderId, conversationId.
 * @return message.
 **/

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
