import { z } from "zod";

const statusSchema = z.union(
  [z.literal("planned"), z.literal("in_progress"), z.literal("live")],
  {
    required_error: 'Status must be one of "planned", "in_progress", or "live"',
  },
);

const categorySchema = z.union(
  [
    z.literal("all"),
    z.literal("ui"),
    z.literal("ux"),
    z.literal("enhancement"),
    z.literal("bug"),
    z.literal("feature"),
  ],
  {
    required_error:
      'Category must be one of "all", "ui", "ux", "enhancement", "bug", or "feature" ',
  },
);

export const createFeedbackSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
    category: categorySchema,
    status: statusSchema,
  }),
  query: z.object({}),
  params: z.object({}),
  auth: z.any(),
});

export const feedbackByIdSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Feedback ID is required" }),
  }),
});
