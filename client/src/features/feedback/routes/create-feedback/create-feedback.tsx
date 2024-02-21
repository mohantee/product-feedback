import { Label } from "@components/form/label";
import { Input } from "@components/form/input";
import { TextArea } from "@components/form/text-area";
import { Button } from "@components/elements/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FeedbackCreateIcon } from "@features/feedback/components/feedback-create-icon";
import { IoChevronBack } from "react-icons/io5";
import "./create-feedback.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateFeedback } from "@features/feedback/api/create-feedback";
import { SelectMenu } from "@components/elements/select";
import { useUser } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";

const OPTIONS = [
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

interface Inputs {
  title: string;
  category: string;
  content: string;
}

export function CreateFeedback() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      category: "feature",
      content: "",
    },
  });
  const mutation = useCreateFeedback();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutation.mutateAsync({
      ...data,
      status: "suggestion",
    });
    navigate("/feedbacks");
  };

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="create-feedback__container">
      <div className="btn-back">
        <Link to="/feedbacks">
          <Button
            name="Go back"
            status="blank"
            transition="underline"
            icon={<IoChevronBack />}
          />
        </Link>
      </div>
      <form className="create-feedback" onSubmit={handleSubmit(onSubmit)}>
        <FeedbackCreateIcon />
        <h1 className="create-feedback__heading">Create New Feedback</h1>
        <div className="create-feedback__inputs">
          <Label
            htmlFor="title"
            primaryText="Feedback Title"
            helperText="Add a short, descriptive headline"
          />
          <Input
            id="title"
            name="title"
            register={register}
            rules={{
              required: "Title cannot be left empty.",
              maxLength: {
                value: 150,
                message: "Title cannot be longer than 150 characters.",
              },
            }}
            errors={errors}
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
                options={OPTIONS}
                defaultValue="feature"
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
            id="content"
            name="content"
            register={register}
            rules={{
              required: "Description cannot be left empty.",
              maxLength: {
                value: 255,
                message: "Description cannot be longer than 255 characters.",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="create-feedback__controls">
          <Button name="Cancel" status="secondary" type="button" />
          <Button
            name="Add Feedback"
            status="primary"
            loading={mutation.isLoading}
          />
        </div>
      </form>
    </div>
  );
}
