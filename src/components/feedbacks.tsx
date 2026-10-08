import { List } from "react-window";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import Feedback from "./feedback";

const Feedbacks = () => {
  const {
    state: { feedbacks },
  } = useFeedbackContext();
  const ROW_HEIGHT = 145;
  const ROW_GAP = 20;
  return (
    <div className="mt-6 fixed max-h-[80vh] w-full overflow-auto">
      <List
        rowHeight={(index) => (index === 0 ? ROW_HEIGHT : ROW_HEIGHT + ROW_GAP)}
        rowCount={feedbacks.length}
        rowProps={{ feedbacks }}
        rowComponent={Feedback}
      />
    </div>
  );
};

export default Feedbacks;
