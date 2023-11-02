import { Hero } from "../../../components/hero/hero";
import { Tag } from "../../../components/elements/tag/tag";
import "./aside.css";
import { Link } from "react-router-dom";
import { useFeedbackStore } from "../store";

const options = [
  {
    name: "All",
    option: "all",
  },
  {
    name: "UI",
    option: "ui",
  },
  {
    name: "UX",
    option: "ux",
  },
  {
    name: "Enhancement",
    option: "enhancement",
  },
  {
    name: "Bug",
    option: "bug",
  },
  {
    name: "Feature",
    option: "feature",
  },
] as const;

function CategoryFilters() {
  const filter = useFeedbackStore((state) => state.filter);
  const setFilter = useFeedbackStore((state) => state.setFilter);
  return (
    <ul className="aside-tags" aria-label="Apply category filters">
      {options.map((item) => (
        <li key={item.option}>
          <Tag
            text={item.name}
            isPressed={filter === item.option}
            onClick={(e) => {
              setFilter(e.target.textContent.toLowerCase());
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
        <Link to=".">View</Link>
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

export function Aside() {
  return (
    <div className="feedback-aside">
      <Hero />
      <CategoryFilters />
      <Roadmap />
    </div>
  );
}
