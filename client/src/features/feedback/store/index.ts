import { create } from "zustand";

interface FeedbackStore {
  sortOrder: string;
  filter: string;
  setSortOrder: (value: string) => void;
  setFilter: (value: string) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  sortOrder: "Most Upvotes",
  filter: "all",
  setSortOrder: (value) => set({ sortOrder: value }),
  setFilter: (value) => set({ filter: value }),
}));
