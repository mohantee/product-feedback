import { prisma } from "../../../lib/prisma";

type FeedbackInput = {
  title: string;
  content: string;
  status: string;
  category: string;
  userId: string;
};

const select = {
  id: true,
  upvotes: true,
  title: true,
  content: true,
  userId: true,
  category: true,
  status: true,
  createdAt: true,
};

export function createFeedback(data: FeedbackInput) {
  return prisma.feedback.create({
    data,
    select,
  });
}

export function getFeedbackById(id: number) {
  return prisma.feedback.findFirstOrThrow({
    where: {
      id,
    },
    select,
  });
}

export function getAllFeedback() {
  return prisma.feedback.findMany({
    select,
  });
}

export function updateFeedback(id: number, data: FeedbackInput) {
  return prisma.feedback.update({
    where: {
      id,
    },
    data,
    select,
  });
}

export function deleteFeedback(id: number) {
  return prisma.feedback.delete({ where: { id }, select: select });
}
