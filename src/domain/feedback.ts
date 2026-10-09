import type { Category, ProductRequest, SortBy } from "./schema";

export type FeedbackData = {
  feedbacks: ProductRequest[];
};

export type ActionType =
  | {
      type: "add_feedback";
      id: number;
      title: string;
      category: Category;
      description: string;
    }
  | {
      type: "sort";
      sortBy: SortBy;
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
    case "sort": {
      return {
        ...state,
        feedbacks: [
          ...state.feedbacks.sort((a, b) => {
            if (action.sortBy === "most_upvotes") return b.upvotes - a.upvotes;
            if (action.sortBy === "least_upvotes") return a.upvotes - b.upvotes;
            if (!a.comments || !b.comments) {
              return b.upvotes - a.upvotes;
            } else {
              return action.sortBy === "least_comments"
                ? a.comments.length - b.comments.length
                : b.comments.length - a.comments.length;
            }
          }),
        ],
      };
    }
    default: {
      throw new Error(`Unknown action type: ${(action as ActionType).type}`);
    }
  }
}
