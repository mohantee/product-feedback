import { z } from "zod";

export const createCommentSchema = z.object({
  body: z
    .object({
      content: z.string(),
      feedbackId: z.number(),
      predecessorId: z.number(),
    })
    .partial()
    .refine(
      (data) => data.feedbackId || data.predecessorId,
      "Either feedbackId or predecessorId should be passed.",
    ),
});

export const getCommentsByFeedbackIdSchema = z.object({
  body: z.object({
    feedbackId: z.number(),
  }),
});

export const getUserByCommentIdSchema = z.object({
  params: z.object({
    commentId: z.string(),
  }),
});
