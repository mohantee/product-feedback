import { useUser } from "@clerk/clerk-react";
import "./edit-feedback.css";
import { Button } from "@components/elements/button";
import { SelectMenu } from "@components/elements/select";
import { Input } from "@components/form/input";
import { Label } from "@components/form/label";
import { TextArea } from "@components/form/text-area";
import { useEditFeedback } from "@features/feedback/api/edit-feedback";
import { useFeedback } from "@features/feedback/api/get-feedback";
import { FeedbackEditIcon } from "@features/feedback/components/feedback-edit-icon";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDeleteFeedback } from "@features/feedback/api/delete-feedback";

const CATEGORY_OPTIONS = [
  {
    name: "UI",
    value: "ui",
  },
  {
    name: "UX",
    value: "ux",
  },
  {
    name: "Feature",
    value: "feature",
  },
  {
    name: "Enhancement",
    value: "enhancement",
  },
  {
    name: "Bug",
    value: "bug",
  },
];

const STATUS_OPTIONS = [
  {
    name: "Suggestion",
    value: "suggestion",
  },
  {
    name: "Planned",
    value: "planned",
  },
  {
    name: "In Progress",
    value: "in_progress",
  },
  {
    name: "Live",
    value: "live",
  },
];

interface Inputs {
  title: string;
  category: string;
  status: string;
  content: string;
}

interface Params {
  id: string;
}

export function EditFeedback() {
  const { id } = useParams<keyof Params>() as Params;
  const _id = parseInt(id);
  const { data: feedback } = useFeedback(_id);
  const editFeedback = useEditFeedback(_id);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const mutation = useDeleteFeedback();

  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!feedback) return;
    editFeedback.mutateAsync({ args: data, id: feedback.id });
    navigate(`/feedbacks/${feedback.id}`);
  };

  useEffect(() => {
    if (feedback) {
      setValue("status", feedback.status);
      setValue("category", feedback.category);
    }
  }, [feedback]);

  if (!feedback) {
    return <h1>Loading...</h1>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="edit-feedback__container">
      <div className="btn-back">
        <Link to={`/feedbacks/${feedback.id}`}>
          <Button
            name="Go back"
            status="blank"
            onClick={() => {}}
            transition="underline"
            icon={<IoChevronBack />}
          />
        </Link>
      </div>
      <form className="edit-feedback" onSubmit={handleSubmit(onSubmit)}>
        <FeedbackEditIcon />
        <h1 className="edit-feedback__heading">Editing "{feedback.title}"</h1>
        <div className="create-feedback__inputs">
          <Label
            htmlFor="title"
            primaryText="Feedback Title"
            helperText="Add a short, descriptive headline"
          />
          <Input
            defaultValue={feedback.title}
            id="title"
            name="title"
            rules={{
              required: "Title cannot be left empty.",
              maxLength: {
                value: 150,
                message: "Title cannot be longer than 150 characters.",
              },
            }}
            errors={errors}
            register={register}
          />
          <Label
            htmlFor="category"
            primaryText="Category"
            helperText="Choose a category for your feedback"
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <SelectMenu
                options={CATEGORY_OPTIONS}
                defaultValue={feedback.category}
                ariaLabel="category"
                register={register}
                name="category"
                /* 
                // @ts-ignore */
                field={field}
              />
            )}
          />
          <Label
            htmlFor="status"
            primaryText="Status"
            helperText="Edit status for your feedback"
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <SelectMenu
                options={STATUS_OPTIONS}
                defaultValue={feedback.status}
                ariaLabel="category"
                register={register}
                name="category"
                /* 
                // @ts-ignore */
                field={field}
              />
            )}
          />
          <Label
            htmlFor="details"
            primaryText="Feedback Detail"
            helperText="Include any helpful comments on what should be improved, added, etc."
          />
          <TextArea
            defaultValue={feedback.content}
            id="content"
            name="content"
            rules={{
              required: "Description cannot be left empty.",
              maxLength: {
                value: 500,
                message: "Description cannot be longer than 500 characters.",
              },
            }}
            register={register}
            errors={errors}
          />
        </div>
        <div className="edit-feedback__controls">
          <Button
            name="Delete"
            status="alert"
            onClick={async () => {
              await mutation.mutateAsync(id);
              navigate("/feedbacks");
            }}
            loading={mutation.isLoading}
            type="button"
          />
          <Button
            name="Cancel"
            status="secondary"
            onClick={() => navigate(-1)}
            type="button"
          />
          <Button name="Update" status="primary" loading={mutation.isLoading} />
        </div>
      </form>
    </div>
  );
}
