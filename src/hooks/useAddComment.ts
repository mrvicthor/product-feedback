import type { ActionType } from "../domain/feedback";
import data from "../data.json";
import { useForm } from "react-hook-form";
import {
  addCommentSchema,
  type AddCommentDTO,
  type Comment,
} from "../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateId } from "../helpers/generateId";

const MAX_CHARS = 250;
export function useAddComment(
  id: number,
  dispatch: React.ActionDispatch<[action: ActionType]>,
  comments: Comment[],
) {
  const { image, name, username } = data.currentUser;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<AddCommentDTO>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: "",
      user: {
        name,
        image,
        username,
      },
    },
  });

  const comment = watch("content");

  const charsLeft = MAX_CHARS - comment.length;

  const submitComment = (data: AddCommentDTO) => {
    const { content, user } = data;
    dispatch({
      type: "add_comment",
      feedbackId: Number(id),
      content,
      contentId: generateId(comments),
      user,
    });
    reset();
  };

  return {
    handleSubmit,
    errors,
    register,
    charsLeft,
    submitComment,
    MAX_CHARS,
  };
}
