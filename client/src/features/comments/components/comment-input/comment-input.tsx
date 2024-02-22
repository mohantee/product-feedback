import { TextArea } from "@components/form/text-area";
import { SubmitHandler, useForm } from "react-hook-form";
import "./comment-input.css";
import { useCreateComment } from "@features/comments/api/create-comment";
import { Button } from "@components/elements/button";

interface Input {
  comment: string;
}

interface Props {
  feedbackId: number;
}

export function CommentInput({ feedbackId }: Props) {
  const mutation = useCreateComment();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  let charactersRemaining = 225 - watch("comment").length;
  let hasCharactersRemaining = charactersRemaining >= 0;

  const onSubmit: SubmitHandler<Input> = async (data) => {
    await mutation.mutateAsync({ content: data.comment, feedbackId });
    reset();
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="create-comment" className="comment-input__label">
        Add Comment
      </label>
      <TextArea
        name="comment"
        id="comment"
        rules={{
          maxLength: { value: 225, message: "Max length exceeded" },
          required: "Comment cannot be empty",
        }}
        errors={errors}
        register={register}
      />
      <div className="comment-input__controls">
        <p
          className="comment-input__info"
          data-error={!hasCharactersRemaining ? "true" : "false"}
        >
          {charactersRemaining} characters remaining
        </p>
        <Button
          name="Post Comment"
          status="primary"
          disabled={!hasCharactersRemaining}
          loading={mutation.isLoading}
        />
      </div>
    </form>
  );
}
