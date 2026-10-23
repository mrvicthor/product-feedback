import { describe, it, expect } from "vitest";
import { feedbackReducer, type ActionType } from "../../../domain/feedback";
import type { ProductRequest } from "../../../domain/schema";

describe("feedback reducer", () => {
  it("should throw an error for unknown action type", () => {
    const state = {
      feedbacks: [],
    };
    const action = { type: "unknown_action" } as unknown as ActionType;
    expect(() => feedbackReducer(state, action)).toThrow(
      "Unknown action type: unknown_action",
    );
  });

  it("should add a new feedback if action type is 'add_feedback'", () => {
    const initialState = {
      feedbacks: [],
    };
    const feedback: ProductRequest = {
      id: 1,
      title: "Add tags for solutions",
      category: "enhancement",
      upvotes: 1,
      isUpvoted: false,
      status: "suggestion",
      description: "Easier to search for solutions based on a specific stack.",
    };

    const next = feedbackReducer(initialState, {
      type: "add_feedback",
      id: feedback.id,
      title: feedback.title,
      category: feedback.category,
      description: feedback.description,
    });

    expect(next).toEqual({
      ...initialState,
      feedbacks: [
        {
          id: 1,
          title: "Add tags for solutions",
          category: "enhancement",
          upvotes: 0,
          isUpvoted: false,
          status: "suggestion",
          description:
            "Easier to search for solutions based on a specific stack.",
        },
      ],
    });
  });
});
