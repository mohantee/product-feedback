import { Button } from "@components/elements/button";
import "./reply-input.css";
import { TextArea } from "@components/form/text-area";
import { SubmitHandler, useForm } from "react-hook-form";
import { Comment } from "@features/feedback/types";
import { useCreateComment } from "@features/comments/api/create-comment";

interface Inputs {
  reply: string;
}

interface Props extends Comment {
  closeReply: () => void;
}

export function ReplyInput(props: Props) {
  const mutation = useCreateComment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutation.mutateAsync({
      content: data.reply,
      predecessorId: props.id,
    });
    props.closeReply();
  };

  return (
    <form className="form-reply" onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        errors={errors}
        id="reply"
        register={register}
        name="reply"
        rules={{ required: "Reply cannot be empty", maxLength: 225 }}
        autoFocus
      />
      <Button name="Post Reply" status="primary" />
    </form>
  );
}
