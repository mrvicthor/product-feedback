import { useForm } from "react-hook-form";
import { type Reply, replySchema } from "../../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type ReplyFormProps = {
  username: string;
  onCancel: () => void;
  onSubmit: (content: string) => void;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replyingTo: string;
};

const MAX_CHARS = 250;
const textareaClasses =
  "w-full resize-none rounded-[5px] border  bg-[#F7F8FD] px-6 py-4 text-[15px] text-[#3A4374] placeholder:text-[#8C92B3] outline-none focus:border-[#4661E6] cursor-pointer focus:cursor-text";

export const ReplyForm = ({
  username,
  onCancel,
  onSubmit,
  user,
  replyingTo,
}: ReplyFormProps) => {
  "use no memo";
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Reply>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: "",
      user,
      replyingTo: replyingTo as string,
    },
  });

  const submitReply = (data: Reply) => {
    onSubmit(data.content);
    reset();
  };

  return (
    <form
      className="mt-6 flex flex-col md:flex-row items-start gap-4"
      onSubmit={handleSubmit(submitReply)}
    >
      <div className="flex flex-1 flex-col">
        <textarea
          autoFocus
          rows={2}
          maxLength={MAX_CHARS}
          {...register("content", { required: true })}
          aria-invalid={errors.content ? "true" : "false"}
          onKeyDown={(e) => e.key === "Escape" && onCancel()}
          placeholder={`Reply to @${username}`}
          aria-label={`Reply to ${username}`}
          className={`flex-1 ${textareaClasses} ${errors.content ? "border-red-500" : "border-transparent"}`}
        />
        {errors.content && (
          <p role="alert" className="text-xs text-red-500 mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-[10px] bg-[#AD1FEA] px-6 py-3 text-sm font-bold text-[#F2F4FE] transition-colors hover:bg-[#C75AF6]"
      >
        Post Reply
      </button>
    </form>
  );
};
