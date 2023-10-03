export function countFeedbackComments(comments: any): number {
  let totalComments = 0;

  for (const comment of comments) {
    totalComments += countCommentReplies(comment);
  }

  return totalComments;
}

function countCommentReplies(comment: any): number {
  console.log(comment);
  let count = 1;
  if (!comment.replies) return count;
  for (const reply of comment.replies) {
    count += countCommentReplies(reply);
  }
  return count;
}
