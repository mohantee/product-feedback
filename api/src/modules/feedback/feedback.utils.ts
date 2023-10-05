import { Comment, Feedback } from "@prisma/client";

// Typescript has no support for aggregating data of a
// model with its relations. These utility functions
// are created for that purpose.

interface CommentWithReplies extends Comment {
  replies?: Comment[];
}

interface FeedbackWithComments extends Feedback {
  comments: Comment[];
  _count: {
    upvotes: number;
  };
}

export function getCommentCount(comments: CommentWithReplies[]): number {
  let totalComments = 0;

  for (const comment of comments) {
    totalComments += getRepliesCount(comment);
  }

  return totalComments;
}

function getRepliesCount(comment: CommentWithReplies): number {
  let count = 1;
  if (!comment.replies) return count;
  for (const reply of comment.replies) {
    count += getRepliesCount(reply);
  }
  return count;
}

export function sortByCommentCount(
  feedbacks: Feedback[],
  order: "asc" | "desc",
) {
  if (order === "asc") {
    const feedbacksWithCommentCountAsc = feedbacks.sort(
      (a: any, b: any) => a._count.comments - b._count.comments,
    );
    return feedbacksWithCommentCountAsc;
  } else if (order === "desc") {
    const feedbacksWithCommentCountDesc = feedbacks.sort(
      (a: any, b: any) => b._count.comments - a._count.comments,
    );
    return feedbacksWithCommentCountDesc;
  }
}

export function getFeedbacksWithCommentCount(
  feedbacks: FeedbackWithComments[],
) {
  return feedbacks.map((feedback: FeedbackWithComments) => {
    const feedbackCommentCount = getCommentCount(feedback.comments);

    // strip comments property which is not required
    // if the client requests all feedbacks
    const { comments = undefined, ...rest } = {
      ...feedback,
      _count: { ...feedback._count, comments: feedbackCommentCount },
    };
    return rest;
  });
}
