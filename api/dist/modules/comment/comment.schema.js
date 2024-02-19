"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByCommentIdSchema = exports.getCommentsByFeedbackIdSchema = exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        content: zod_1.z.string(),
        feedbackId: zod_1.z.number(),
        predecessorId: zod_1.z.number(),
    })
        .partial()
        .refine((data) => data.feedbackId || data.predecessorId, "Either feedbackId or predecessorId should be passed."),
});
exports.getCommentsByFeedbackIdSchema = zod_1.z.object({
    body: zod_1.z.object({
        feedbackId: zod_1.z.number(),
    }),
});
exports.getUserByCommentIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        commentId: zod_1.z.string(),
    }),
});
