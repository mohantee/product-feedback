import { Router } from "express";
import { validate } from "../../middlewares/validate";
import {
  createFeedbackSchema,
  feedbackByIdSchema,
  feedbackByQuerySchema,
  updateFeedbackSchema,
} from "./feedback.schema";
import {
  createFeedbackHandler,
  deleteFeedbackHander,
  // getAllFeedbackHandler,
  getFeedbackByQueryHandler,
  getFeedbackByIdHandler,
  updateFeedbackHandler,
} from "./feedback.controller";

export const feedbackRouter = Router();

feedbackRouter
  .route("/")
  .post(validate(createFeedbackSchema), createFeedbackHandler)
  .get(validate(feedbackByQuerySchema), getFeedbackByQueryHandler);

feedbackRouter
  .route("/:id")
  .get(validate(feedbackByIdSchema), getFeedbackByIdHandler)
  .put(validate(updateFeedbackSchema), updateFeedbackHandler)
  .delete(validate(feedbackByIdSchema), deleteFeedbackHander);
