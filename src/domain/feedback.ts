import type { Category, ProductRequest, SortBy, Status, User } from "./schema";

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
    }
  | {
      type: "upvote";
      feedbackId: number;
    }
  | {
      type: "update_feedback";
      feedbackId: number;
      title: string;
      description: string;
      category: Category;
      status: Status;
    }
  | {
      type: "delete_feedback";
      feedbackId: number;
    }
  | {
      type: "add_comment";
      feedbackId: number;
      content: string;
      contentId: number;
      user: User;
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
    case "upvote": {
      return {
        ...state,
        feedbacks: [
          ...state.feedbacks.map((f) =>
            f.id === action.feedbackId ? { ...f, upvotes: f.upvotes + 1 } : f,
          ),
        ],
      };
    }
    case "update_feedback": {
      return {
        ...state,
        feedbacks: [
          ...state.feedbacks.map((f) =>
            f.id === action.feedbackId
              ? {
                  ...f,
                  title: action.title,
                  description: action.description,
                  status: action.status,
                  category: action.category,
                }
              : f,
          ),
        ],
      };
    }
    case "delete_feedback": {
      return {
        ...state,
        feedbacks: [
          ...state.feedbacks.filter((f) => f.id !== action.feedbackId),
        ],
      };
    }
    case "add_comment": {
      return {
        ...state,
        feedbacks: [
          ...state.feedbacks.map((f) =>
            f.id === action.feedbackId
              ? {
                  ...f,
                  comments: [
                    ...f.comments!,
                    {
                      id: action.contentId,
                      content: action.content,
                      user: action.user,
                    },
                  ],
                }
              : f,
          ),
        ],
      };
    }
    default: {
      throw new Error(`Unknown action type: ${(action as ActionType).type}`);
    }
  }
}
