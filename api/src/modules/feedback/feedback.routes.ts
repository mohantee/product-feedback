import { Router } from "express";
import { validate } from "../../middlewares/validate";
import {
  createFeedbackSchema,
  feedbackByIdSchema,
  feedbackByQuerySchema,
  updateFeedbackSchema,
  upvoteSchema,
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
  getFeedbacksByRoadmapStatus,
} from "./feedback.controller";
import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";

export const feedbackRouter = Router();

feedbackRouter.route("/roadmap").get(getRoadmapHandler);
feedbackRouter
  .route("/roadmaps")
  .get(ClerkExpressWithAuth(), getFeedbacksByRoadmapStatus);

feedbackRouter
  .route("/upvote")
  .post(
    validate(upvoteSchema),
    ClerkExpressRequireAuth(),
    upvoteFeedbackHandler,
  )
  .delete(
    validate(upvoteSchema),
    ClerkExpressRequireAuth(),
    deupvoteFeedbackHandler,
  );

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
  .get(
    validate(feedbackByIdSchema),
    ClerkExpressWithAuth(),
    getFeedbackByIdHandler,
  )
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
