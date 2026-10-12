import { ReplyForm } from "./forms/replyForm";

type CommentItemProps = {
  name: string;
  username: string;
  image: string;
  content: string;
  replyingTo?: string;
  isReplying: boolean;
  onReplyClick: () => void;
  onCancelReply: () => void;
  onPostReply: (content: string) => void;
};

// data.json paths start with "./assets/..." — make them root-relative
const avatarSrc = (path: string) => path.replace(/^\.\//, "/");

export const CommentItem = ({
  name,
  username,
  image,
  content,
  replyingTo,
  isReplying,
  onReplyClick,
  onCancelReply,
  onPostReply,
}: CommentItemProps) => (
  <div className="flex gap-8">
    <img
      src={avatarSrc(image)}
      alt=""
      className="h-10 w-10 shrink-0 rounded-full"
    />
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#3A4374]">{name}</h3>
          <p className="text-sm text-[#647196]">@{username}</p>
        </div>
        <button
          type="button"
          onClick={onReplyClick}
          aria-expanded={isReplying}
          className="cursor-pointer text-[13px] font-semibold text-[#4661E6] hover:underline"
        >
          Reply
        </button>
      </div>
      <p className="mt-4 text-[15px] leading-[22px] text-[#647196]">
        {replyingTo && (
          <span className="mr-1 font-bold text-[#AD1FEA]">@{replyingTo}</span>
        )}
        {content}
      </p>

      {isReplying && (
        <ReplyForm
          username={username}
          onCancel={onCancelReply}
          onSubmit={onPostReply}
        />
      )}
    </div>
  </div>
);
