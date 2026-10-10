import { List } from "react-window";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import Feedback from "./feedback";
import { useMemo } from "react";

const Feedbacks = () => {
  const {
    state: { feedbacks },
    filterBy,
  } = useFeedbackContext();
  const ROW_HEIGHT = 145;
  const ROW_GAP = 20;

  const visibleFeedbacks = useMemo(
    () =>
      filterBy === null
        ? feedbacks
        : feedbacks.filter(
            (feedback) =>
              feedback.category.toLowerCase() === filterBy.toLowerCase(),
          ),
    [feedbacks, filterBy],
  );
  return (
    <div className="mt-6 fixed max-h-[80vh] w-full overflow-auto">
      <List
        rowHeight={(index) => (index === 0 ? ROW_HEIGHT : ROW_HEIGHT + ROW_GAP)}
        rowCount={visibleFeedbacks.length}
        rowProps={{ feedbacks: visibleFeedbacks }}
        rowComponent={Feedback}
      />
    </div>
  );
};

export default Feedbacks;
