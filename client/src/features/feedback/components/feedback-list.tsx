import { UpvoteButton } from "../../../components/upvote-button";
import { Tag } from "../../../components/elements/tag/tag";
import { FaComment } from "react-icons/fa";
import "./feedback-list.css";
import { Link } from "react-router-dom";

const FEEDBACKS: FeedbackMetaProps[] = [
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
  {
    title: "Add a dark theme option",
    content:
      "It would help people with light sensitivities and who prefer dark mode",
    is_upvoted: false,
    upvote_count: 15,
    comment_count: 25,
    category: "Enhancement",
  },
];

interface FeedbackMetaProps {
  title: string;
  content: string;
  is_upvoted: boolean;
  upvote_count: number;
  comment_count: number;
  category: "All" | "UI" | "UX" | "Enhancement" | "Bug" | "Feature";
}

function FeedbackMeta(props: FeedbackMetaProps) {
  const { title, content, is_upvoted, upvote_count, comment_count, category } =
    props;
  return (
    <li className="feedback-meta">
      <div className="feedback-meta__container">
        <Link className="feedback-meta__title" to=".">
          <h3>{title}</h3>
        </Link>
        <p className="feedback-meta__content">{content}</p>
        <div className="feedback-meta__tags"></div>
        <Tag isPressed={false} text={category} />
      </div>
      <div className="feedback-meta__upvote-btn">
        <UpvoteButton count={upvote_count} isPressed={is_upvoted} />
      </div>
      <div className="feedback-meta__comments">
        <FaComment style={{ color: "#CDD2EE" }} aria-hidden="true" />
        <p aria-label={`${comment_count} comments`}>{comment_count}</p>
      </div>
    </li>
  );
}

export function FeedbackList() {
  return (
    <ul className="flow">
      {FEEDBACKS.map((feedback, i) => (
        <FeedbackMeta key={i} {...feedback} />
      ))}
    </ul>
  );
}
