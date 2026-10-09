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
  openCreateForm: boolean;
  setOpenCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFeature: "UI" | "UX" | "enhancement" | "bug" | "feature";
  setSelectedFeature: React.Dispatch<
    React.SetStateAction<"UI" | "UX" | "enhancement" | "bug" | "feature">
  >;
  openFeatures: boolean;
  setOpendFeatures: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined,
);
