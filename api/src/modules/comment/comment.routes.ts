import express from "express";
import { validate } from "../../middlewares/validate";
import {
  createCommentSchema,
  getCommentsByFeedbackIdSchema,
  getUserByCommentIdSchema,
} from "./comment.schema";
import {
  createCommentHandler,
  getCommentsByFeedbackIdHandler,
  getUserByCommentIdHandler,
} from "./comment.controller";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export const commentRouter = express.Router();

commentRouter
  .route("/")
  .get(validate(getCommentsByFeedbackIdSchema), getCommentsByFeedbackIdHandler)
  .post(
    validate(createCommentSchema),
    ClerkExpressRequireAuth(),
    createCommentHandler,
  );

commentRouter
  .route("/user/:commentId")
  .get(validate(getUserByCommentIdSchema), getUserByCommentIdHandler);
