import { prisma } from "../../../lib/prisma";

interface CommentInput {
  content: string;
  feedbackId: number;
  userId: string;
  predecessorId: number;
}

export function createComment(data: CommentInput) {
  return prisma.comment.create({
    data,
  });
}
