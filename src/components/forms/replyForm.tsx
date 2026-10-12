import { useState } from "react";

type ReplyFormProps = {
  username: string;
  onCancel: () => void;
  onSubmit: (content: string) => void;
};

const MAX_CHARS = 250;
const textareaClasses =
  "w-full resize-none rounded-[5px] border border-transparent bg-[#F7F8FD] px-6 py-4 text-[15px] text-[#3A4374] placeholder:text-[#8C92B3] outline-none focus:border-[#4661E6] cursor-pointer focus:cursor-text";

export const ReplyForm = ({ username, onCancel, onSubmit }: ReplyFormProps) => {
  const [reply, setReply] = useState("");

  return (
    <form
      className="mt-6 flex items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!reply.trim()) return;
        onSubmit(reply.trim());
      }}
    >
      <textarea
        autoFocus
        rows={2}
        maxLength={MAX_CHARS}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        placeholder={`Reply to @${username}`}
        aria-label={`Reply to ${username}`}
        className={`flex-1 ${textareaClasses}`}
      />
      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-[10px] bg-[#AD1FEA] px-6 py-3 text-sm font-bold text-[#F2F4FE] transition-colors hover:bg-[#C75AF6]"
      >
        Post Reply
      </button>
    </form>
  );
};
