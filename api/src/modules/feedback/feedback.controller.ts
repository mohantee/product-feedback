import { Request, Response } from "express";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedbackById,
  getUpvotedFeedback,
  getRoadmap,
  updateFeedback,
  upvoteFeedback,
  deleteUpvotedFeedback,
} from "./feedback.service";

export async function createFeedbackHandler(req: Request, res: Response) {
  const userId = req.auth.userId;
  req.body.userId = userId;

  try {
    const feedback = await createFeedback(req.body);
    await upvoteFeedback(feedback.id, feedback.userId);
    return res.status(201).send(feedback);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getFeedbackByIdHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const feedback = await getFeedbackById(id);
    if (!feedback)
      return res.status(400).send({ message: "Feedback ID doesn't exist" });
    // const commentCount = getCommentCount(feedback.comments);
    // const feedbackWithCommentCount = {
    //   ...feedback,
    //   _count: { ...feedback._count, comments: commentCount },
    // };
    return res.status(200).send(feedback);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getAllFeedbackHandler(req: Request, res: Response) {
  const { userId } = req.auth;
  console.log(userId);
  const feedbacks = await getAllFeedback();

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

  return res.status(200).send(feedbacksWithUpvoteStatus);
}

export async function updateFeedbackHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const userId = req.auth.userId;
  req.body.userId = userId;

  const body = req.body;
  try {
    const existingFeedback = await getFeedbackById(id);

    if (!existingFeedback)
      return res.status(500).send({ message: "Feedback ID doesn't exist" });

    if (!(existingFeedback.userId === body.userId)) {
      return res.status(500).send({ message: "Authentication error" });
    }

    const feedback = await updateFeedback(id, body);
    return res.status(200).send(feedback);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteFeedbackHander(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const feedback = await deleteFeedback(id);
    return res.status(200).send(feedback);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getRoadmapHandler(_: Request, res: Response) {
  try {
    const roadmap = await getRoadmap();
    return res.status(200).send(roadmap);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function upvoteFeedbackHandler(req: Request, res: Response) {
  if (!req.auth.userId)
    return res.status(400).send({ error: "Unauthenticated request" });
  const feedbackId = parseInt(req.params.id);
  const userId = req.auth.userId;

  try {
    // check if user has already upvoted the feedback
    const isUpvoted = await getUpvotedFeedback(feedbackId, userId);

    // return if user has already upvoted the feeback
    if (isUpvoted)
      return res
        .status(400)
        .send({ error: "User has already upvoted the feedback" });

    // otherwise post the upvote
    const upvotedFeedback = await upvoteFeedback(feedbackId, userId);
    return res.status(200).send(upvotedFeedback);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deupvoteFeedbackHandler(req: Request, res: Response) {
  if (!req.auth.userId)
    return res.status(400).send({ error: "Unauthenticated request" });
  const feedbackId = parseInt(req.params.id);
  const userId = req.auth.userId;

  try {
    // check if user has already upvoted the feedback
    const isUpvoted = await getUpvotedFeedback(feedbackId, userId);

    // if user has not upvoted the feedback, return appropriate response
    if (!isUpvoted)
      return res
        .status(400)
        .send({ error: "User has not upvoted the feedback" });

    const upvoteId = isUpvoted.id;
    // otherwise remove the upvote
    const deletedFeedback = await deleteUpvotedFeedback(upvoteId);
    return res.status(200).send(deletedFeedback);
  } catch (error) {
    return res.status(500).send({ error });
  }
}
