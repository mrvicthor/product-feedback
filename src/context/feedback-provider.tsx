import { useReducer, useState, type ReactNode } from "react";
import { FeedbackContext } from "./feedback-context";
import {
  type Category,
  productRequestSchema,
  SORT_OPTIONS,
  type SortBy,
} from "../domain/schema";
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
  const [sortBy, setSortBy] = useState<SortBy>(SORT_OPTIONS[0].value);
  const [state, dispatch] = useReducer(feedbackReducer, initialState);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Category>("feature");
  const [openFeatures, setOpendFeatures] = useState(false);
  const [filterBy, setFilterBy] = useState<Category | null>(null);
  return (
    <FeedbackContext.Provider
      value={{
        openSortBy,
        setOpenSortBy,
        setSortBy,
        sortBy,
        state,
        dispatch,
        openCreateForm,
        setOpenCreateForm,
        selectedFeature,
        setSelectedFeature,
        openFeatures,
        setOpendFeatures,
        filterBy,
        setFilterBy,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
