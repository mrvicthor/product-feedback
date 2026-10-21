import { type RowComponentProps } from "react-window";
import { ChevronUp } from "lucide-react";
import CommentsIcon from "/assets/shared/icon-comments.svg";
import { Link } from "react-router";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import type { FeedbackCardModel } from "../useCases/viewProductFeedback/productFeedbackPageModel";

const Feedback = ({
  feedbacks,
  index,
  ariaAttributes,
  style,
}: RowComponentProps<{ feedbacks: FeedbackCardModel[] }>) => {
  const feedback = feedbacks[index];
  const isFirst = index === 0;
  const { dispatch } = useFeedbackContext();
  return (
    <div
      style={style}
      {...ariaAttributes}
      className={`${isFirst ? "" : "pt-5"}`}
    >
      <div className="h-full w-full rounded-[10px] bg-white py-7 px-8 flex gap-10 justify-between group cursor-pointer">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "upvote", feedbackId: feedback.id });
          }}
          className="w-10 h-13.25 bg-[#F2F4FE] rounded-xl flex flex-col items-center cursor-pointer"
        >
          {" "}
          <ChevronUp color="#4661E6" />{" "}
          <span className="font-bold text-[13px]">{feedback.upvotes}</span>
        </button>
        <article className="flex-1 min-w-0">
          <Link
            to={`/detail/${feedback.id}`}
            className="font-bold text-lg text-[#3A4374] group-hover:text-[#4661E6]"
          >
            {feedback.title}
          </Link>
          <p className="text-[#647196]">{feedback.description}</p>
          <span className="capitalize mt-4 inline-block text-[#4661E6] text-[13px] font-semibold py-1 px-4 bg-[#F2F4FE] rounded-xl">
            {feedback.category}
          </span>
        </article>
        <div className="flex justify-center flex-col">
          <div className="flex items-center gap-4">
            <img src={CommentsIcon} className="h-4 w-4.5" alt="comment icon" />{" "}
            <span
              className={`${feedback.commentCount > 0 ? "text-[#3A4374]" : "text-[#647196]"} font-bold`}
            >
              {feedback.commentCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
