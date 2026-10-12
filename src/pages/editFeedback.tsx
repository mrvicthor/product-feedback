import { useParams } from "react-router";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import NotFound from "../components/notFound";

const EditFeedback = () => {
  const { id } = useParams();
  const {
    state: { feedbacks },
  } = useFeedbackContext();
  const feedbackToEdit = feedbacks.find((f) => f.id === Number(id));
  if (!feedbackToEdit) return <NotFound />;
  return <div>EditFeedback</div>;
};

export default EditFeedback;
