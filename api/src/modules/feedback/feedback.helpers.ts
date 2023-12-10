import { Feedback } from "@prisma/client";
import { getUpvotedFeedback } from "./feedback.service";

export async function getUpvoteStatus(
  feedbacks: Feedback[],
  userId?: string | null,
) {
  const feedbacksWithUpvoteStatus = await Promise.all(
    feedbacks.map(async (feedback) => {
      let isUpvoted;
      if (userId) {
        isUpvoted = await getUpvotedFeedback(feedback.id, userId);
      } else {
        isUpvoted = false;
      }
      return { ...feedback, isUpvoted: !!isUpvoted };
    }),
  );

  return feedbacksWithUpvoteStatus;
}

//@ts-ignore
export function recursive(level: number) {
  if (level === 0) {
    return {
      include: {
        replies: true,
      },
    };
  }
  return {
    include: {
      replies: recursive(level - 1),
    },
  };
}
