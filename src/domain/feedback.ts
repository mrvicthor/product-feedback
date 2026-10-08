import type { Category, ProductRequest } from "./schema";

export type FeedbackData = {
  feedbacks: ProductRequest[];
};

export type ActionType = {
  type: "add_feedback";
  id: number;
  title: string;
  category: Category;
  description: string;
};

export function feedbackReducer(
  state: FeedbackData,
  action: ActionType,
): FeedbackData {
  switch (action.type) {
    case "add_feedback": {
      return {
        ...state,
        feedbacks: [
          ...state.feedbacks,
          {
            id: action.id,
            title: action.title,
            category: action.category,
            upvotes: 0,
            status: "suggestion",
            description: action.description,
          },
        ],
      };
    }
    default: {
      throw new Error("Unknow action type: ", action.type);
    }
  }
}
