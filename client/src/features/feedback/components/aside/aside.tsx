import "./aside.css";
import { Link, SetURLSearchParams } from "react-router-dom";
import { useFeedbackStore } from "@features/feedback/store";
import { Tag } from "@components/elements/tag";
import { Hero } from "@components/hero";

interface Props {
  searchParams: {
    sort: string | null;
    filter: string | null;
    order: string | null;
    setSearchParams: SetURLSearchParams;
  };
}

const options = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"] as const;

function CategoryFilters({ searchParams }: Props) {
  // const filter = useFeedbackStore((state) => state.filter);
  // const setFilter = useFeedbackStore((state) => state.setFilter);
  const { filter, setSearchParams } = searchParams;
  console.log(filter);
  return (
    <ul className="aside-tags" aria-label="Apply category filters">
      {options.map((name) => (
        <li key={name}>
          <Tag
            text={name}
            isPressed={filter === name}
            onClick={(e) => {
              // setFilter(e.target.textContent.toLowerCase());
              setSearchParams((params) => {
                params.set("filter", e.target.textContent);
                return params;
              });
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
