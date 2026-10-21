import { List } from "react-window";
import Feedback from "./feedback";
import arrowUp from "/assets/shared/icon-arrow-up.svg";
import commentIcon from "/assets/shared/icon-comments.svg";
import { Link } from "react-router";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import type { FeedbackCardModel } from "../useCases/viewProductFeedback/__tests__/productFeedbackPageModel";

type Props = {
  feedbacks: FeedbackCardModel[];
};
const Feedbacks = ({ feedbacks }: Props) => {
  const ROW_HEIGHT = 145;
  const ROW_GAP = 20;
  const { dispatch } = useFeedbackContext();

  return (
    <>
      <div className="mt-6 flex-1 w-full min-h-0 hidden md:block">
        <List
          rowHeight={(index) =>
            index === 0 ? ROW_HEIGHT : ROW_HEIGHT + ROW_GAP
          }
          className="h-screen overflow-x-hidden"
          rowCount={feedbacks.length}
          rowProps={{ feedbacks }}
          rowComponent={Feedback}
        />
      </div>
      <ul className="overflow-auto h-[82vh] px-6 my-8 pb-8 space-y-4 md:hidden">
        {feedbacks.map((f) => (
          <li key={f.id} className="bg-white p-6 rounded-lg">
            <Link to={`/detail/${f.id}`}>
              <h2 className="font-bold text-[13px] text-[#3A4374]">
                {f.title}
              </h2>
            </Link>
            <p className="text-[#647196] mt-2.25 text-[13px]">
              {f.description}
            </p>
            <span className="bg-[#F2F4FF] text-[13px] font-semibold text-[#4661E6] capitalize inline-block py-2 px-4 mt-4 rounded-lg">
              {f.category}
            </span>
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => dispatch({ type: "upvote", feedbackId: f.id })}
                className="bg-[#F2F4FE] cursor-pointer hover:bg[#CFD7FF]  flex gap-2 items-center px-4 py-2.75 rounded-lg"
              >
                <img src={arrowUp} className="h-1 w-2" />{" "}
                <span className="font-bold text-[13px] text-[#3A4374]">
                  {f.upvotes}
                </span>
              </button>
              <div className="flex items-center gap-2">
                <img src={commentIcon} />{" "}
                <span className="font-bold text-[#3A4374] text-[13px]">
                  {f.commentCount}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Feedbacks;
