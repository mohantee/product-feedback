import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { createFeedbackSchema, feedbackByIdSchema } from "./feedback.schema";
import {
  createFeedbackHandler,
  deleteFeedbackHander,
  getFeedbackByIdHandler,
  updateFeedbackHandler,
} from "./feedback.controller";
import { getAllFeedback } from "./feedback.service";

export const feedbackRouter = Router();

feedbackRouter
  .route("/")
  .post(validate(createFeedbackSchema), createFeedbackHandler)
  .get(getAllFeedback);

feedbackRouter
  .route("/:id")
  .get(validate(feedbackByIdSchema), getFeedbackByIdHandler)
  .put(validate(feedbackByIdSchema), updateFeedbackHandler)
  .delete(validate(feedbackByIdSchema), deleteFeedbackHander);
