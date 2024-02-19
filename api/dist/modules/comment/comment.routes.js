"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../middlewares/validate");
const comment_schema_1 = require("./comment.schema");
const comment_controller_1 = require("./comment.controller");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
exports.commentRouter = express_1.default.Router();
exports.commentRouter
    .route("/")
    .get((0, validate_1.validate)(comment_schema_1.getCommentsByFeedbackIdSchema), comment_controller_1.getCommentsByFeedbackIdHandler)
    .post((0, validate_1.validate)(comment_schema_1.createCommentSchema), (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), comment_controller_1.createCommentHandler);
exports.commentRouter
    .route("/user/:commentId")
    .get((0, validate_1.validate)(comment_schema_1.getUserByCommentIdSchema), comment_controller_1.getUserByCommentIdHandler);
