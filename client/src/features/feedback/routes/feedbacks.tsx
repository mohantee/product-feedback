import { Aside } from "../components/aside";
import { FeedbackControls } from "../components/feedback-controls";
import { FeedbackList } from "../components/feedback-list";
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
