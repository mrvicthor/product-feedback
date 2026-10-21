import { useAddFeedback } from "../../hooks/useAddFeedback";
import InputField from "./inputField";
import { Controller } from "react-hook-form";
import CustomSelectField from "./customSelectField";
import { CATEGORIES } from "../../domain/schema";
import TextareaField from "./textareaField";
import { Link } from "react-router";

const AddFeedbackForm = () => {
  "use no memo"; //The React Compiler (enabled in vite.config.ts) memoizes register("content") on the identity of register, which never changes, so it only runs on the first render.
  const { handleSubmit, onSubmit, control, register, errors, isSubmitting } =
    useAddFeedback();
  return (
    <form
      className="mt-10 space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputField
        {...register("title")}
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
        heading="feedback detail"
        description="Include any specific comments on what should be improved, added
              etc."
        error={errors.description?.message}
        {...register("description")}
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
          disabled={isSubmitting}
          className="cursor-pointer order-first md:order-last hover:opacity-80 bg-[#AD1FEA] text-[#F2F4FE] capitalize font-bold rounded-xl py-[12.5px] px-6 flex items-center justify-center"
        >
          add feedback
        </button>
      </div>
    </form>
  );
};

export default AddFeedbackForm;
