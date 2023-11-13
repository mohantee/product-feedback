import { Feedback } from "../types";

export function processFeedbacks(
  feedbacks: Feedback[],
  sort: string,
  filter: string
) {
  let processedFeedbacks = feedbacks;
  if (filter !== "All") {
    processedFeedbacks = feedbacks.filter(
      (feedback) => feedback.category === filter.toLowerCase()
    );
  }

  if (sort === "Most Upvotes") {
    processedFeedbacks = processedFeedbacks?.sort(
      (a, b) => b._count.upvotes - a._count.upvotes
    );
  } else if (sort === "Least Upvotes") {
    processedFeedbacks = processedFeedbacks?.sort(
      (a, b) => a._count.upvotes - b._count.upvotes
    );
  } else if (sort === "Most Comments") {
    processedFeedbacks = processedFeedbacks?.sort(
      (a, b) => b._count.comments - a._count.comments
    );
  } else if (sort === "Least Comments") {
    processedFeedbacks = processedFeedbacks?.sort(
      (a, b) => a._count.comments - b._count.comments
    );
  }

  return processedFeedbacks;
}
