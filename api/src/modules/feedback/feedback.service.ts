import { prisma } from "../../../lib/prisma";

type FeedbackInput = {
  title: string;
  content: string;
  status: string;
  category: string;
  userId: string;
};

export function createFeedback(data: FeedbackInput) {
  return prisma.feedback.create({
    data,
  });
}

export function getFeedbackById(id: number) {
  return prisma.feedback.findFirstOrThrow({
    where: {
      id,
    },
  });
}

export function getAllFeedback() {
  return prisma.feedback.findMany({ take: 10 });
}

export function updateFeedback(id: number, data: FeedbackInput) {
  return prisma.feedback.update({
    where: {
      id,
    },
    data,
  });
}

export function deleteFeedback(id: number) {
  return prisma.feedback.delete({ where: { id } });
}
