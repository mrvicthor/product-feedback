import { Link } from "react-router";
import arrowLeft from "/assets/shared/icon-arrow-left.svg";
import iconNewFeature from "/assets/shared/icon-new-feedback.svg";
import AddFeedbackForm from "../components/forms/addFeedbackForm";
import { ToastContainer } from "react-toastify";

const AddFeedback = () => {
  return (
    <>
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
          <AddFeedbackForm />
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default AddFeedback;
