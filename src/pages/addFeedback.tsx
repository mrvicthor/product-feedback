import { Link } from "react-router";
import arrowLeft from "/assets/shared/icon-arrow-left.svg";
import CustomSelectField from "../components/forms/customSelectField";
import iconNewFeature from "/assets/shared/icon-new-feedback.svg";
import { Controller } from "react-hook-form";
import { useAddFeedback } from "../hooks/useAddFeedback";
import { ToastContainer } from "react-toastify";
import { CATEGORIES } from "../domain/schema";
import InputField from "../components/forms/inputField";
import TextareaField from "../components/forms/textareaField";
import { useRef } from "react";

const AddFeedback = () => {
  const { handleSubmit, onSubmit, control, register, errors } =
    useAddFeedback();
  const { ref: titleRef, ...titleField } = register("title");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className="mx-auto max-w-xl mt-12 px-6 md:px-0">
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-[#647196] text-sm"
      >
        <img src={arrowLeft} /> Go Back
      </Link>
      <div className="bg-white mt-17 rounded-lg px-10.5 pt-13 pb-7 relative">
        <div className="absolute -top-7">
          <img src={iconNewFeature} />
        </div>
        <h1 className="font-bold text-2xl text-[#3A4374] capitalize">
          create new feedback
        </h1>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...titleField}
            ref={(el) => {
              titleRef(el);
              inputRef.current = el;
            }}
            heading="feedback title"
            description="Add a short, descriptive headline"
            error={errors.title?.message}
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
          <TextareaField
            label="description"
            heading="feedback detail"
            description="Include any specific comments on what should be improved, added
              etc."
            error={errors.description?.message}
            {...register("description", { required: true })}
          />

          <div className="flex flex-col md:flex-row md:justify-end gap-4">
            <Link
              to="/"
              className="cursor-pointer hover:opacity-80 bg-[#3A4374] capitalize rounded-xl text-[#F2F4FE] font-bold py-[12.5px] px-6 flex items-center justify-center"
            >
              cancel
            </Link>
            <button
              type="submit"
              className="cursor-pointer order-first md:order-last hover:opacity-80 bg-[#AD1FEA] text-[#F2F4FE] capitalize font-bold rounded-xl py-[12.5px] px-6 flex items-center justify-center"
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

export default AddFeedback;
