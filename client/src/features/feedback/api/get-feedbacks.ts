import { axios } from "@lib/axios";
import { useQuery } from "react-query";
import { Feedback } from "../types";

export const getFeedbacks = (): Promise<Feedback[]> => {
  return axios.get("/feedback");
};

export const useFeedbacks = () => {
  return useQuery<Feedback[], Error>({
    queryKey: ["feedbacks"],
    queryFn: () => getFeedbacks(),
  });
};
