import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.union([
    z
      .object({
        content: z.string(),
        feedbackId: z.number().optional(),
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
