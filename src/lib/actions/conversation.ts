"use server";

import prisma from "@/lib/prisma";

export async function getUserConversations(userId: string) {
  return await prisma.conversation.findMany({
    where: {
      participants: {
        some: { dbId: userId },
      },
    },
    include: {
      messages: {
        include: { sender: true },
        orderBy: { createdAt: "asc" },
      },
      participants: {
        select: {
          dbId: true,
          name: true,
          email: true,
          isAdmin: true,
        },
      },
    },
  });
}

export async function createConversation(userId: string) {
  const user = await prisma.user.findUnique({
    where: { dbId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.conversation.create({
    data: {
      participants: {
        connect: { dbId: userId },
      },
    },
    include: {
      participants: true,
      messages: true,
    },
  });
}

export async function getOrCreateConversation(userId: string) {
  const existing = await prisma.conversation.findFirst({
    where: {
      participants: {
        some: { dbId: userId },
      },
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        include: { sender: true },
      },
      participants: true,
    },
  });

  return existing || createConversation(userId);
}

export async function addParticipant(conversationId: string, userId: string) {
  return await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      participants: {
        connect: { dbId: userId },
      },
    },
  });
}

export async function getConversations() {
  return await prisma.conversation.findMany({
    include: {
      participants: true,
      messages: {
        orderBy: { createdAt: "asc" },
        include: { sender: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}
