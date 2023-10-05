import { prisma } from "../../lib/prisma";
import { categoryFilterSchema } from "./feedback.schema";

interface FeedbackInput {
  title: string;
  content: string;
  status: string;
  category: string;
  userId: string;
}

export async function createFeedback(data: FeedbackInput) {
  const feedback = await prisma.feedback.create({
    data,
  });

  return feedback;
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
      _count: {
        select: {
          upvotes: true,
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

export async function getRoadmap() {
  const plannedCount = await prisma.feedback.count({
    where: {
      status: "planned",
    },
  });

  const inProgressCount = await prisma.feedback.count({
    where: {
      status: "in_progress",
    },
  });

  const liveCount = await prisma.feedback.count({
    where: {
      status: "live",
    },
  });

  const roadmapStatus = {
    planned_count: plannedCount,
    in_progress_count: inProgressCount,
    live_count: liveCount,
  };

  return roadmapStatus;
}

export function upvoteFeedback(feedbackId: number, userId: string) {
  return prisma.upvote.create({
    data: {
      feedbackId,
      userId,
    },
  });
}

export async function getUpvotedFeedback(feedbackId: number, userId: string) {
  return prisma.upvote.findFirst({
    where: {
      feedbackId,
      userId,
    },
  });
}

export async function deleteUpvotedFeedback(id: number) {
  return prisma.upvote.delete({
    where: {
      id,
    },
  });
}
