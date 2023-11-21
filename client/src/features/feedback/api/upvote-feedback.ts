import { axios } from "@lib/axios";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";

interface UpvoteDTO {
  id: number;
  userId: string;
  feedbackId: number;
}

interface UpvoteFeedbackArgs {
  id: number;
  isUpvoted: boolean;
}

export const upvoteFeedback = (
  data: UpvoteFeedbackArgs
): Promise<UpvoteDTO> => {
  if (!data.isUpvoted) {
    return axios.post(`feedback/upvote`, data);
  }
  return axios.delete(`feedback/upvote`, { data });
};

export const useUpvoteFeedback = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
    },
    mutationFn: upvoteFeedback,
  });
};
