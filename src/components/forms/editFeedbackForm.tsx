import { CATEGORIES, STATUSES, type ProductRequest } from "../../domain/schema";
import { Controller } from "react-hook-form";
import { Link } from "react-router";
import CustomSelectField from "./customSelectField";
import InputField from "./inputField";
import arrowLeft from "/assets/shared/icon-arrow-left.svg";
import editIcon from "/assets/shared/icon-edit-feedback.svg";
import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import TextareaField from "./textareaField";
import { useEditFeedbackForm } from "../../hooks/useEditFeedbackForm";

type Props = {
  feedback: ProductRequest;
};
const EditFeedbackForm = ({ feedback }: Props) => {
  "use no memo";
  const { dispatch } = useFeedbackContext();

  const { handleSubmit, onSubmit, errors, register, control } =
    useEditFeedbackForm(feedback, dispatch);
  return (
    <section className="mx-auto max-w-xl mt-12 px-6 md:px-0">
      <Link
        to={`/detail/${feedback.id}`}
        className="flex items-center gap-2 font-bold text-[#647196] text-sm"
      >
        <img src={arrowLeft} /> Go Back
      </Link>
      <div className="bg-white mt-17 rounded-lg px-10.5 pt-13 pb-7 relative">
        <div className="absolute -top-6">
          <img src={editIcon} alt="edit icon" />
        </div>
        <h1 className="font-bold text-2xl text-[#3A4374] capitalize">
          Editing '{feedback.title}'
        </h1>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            heading="feedback title"
            description="Add a short, descriptive headline"
            error={errors.title?.message}
            {...register("title")}
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
            heading="feedback detail"
            description="Include any specific comments on what should be improved, added
              etc."
            error={errors.description?.message}
            {...register("description")}
          />

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <button
              onClick={() =>
                dispatch({ type: "delete_feedback", feedbackId: feedback.id })
              }
              type="button"
              className="bg-[#D73737] order-last md:order-first text-white rounded-xl py-[12.5px] px-6 cursor-pointer font-bold capitalize hover:opacity-40"
            >
              delete
            </button>
            <Link
              to={`/detail/${feedback.id}`}
              className="md:ml-auto cursor-pointer hover:opacity-80 bg-[#3A4374] capitalize rounded-xl text-[#F2F4FE] font-bold py-[12.5px] px-6 flex items-center justify-center"
            >
              cancel
            </Link>
            <button
              type="submit"
              className="cursor-pointer order-first md:order-last hover:opacity-80 bg-[#AD1FEA] text-[#F2F4FE] capitalize font-bold rounded-xl py-[12.5px] px-6 flex items-center justify-center"
            >
              save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditFeedbackForm;
