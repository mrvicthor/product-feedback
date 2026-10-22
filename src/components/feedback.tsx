import arrowUp from "/assets/shared/icon-arrow-up.svg";
import commentIcon from "/assets/shared/icon-comments.svg";
import { Link } from "react-router";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import type { FeedbackCardModel } from "../useCases/viewProductFeedback/productFeedbackPageModel";

type Props = {
  feedback: FeedbackCardModel;
};
const Feedback = ({ feedback }: Props) => {
  const { dispatch } = useFeedbackContext();
  return (
    <li className="bg-white p-6 rounded-lg md:flex  md:justify-between md:gap-10">
      <button
        type="button"
        onClick={() => dispatch({ type: "upvote", feedbackId: feedback.id })}
        className="bg-[#F2F4FE] w-10 h-13.25 cursor-pointer hover:bg[#CFD7FF] hidden  md:flex md:flex-col gap-2 items-center px-4 py-2.75 rounded-lg"
      >
        <img src={arrowUp} className="h-1 w-2" alt="arrow up" />{" "}
        <span className="font-bold text-[13px] text-[#3A4374]">
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
          onClick={() => dispatch({ type: "upvote", feedbackId: feedback.id })}
          className="bg-[#F2F4FE] cursor-pointer hover:bg[#CFD7FF]  flex gap-2 items-center px-4 py-2.75 rounded-lg"
        >
          <img src={arrowUp} className="h-1 w-2" alt="arrow up" />{" "}
          <span className="font-bold text-[13px] text-[#3A4374]">
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
