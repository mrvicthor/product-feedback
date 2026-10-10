import { Link } from "react-router";
import plusIcon from "/assets/shared/icon-plus.svg";
import emptyIllustration from "/assets/suggestions/illustration-empty.svg";
const EmptyFeedback = () => {
  return (
    <div className="bg-white rounded-lg max-w-214 mt-6 flex flex-col items-center justify-center h-[80vh]">
      <div>
        <img src={emptyIllustration} />
      </div>
      <p className="font-bold text-2xl text-[#3A4374] mt-[53.5px]">
        There is no feedback yet.
      </p>
      <p className="mt-4 text-[#647196]">
        Got a suggestion? Found a bug that needs to be squashed? we love hearing
        about new ideas to improve our app.
      </p>
      <Link
        className="flex py-3 mt-12 text-white gap-2 capitalize items-center bg-[#C75AF6] px-5 cursor-pointer rounded-[10px] text-sm font-bold"
        to="/add-feedback"
      >
        {" "}
        <img src={plusIcon} className="w-3 h-3" /> add feedback
      </Link>
    </div>
  );
};

export default EmptyFeedback;
