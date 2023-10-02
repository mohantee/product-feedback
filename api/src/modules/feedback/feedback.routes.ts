import { Router } from "express";
import { validate } from "../../middlewares/validate";
import {
  createFeedbackSchema,
  feedbackByIdSchema,
  updateFeedbackSchema,
} from "./feedback.schema";
import {
  createFeedbackHandler,
  deleteFeedbackHander,
  getAllFeedbackHandler,
  getFeedbackByIdHandler,
  updateFeedbackHandler,
} from "./feedback.controller";

export const feedbackRouter = Router();

feedbackRouter
  .route("/")
  .post(validate(createFeedbackSchema), createFeedbackHandler)
  .get(getAllFeedbackHandler);

feedbackRouter
  .route("/:id")
  .get(validate(feedbackByIdSchema), getFeedbackByIdHandler)
  .put(validate(updateFeedbackSchema), updateFeedbackHandler)
  .delete(validate(feedbackByIdSchema), deleteFeedbackHander);
