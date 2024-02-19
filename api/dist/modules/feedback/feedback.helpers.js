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
exports.recursive = exports.getUpvoteStatus = void 0;
const feedback_service_1 = require("./feedback.service");
function getUpvoteStatus(feedbacks, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const feedbacksWithUpvoteStatus = yield Promise.all(feedbacks.map((feedback) => __awaiter(this, void 0, void 0, function* () {
            let isUpvoted;
            if (userId) {
                isUpvoted = yield (0, feedback_service_1.getUpvotedFeedback)(feedback.id, userId);
            }
            else {
                isUpvoted = false;
            }
            return Object.assign(Object.assign({}, feedback), { isUpvoted: !!isUpvoted });
        })));
        return feedbacksWithUpvoteStatus;
    });
}
exports.getUpvoteStatus = getUpvoteStatus;
//@ts-ignore
function recursive(level) {
    if (level === 0) {
        return {
            include: {
                replies: true,
            },
        };
    }
    return {
        include: {
            replies: recursive(level - 1),
        },
    };
}
exports.recursive = recursive;
