import type { Comment, ProductRequest } from "../domain/schema";

export const generateId = (feedbacks: ProductRequest[] | Comment[]) =>
  feedbacks.reduce((max, f) => Math.max(max, f.id), 0) + 1;
