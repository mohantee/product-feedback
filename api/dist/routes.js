"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const feedback_1 = require("./modules/feedback");
const express_1 = require("express");
const comment_routes_1 = require("./modules/comment/comment.routes");
exports.routes = (0, express_1.Router)();
exports.routes.use("/feedback", feedback_1.feedbackRouter);
exports.routes.use("/comment", comment_routes_1.commentRouter);
