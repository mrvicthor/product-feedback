import { useParams } from "react-router";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import NotFound from "../components/notFound";

import EditFeedbackForm from "../components/forms/editFeedbackForm";

const EditFeedback = () => {
  const { id } = useParams();
  const {
    state: { feedbacks },
  } = useFeedbackContext();
  const feedback = feedbacks.find((f) => f.id === Number(id));
  if (!feedback) return <NotFound />;

  return <EditFeedbackForm feedback={feedback} />;
};

export default EditFeedback;
