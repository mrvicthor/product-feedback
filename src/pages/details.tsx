import { useState } from "react";
import { Link, useParams } from "react-router";
import { ChevronLeft, ChevronUp } from "lucide-react";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import type { ProductRequest } from "../domain/schema";
import CommentsIcon from "/assets/shared/icon-comments.svg";
import { CommentItem } from "../components/commentItem";

type Comment = NonNullable<ProductRequest["comments"]>[number];
type Reply = NonNullable<Comment["replies"]>[number];

const MAX_CHARS = 250;

// Shared textarea styles — the active state is the blue border
const textareaClasses =
  "w-full resize-none rounded-[5px] border border-transparent bg-[#F7F8FD] px-6 py-4 text-[15px] text-[#3A4374] placeholder:text-[#8C92B3] outline-none focus:border-[#4661E6] cursor-pointer focus:cursor-text";

const Details = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  // Which comment/reply currently has its reply box open (only one at a time)
  const [activeReplyKey, setActiveReplyKey] = useState<string | null>(null);
  const {
    state: { feedbacks },
  } = useFeedbackContext();

  const detail = feedbacks.find((f) => f.id === Number(id));

  if (!detail) {
    return (
      <div className="mx-auto max-w-182.5 px-6 py-14 text-[#3A4374]">
        <p className="font-bold">Feedback not found.</p>
        <Link to="/" className="text-[#4661E6] font-semibold text-sm">
          Go back home
        </Link>
      </div>
    );
  }

  const { upvotes, title, description, category, comments = [] } = detail;
  const totalComments = comments.reduce(
    (total, c) => total + 1 + (c.replies?.length ?? 0),
    0,
  );
  const charsLeft = MAX_CHARS - newComment.length;

  const toggleReply = (key: string) =>
    setActiveReplyKey((current) => (current === key ? null : key));

  const handlePostReply = (
    commentId: number,
    replyingTo: string,
    content: string,
  ) => {
    // TODO: dispatch add-reply action, e.g.
    // dispatch({ type: "ADD_REPLY", payload: { feedbackId: detail.id, commentId, replyingTo, content } })
    console.info({ commentId, replyingTo, content });
    setActiveReplyKey(null);
  };

  return (
    <div className="mx-auto h-dvh max-w-[730px] px-6 py-6 md:px-10 md:py-14 flex flex-col gap-6">
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-4 text-sm font-bold text-[#647196] hover:underline"
        >
          <ChevronLeft size={16} color="#4661E6" strokeWidth={3} />
          Go Back
        </Link>
        <Link
          to="/edit-feedback"
          className="rounded-[10px] bg-[#4661E6] px-6 py-3 text-sm font-bold text-[#F2F4FE] transition-colors hover:bg-[#7C91F9]"
        >
          Edit Feedback
        </Link>
      </div>

      {/* Feedback card */}
      <div className="shrink-0 rounded-[10px] bg-white p-6 md:p-8 flex items-start gap-10">
        <button className="flex h-13 w-10 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] bg-[#F2F4FE] transition-colors hover:bg-[#CFD7FF]">
          <ChevronUp size={14} color="#4661E6" strokeWidth={3} />
          <span className="text-[13px] font-bold text-[#3A4374]">
            {upvotes}
          </span>
        </button>
        <article className="min-w-0 flex-1">
          <h1 className="text-lg font-bold text-[#3A4374]">{title}</h1>
          <p className="mt-1 text-base text-[#647196]">{description}</p>
          <span className="mt-3 inline-block rounded-[10px] bg-[#F2F4FE] px-4 py-1.5 text-[13px] font-semibold capitalize text-[#4661E6]">
            {category}
          </span>
        </article>
        <div className="flex items-center gap-2 self-center">
          <img src={CommentsIcon} alt="" className="h-4 w-4.5" />
          <span
            className={`font-bold ${totalComments > 0 ? "text-[#3A4374]" : "text-[#647196] opacity-50"}`}
          >
            {totalComments}
          </span>
        </div>
      </div>

      {/* Comments — the only part that scrolls */}
      <section className="min-h-0 flex-1 overflow-y-auto rounded-[10px] bg-white px-6 pb-6 md:px-8 md:pb-8">
        <h2 className="sticky top-0 z-10 bg-white pt-6 pb-1 text-lg font-bold text-[#3A4374]">
          {totalComments} {totalComments === 1 ? "Comment" : "Comments"}
        </h2>

        {comments.length === 0 ? (
          <p className="pt-6 text-[15px] text-[#647196]">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <ul className="divide-y divide-[#8C92B3]/25">
            {comments.map((c) => {
              const commentKey = `comment-${c.id}`;
              return (
                <li key={c.id} className="py-7 last:pb-0">
                  <CommentItem
                    name={c.user.name}
                    username={c.user.username}
                    image={c.user.image}
                    content={c.content}
                    isReplying={activeReplyKey === commentKey}
                    onReplyClick={() => toggleReply(commentKey)}
                    onCancelReply={() => setActiveReplyKey(null)}
                    onPostReply={(content) =>
                      handlePostReply(c.id, c.user.username, content)
                    }
                  />

                  {c.replies && c.replies.length > 0 && (
                    <ul className="mt-6 ml-5 space-y-8 border-l border-[#647196]/10 pl-6">
                      {c.replies.map((r: Reply, i) => {
                        const replyKey = `${commentKey}-reply-${i}`;
                        return (
                          <li key={replyKey}>
                            <CommentItem
                              name={r.user.name}
                              username={r.user.username}
                              image={r.user.image}
                              content={r.content}
                              replyingTo={r.replyingTo}
                              isReplying={activeReplyKey === replyKey}
                              onReplyClick={() => toggleReply(replyKey)}
                              onCancelReply={() => setActiveReplyKey(null)}
                              onPostReply={(content) =>
                                handlePostReply(c.id, r.user.username, content)
                              }
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Add comment — stays pinned at the bottom */}
      <form
        className="shrink-0 rounded-[10px] bg-white px-6 py-6 md:px-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!newComment.trim()) return;
          // TODO: dispatch add-comment action
          setNewComment("");
        }}
      >
        <label
          htmlFor="new-comment"
          className="text-lg font-bold text-[#3A4374]"
        >
          Add Comment
        </label>
        <textarea
          id="new-comment"
          rows={2}
          maxLength={MAX_CHARS}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type your comment here"
          className={`mt-6 ${textareaClasses}`}
        />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[15px] text-[#647196]">
            {charsLeft} characters left
          </span>
          <button
            type="submit"
            className="cursor-pointer rounded-[10px] bg-[#AD1FEA] px-6 py-3 text-sm font-bold text-[#F2F4FE] transition-colors hover:bg-[#C75AF6]"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Details;
