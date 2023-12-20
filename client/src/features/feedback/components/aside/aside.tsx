import "./aside.css";
import { Link } from "react-router-dom";
import { Tag } from "@components/elements/tag";
import { Hero } from "@components/hero";
import { SearchParamProps } from "@features/feedback/types";
import { useRoadmap } from "@features/feedback/api/get-roadmap";
import { HashLoader } from "react-spinners";

const options = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"] as const;

function CategoryFilters({ searchParams }: SearchParamProps) {
  const { filter, setSearchParams } = searchParams;
  return (
    <ul className="aside-tags" aria-label="Apply category filters">
      {options.map((name) => (
        <li key={name}>
          <Tag
            text={name}
            isPressed={filter === name}
            onClick={(e) => {
              setSearchParams(
                (params) => {
                  params.set("filter", e.target.textContent);
                  return params;
                },
                { replace: true }
              );
            }}
          />
        </li>
      ))}
    </ul>
  );
}

function Roadmap() {
  const { data: roadmap, error } = useRoadmap();

  if (error) {
    return <h1>Error</h1>;
  } else if (!roadmap) {
    return <HashLoader className="container" color="#AD1FEA" />;
  }

  return (
    <div className="feedback-roadmap">
      <div className="feedback-roadmap__head">
        <h3>Roadmap</h3>
        <Link to="/feedbacks/roadmap">View</Link>
      </div>
      <dl className="feedback-roadmap__meta">
        <dt>Planned</dt>
        <dd>{roadmap.planned_count}</dd>
        <dt>In-progress</dt>
        <dd>{roadmap.in_progress_count}</dd>
        <dt>Live</dt>
        <dd>{roadmap.live_count}</dd>
      </dl>
    </div>
  );
}

export function Aside({ searchParams }: SearchParamProps) {
  return (
    <div className="feedback-aside">
      <Hero />
      <CategoryFilters searchParams={searchParams} />
      <Roadmap />
    </div>
  );
}
