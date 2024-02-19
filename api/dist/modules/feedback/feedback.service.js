"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbacksByStatus = exports.deleteUpvotedFeedback = exports.getUpvotedFeedback = exports.upvoteFeedback = exports.getRoadmap = exports.deleteFeedback = exports.updateFeedback = exports.getAllFeedback = exports.getFeedbackByCategory = exports.getFeedbackByStatus = exports.getFeedbackById = exports.createFeedback = void 0;
const prisma_1 = require("../../lib/prisma");
const feedback_helpers_1 = require("./feedback.helpers");
function createFeedback(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedback = yield prisma_1.prisma.feedback.create({
            data,
            include: {
                _count: {
                    select: { upvotes: true, comments: true },
                },
            },
        });
        return feedback;
    });
}
exports.createFeedback = createFeedback;
function getFeedbackById(id) {
    return prisma_1.prisma.feedback.findUnique({
        where: {
            id,
        },
        include: {
            comments: {
                include: {
                    replies: (0, feedback_helpers_1.recursive)(30),
                },
            },
            _count: {
                select: {
                    upvotes: true,
                    comments: true,
                },
            },
        },
    });
}
exports.getFeedbackById = getFeedbackById;
function getFeedbackByStatus(status) {
    return prisma_1.prisma.feedback.findMany({
        where: {
            status,
        },
    });
}
exports.getFeedbackByStatus = getFeedbackByStatus;
function getFeedbackByCategory(category) {
    return prisma_1.prisma.feedback.findMany({
        where: {
            category,
        },
    });
}
exports.getFeedbackByCategory = getFeedbackByCategory;
function getAllFeedback() {
    return prisma_1.prisma.feedback.findMany({
        include: {
            _count: {
                select: {
                    upvotes: true,
                    comments: true,
                },
            },
        },
    });
}
exports.getAllFeedback = getAllFeedback;
function updateFeedback(id, data) {
    return prisma_1.prisma.feedback.update({
        where: {
            id,
        },
        data,
    });
}
exports.updateFeedback = updateFeedback;
function deleteFeedback(id) {
    return prisma_1.prisma.feedback.delete({ where: { id } });
}
exports.deleteFeedback = deleteFeedback;
function getRoadmap() {
    return __awaiter(this, void 0, void 0, function* () {
        const plannedCount = yield prisma_1.prisma.feedback.count({
            where: {
                status: "planned",
            },
        });
        const inProgressCount = yield prisma_1.prisma.feedback.count({
            where: {
                status: "in_progress",
            },
        });
        const liveCount = yield prisma_1.prisma.feedback.count({
            where: {
                status: "live",
            },
        });
        const roadmapStatus = {
            planned_count: plannedCount,
            in_progress_count: inProgressCount,
            live_count: liveCount,
        };
        return roadmapStatus;
    });
}
exports.getRoadmap = getRoadmap;
function upvoteFeedback(feedbackId, userId) {
    return prisma_1.prisma.upvote.create({
        data: {
            feedbackId,
            userId,
        },
    });
}
exports.upvoteFeedback = upvoteFeedback;
function getUpvotedFeedback(feedbackId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.upvote.findFirst({
            where: {
                feedbackId,
                userId,
            },
        });
    });
}
exports.getUpvotedFeedback = getUpvotedFeedback;
function deleteUpvotedFeedback(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.upvote.delete({
            where: {
                id,
            },
        });
    });
}
exports.deleteUpvotedFeedback = deleteUpvotedFeedback;
function getFeedbacksByStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_1.prisma.feedback.findMany({
            where: {
                status,
            },
            include: {
                _count: {
                    select: {
                        upvotes: true,
                        comments: true,
                    },
                },
            },
        });
    });
}
exports.getFeedbacksByStatus = getFeedbacksByStatus;
