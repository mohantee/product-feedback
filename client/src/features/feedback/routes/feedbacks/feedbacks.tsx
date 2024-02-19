import { Aside } from "@features/feedback/components/aside";
import { FeedbackControls } from "@features/feedback/components/feedback-controls";
import { FeedbackList } from "@features/feedback/components/feedback-list";
import "./feedbacks.css";
import { useFilterParams } from "@features/feedback/hooks";

export function Feedbacks() {
  const searchParams = useFilterParams();

  return (
    <>
      <div className="feedbacks-container">
        <Aside searchParams={searchParams} />
        <div className="feedback-list">
          <FeedbackControls searchParams={searchParams} />
          <FeedbackList searchParams={searchParams} />
        </div>
      </div>
    </>
  );
}
