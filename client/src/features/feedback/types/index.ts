import { SetURLSearchParams } from "react-router-dom";

export interface Comment {
  id: number;
  content: string;
  feedbackId?: number;
  userId: number;
  predecessorId?: number;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
  predecessorUsername: string;
  avatar: string;
  fullName: string;
  userName: string;
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
