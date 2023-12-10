import "./roadmap-item.css";
import { Tag } from "@components/elements/tag";
import { UpvoteButton } from "@components/upvote-button";
import { useUpvoteFeedback } from "@features/feedback/api/upvote-feedback";
import { Feedback } from "@features/feedback/types";
import { FaComment, FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CATEGORY_MAP = {
  ui: "UI",
  ux: "UX",
  feature: "Feature",
  enhancement: "Enhancement",
  bug: "Bug",
  all: "All",
} as const;

interface Props {
  feedback: Feedback;
  status: "Planned" | "In Progress" | "Live";
}

export function RoadmapItem(props: Props) {
  const { feedback, status } = props;
  const mutation = useUpvoteFeedback();
  const navigate = useNavigate();

  const handleUpvote = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    mutation.mutate({ id: feedback.id, isUpvoted: feedback.isUpvoted });
  };

  return (
    <article
      className="roadmap-item"
      data-status={status}
      onClick={() => navigate(`/feedbacks/${feedback.id}`)}
    >
      <div className="roadmap-item__header">
        <FaCircle className="roadmap-item__icon" />
        <p>{status}</p>
      </div>
      <div>
        <h1>{feedback.title}</h1>
        <p>{feedback.content}</p>
      </div>
      <Tag text={CATEGORY_MAP[feedback.category]} isPressed={false} />
      <div className="roadmap-item__footer">
        <UpvoteButton
          count={feedback._count.upvotes}
          isPressed={feedback.isUpvoted}
          onClick={handleUpvote}
        />
        <FaComment
          style={{ color: "#CDD2EE" }}
          aria-hidden="true"
          className="roadmap-item__comment-icon"
        />
        <p className="roadmap-item__comment-count">
          {feedback._count.comments}
        </p>
      </div>
    </article>
  );
}
