import { useContext } from "react";
import { FeedbackContext } from "../context/feedback-context";

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedback context hook must be used in Feedback Provider",
    );
  }
  return context;
}
