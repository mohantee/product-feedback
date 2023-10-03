import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string(),
    feedbackId: z.number(),
    predecessorId: z.number().optional(),
  }),
});
