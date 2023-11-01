import { Aside } from "../components/aside";
import { FeedbackFilter } from "../components/feedback-filter";
import { FeedbackList } from "../components/feedback-list";
import "./feedbacks.css";

export function Feedbacks() {
  return (
    <div className="feedback-container">
      <Aside />
      <div className="feedback-list">
        <FeedbackFilter />
        <FeedbackList />
      </div>
    </div>
  );
}
