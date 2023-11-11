import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const sortSchema = z.union([
  z.literal("Most Upvotes"),
  z.literal("Least Upvotes"),
  z.literal("Most Comments"),
  z.literal("Least Comments"),
]);

const filterSchema = z.union([
  z.literal("All"),
  z.literal("UI"),
  z.literal("UX"),
  z.literal("Enhancement"),
  z.literal("Bug"),
  z.literal("Feature"),
]);

export function useFilterParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  if (
    !searchParams.has("filter") ||
    !filterSchema.safeParse(searchParams.get("filter")).success
  )
    setSearchParams(
      (params) => {
        params.set("filter", "All");
        return params;
      },
      { replace: true }
    );

  useEffect(() => {
    if (
      !searchParams.has("sort") ||
      !sortSchema.safeParse(searchParams.get("sort")).success
    )
      setSearchParams(
        (params) => {
          params.set("sort", "Most Upvotes");
          return params;
        },
        { replace: true }
      );
  }, []);

  return {
    sort: searchParams.get("sort") ?? "Most Upvotes",
    filter: searchParams.get("filter") ?? "All",
    setSearchParams,
  };
}
