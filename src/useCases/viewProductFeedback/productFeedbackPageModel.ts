import type {
  Category,
  ProductRequest,
  SortBy,
  Status,
} from "../../domain/schema";
import { countComments } from "../../helpers/countComments";

export type FeedbackCardModel = {
  id: number;
  title: string;
  description: string;
  category: Category;
  upvotes: number;
  isUpvoted: boolean;
  commentCount: number;
  status: Status;
};

export type ProductFeedbackPageModel = {
  feedbacks: FeedbackCardModel[];
  isEmpty: boolean;
  suggestionCount: number;
};

const comparators: Record<
  SortBy,
  (a: FeedbackCardModel, b: FeedbackCardModel) => number
> = {
  most_upvotes: (a, b) => b.upvotes - a.upvotes,
  least_upvotes: (a, b) => a.upvotes - b.upvotes,
  most_comments: (a, b) => b.commentCount - a.commentCount,
  least_comments: (a, b) => a.commentCount - b.commentCount,
};

export function createProductFeedbackPageModel(
  requests: ProductRequest[],
  filterBy: Category | null,
  sortBy: SortBy,
  upvotedSet: number[],
): ProductFeedbackPageModel {
  const visible =
    filterBy === null
      ? requests
      : requests.filter(
          (request) =>
            request.category.toLowerCase() === filterBy.toLowerCase(),
        );

  return {
    feedbacks: visible
      .map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        upvotes: new Set(upvotedSet).has(r.id) ? r.upvotes + 1 : r.upvotes,
        isUpvoted: new Set(upvotedSet).has(r.id),
        status: r.status,
        description: r.description,
        commentCount: countComments(r),
      }))
      .sort(comparators[sortBy]),
    isEmpty: visible.length === 0,
    suggestionCount: visible.filter((f) => f.status === "suggestion").length,
  };
}
