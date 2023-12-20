import { useFeedback } from "@features/feedback/api/get-feedback";
import { FeedbackMeta } from "@features/feedback/components/feedback-list";
import { Link, useParams } from "react-router-dom";
import { Button } from "@components/elements/button";
import "./feedback.css";
import { IoChevronBack } from "react-icons/io5";
import { CommentList } from "@features/comments/components/comment-list";
import { CommentInput } from "@features/comments/components/comment-input";
import { useUser } from "@clerk/clerk-react";
import { HashLoader } from "react-spinners";

interface Params {
  id: string;
}

export function Feedback() {
  const { id } = useParams<keyof Params>() as Params;
  const _id = parseInt(id);
  const { data: feedback } = useFeedback(_id);
  const { isSignedIn } = useUser();

  if (!feedback) {
    return <HashLoader className="container" color="#AD1FEA" />;
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
        {isSignedIn ? (
          <Link to={`/feedbacks/edit/${feedback.id}`}>
            <Button name="Edit Feedback" status="accent" transition="opacity" />
          </Link>
        ) : null}
      </div>
      <FeedbackMeta {...feedback} />
      <CommentList comments={feedback.comments} />
      {isSignedIn ? <CommentInput feedbackId={_id} /> : null}
    </div>
  );
}
