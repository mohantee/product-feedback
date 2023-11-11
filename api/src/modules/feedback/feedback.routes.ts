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
  getFeedbackByIdHandler,
  updateFeedbackHandler,
  getRoadmapHandler,
  upvoteFeedbackHandler,
  deupvoteFeedbackHandler,
  getAllFeedbackHandler,
} from "./feedback.controller";
import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";

export const feedbackRouter = Router();

feedbackRouter.route("/roadmap").get(getRoadmapHandler);

feedbackRouter
  .route("/upvote/:id")
  .get(ClerkExpressRequireAuth(), upvoteFeedbackHandler)
  .delete(ClerkExpressRequireAuth(), deupvoteFeedbackHandler);

feedbackRouter
  .route("/")
  .post(
    validate(createFeedbackSchema),
    ClerkExpressRequireAuth(),
    createFeedbackHandler,
  )
  .get(
    validate(feedbackByQuerySchema),
    ClerkExpressWithAuth(),
    getAllFeedbackHandler,
  );

feedbackRouter
  .route("/:id")
  .get(validate(feedbackByIdSchema), getFeedbackByIdHandler)
  .put(
    validate(updateFeedbackSchema),
    ClerkExpressRequireAuth(),
    updateFeedbackHandler,
  )
  .delete(
    validate(feedbackByIdSchema),
    ClerkExpressRequireAuth(),
    deleteFeedbackHander,
  );
