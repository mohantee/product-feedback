import { Request, Response } from "express";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
} from "./feedback.service";

export async function createFeedbackHandler(req: Request, res: Response) {
  if (!req.auth)
    return res
      .status(400)
      .send({ message: "Please login to create a feedback" });

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
    return res.status(200).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getAllFeedbackHandler(_: Response, res: Response) {
  const feedbacks = await getAllFeedback();
  res.status(200).send(feedbacks);
}

export async function updateFeedbackHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { data } = req.body;
  try {
    const feedback = await updateFeedback(id, data);
    res.status(200).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteFeedbackHander(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const feedback = await deleteFeedback(id);
    res.status(200).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
}
