import "./comment-meta.css";
import { Comment } from "@features/feedback/types";

export function CommentMeta(props: Comment) {
  return (
    <>
      <div
        className="comment-meta"
        data-reply={props.replies ? "false" : "true"}
      >
        <img src={props.avatar} alt="avatar" className="comment-meta__img" />
        <div className="comment-meta__group">
          <div className="comment-meta__header">
            <div className="comment-meta__names">
              <p className="comment-meta__fullname">{props.fullName}</p>
              <p className="comment-meta__username">@{props.userName}</p>
            </div>
            <button className="comment-meta__reply">Reply</button>
          </div>
          <p className="comment-meta__content">{props.content}</p>
        </div>
      </div>
      {props.replies?.map((comment) => (
        <CommentMeta {...comment} />
      ))}
    </>
  );
}
