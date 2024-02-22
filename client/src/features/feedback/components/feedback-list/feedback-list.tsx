import { FaComment } from "react-icons/fa";
import "./feedback-list.css";
import { Link, useNavigate } from "react-router-dom";
import { UpvoteButton } from "../../../../components/upvote-button";
import { Tag } from "../../../../components/elements/tag/tag";
import { useFeedbacks } from "@features/feedback/api/get-feedbacks";
import { Feedback, SearchParamProps } from "@features/feedback/types";
import { processFeedbacks } from "@features/feedback/helpers";
import { InfoEmptyFeedbacks } from "@features/feedback/components/info-empty-feedbacks";
import { useUpvoteFeedback } from "@features/feedback/api/upvote-feedback";
import { useUser } from "@clerk/clerk-react";
import { HashLoader } from "react-spinners";

const categoryMap = {
  all: "All",
  ui: "UI",
  ux: "UX",
  enhancement: "Enhancement",
  bug: "Bug",
  feature: "Feature",
} as const;

export function FeedbackMeta(props: Feedback) {
  const mutation = useUpvoteFeedback();
  const { id, title, content, category, _count, isUpvoted } = props;
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <li className="feedback-meta" onClick={() => navigate(`/feedbacks/${id}`)}>
      <div className="feedback-meta__container">
        <Link className="feedback-meta__title" to=".">
          <h3>{title}</h3>
        </Link>
        <p className="feedback-meta__content">{content}</p>
        <div className="feedback-meta__tags"></div>
        <Tag isPressed={false} text={categoryMap[category]} />
      </div>

      <div className="feedback-meta__upvote-btn">
        <UpvoteButton
          count={_count.upvotes}
          isPressed={!!isUpvoted}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation();
            if (!isSignedIn) {
              return console.log("Please login.");
            }
            mutation.mutate({ id, isUpvoted });
          }}
        />
      </div>

      <div className="feedback-meta__comments">
        <FaComment style={{ color: "#CDD2EE" }} aria-hidden="true" />
        <p aria-label={`${_count.comments} comments`}>{_count.comments}</p>
      </div>
    </li>
  );
}

export function FeedbackList({ searchParams }: SearchParamProps) {
  const { data: feedbacks } = useFeedbacks();

  let processedFeedbacks;

  if (feedbacks) {
    processedFeedbacks = processFeedbacks(
      feedbacks,
      searchParams.sort,
      searchParams.filter
    );
  } else {
    return <HashLoader color="#AD1FEA" className="container" />;
  }

  if (!processedFeedbacks.length) {
    return <InfoEmptyFeedbacks />;
  }

  return (
    <ul className="flow">
      {processedFeedbacks?.map((feedback, i) => (
        <FeedbackMeta key={i} {...feedback} />
      ))}
    </ul>
  );
}
