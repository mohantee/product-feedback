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
exports.getUserByCommentIdHandler = exports.getCommentsByFeedbackIdHandler = exports.createCommentHandler = void 0;
const comment_service_1 = require("./comment.service");
const clerk_sdk_node_1 = __importDefault(require("@clerk/clerk-sdk-node"));
function createCommentHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.auth.userId;
            const user = yield clerk_sdk_node_1.default.users.getUser(userId);
            req.body.userId = userId;
            req.body.fullName = `${user.firstName} ${user.lastName}`;
            req.body.avatar = user.imageUrl;
            req.body.userName = user.username;
            if (req.body.predecessorId) {
                req.body.predecessorUsername = (_a = (yield (0, comment_service_1.getUserByCommentId)(req.body.predecessorId))) === null || _a === void 0 ? void 0 : _a.userName;
            }
            const comment = yield (0, comment_service_1.createComment)(req.body);
            return res.status(200).send(comment);
        }
        catch (error) {
            return res.status(500).send({ message: "Internal server error" });
        }
    });
}
exports.createCommentHandler = createCommentHandler;
function getCommentsByFeedbackIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { feedbackId } = req.body;
        try {
            const comments = yield (0, comment_service_1.getCommentsByFeedbackId)(feedbackId);
            return res.status(200).send(comments);
        }
        catch (error) {
            return res.status(500).send({ message: "Internal server error" });
        }
    });
}
exports.getCommentsByFeedbackIdHandler = getCommentsByFeedbackIdHandler;
function getUserByCommentIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId } = req.params;
        try {
            const userName = yield (0, comment_service_1.getUserByCommentId)(parseInt(commentId));
            return res.status(200).send(userName);
        }
        catch (error) {
            return res.status(500).send({ message: "Internal server error" });
        }
    });
}
exports.getUserByCommentIdHandler = getUserByCommentIdHandler;
