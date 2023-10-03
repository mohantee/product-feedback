import { Request, Response } from "express";
import { createComment } from "./comment.service";

export async function createCommentHandler(req: Request, res: Response) {
  const userId = req.auth.userId;
  req.body.userId = userId;

  try {
    const comment = await createComment(req.body);
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
}
