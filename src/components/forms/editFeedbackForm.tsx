import {
  CATEGORIES,
  editFeedbackSchema,
  STATUSES,
  type EditFeedbackDTO,
  type ProductRequest,
} from "../../domain/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import CustomSelectField from "./customSelectField";
import InputField from "./inputField";
import arrowLeft from "/assets/shared/icon-arrow-left.svg";
import editIcon from "/assets/shared/icon-edit-feedback.svg";
import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import TextareaField from "./textareaField";

type Props = {
  feedback: ProductRequest;
};
const EditFeedbackForm = ({ feedback }: Props) => {
  const { dispatch } = useFeedbackContext();
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

  return (
    <section className="mx-auto max-w-xl mt-12">
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-[#647196] text-sm"
      >
        <img src={arrowLeft} /> Go Back
      </Link>
      <div className="bg-white mt-17 rounded-lg px-10.5 pt-13 pb-7 relative">
        <div className="absolute -top-6">
          <img src={editIcon} />
        </div>
        <h1 className="font-bold text-2xl text-[#3A4374] capitalize">
          Editing '{feedback.title}'
        </h1>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="title"
            heading="feedback title"
            description="Add a short, descriptive headline"
            placeholder="Add a dark theme option"
            error={errors.title?.message}
            {...register("title", { required: "Title is required" })}
          />

          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <CustomSelectField
                description="Choose a category for your feedback"
                label="category"
                {...field}
                options={CATEGORIES}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <CustomSelectField
                description="Change feedback state"
                label="update status"
                {...field}
                options={STATUSES}
                error={fieldState.error?.message}
              />
            )}
          />

          <TextareaField
            label="description"
            heading="feedback detail"
            description="Include any specific comments on what should be improved, added
              etc."
            error={errors.description?.message}
            {...register("description", { required: true })}
          />

          <div className="flex justify-between gap-4">
            <button
              onClick={() =>
                dispatch({ type: "delete_feedback", feedbackId: feedback.id })
              }
              type="button"
              className="bg-[#D73737] text-white rounded-xl py-[12.5px] px-6 cursor-pointer font-bold capitalize hover:opacity-40"
            >
              delete
            </button>
            <Link
              to="/"
              className="ml-auto cursor-pointer hover:opacity-80 bg-[#3A4374] capitalize rounded-xl text-[#F2F4FE] font-bold py-[12.5px] px-6 flex items-center justify-center"
            >
              cancel
            </Link>
            <button
              type="submit"
              className="cursor-pointer hover:opacity-80 bg-[#AD1FEA] text-[#F2F4FE] capitalize font-bold rounded-xl py-[12.5px] px-6 flex items-center justify-center"
            >
              add feedback
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default EditFeedbackForm;
