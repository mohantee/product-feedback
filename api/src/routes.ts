import { feedbackRouter } from "./modules/feedback";
import { Router } from "express";
import {
  ClerkExpressWithAuth,
  ClerkExpressRequireAuth,
} from "@clerk/clerk-sdk-node";

export const routes = Router();

routes.use("/feedback", ClerkExpressRequireAuth(), feedbackRouter);
