import { type Comment } from "../../domain/schema";
import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import { useAddComment } from "../../hooks/useAddComment";

type Props = {
  id: number;
  comments: Comment[];
};

const textareaClasses =
  "w-full resize-none rounded-[5px] border border-transparent bg-[#F7F8FD] px-6 py-4 text-[15px] text-[#3A4374] placeholder:text-[#8C92B3] outline-none focus:border-[#4661E6] cursor-pointer focus:cursor-text";

const AddCommentForm = ({ id, comments }: Props) => {
  "use no memo";
  const { dispatch } = useFeedbackContext();
  const {
    handleSubmit,
    submitComment,
    charsLeft,
    MAX_CHARS,
    register,
    errors,
  } = useAddComment(id, dispatch, comments);

  return (
    <form
      className="shrink-0 rounded-[10px] bg-white px-6 py-6 md:px-8"
      onSubmit={handleSubmit(submitComment)}
      aria-label="add comment form"
    >
      <label htmlFor="new-comment" className="text-lg font-bold text-[#3A4374]">
        Add Comment
      </label>
      <textarea
        id="new-comment"
        rows={2}
        maxLength={MAX_CHARS}
        {...register("content")}
        aria-invalid={errors.content ? "true" : "false"}
        placeholder="Type your comment here"
        className={`mt-6 ${textareaClasses}`}
      />
      {errors.content && (
        <p role="alert" className="text-xs text-red-500 mt-1">
          {errors.content.message}
        </p>
      )}
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
  );
};

export default AddCommentForm;
