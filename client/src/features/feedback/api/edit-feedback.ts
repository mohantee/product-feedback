import { axios } from "@lib/axios";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";
import { Feedback } from "../types";

interface EditFeedbackDTO {
  args: {
    title: string;
    content: string;
    category: string;
    status: string;
  };
  id: number;
}

export const editFeedback = (data: EditFeedbackDTO): Promise<Feedback> => {
  return axios.put(`feedback/${data.id}`, data.args);
};

export const useEditFeedback = (id: number) => {
  return useMutation({
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["feedbacks", id] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks", id] });
    },
    mutationFn: editFeedback,
  });
};
