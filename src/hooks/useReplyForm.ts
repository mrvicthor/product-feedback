import { useForm } from "react-hook-form";
import { replySchema, type Reply } from "../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type User = {
  image: string;
  name: string;
  username: string;
};

export const useReplyForm = (
  replyingTo: string,
  onSubmit: (content: string) => void,
  user: User,
) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Reply>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: "",
      user,
      replyingTo: replyingTo,
    },
  });

  const submitReply = (data: Reply) => {
    onSubmit(data.content);
    reset();
  };

  return {
    handleSubmit,
    errors,
    submitReply,
    register,
  };
};
