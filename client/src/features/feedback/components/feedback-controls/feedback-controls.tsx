import "./feedback-controls.css";
import { FaPlus } from "react-icons/fa6";
import { Dropdown } from "@components/elements/dropdown";
import { Button } from "@components/elements/button";
import { SetURLSearchParams, useNavigate } from "react-router-dom";
import { SuggestionIcon } from "../suggestion-icon";

const OPTIONS = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

interface Props {
  searchParams: {
    sort: string;
    filter: string;
    setSearchParams: SetURLSearchParams;
  };
}

export function FeedbackControls({ searchParams }: Props) {
  const navigate = useNavigate();

  const trigger = (
    <div className="dropdown__trigger">
      <input
        className="dropdown__input-field"
        role="combobox"
        type="text"
        value={searchParams.sort}
        aria-label="Sort by options"
        readOnly
      />
    </div>
  );

  return (
    <div className="feedback-controls">
      <SuggestionIcon />
      <h2 className="feedback-controls__count">6 Suggestions</h2>
      <div className="feedback-controls__dropdown">
        <span aria-hidden="true">Sort by: </span>

        <Dropdown
          values={OPTIONS}
          value={searchParams.sort}
          onValueChange={(value: string) =>
            searchParams.setSearchParams(
              (params) => {
                params.set("sort", value);
                return params;
              },
              { replace: true }
            )
          }
          ariaLabel="Filter feedbacks"
          trigger={trigger}
        />
      </div>
      <Button
        type="primary"
        name="Add Feedback"
        icon={<FaPlus />}
        onClick={() => navigate("/feedbacks/create")}
      />
    </div>
  );
}
