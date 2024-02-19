"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upvoteSchema = exports.updateFeedbackSchema = exports.feedbackByQuerySchema = exports.feedbackByIdSchema = exports.createFeedbackSchema = exports.categoryFilterSchema = void 0;
const zod_1 = require("zod");
const statusSchema = zod_1.z.union([
    zod_1.z.literal("planned"),
    zod_1.z.literal("in_progress"),
    zod_1.z.literal("live"),
    zod_1.z.literal("suggestion"),
], {
    required_error: 'Status must be one of "planned", "in_progress", or "live"',
});
const categorySchema = zod_1.z.union([
    zod_1.z.literal("all"),
    zod_1.z.literal("ui"),
    zod_1.z.literal("ux"),
    zod_1.z.literal("enhancement"),
    zod_1.z.literal("bug"),
    zod_1.z.literal("feature"),
], {
    required_error: 'Category must be one of "all", "ui", "ux", "enhancement", "bug", or "feature" ',
});
exports.categoryFilterSchema = zod_1.z.array(zod_1.z.enum(["all", "ui", "ux", "enhancement", "feature", "bug"]));
exports.createFeedbackSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z.string({ required_error: "Title is required" }),
        content: zod_1.z.string({ required_error: "Content is required" }),
        category: categorySchema,
        status: statusSchema,
    })
        .strict(),
    query: zod_1.z.object({}),
    params: zod_1.z.object({}),
    auth: zod_1.z.any(),
});
exports.feedbackByIdSchema = zod_1.z.object({
    body: zod_1.z.object({}),
    query: zod_1.z.object({}),
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Feedback ID is required" }),
    }),
});
const categoryFilterStringSchema = zod_1.z
    .string()
    .regex(/^\s*\[\s*(?:"[^"]*"\s*(?:,\s*"[^"]*"\s*)*)?\]\s*$/)
    .optional();
exports.feedbackByQuerySchema = zod_1.z
    .object({
    body: zod_1.z.object({}),
    query: zod_1.z.object({
        filter: categoryFilterStringSchema,
        sort: zod_1.z
            .union([zod_1.z.literal("comments"), zod_1.z.literal("upvotes")], {
            required_error: "You must sort by either comments or upvotes",
        })
            .optional(),
        order: zod_1.z
            .union([zod_1.z.literal("asc"), zod_1.z.literal("desc")], {
            required_error: "You must either sort by 'asc' or 'desc'",
        })
            .optional(),
    }),
    params: zod_1.z.object({}),
    auth: zod_1.z.undefined(),
})
    .strict();
exports.updateFeedbackSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z.string({ required_error: "Title is required" }),
        content: zod_1.z.string({ required_error: "Content is required" }),
        category: categorySchema,
        status: statusSchema,
    })
        .strict(),
    query: zod_1.z.object({}),
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Feedback ID is required" }),
    }),
    auth: zod_1.z.any(),
});
exports.upvoteSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.number({ required_error: "Bad request: Feedback ID is required" }),
    }),
    query: zod_1.z.object({}),
    params: zod_1.z.object({}),
    auth: zod_1.z.any(),
});
