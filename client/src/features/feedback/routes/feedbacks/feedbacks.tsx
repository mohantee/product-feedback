import { Aside } from "@features/feedback/components/aside";
import { FeedbackControls } from "@features/feedback/components/feedback-controls";
import { FeedbackList } from "@features/feedback/components/feedback-list";
import "./feedbacks.css";

export function Feedbacks() {
  return (
    <div className="feedback-container">
      <Aside />
      <div className="feedback-list">
        <FeedbackControls />
        <FeedbackList />
      </div>
    </div>
  );
}
