import { prisma } from "../../lib/prisma";

interface CommentInput {
  content: string;
  feedbackId: number;
  userId: string;
  predecessorId: number;
  userName: string;
  fullName: string;
  avatar: string;
}

export function createComment(data: CommentInput) {
  return prisma.comment.create({
    data,
  });
}

export function getCommentsByFeedbackId(id: number) {
  return prisma.comment.findMany({
    where: {
      feedbackId: id,
    },
    include: {
      replies: true,
    },
  });
}

export function getUserByCommentId(id: number) {
  return prisma.comment.findFirst({
    where: {
      id,
    },
    select: {
      userName: true,
    },
  });
}
