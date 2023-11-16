import { Label } from "@components/form/label";
import { Input } from "@components/form/input";
import { TextArea } from "@components/form/text-area";
import { Dropdown } from "@components/elements/dropdown";
import { Button } from "@components/elements/button";
import { Link } from "react-router-dom";
import { FeedbackCreateIcon } from "@features/feedback/components/feedback-create-icon";
import { IoChevronBack } from "react-icons/io5";
import "./create-feedback.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

const OPTIONS = ["UI", "UX", "Feature", "Enhancement", "Bug"];

interface Inputs {
  title: string;
  category: string;
  details: string;
}

export function CreateFeedback() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [category, setCategory] = useState("Feature");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="create-feedback__container">
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
            rules={{ required: "Title cannot be left empty." }}
            errors={errors}
          />
          <Label
            htmlFor="category"
            primaryText="Category"
            helperText="Choose a category for your feedback"
          />
          <Dropdown
            value={category}
            onValueChange={setCategory}
            values={OPTIONS}
            ariaLabel="Category"
            name="category"
            register={register}
            rules={{ required: true }}
          />
          <Label
            htmlFor="details"
            primaryText="Feedback Detail"
            helperText="Include any helpful comments on what should be improved, added, etc."
          />
          <TextArea
            id="details"
            name="details"
            register={register}
            rules={{ required: "Description cannot be left empty." }}
            errors={errors}
          />
        </div>
        <div className="create-feedback__controls">
          <Button name="Cancel" status="secondary" onClick={() => {}} />
          <Button name="Add Feedback" status="primary" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
}
