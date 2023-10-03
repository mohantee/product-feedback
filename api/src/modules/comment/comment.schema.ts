import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.union([
    z
      .object({
        content: z.string(),
        feedbackId: z.number(),
      })
      .strict(),
    z
      .object({
        content: z.string(),
        predecessorId: z.number(),
      })
      .strict(),
  ]),
});
