import { prisma } from "../../lib/prisma";
import { categoryFilterSchema } from "./feedback.schema";

interface FeedbackInput {
  title: string;
  content: string;
  status: string;
  category: string;
  userId: string;
}

export function createFeedback(data: FeedbackInput) {
  return prisma.feedback.create({
    data,
  });
}

export function getFeedbackById(id: number) {
  return prisma.feedback.findUnique({
    where: {
      id,
    },
    include: {
      comments: {
        include: {
          replies: true,
        },
      },
    },
  });
}

export function getFeedbackByQuery(query: any) {
  let { filter, sort, order } = query;
  if (filter) {
    filter = JSON.parse(filter);
    categoryFilterSchema.parse(filter);
  }

  return prisma.feedback.findMany({
    include: {
      comments: {
        include: {
          replies: true,
        },
      },
    },
    where: {
      category: {
        in: filter,
      },
    },
    orderBy: {
      [sort]: order,
    },
  });
}

export function getFeedbackByStatus(status: string) {
  return prisma.feedback.findMany({
    where: {
      status,
    },
  });
}

export function getFeedbackByCategory(category: string) {
  return prisma.feedback.findMany({
    where: {
      category,
    },
  });
}

export function getAllFeedback() {
  return prisma.feedback.findMany({
    include: {
      comments: {
        include: {
          replies: true,
        },
      },
    },
    take: 10,
  });
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
