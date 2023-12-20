import { Button } from "@components/elements/button";
import "./feedback-roadmap.css";
import { IoChevronBack } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useFeedbackRoadmap } from "@features/feedback/api/get-feedback-roadmap";
import { RoadmapItem } from "@features/feedback/components/roadmap-item/roadmap-item";
import { useRoadmap } from "@features/feedback/api/get-roadmap";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { HashLoader } from "react-spinners";

export function FeedbackRoadmap() {
  const feedbackRoadmap = useFeedbackRoadmap();
  const { data: roadmap } = useRoadmap();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <div className="roadmap__container">
      <div className="roadmap__header">
        <div>
          <Button
            name="Go Back"
            icon={<IoChevronBack />}
            status="blank"
            transition="underline"
            onClick={() => navigate(-1)}
          />
          <h1 className="roadmap__heading">Roadmap</h1>
        </div>

        {isSignedIn ? (
          <Button
            name="Add Feedback"
            status="primary"
            onClick={() => navigate("/feedbacks/create")}
            icon={<FaPlus />}
          />
        ) : null}
      </div>

      <div className="roadmap__board">
        <div className="roadmap__planned flow">
          <h2 className="roadmap__section-heading">
            Planned ({roadmap?.planned_count})
          </h2>
          <p className="roadmap__section-description">
            Ideas prioritised for research
          </p>
          {feedbackRoadmap.data ? (
            feedbackRoadmap.data.planned.map((feedback) => (
              <RoadmapItem
                key={feedback.id}
                status="Planned"
                feedback={feedback}
              />
            ))
          ) : (
            <HashLoader className="container" color="#AD1FEA" />
          )}
        </div>
        <div className="roadmap__in-progress flow">
          <h2 className="roadmap__section-heading">
            In Progress ({roadmap?.in_progress_count})
          </h2>
          <p className="roadmap__section-description">
            Currently being developed
          </p>
          {feedbackRoadmap.data ? (
            feedbackRoadmap.data.in_progress.map((feedback) => (
              <RoadmapItem
                key={feedback.id}
                status="In Progress"
                feedback={feedback}
              />
            ))
          ) : (
            <HashLoader className="container" color="#AD1FEA" />
          )}
        </div>
        <div className="roadmap__live flow">
          <h2 className="roadmap__section-heading">
            Live ({roadmap?.live_count})
          </h2>
          <p className="roadmap__section-description">Released features</p>
          {feedbackRoadmap.data ? (
            feedbackRoadmap.data.live.map((feedback) => (
              <RoadmapItem
                key={feedback.id}
                status="Live"
                feedback={feedback}
              />
            ))
          ) : (
            <HashLoader className="container" color="#AD1FEA" />
          )}
        </div>
      </div>
    </div>
  );
}
