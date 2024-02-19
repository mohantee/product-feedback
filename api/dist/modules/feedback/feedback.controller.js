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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbacksByRoadmapStatus = exports.deupvoteFeedbackHandler = exports.upvoteFeedbackHandler = exports.getRoadmapHandler = exports.deleteFeedbackHander = exports.updateFeedbackHandler = exports.getAllFeedbackHandler = exports.getFeedbackByIdHandler = exports.createFeedbackHandler = void 0;
const feedback_service_1 = require("./feedback.service");
const feedback_helpers_1 = require("./feedback.helpers");
const clerk_sdk_node_1 = __importDefault(require("@clerk/clerk-sdk-node"));
function createFeedbackHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.auth.userId;
        req.body.userId = userId;
        try {
            const feedback = yield (0, feedback_service_1.createFeedback)(req.body);
            yield (0, feedback_service_1.upvoteFeedback)(feedback.id, feedback.userId);
            return res.status(201).send(feedback);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
}
exports.createFeedbackHandler = createFeedbackHandler;
function getFeedbackByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        let user;
        const { userId } = req.auth;
        if (userId) {
            // return res.status(400).send({ message: "Unauthenticated request" });
            user = yield clerk_sdk_node_1.default.users.getUser(userId);
        }
        try {
            const feedback = yield (0, feedback_service_1.getFeedbackById)(id);
            if (!feedback)
                return res.status(400).send({ message: "Feedback ID doesn't exist" });
            const feedbacksWithUpvoteStatus = yield (0, feedback_helpers_1.getUpvoteStatus)([feedback], userId);
            return res.status(200).send(Object.assign({}, feedbacksWithUpvoteStatus[0]));
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
}
exports.getFeedbackByIdHandler = getFeedbackByIdHandler;
function getAllFeedbackHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.auth;
        try {
            const feedbacks = yield (0, feedback_service_1.getAllFeedback)();
            if (!userId) {
                return res.status(200).send(feedbacks);
            }
            const feedbacksWithUpvoteStatus = yield (0, feedback_helpers_1.getUpvoteStatus)(feedbacks, userId);
            return res.status(200).send(feedbacksWithUpvoteStatus);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    });
}
exports.getAllFeedbackHandler = getAllFeedbackHandler;
function updateFeedbackHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const userId = req.auth.userId;
        req.body.userId = userId;
        if (!userId) {
            return res.status(400).send({ message: "Authentication error" });
        }
        const body = req.body;
        try {
            const existingFeedback = yield (0, feedback_service_1.getFeedbackById)(id);
            if (!existingFeedback)
                return res.status(400).send({ message: "Feedback ID doesn't exist" });
            if (!(existingFeedback.userId === body.userId)) {
                return res.status(400).send({ message: "Authentication error" });
            }
            const feedback = yield (0, feedback_service_1.updateFeedback)(id, body);
            return res.status(200).send(feedback);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
}
exports.updateFeedbackHandler = updateFeedbackHandler;
function deleteFeedbackHander(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const feedback = yield (0, feedback_service_1.deleteFeedback)(id);
            return res.status(200).send(feedback);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
}
exports.deleteFeedbackHander = deleteFeedbackHander;
function getRoadmapHandler(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roadmap = yield (0, feedback_service_1.getRoadmap)();
            return res.status(200).send(roadmap);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
}
exports.getRoadmapHandler = getRoadmapHandler;
function upvoteFeedbackHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.auth.userId)
            return res.status(400).send({ error: "Unauthenticated request" });
        const feedbackId = parseInt(req.body.id);
        const userId = req.auth.userId;
        try {
            // check if user has already upvoted the feedback
            const isUpvoted = yield (0, feedback_service_1.getUpvotedFeedback)(feedbackId, userId);
            // return if user has already upvoted the feeback
            if (isUpvoted)
                return res
                    .status(400)
                    .send({ error: "User has already upvoted the feedback" });
            // otherwise post the upvote
            const upvotedFeedback = yield (0, feedback_service_1.upvoteFeedback)(feedbackId, userId);
            return res.status(200).send(upvotedFeedback);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
}
exports.upvoteFeedbackHandler = upvoteFeedbackHandler;
function deupvoteFeedbackHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.auth.userId)
            return res.status(400).send({ error: "Unauthenticated request" });
        const feedbackId = parseInt(req.body.id);
        const userId = req.auth.userId;
        try {
            // check if user has already upvoted the feedback
            const isUpvoted = yield (0, feedback_service_1.getUpvotedFeedback)(feedbackId, userId);
            // if user has not upvoted the feedback, return appropriate response
            if (!isUpvoted)
                return res
                    .status(400)
                    .send({ error: "User has not upvoted the feedback" });
            const upvoteId = isUpvoted.id;
            // otherwise remove the upvote
            const deletedFeedback = yield (0, feedback_service_1.deleteUpvotedFeedback)(upvoteId);
            return res.status(200).send(deletedFeedback);
        }
        catch (error) {
            return res.status(500).send({ error });
        }
    });
}
exports.deupvoteFeedbackHandler = deupvoteFeedbackHandler;
function getFeedbacksByRoadmapStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.auth;
        try {
            const live = yield (0, feedback_service_1.getFeedbacksByStatus)("live");
            const inProgress = yield (0, feedback_service_1.getFeedbacksByStatus)("in_progress");
            const planned = yield (0, feedback_service_1.getFeedbacksByStatus)("planned");
            const liveWithUpvoteStatus = yield (0, feedback_helpers_1.getUpvoteStatus)(live, userId);
            const inProgressWithUpvoteStatus = yield (0, feedback_helpers_1.getUpvoteStatus)(inProgress, userId);
            const plannedWithUpvoteStatus = yield (0, feedback_helpers_1.getUpvoteStatus)(planned, userId);
            return res.status(200).send({
                live: liveWithUpvoteStatus,
                in_progress: inProgressWithUpvoteStatus,
                planned: plannedWithUpvoteStatus,
            });
        }
        catch (error) {
            return res.status(500).send({ error });
        }
    });
}
exports.getFeedbacksByRoadmapStatus = getFeedbacksByRoadmapStatus;
