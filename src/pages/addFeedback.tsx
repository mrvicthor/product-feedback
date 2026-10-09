import { Link } from "react-router";
import arrowLeft from "/assets/shared/icon-arrow-left.svg";
import CustomSelectField from "../components/forms/customSelectField";

const AddFeedback = () => {
  return (
    <section className="mx-auto max-w-2xl mt-20">
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-[#647196] text-sm"
      >
        <img src={arrowLeft} /> Go Back
      </Link>
      <div className="bg-white mt-17 rounded-lg px-10.5 py-13">
        <h1 className="">create new feedback</h1>
        <form>
          <div>
            <label>feedback title</label>
            <p>Add a short, descriptive headline</p>
            <input
              placeholder="add a dark theme option"
              className="py-3 px-4 w-full"
            />
          </div>
          <CustomSelectField />
          <div>
            <label>feedback detail</label>
            <p>
              include any specific comments on what should be improved, added
              etc.
            </p>
            <textarea rows={3} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddFeedback;
