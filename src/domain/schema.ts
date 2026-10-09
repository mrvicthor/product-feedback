import * as z from "zod";

export const CATEGORIES = [
  "UI",
  "UX",
  "enhancement",
  "bug",
  "feature",
] as const;
export const STATUSES = [
  "suggestion",
  "planned",
  "in-progress",
  "live",
] as const;

export const SORT_OPTIONS = [
  { value: "most_upvotes", label: "Most Upvotes" },
  { value: "least_upvotes", label: "Least Upvotes" },
  { value: "most_comments", label: "Most Comments" },
  { value: "least_comments", label: "Least Comments" },
] as const;

export type SortBy = (typeof SORT_OPTIONS)[number]["value"];

export const categorySchema = z.enum(CATEGORIES);
export const statusSchema = z.enum(STATUSES);

export type Category = z.infer<typeof categorySchema>;
export type Status = z.infer<typeof statusSchema>;

export const userSchema = z.object({
  image: z.string(),
  name: z.string(),
  username: z.string(),
});

export const replySchema = z.object({
  content: z.string(),
  replyingTo: z.string(),
  user: userSchema,
});

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  user: userSchema,
  replies: z.array(replySchema).optional(),
});

export const productRequestSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: categorySchema,
  upvotes: z.number().int().nonnegative(),
  status: statusSchema,
  description: z.string(),
  // Some requests have no comments key at all.
  comments: z.array(commentSchema).optional(),
});

export const feedbackDataSchema = z.object({
  currentUser: userSchema,
  productRequests: z.array(productRequestSchema),
});

export type User = z.infer<typeof userSchema>;
export type Reply = z.infer<typeof replySchema>;
export type Comment = z.infer<typeof commentSchema>;
export type ProductRequest = z.infer<typeof productRequestSchema>;
export type FeedbackData = z.infer<typeof feedbackDataSchema>;

const EMPTY = "Can't be empty";

export const addFeedbackSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, EMPTY)
    .max(100, "Feedback title must be 50 characters or less")
    .regex(
      /^\p{L}+(?: \p{L}+)*$/u,
      "Feedback title can only contain letters and spaces",
    ),
  category: categorySchema,
  description: z
    .string()
    .trim()
    .min(5, EMPTY)
    .max(500, "Feedback detail must be 500 characters or fewer"),
});
