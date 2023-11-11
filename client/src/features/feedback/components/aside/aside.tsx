import "./aside.css";
import { Link, SetURLSearchParams } from "react-router-dom";
import { Tag } from "@components/elements/tag";
import { Hero } from "@components/hero";

interface Props {
  searchParams: {
    sort: string;
    filter: string;
    setSearchParams: SetURLSearchParams;
  };
}

const options = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"] as const;

function CategoryFilters({ searchParams }: Props) {
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
  return (
    <div className="feedback-roadmap">
      <div className="feedback-roadmap__head">
        <h3>Roadmap</h3>
        <Link to="/feedbacks/roadmap">View</Link>
      </div>
      <dl className="feedback-roadmap__meta">
        <dt>Planned</dt>
        <dd>2</dd>
        <dt>In-progress</dt>
        <dd>3</dd>
        <dt>Live</dt>
        <dd>1</dd>
      </dl>
    </div>
  );
}

export function Aside({ searchParams }: Props) {
  return (
    <div className="feedback-aside">
      <Hero />
      <CategoryFilters searchParams={searchParams} />
      <Roadmap />
    </div>
  );
}
