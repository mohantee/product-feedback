import { prisma } from "../../../lib/prisma";
import { FeedbackInput } from "./feedback.schema";

export function createFeedback(data: FeedbackInput) {
  return prisma.feedback.create({
    data,
  });
}

export function getFeedbackById(id: number) {
  return prisma.feedback.findFirst({
    where: {
      id,
    },
  });
}

export function getAllFeedback() {
  return prisma.feedback.findMany();
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
