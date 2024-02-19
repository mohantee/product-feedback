"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = void 0;
const express_1 = require("express");
const validate_1 = require("../../middlewares/validate");
const feedback_schema_1 = require("./feedback.schema");
const feedback_controller_1 = require("./feedback.controller");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
exports.feedbackRouter = (0, express_1.Router)();
exports.feedbackRouter.route("/roadmap").get(feedback_controller_1.getRoadmapHandler);
exports.feedbackRouter
    .route("/roadmaps")
    .get((0, clerk_sdk_node_1.ClerkExpressWithAuth)(), feedback_controller_1.getFeedbacksByRoadmapStatus);
exports.feedbackRouter
    .route("/upvote")
    .post((0, validate_1.validate)(feedback_schema_1.upvoteSchema), (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), feedback_controller_1.upvoteFeedbackHandler)
    .delete((0, validate_1.validate)(feedback_schema_1.upvoteSchema), (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), feedback_controller_1.deupvoteFeedbackHandler);
exports.feedbackRouter
    .route("/")
    .post((0, validate_1.validate)(feedback_schema_1.createFeedbackSchema), (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), feedback_controller_1.createFeedbackHandler)
    .get((0, validate_1.validate)(feedback_schema_1.feedbackByQuerySchema), (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), feedback_controller_1.getAllFeedbackHandler);
exports.feedbackRouter
    .route("/:id")
    .get((0, validate_1.validate)(feedback_schema_1.feedbackByIdSchema), (0, clerk_sdk_node_1.ClerkExpressWithAuth)(), feedback_controller_1.getFeedbackByIdHandler)
    .put((0, validate_1.validate)(feedback_schema_1.updateFeedbackSchema), (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), feedback_controller_1.updateFeedbackHandler)
    .delete((0, validate_1.validate)(feedback_schema_1.feedbackByIdSchema), (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), feedback_controller_1.deleteFeedbackHander);
