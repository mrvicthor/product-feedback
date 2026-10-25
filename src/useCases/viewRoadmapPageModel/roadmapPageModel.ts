import type { ProductRequest, Status } from "../../domain/schema";
import { countComments } from "../../helpers/countComments";
import type { ProductFeedbackPageModel } from "../viewProductFeedback/productFeedbackPageModel";

type RoadmapPageModel = Pick<
  ProductFeedbackPageModel,
  "feedbacks" | "isEmpty"
> & { plannedCount: number; inProgressCount: number; liveCount: number };

export const createRoadmapPageModel = (
  requests: ProductRequest[],
  status: Status,
  upvotedSet: number[],
): RoadmapPageModel => {
  const visible = requests.filter((r) => r.status === status);

  return {
    feedbacks: visible.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      description: r.description,
      upvotes: new Set(upvotedSet).has(r.id) ? r.upvotes + 1 : r.upvotes,
      isUpvoted: new Set(upvotedSet).has(r.id),
      commentCount: countComments(r),
      status: r.status,
    })),
    isEmpty: visible.length === 0,
    plannedCount: requests.filter((r) => r.status === "planned").length,
    inProgressCount: requests.filter((r) => r.status === "in-progress").length,
    liveCount: requests.filter((r) => r.status === "live").length,
  };
};
