import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useFilterParams() {
  const [filterParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!filterParams.has("sort"))
      setSearchParams((params) => {
        params.set("sort", "upvotes");
        return params;
      });
    if (!filterParams.has("order"))
      setSearchParams((params) => {
        params.set("order", "desc");
        return params;
      });
    if (!filterParams.has("filter"))
      setSearchParams((params) => {
        params.set("filter", "All");
        return params;
      });
  }, []);

  return {
    sort: filterParams.get("sort"),
    filter: filterParams.get("filter"),
    order: filterParams.get("order"),
    setSearchParams,
  };
}
