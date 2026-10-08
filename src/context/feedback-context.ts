import { createContext } from "react";
import type { ActionType, FeedbackData } from "../domain/feedback";

export type FeedbackContextType = {
  openSortBy: boolean;
  setOpenSortBy: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  state: FeedbackData;
  dispatch: React.ActionDispatch<[action: ActionType]>;
};

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined,
);
