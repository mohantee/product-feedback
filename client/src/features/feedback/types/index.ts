import { SetURLSearchParams } from "react-router-dom";

interface Comment {
  id: string;
  content: string;
  feedbackId: number;
  userId: string;
  predecessorId: string | null;
  createdAt: string;
  updatedAt: string;
  replies: Comment[];
}

export interface Feedback {
  id: number;
  title: string;
  content: string;
  userId: string;
  category: "all" | "ui" | "ux" | "enhancement" | "bug" | "feature";
  status: string;
  createdAt: string;
  comments: Comment[];
  isUpvoted: boolean;
  _count: {
    upvotes: number;
    comments: number;
  };
}

export interface SearchParamProps {
  searchParams: {
    sort: string;
    filter: string;
    setSearchParams: SetURLSearchParams;
  };
}
