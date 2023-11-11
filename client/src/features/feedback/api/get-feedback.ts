import { axios } from "@lib/axios";
import { useQuery } from "react-query";
import { Feedback } from "../types";

export const getFeedback = (feedbackId: number): Promise<Feedback> => {
  return axios.get(`feedback/${feedbackId}`);
};

export const useFeedback = (feedbackId: number) => {
  return useQuery<Feedback, Error>({
    queryKey: ["feedback", feedbackId],
    queryFn: () => getFeedback(feedbackId),
  });
};
