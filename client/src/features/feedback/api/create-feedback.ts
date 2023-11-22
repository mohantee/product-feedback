import { axios } from "@lib/axios";
import { useMutation } from "react-query";
import { Feedback } from "../types";
import { queryClient } from "@lib/react-query";

interface CreateFeedbackDTO {
  title: string;
  content: string;
  category: string;
  status: string;
  token?: string;
}

export const createFeedback = (data: CreateFeedbackDTO): Promise<Feedback> => {
  return axios.post("feedback", data);
};

export const useCreateFeedback = () => {
  return useMutation({
    onMutate: () => {
      queryClient.cancelQueries("feedbacks");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("feedbacks");
    },
    mutationFn: createFeedback,
  });
};
