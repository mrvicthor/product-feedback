import type { ProductRequest } from "../domain/schema";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import arrowUp from "/assets/shared/icon-arrow-up.svg";
import commentIcon from "/assets/shared/icon-comments.svg";
type CardProps = {
  feedback: ProductRequest;
  cardColor: string;
};
const Card = ({ feedback, cardColor }: CardProps) => {
  const { title, description, category, upvotes, comments } = feedback;
  const { dispatch } = useFeedbackContext();
  return (
    <div>
      <div
        style={{ borderColor: cardColor }}
        className={`py-6 px-8 bg-white rounded-lg border-t-4`}
      >
        <div className="flex gap-4 items-center">
          <div
            style={{ backgroundColor: cardColor }}
            className="h-2 w-2 rounded-full"
          />{" "}
          <span className="text-[#647196] mr-auto">Planned</span>
        </div>
        <h3 className="mt-2 text-[#3A4374] text-lg font-bold hover:text-[#4661E6]">
          {title}
        </h3>
        <p className="mt-1 text-[#647196]">{description}</p>
        <span className="bg-[#F2F4FF] text-[13px] font-semibold text-[#4661E6] capitalize inline-block py-2 px-4 mt-4 rounded-lg">
          {category}
        </span>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() =>
              dispatch({ type: "upvote", feedbackId: feedback.id })
            }
            type="button"
            className="bg-[#F2F4FE] cursor-pointer hover:bg[#CFD7FF]  flex gap-2 items-center px-4 py-2.75 rounded-lg"
          >
            <img src={arrowUp} className="h-1 w-2" alt="arrow up" />{" "}
            <span className="font-bold text-[13px] text-[#3A4374]">
              {upvotes}
            </span>
          </button>
          <div className="flex items-center gap-2">
            <img src={commentIcon} alt="comment icon" />{" "}
            <span className="font-bold text-[#3A4374]">{comments?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
