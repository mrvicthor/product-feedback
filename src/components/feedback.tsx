import { type RowComponentProps } from "react-window";
import type { ProductRequest } from "../domain/schema";
import { ChevronUp } from "lucide-react";
import CommentsIcon from "/assets/shared/icon-comments.svg";

const Feedback = ({
  feedbacks,
  index,
  ariaAttributes,
  style,
}: RowComponentProps<{ feedbacks: ProductRequest[] }>) => {
  const feedback = feedbacks[index];
  const isFirst = index === 0;

  return (
    <div
      style={style}
      {...ariaAttributes}
      className={`${isFirst ? "" : "pt-5"}`}
    >
      <div className="h-full rounded-[10px] bg-white max-w-214 py-7 px-8 flex gap-10 justify-between group cursor-pointer">
        <button className="w-10 h-13.25 bg-[#F2F4FE] rounded-xl flex flex-col items-center">
          {" "}
          <ChevronUp />{" "}
          <span className="font-bold text-[13px]">{feedback.upvotes}</span>
        </button>
        <article className="flex-1">
          <h3 className="font-bold text-lg text-[#3A4374] group-hover:text-[#4661E6]">
            {feedback.title}
          </h3>
          <p className="text-[#647196]">{feedback.description}</p>
          <span className="capitalize mt-4 inline-block text-[#4661E6] text-[13px] font-semibold py-1 px-4 bg-[#F2F4FE] rounded-xl">
            {feedback.category}
          </span>
        </article>
        <div className="flex justify-center flex-col">
          <div className="flex items-center gap-4">
            <img src={CommentsIcon} className="h-4 w-4.5" />{" "}
            <span
              className={`${feedback.comments && feedback.comments.length > 0 ? "text-[#3A4374]" : "text-[#647196]"} font-bold`}
            >
              {feedback.comments?.length ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
