import { List } from "react-window";
import Feedback from "./feedback";
import type { ProductRequest } from "../domain/schema";

type Props = {
  feedbacks: ProductRequest[];
};
const Feedbacks = ({ feedbacks }: Props) => {
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
