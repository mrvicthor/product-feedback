import { useForm } from "react-hook-form";
import { addFeedbackSchema, type AddFeedbackDTO } from "../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFeedbackContext } from "./useFeedbackContext";
import { generateId } from "../helpers/generateId";
import { useNavigate } from "react-router";

export function useAddFeedback() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddFeedbackDTO>({
    resolver: zodResolver(addFeedbackSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      category: "feature",
      description: "",
    },
  });
  const {
    dispatch,
    state: { feedbacks },
  } = useFeedbackContext();

  const onSubmit = (data: AddFeedbackDTO) => {
    const { title, category, description } = data;
    dispatch({
      type: "add_feedback",
      id: generateId(feedbacks),
      title,
      category,
      description,
    });
    reset();
    navigate("/");
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    isSubmitting,
  };
}
