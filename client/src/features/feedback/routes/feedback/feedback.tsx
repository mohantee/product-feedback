import { useFeedback } from "@features/feedback/api/get-feedback";
import { FeedbackMeta } from "@features/feedback/components/feedback-list";
import { Link, useParams } from "react-router-dom";
import { Button } from "@components/elements/button";
import "./feedback.css";
import { IoChevronBack } from "react-icons/io5";
import { CommentList } from "@features/comments/components/comment-list";

interface Params {
  id: string;
}

export function Feedback() {
  const { id } = useParams<keyof Params>() as Params;
  const _id = parseInt(id);
  const { data: feedback } = useFeedback(_id);

  if (!feedback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="feedback-container">
      <div className="feedback-bar">
        <Link to="/feedbacks" className="feedback-bar__link">
          <Button
            name="Go Back"
            icon={<IoChevronBack />}
            transition="underline"
            status="blank"
          />
        </Link>
        <Button name="Edit Feedback" status="accent" transition="opacity" />
      </div>
      <FeedbackMeta {...feedback} />
      <CommentList comments={feedback.comments} />
    </div>
  );
}
