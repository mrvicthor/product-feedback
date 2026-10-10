import plusIcon from "/assets/shared/icon-plus.svg";
import { Link } from "react-router";

type Props = {
  classes?: string;
};

const AddNewFeedbackButton = ({ classes }: Props) => {
  return (
    <Link
      className={`${classes} flex py-3 text-white gap-2 capitalize items-center bg-[#C75AF6] px-5 cursor-pointer rounded-[10px] text-sm font-bold`}
      to="/add-feedback"
    >
      {" "}
      <img src={plusIcon} className="w-3 h-3" /> add feedback
    </Link>
  );
};

export default AddNewFeedbackButton;
