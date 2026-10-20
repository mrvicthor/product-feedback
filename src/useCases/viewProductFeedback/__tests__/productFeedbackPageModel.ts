import type { Category, ProductRequest, Status } from "../../../domain/schema";

export type FeedbackCardModel = {
  id: number;
  title: string;
  description: string;
  category: Category;
  upvotes: number;
  commentCount: number;
  status: Status;
};

export type ProductFeedbackPageModel = {
  feedbacks: FeedbackCardModel[];
  isEmpty: boolean;
};

const countComments = (request: ProductRequest) =>
  (request.comments ?? []).reduce(
    (total, c) => total + 1 + (c.replies?.length ?? 0),
    0,
  );

export function createProductFeedbackPageModel(
  requests: ProductRequest[],
  filterBy: Category | null,
): ProductFeedbackPageModel {
  const visible =
    filterBy === null
      ? requests
      : requests.filter(
          (request) =>
            request.category.toLowerCase() === filterBy.toLowerCase(),
        );

  return {
    feedbacks: visible.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      upvotes: r.upvotes,
      status: r.status,
      description: r.description,
      commentCount: countComments(r),
    })),
    isEmpty: visible.length === 0,
  };
}
