import { axios } from "@lib/axios";
import { queryClient } from "@lib/react-query";
import { useMutation } from "react-query";
import { Feedback } from "../types";

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
    onMutate: async ({ id, isUpvoted }: UpvoteFeedbackArgs) => {
      const previousFeedbacks =
        queryClient.getQueryData<Feedback[]>("feedbacks");

      const newFeedbacks =
        previousFeedbacks?.map((feedback) => {
          if (feedback.id === id) {
            return {
              ...feedback,
              isUpvoted: !isUpvoted,
              _count: {
                ...feedback._count,
                upvotes: isUpvoted
                  ? feedback._count.upvotes - 1
                  : feedback._count.upvotes + 1,
              },
            };
          } else return feedback;
        }) || [];

      console.log("filter", newFeedbacks);

      queryClient.setQueryData("feedbacks", newFeedbacks);
    },

    onError: (_, __, context: any) => {
      queryClient.setQueryData(["feedbacks"], context.previousTodos);
    },
    onSuccess: (data: UpvoteDTO) => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", `feedbacks/${data.id}`],
      });
    },
    mutationFn: upvoteFeedback,
  });
};
