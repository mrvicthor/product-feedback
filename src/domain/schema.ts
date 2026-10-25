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

export const ROADMAPSTATUS = ["planned", "in-progress", "live"] as const;

export const SORT_OPTIONS = [
  { value: "most_upvotes", label: "Most Upvotes" },
  { value: "least_upvotes", label: "Least Upvotes" },
  { value: "most_comments", label: "Most Comments" },
  { value: "least_comments", label: "Least Comments" },
] as const;

export type SortBy = (typeof SORT_OPTIONS)[number]["value"];
const EMPTY = "Can't be empty";
export const categorySchema = z.enum(CATEGORIES);
export const statusSchema = z.enum(STATUSES);
export const roadmapStatus = z.enum(ROADMAPSTATUS);

export type Category = z.infer<typeof categorySchema>;
export type Status = z.infer<typeof statusSchema>;
export type RoadmapStatus = z.infer<typeof roadmapStatus>;

export const userSchema = z.object({
  image: z.string(),
  name: z.string(),
  username: z.string(),
});

export const replySchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, EMPTY)
    .min(10, "Please add a bit more detail (10+ characters)")
    .max(250, "Comment must be 50 characters or less"),
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
  isUpvoted: z.boolean().default(false),
  status: statusSchema,
  description: z.string(),
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

const WORD = String.raw`[\p{L}\p{N}&\/'’.,!?()-]+`;

export const addFeedbackSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, EMPTY)
    .min(5, "Title must be at least 5 characters")
    .max(60, "Title must be 60 characters or less")
    .regex(
      new RegExp(`^${WORD}(?: ${WORD})*$`, "u"),
      "Title can only contain letters, numbers, spaces and basic punctuation",
    ),
  category: categorySchema,
  description: z
    .string()
    .trim()
    .min(1, EMPTY)
    .min(10, "Please add a bit more detail (10+ characters)")
    .max(500, "Feedback detail must be 500 characters or fewer"),
});

export type AddFeedbackDTO = z.infer<typeof addFeedbackSchema>;

export const editFeedbackSchema = addFeedbackSchema.extend({
  id: z.number(),
  status: statusSchema,
});

export type EditFeedbackDTO = z.infer<typeof editFeedbackSchema>;

export const addCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, EMPTY)
    .min(10, "Please add a bit more detail (10+ characters)")
    .max(250, "Comment must be 50 characters or less"),
  user: userSchema,
});

export type AddCommentDTO = z.infer<typeof addCommentSchema>;
