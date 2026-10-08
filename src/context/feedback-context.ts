import { createContext } from "react";
import type { ActionType, FeedbackData } from "../domain/feedback";
import type { SortBy } from "../domain/schema";

export type FeedbackContextType = {
  openSortBy: boolean;
  setOpenSortBy: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: SortBy;
  setSortBy: React.Dispatch<
    React.SetStateAction<
      "most_upvotes" | "least_upvotes" | "most_comments" | "least_comments"
    >
  >;
  state: FeedbackData;
  dispatch: React.ActionDispatch<[action: ActionType]>;
};

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined,
);
