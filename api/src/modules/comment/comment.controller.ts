import { Request, Response } from "express";
import {
  createComment,
  getCommentsByFeedbackId,
  getUserByCommentId,
} from "./comment.service";
import clerkClient from "@clerk/clerk-sdk-node";

export async function createCommentHandler(req: Request, res: Response) {
  try {
    const userId = req.auth.userId as string;
    const user = await clerkClient.users.getUser(userId);
    req.body.userId = userId;
    req.body.fullName = `${user.firstName} ${user.lastName}`;
    req.body.avatar = user.imageUrl;
    req.body.userName = user.username;
    if (req.body.predecessorId) {
      req.body.predecessorUsername = (
        await getUserByCommentId(req.body.predecessorId)
      )?.userName;
    }

    const comment = await createComment(req.body);

    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
}

export async function getCommentsByFeedbackIdHandler(
  req: Request,
  res: Response,
) {
  const { feedbackId } = req.body;

  try {
    const comments = await getCommentsByFeedbackId(feedbackId);
    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
}

export async function getUserByCommentIdHandler(req: Request, res: Response) {
  const { commentId } = req.params;

  try {
    const userName = await getUserByCommentId(parseInt(commentId));
    return res.status(200).send(userName);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
}
