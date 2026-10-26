import { useState } from "react";
import { Link, useParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import { type ProductRequest } from "../domain/schema";

import { CommentItem } from "../components/commentItem";
import NotFound from "../components/notFound";
import AddCommentForm from "../components/forms/addCommentForm";
import data from "../data.json";

import { createDetailPageModel } from "../useCases/viewDetailsPageModel/detailsPageModel";
import DetailCard from "../components/detailCard";

type Comment = NonNullable<ProductRequest["comments"]>[number];
type Reply = NonNullable<Comment["replies"]>[number];

const Details = () => {
  const { id } = useParams();
  const user = data.currentUser;

  const [activeReplyKey, setActiveReplyKey] = useState<string | null>(null);
  const {
    state: { feedbacks },
    dispatch,
    upvotedSet,
    setUpvotedSet,
  } = useFeedbackContext();
  const viewModel = createDetailPageModel(feedbacks, Number(id), upvotedSet);
  if (!viewModel) {
    return <NotFound />;
  }
  const detail = viewModel.detail;

  const {
    upvotes,
    title,
    description,
    category,
    comments = [],
    commentCount: totalComments,
    isUpvoted,
  } = detail;

  const toggleReply = (key: string) =>
    setActiveReplyKey((current) => (current === key ? null : key));

  const handlePostReply = (
    commentId: number,
    replyingTo: string,
    content: string,
  ) => {
    dispatch({
      type: "reply_comment",
      feedbackId: detail.id,
      content,
      commentId,
      replyingTo,
      user,
    });

    setActiveReplyKey(null);
  };

  return (
    <div className="mx-auto h-dvh max-w-182.5 px-6 py-6 md:px-10 md:py-14 flex flex-col gap-6">
      <div className="shrink-0 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-4 text-sm font-bold text-[#647196] hover:underline"
        >
          <ChevronLeft size={16} color="#4661E6" strokeWidth={3} />
          Go Back
        </Link>
        <Link
          to={`/edit-feedback/${Number(id)}`}
          className="rounded-[10px] bg-[#4661E6] px-6 py-3 text-sm font-bold text-[#F2F4FE] transition-colors hover:bg-[#7C91F9]"
        >
          Edit Feedback
        </Link>
      </div>

      <DetailCard
        id={detail.id}
        upvotedSet={upvotedSet}
        setUpvotedSet={setUpvotedSet}
        upvotes={upvotes}
        title={title}
        description={description}
        totalComments={totalComments}
        category={category}
        isUpvoted={isUpvoted}
      />

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
                    replyingTo={c.user.username}
                    user={user}
                    isReplying={activeReplyKey === commentKey}
                    onReplyClick={() => toggleReply(commentKey)}
                    onCancelReply={() => setActiveReplyKey(null)}
                    onPostReply={(content) =>
                      handlePostReply(c.id, c.user.username, content)
                    }
                  />

                  {c.replies && c.replies.length > 0 && (
                    <ul className="mt-6 space-y-8 border-l border-[#647196]/10 pl-6 md:ml-5">
                      {c.replies.map((r: Reply, i) => {
                        const replyKey = `${commentKey}-reply-${i}`;
                        return (
                          <li key={replyKey}>
                            <CommentItem
                              name={r.user.name}
                              username={r.user.username}
                              image={r.user.image}
                              content={r.content}
                              user={user}
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
      <AddCommentForm id={detail.id} comments={comments} />
    </div>
  );
};

export default Details;
