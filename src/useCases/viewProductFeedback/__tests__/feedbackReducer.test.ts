import { describe, it, expect } from "vitest";
import { feedbackReducer, type ActionType } from "../../../domain/feedback";

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
});
