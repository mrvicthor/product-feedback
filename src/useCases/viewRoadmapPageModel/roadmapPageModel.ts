import type { ProductRequest } from "../../domain/schema";
import { mapToFeedbackCardModel } from "../../helpers/mapToFeedbackCardModel";
import type { FeedbackCardModel } from "../viewProductFeedback/productFeedbackPageModel";

type RoadmapPageModel = {
  plannedCount: number;
  inProgressCount: number;
  liveCount: number;
  roadmap: FeedbackCardModel[];
};

export const createRoadmapPageModel = (
  requests: ProductRequest[],
  upvotedSet: number[],
): RoadmapPageModel => {
  return {
    roadmap: mapToFeedbackCardModel(requests, upvotedSet),
    plannedCount: requests.filter((r) => r.status === "planned").length,
    inProgressCount: requests.filter((r) => r.status === "in-progress").length,
    liveCount: requests.filter((r) => r.status === "live").length,
  };
};
