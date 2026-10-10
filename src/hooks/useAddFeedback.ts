import { useForm } from "react-hook-form";
import {
  addFeedbackSchema,
  type AddFeedbackDTO,
  type ProductRequest,
} from "../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFeedbackContext } from "./useFeedbackContext";

export function useAddFeedback() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddFeedbackDTO>({
    resolver: zodResolver(addFeedbackSchema),
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
  const generateId = (feedbacks: ProductRequest[]) =>
    feedbacks.reduce((max, f) => Math.max(max, f.id), 0) + 1;
  const onSubmit = (data: AddFeedbackDTO) => {
    const { title, category, description } = data;
    dispatch({
      type: "add_feedback",
      id: generateId(feedbacks),
      title,
      category,
      description,
    });
  };
  return {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
  };
}
