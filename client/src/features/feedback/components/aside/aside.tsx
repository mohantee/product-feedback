import "./aside.css";
import { Link } from "react-router-dom";
import { Tag } from "@components/elements/tag";
import { Hero } from "@components/hero";
import { SearchParamProps } from "@features/feedback/types";
import { useRoadmap } from "@features/feedback/api/get-roadmap";
import { ClipLoader } from "react-spinners";

const options = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"] as const;

export function CategoryFilters({ searchParams }: SearchParamProps) {
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

export function Roadmap() {
  const { data: roadmap, error } = useRoadmap();

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="feedback-roadmap">
      <div className="feedback-roadmap__head">
        <h3>Roadmap</h3>
        <Link to="/feedbacks/roadmap">View</Link>
      </div>
      <dl className="feedback-roadmap__meta">
        <dt>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#F49F85" />
          </svg>
          Planned
        </dt>
        <dd>
          {roadmap?.planned_count || <ClipLoader size={8} color="#F49F8%" />}
        </dd>
        <dt>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#AD1FEA" />
          </svg>
          In-progress
        </dt>
        <dd>
          {roadmap?.in_progress_count || (
            <ClipLoader size={8} color="#AD1FEA" />
          )}
        </dd>
        <dt>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#62BCFA" />
          </svg>
          Live
        </dt>
        <dd>
          {roadmap?.live_count || <ClipLoader size={8} color="#62BCFA" />}
        </dd>
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
