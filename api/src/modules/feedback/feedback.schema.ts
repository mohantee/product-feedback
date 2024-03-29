import { z } from "zod";

const statusSchema = z.union(
  [
    z.literal("planned"),
    z.literal("in_progress"),
    z.literal("live"),
    z.literal("suggestion"),
  ],
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

export const categoryFilterSchema = z.array(
  z.enum(["all", "ui", "ux", "enhancement", "feature", "bug"]),
);

export const createFeedbackSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: "Title is required" }),
      content: z.string({ required_error: "Content is required" }),
      category: categorySchema,
      status: statusSchema,
    })
    .strict(),
  query: z.object({}),
  params: z.object({}),
  auth: z.any(),
});

export const feedbackByIdSchema = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({
    id: z.string({ required_error: "Feedback ID is required" }),
  }),
});

const categoryFilterStringSchema = z
  .string()
  .regex(/^\s*\[\s*(?:"[^"]*"\s*(?:,\s*"[^"]*"\s*)*)?\]\s*$/)
  .optional();

export const feedbackByQuerySchema = z
  .object({
    body: z.object({}),
    query: z.object({
      filter: categoryFilterStringSchema,
      sort: z
        .union([z.literal("comments"), z.literal("upvotes")], {
          required_error: "You must sort by either comments or upvotes",
        })
        .optional(),
      order: z
        .union([z.literal("asc"), z.literal("desc")], {
          required_error: "You must either sort by 'asc' or 'desc'",
        })
        .optional(),
    }),
    params: z.object({}),
    auth: z.undefined(),
  })
  .strict();

export type FeedbackFilter = z.infer<typeof feedbackByQuerySchema>;

export const updateFeedbackSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: "Title is required" }),
      content: z.string({ required_error: "Content is required" }),
      category: categorySchema,
      status: statusSchema,
    })
    .strict(),
  query: z.object({}),
  params: z.object({
    id: z.string({ required_error: "Feedback ID is required" }),
  }),
  auth: z.any(),
});

export const upvoteSchema = z.object({
  body: z.object({
    id: z.number({ required_error: "Bad request: Feedback ID is required" }),
  }),
  query: z.object({}),
  params: z.object({}),
  auth: z.any(),
});
