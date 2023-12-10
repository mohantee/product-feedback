import { useQuery } from "react-query";
import { Feedback } from "../types";
import { axios } from "@lib/axios";

interface FeedbacksByRoadmap {
  live: Feedback[];
  in_progress: Feedback[];
  planned: Feedback[];
}

export const getFeedbackRoadmap = (): Promise<FeedbacksByRoadmap> => {
  return axios.get("feedback/roadmaps");
};

export const useFeedbackRoadmap = () => {
  return useQuery<FeedbacksByRoadmap, Error>({
    queryKey: ["feedbackRoadmap"],
    queryFn: getFeedbackRoadmap,
  });
};
