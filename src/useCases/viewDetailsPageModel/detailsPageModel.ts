import type { Category, Comment, ProductRequest } from "../../domain/schema";
import { countComments } from "../../helpers/countComments";

export type DetailCardModel = {
  id: number;
  title: string;
  description: string;
  category: Category;
  upvotes: number;
  isUpvoted: boolean;
  commentCount: number;
  comments?: Comment[];
};

export type DetailCardPageModel = {
  detail: DetailCardModel;
};

export function createDetailPageModel(
  feedbacks: ProductRequest[],
  id: number,
  upvotedSet: number[],
): DetailCardPageModel | null {
  const feedback = feedbacks.find((f) => f.id === id);
  if (!feedback) return null;
  return {
    detail: {
      id: feedback.id,
      title: feedback.title,
      description: feedback.description,
      category: feedback.category,
      upvotes: new Set(upvotedSet).has(feedback.id)
        ? feedback.upvotes + 1
        : feedback.upvotes,
      isUpvoted: new Set(upvotedSet).has(feedback.id),
      commentCount: countComments(feedback),
      comments: feedback.comments,
    },
  };
}
