export function countFeedbackComments(comments: any): number {
  let totalComments = 0;

  for (const comment of comments) {
    totalComments += countCommentReplies(comment);
  }

  return totalComments;
}

function countCommentReplies(comment: any): number {
  let count = 1;
  if (!comment.replies) return count;
  for (const reply of comment.replies) {
    count += countCommentReplies(reply);
  }
  return count;
}

export function sortFeedbacksByCommentCount(feedbacks: any, order: any) {
  if (order === "asc") {
    const feedbacksWithCommentCountAsc = feedbacks.sort(
      (a: any, b: any) => a.commentCount - b.commentCount,
    );
    return feedbacksWithCommentCountAsc;
  } else if (order === "desc") {
    const feedbacksWithCommentCountDesc = feedbacks.sort(
      (a: any, b: any) => b.commentCount - a.commentCount,
    );
    return feedbacksWithCommentCountDesc;
  }
}
