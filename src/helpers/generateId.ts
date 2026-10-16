import type { ProductRequest } from "../domain/schema";

export const generateId = (feedbacks: ProductRequest[]) =>
  feedbacks.reduce((max, f) => Math.max(max, f.id), 0) + 1;
