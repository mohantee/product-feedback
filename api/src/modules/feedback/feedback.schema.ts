import { z } from "zod";

export const createFeedbackSchema = z.object({
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  categoryId: z.number(),
  statusId: z.number(),
  upvotes: z.number().optional(),
});

export type FeedbackInput = z.infer<typeof createFeedbackSchema>;
