import express from "express";
import { validate } from "../../middlewares/validate";
import { createCommentSchema } from "./comment.schema";
import { createCommentHandler } from "./comment.controller";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export const commentRouter = express.Router();

commentRouter
  .route("/")
  .post(
    validate(createCommentSchema),
    ClerkExpressRequireAuth(),
    createCommentHandler,
  );
