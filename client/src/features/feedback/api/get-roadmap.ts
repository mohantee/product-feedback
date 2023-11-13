import { axios } from "@lib/axios";
import { useQuery } from "react-query";

interface FeedbackRoadmap {
  planned_count: number;
  in_progress_count: number;
  live_count: number;
}

export const getRoadmap = (): Promise<FeedbackRoadmap> => {
  return axios.get("feedback/roadmap");
};

export const useRoadmap = () => {
  return useQuery<FeedbackRoadmap, Error>({
    queryKey: ["roadmap"],
    queryFn: () => getRoadmap(),
  });
};
