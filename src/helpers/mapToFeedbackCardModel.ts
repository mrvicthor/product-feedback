import type { ProductRequest } from "../domain/schema";
import { countComments } from "./countComments";

export const mapToFeedbackCardModel = (
  requests: ProductRequest[],
  upvotedSet: number[],
) =>
  requests.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    description: r.description,
    upvotes: new Set(upvotedSet).has(r.id) ? r.upvotes + 1 : r.upvotes,
    isUpvoted: new Set(upvotedSet).has(r.id),
    commentCount: countComments(r),
    status: r.status,
  }));
