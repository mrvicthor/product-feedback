import { useReducer, useState, type ReactNode } from "react";
import { FeedbackContext } from "./feedback-context";
import { productRequestSchema, sortOptions } from "../domain/schema";
import { feedbackReducer } from "../domain/feedback";
import { z } from "zod";
import data from "../data.json";

const initialState = {
  feedbacks: z.array(productRequestSchema).parse(data.productRequests),
};

export default function FeedbackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [openSortBy, setOpenSortBy] = useState(false);
  const [sortBy, setSortBy] = useState(sortOptions[0].label);
  const [state, dispatch] = useReducer(feedbackReducer, initialState);
  return (
    <FeedbackContext.Provider
      value={{ openSortBy, setOpenSortBy, setSortBy, sortBy, state, dispatch }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
