import { axios } from "@lib/axios";
import { useMutation } from "react-query";
import { Comment } from "@features/feedback/types";
import { queryClient } from "@lib/react-query";

type CreateCommentDTO =
  | {
      feedbackId: number;
      content: string;
    }
  | {
      predecessorId: number;
      content: string;
    };

export const createComment = (data: CreateCommentDTO): Promise<Comment> => {
  return axios.post("comment", data);
};

export const useCreateComment = () => {
  return useMutation({
    onMutate: () => {
      queryClient.cancelQueries(["feedbacks"]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
    },
    mutationFn: createComment,
  });
};
