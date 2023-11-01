import { useState } from "react";
import { Button } from "../../../components/elements/button";
import { Dropdown } from "../../../components/elements/dropdown";
import "./feedback-filter.css";
import { FaPlus } from "react-icons/fa6";

const OPTIONS = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

export function FeedbackFilter() {
  const [options, setOptions] = useState("Most Upvotes");

  return (
    <div className="feedback-filter">
      <h2 className="feedback-filter__count">6 Suggestions</h2>
      <Dropdown
        values={OPTIONS}
        value={options}
        onValueChange={setOptions}
        ariaLabel="Filter feedbacks"
      />
      <Button type="primary" name="Add Feedback" icon={<FaPlus />} />
    </div>
  );
}
