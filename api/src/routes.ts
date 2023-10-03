import { feedbackRouter } from "./modules/feedback";
import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { commentRouter } from "./modules/comment/comment.routes";

export const routes = Router();

routes.use("/feedback", ClerkExpressRequireAuth(), feedbackRouter);
routes.use("/comment", ClerkExpressRequireAuth(), commentRouter);
