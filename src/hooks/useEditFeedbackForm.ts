import { useForm } from "react-hook-form";
import {
  editFeedbackSchema,
  type EditFeedbackDTO,
  type ProductRequest,
} from "../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { ActionType } from "../domain/feedback";

export function useEditFeedbackForm(
  feedback: ProductRequest,
  dispatch: React.ActionDispatch<[action: ActionType]>,
) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditFeedbackDTO>({
    resolver: zodResolver(editFeedbackSchema),
    defaultValues: {
      id: feedback.id,
      title: feedback.title,
      description: feedback.description,
      category: feedback.category,
      status: feedback.status,
    },
  });

  const onSubmit = (data: EditFeedbackDTO) => {
    dispatch({
      type: "update_feedback",
      feedbackId: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      status: data.status,
    });
    toast.success("Feedback updated successfully");
  };
  return {
    handleSubmit,
    register,
    control,
    onSubmit,
    errors,
  };
}
