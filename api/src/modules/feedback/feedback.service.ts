import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

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

export function getFeedbackByQuery(data: any) {
  let { filter, sort, order } = data;
  console.log(filter, sort, order);

  // HACK! see: https://github.com/prisma/prisma/issues/11104#issuecomment-1062556068
  if (order === "asc") order = Prisma.SortOrder.asc;
  if (order === "desc") order = Prisma.SortOrder.desc;

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
      [sort]: {
        _count: order,
      },
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
