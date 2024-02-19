import { axios } from "@lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "@lib/react-query";

export const deleteFeedback = (id: string) => {
  return axios.delete(`feedback/${id}`);
};

export const useDeleteFeedback = () => {
  return useMutation({
    onMutate: () => {
      queryClient.cancelQueries("feedbacks");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("feedbacks");
    },
    mutationFn: deleteFeedback,
  });
};
