import { feedbackRouter } from "./modules/feedback";
import { Router } from "express";
import { commentRouter } from "./modules/comment/comment.routes";

export const routes = Router();

routes.use("/feedback", feedbackRouter);
routes.use("/comment", commentRouter);
