import type { ProductRequest } from "../domain/schema";

export const countComments = (request: ProductRequest) =>
  (request.comments ?? []).reduce(
    (total, c) => total + 1 + (c.replies?.length ?? 0),
    0,
  );
