import Feedback from "./feedback";
import type { FeedbackCardModel } from "../useCases/viewProductFeedback/productFeedbackPageModel";

type Props = {
  feedbacks: FeedbackCardModel[];
};
const Feedbacks = ({ feedbacks }: Props) => {
  return (
    <ul className=" px-6 md:px-0 my-8 pb-8 space-y-4">
      {feedbacks.map((f) => (
        <Feedback key={f.id} feedback={f} />
      ))}
    </ul>
  );
};

export default Feedbacks;
