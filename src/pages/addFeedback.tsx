import { Link } from "react-router";
import arrowLeft from "/assets/shared/icon-arrow-left.svg";
import CustomSelectField from "../components/forms/customSelectField";
import iconNewFeature from "/assets/shared/icon-new-feedback.svg";
import { Controller } from "react-hook-form";
import { useAddFeedback } from "../hooks/useAddFeedback";

const AddFeedback = () => {
  const { handleSubmit, onSubmit, control, register, errors } =
    useAddFeedback();
  return (
    <section className="mx-auto max-w-xl mt-12">
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
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="title"
                  className="font-bold text-sm capitalize text-[#3A4374]"
                >
                  feedback title
                </label>
                <p className="text-sm text-[#647196]">
                  Add a short, descriptive headline
                </p>
                <input
                  id="title"
                  {...field}
                  {...register("title")}
                  aria-invalid={errors.title ? "true" : "false"}
                  placeholder="Add a dark theme option"
                  className={`py-3 px-4 w-full mt-4 bg-[#F7F8FD] hover:border hover:border-[#4661E6] cursor-pointer rounded-lg ${errors.title && "border border-red-500"}`}
                />
                {errors.title && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => <CustomSelectField {...field} />}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="description"
                  className="font-bold text-sm capitalize text-[#3A4374]"
                >
                  feedback detail
                </label>
                <p className="text-sm text-[#647196]">
                  Include any specific comments on what should be improved,
                  added etc.
                </p>
                <textarea
                  id="description"
                  {...register("description")}
                  {...field}
                  aria-invalid={errors.title ? "true" : "false"}
                  rows={4}
                  className={`px-4 py-3 w-full mt-4 bg-[#F7F8FD] hover:border hover:border-[#4661E6] cursor-pointer rounded-lg ${errors.description && "border border-red-500"}`}
                />
                {errors.description && (
                  <p role="alert" className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex justify-end gap-4">
            <Link
              to="/"
              className="cursor-pointer hover:opacity-80 bg-[#3A4374] capitalize rounded-xl text-[#F2F4FE] font-bold py-[12.5px] px-6 flex items-center justify-center"
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
    </section>
  );
};

export default AddFeedback;
