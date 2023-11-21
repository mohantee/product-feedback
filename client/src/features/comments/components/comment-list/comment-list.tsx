import { Comment } from "@features/feedback/types";
import { CommentMeta } from "../comment-meta";
import * as Separator from "@radix-ui/react-separator";
import "./comment-list.css";

interface Props {
  comments: Comment[];
}

export function CommentList(props: Props) {
  console.log(props);
  return (
    <div className="comment-list">
      <h4 className="comment-list__count">{props.comments.length} Comments</h4>
      {props.comments.map((comment, index, array) => {
        const lastIndex = array.length - 1;
        return (
          <div key={comment.id}>
            <Separator.Root
              className="separator__vertical"
              orientation="vertical"
            />
            <CommentMeta {...comment} />

            {index === lastIndex ? null : (
              <Separator.Root className="separator-horizontal" />
            )}
          </div>
        );
      })}
    </div>
  );
}
