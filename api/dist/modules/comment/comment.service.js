"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByCommentId = exports.getCommentsByFeedbackId = exports.createComment = void 0;
const prisma_1 = require("../../lib/prisma");
function createComment(data) {
    return prisma_1.prisma.comment.create({
        data,
    });
}
exports.createComment = createComment;
function getCommentsByFeedbackId(id) {
    return prisma_1.prisma.comment.findMany({
        where: {
            feedbackId: id,
        },
        include: {
            replies: true,
        },
    });
}
exports.getCommentsByFeedbackId = getCommentsByFeedbackId;
function getUserByCommentId(id) {
    return prisma_1.prisma.comment.findFirst({
        where: {
            id,
        },
        select: {
            userName: true,
        },
    });
}
exports.getUserByCommentId = getUserByCommentId;
