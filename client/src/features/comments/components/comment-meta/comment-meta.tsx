import { useState } from "react";
import "./comment-meta.css";
import { Comment } from "@features/feedback/types";
import { ReplyInput } from "../reply-input";

export function CommentMeta(props: Comment) {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div
        className="comment-meta"
        data-reply={props.feedbackId ? "false" : "true"}
        id={`comment-${props.id}`}
        tabIndex={0}
      >
        <img src={props.avatar} alt="avatar" className="comment-meta__img" />
        <div className="comment-meta__group">
          <div className="comment-meta__header">
            <div className="comment-meta__names">
              <p className="comment-meta__fullname">{props.fullName}</p>
              <p className="comment-meta__username">@{props.userName}</p>
            </div>
            <button
              className="comment-meta__reply"
              onClick={() => setReplyActive(true)}
            >
              Reply
            </button>
          </div>
          <p className="comment-meta__content">
            {props.predecessorUsername && (
              <a
                className="comment-meta__replying-to"
                aria-label={`Replying to ${props.predecessorUsername}`}
                href={`#comment-${props.predecessorId}`}
                onClick={() =>
                  document
                    .getElementById(`comment-${props.predecessorId}`)
                    ?.focus()
                }
              >
                @{props.predecessorUsername}
              </a>
            )}{" "}
            {props.content}
          </p>
        </div>
      </div>
      {replyActive && (
        <ReplyInput {...props} closeReply={() => setReplyActive(false)} />
      )}
      {props.replies?.map((comment) => (
        <CommentMeta key={comment.id} {...comment} />
      ))}
    </>
  );
}
