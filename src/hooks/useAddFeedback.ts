import { useForm } from "react-hook-form";
import { addFeedbackSchema, type AddFeedbackDTO } from "../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFeedbackContext } from "./useFeedbackContext";
import { toast } from "react-toastify";
import { generateId } from "../helpers/generateId";

export function useAddFeedback() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
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
    toast.success("New feedback added successfully");
  };
  return {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
  };
}
