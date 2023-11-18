import "./feedback-controls.css";
import { FaPlus } from "react-icons/fa6";
import { Dropdown } from "@components/elements/dropdown";
import { Button } from "@components/elements/button";
import { useNavigate } from "react-router-dom";
import { SuggestionIcon } from "../suggestion-icon";
import { useFeedbacks } from "@features/feedback/api/get-feedbacks";
import { processFeedbacks } from "@features/feedback/helpers";
import { SearchParamProps } from "@features/feedback/types";

const OPTIONS = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

export function FeedbackControls({ searchParams }: SearchParamProps) {
  const navigate = useNavigate();
  const { data: feedbacks } = useFeedbacks();
  let numberOfFeedbacks;

  if (feedbacks) {
    const processedFeedbacks = processFeedbacks(
      feedbacks,
      searchParams.sort,
      searchParams.filter
    );

    numberOfFeedbacks = processedFeedbacks.length;
  }

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
      <h2 className="feedback-controls__count">
        {numberOfFeedbacks} Suggestions
      </h2>
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
          name="Filter"
        />
      </div>
      <Button
        status="primary"
        name="Add Feedback"
        icon={<FaPlus />}
        onClick={() => navigate("/feedbacks/create")}
      />
    </div>
  );
}
