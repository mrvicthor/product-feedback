import { Link } from "react-router";
import AddNewFeedbackButton from "./addNewFeedbackButton";
import { ChevronLeft } from "lucide-react";

const RoadmapHeader = () => {
  return (
    <header className="h-28.25 bg-[#373F68] flex justify-between items-center rounded-xl px-10">
      <div>
        <Link
          to="/"
          className="flex items-center capitalize text-white text-sm gap-2"
        >
          <ChevronLeft size={12} /> go back
        </Link>
        <h1 className="text-white text-2xl font-bold capitalize">roadmap</h1>
      </div>
      <AddNewFeedbackButton classes="ml-auto" />
    </header>
  );
};

export default RoadmapHeader;
