import { ChevronUp } from "lucide-react";
import commentIcon from "/assets/shared/icon-comments.svg";
import { Link } from "react-router";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import type { FeedbackCardModel } from "../useCases/viewProductFeedback/productFeedbackPageModel";
import { handleUpvote } from "../helpers/handleUpvote";

type Props = {
  feedback: FeedbackCardModel;
};
const Feedback = ({ feedback }: Props) => {
  const { setUpvotedSet, upvotedSet } = useFeedbackContext();

  return (
    <li className="bg-white p-6 rounded-lg md:flex  md:justify-between md:gap-10">
      <button
        type="button"
        onClick={() => handleUpvote(feedback.id, upvotedSet, setUpvotedSet)}
        className={`${feedback.isUpvoted ? "bg-[#4661E6] text-white" : "bg-[#F2F4FE] hover:bg[#CFD7FF] text-[#3A4374]"} h-15 cursor-pointer hidden md:flex md:flex-col gap-1 items-center px-3 py-1.5 rounded-lg`}
      >
        <ChevronUp size={16} color={feedback.isUpvoted ? "white" : "#3A4374"} />

        <span data-testid="upvote-count" className="font-bold text-[13px]">
          {feedback.upvotes}
        </span>
      </button>
      <article className="md:flex-1 ">
        <Link to={`/detail/${feedback.id}`}>
          <h2 className="font-bold text-[13px] lg:text-lg text-[#3A4374]">
            {feedback.title}
          </h2>
        </Link>
        <p className="text-[#647196] mt-2.25 text-[13px]">
          {feedback.description}
        </p>
        <span className="bg-[#F2F4FF] text-[13px] font-semibold text-[#4661E6] capitalize inline-block py-2 px-4 mt-4 rounded-lg">
          {feedback.category}
        </span>
      </article>
      <div className="md:flex hidden items-center gap-2">
        <img src={commentIcon} alt="comment icon" />{" "}
        <span className="font-bold text-[#3A4374] text-[13px]">
          {feedback.commentCount}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => handleUpvote(feedback.id, upvotedSet, setUpvotedSet)}
          className={`${feedback.isUpvoted ? "bg-[#4661E6] text-white" : "bg-[#F2F4FE] hover:bg[#CFD7FF] text-[#3A4374]"} cursor-pointer flex gap-2 items-center px-4 py-2.75 rounded-lg`}
        >
          <ChevronUp
            size={10}
            color={feedback.isUpvoted ? "white" : "#3A4374"}
          />
          <span data-testid="upvote-count" className="font-bold text-[13px]">
            {feedback.upvotes}
          </span>
        </button>
        <div className="flex items-center gap-2">
          <img src={commentIcon} alt="comment icon" />{" "}
          <span className="font-bold text-[#3A4374] text-[13px]">
            {feedback.commentCount}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Feedback;
