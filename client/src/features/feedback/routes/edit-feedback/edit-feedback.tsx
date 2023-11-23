import { Button } from "@components/elements/button";
import { Dropdown } from "@components/elements/dropdown";
import { Input } from "@components/form/input";
import { Label } from "@components/form/label";
import { TextArea } from "@components/form/text-area";
import { FeedbackEditIcon } from "@features/feedback/components/feedback-edit-icon";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const CATEGORY_OPTIONS = ["Feature", "UI", "UX", "Enhancement", "Bug"];
const STATUS_OPTIONS = ["Suggestion", "Planned", "In Progress", "Live"];

interface Inputs {
  title: string;
  category: (typeof CATEGORY_OPTIONS)[number];
  status: (typeof STATUS_OPTIONS)[number];
  content: string;
}

export function EditFeedback() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className="edit-feedback__container">
      <div className="btn-back">
        <Link to="/feedbacks">
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
        <h1 className="edit-feedback__heading">Edit Feedback</h1>
        <div className="create-feedback__inputs">
          <Label
            htmlFor="title"
            primaryText="Feedback Title"
            helperText="Add a short, descriptive headline"
          />
          <Input
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
          <Dropdown
            value={""}
            onValueChange={() => {}}
            values={CATEGORY_OPTIONS}
            ariaLabel="Category"
            name="category"
            rules={{ required: true }}
            sideOffset={-8}
          />
          <Label
            htmlFor="status"
            primaryText="Status"
            helperText="Edit status for your feedback"
          />
          <Dropdown
            value={""}
            onValueChange={() => {}}
            values={STATUS_OPTIONS}
            ariaLabel="Category"
            name="category"
            rules={{ required: true }}
            sideOffset={-8}
          />
          <Label
            htmlFor="details"
            primaryText="Feedback Detail"
            helperText="Include any helpful comments on what should be improved, added, etc."
          />
          <TextArea
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
          <Button name="Delete" status="alert" type="button" />
          <Button name="Cancel" status="secondary" type="button" />
          <Button name="Add Feedback" status="primary" />
        </div>
      </form>
    </div>
  );
}
