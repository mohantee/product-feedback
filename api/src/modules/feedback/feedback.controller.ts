import { Request, Response } from "express";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedbackById,
  getFeedbackByQuery,
  updateFeedback,
} from "./feedback.service";
import {
  countFeedbackComments,
  sortFeedbacksByCommentCount,
} from "./feedback.utils";

export async function createFeedbackHandler(req: Request, res: Response) {
  const userId = req.auth.userId;
  req.body.userId = userId;

  try {
    const feedback = await createFeedback(req.body);
    return res.status(201).send(feedback);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getFeedbackByIdHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const feedback = await getFeedbackById(id);
    const commentCount = countFeedbackComments(feedback?.comments);
    return res.status(200).send({ ...feedback, commentCount });
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getFeedbackByQueryHandler(req: Request, res: Response) {
  let query = req.query;
  try {
    // return every feedback if no query params are set
    if (!query.sort && !query.filter) {
      const feedbacks = await getAllFeedback();
      const feedbacksWithCommentCount = feedbacks.map((feedback) => {
        const feedbackCommentCount = countFeedbackComments(feedback.comments);

        // strip comments property which is not required
        // if the client requests all feedbacks
        const { comments, ...rest } = {
          ...feedback,
          commentCount: feedbackCommentCount,
        };
        return rest;
      });
      return res.status(200).send(feedbacksWithCommentCount);
    }

    // check if need to sort by upvotes
    if (query.sort === "upvotes") {
      const feedbacks = await getFeedbackByQuery(query);
      return res.status(200).send(feedbacks);
    }

    // otherwise create custom logic to sort by comments since
    // prisma has no support for recursively counting nested
    // relations
    else if (query.sort === "comments") {
      const { order } = query;
      query.sort = undefined;
      query.order = undefined;
      const feedbacks = await getFeedbackByQuery(query);

      // get number of comments in each feedback
      const feedbacksWithCommentCount = feedbacks.map((feedback) => {
        const feedbackCommentCount = countFeedbackComments(feedback.comments);
        const feedbackWithCommentCount = {
          ...feedback,
          commentCount: feedbackCommentCount,
        };
        return feedbackWithCommentCount;
      });

      console.log(feedbacksWithCommentCount);

      const sortedFeedbacks = sortFeedbacksByCommentCount(
        feedbacksWithCommentCount,
        order,
      );

      console.log(sortedFeedbacks);

      return res.status(200).send(sortedFeedbacks);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getAllFeedbackHandler(_: Request, res: Response) {
  const feedbacks = await getAllFeedback();
  return res.status(200).send(feedbacks);
}

export async function updateFeedbackHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const userId = req.auth.userId;
  req.body.userId = userId;

  const body = req.body;
  try {
    const existingFeedback = await getFeedbackById(id);

    if (!existingFeedback)
      return res.status(400).send({ message: "Feedback ID doesn't exist" });

    if (!(existingFeedback.userId === body.userId)) {
      return res.status(400).send({ message: "Authentication error" });
    }

    const feedback = await updateFeedback(id, body);
    return res.status(200).send(feedback);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function deleteFeedbackHander(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const feedback = await deleteFeedback(id);
    return res.status(200).send(feedback);
  } catch (error) {
    return res.status(400).send(error);
  }
}
