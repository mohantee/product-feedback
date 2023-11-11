import { FaComment } from "react-icons/fa";
import "./feedback-list.css";
import { Link, useNavigate } from "react-router-dom";
import { UpvoteButton } from "../../../../components/upvote-button";
import { Tag } from "../../../../components/elements/tag/tag";
import { useFeedbacks } from "@features/feedback/api/get-feedbacks";
import { Feedback } from "@features/feedback/types";

const categoryMap = {
  all: "All",
  ui: "UI",
  ux: "UX",
  enhancement: "Enhancement",
  bug: "Bug",
  feature: "Feature",
} as const;

export function FeedbackMeta(props: Feedback) {
  const { id, title, content, category, _count, isUpvoted } = props;
  const navigate = useNavigate();
  return (
    <li className="feedback-meta" onClick={() => navigate(`/feedbacks/${id}`)}>
      <div className="feedback-meta__container">
        <Link className="feedback-meta__title" to=".">
          <h3>{title}</h3>
        </Link>
        <p className="feedback-meta__content">{content}</p>
        <div className="feedback-meta__tags"></div>
        <Tag isPressed={isUpvoted} text={categoryMap[category]} />
      </div>
      <div className="feedback-meta__upvote-btn">
        <UpvoteButton count={_count.upvotes} isPressed={false} />
      </div>
      <div className="feedback-meta__comments">
        <FaComment style={{ color: "#CDD2EE" }} aria-hidden="true" />
        <p aria-label={`${_count.comments} comments`}>{_count.comments}</p>
      </div>
    </li>
  );
}

export function FeedbackList() {
  const { data: feedbacks } = useFeedbacks();

  if (!feedbacks) {
    return <h1>Loading...</h1>;
  }

  return (
    <ul className="flow">
      {feedbacks.map((feedback, i) => (
        <FeedbackMeta key={i} {...feedback} />
      ))}
    </ul>
  );
}
