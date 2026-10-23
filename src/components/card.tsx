import { ChevronUp } from "lucide-react";
import type { ProductRequest } from "../domain/schema";
import { handleUpvote } from "../helpers/handleUpvote";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import commentIcon from "/assets/shared/icon-comments.svg";
type CardProps = {
  feedback: ProductRequest;
  cardColor: string;
};
const Card = ({ feedback, cardColor }: CardProps) => {
  const { title, description, category, upvotes, comments, id } = feedback;
  const { setUpvotedSet, upvotedSet } = useFeedbackContext();
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
            onClick={() => handleUpvote(id, upvotedSet, setUpvotedSet)}
            type="button"
            className={`${feedback.isUpvoted ? "bg-[#4661E6] text-white" : "bg-[#F2F4FE] hover:bg[#CFD7FF] text-[#3A4374]"} flex gap-2 items-center px-4 py-2.75 rounded-lg`}
          >
            <ChevronUp
              size={10}
              color={feedback.isUpvoted ? "white" : "#3A4374"}
            />
            <span className="font-bold text-[13px]">{upvotes}</span>
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
