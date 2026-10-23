import type { Category } from "../domain/schema";
import { handleUpvote } from "../helpers/handleUpvote";
import { ChevronUp } from "lucide-react";
import CommentsIcon from "/assets/shared/icon-comments.svg";

type Props = {
  id: number;
  upvotedSet: number[];
  setUpvotedSet: React.Dispatch<React.SetStateAction<number[]>>;
  upvotes: number;
  title: string;
  description: string;
  category: Category;
  totalComments: number;
  isUpvoted: boolean;
};

const DetailCard = ({
  id,
  upvotedSet,
  setUpvotedSet,
  upvotes,
  title,
  description,
  category,
  totalComments,
  isUpvoted,
}: Props) => {
  return (
    <div className="shrink-0 rounded-[10px] bg-white p-6 md:p-8 flex items-start gap-10">
      <button
        type="button"
        onClick={() => handleUpvote(Number(id), upvotedSet, setUpvotedSet)}
        className={`flex h-13 w-10 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] ${isUpvoted ? "bg-[#4661E6] text-white" : "bg-[#F2F4FE] hover:bg[#CFD7FF] text-[#3A4374]"}`}
      >
        <ChevronUp
          size={16}
          color={isUpvoted ? "white" : "#3A4374"}
          strokeWidth={3}
        />
        <span className="text-[13px] font-bold">{upvotes}</span>
      </button>
      <article className="min-w-0 flex-1">
        <h1 className="text-lg font-bold text-[#3A4374]">{title}</h1>
        <p className="mt-1 text-base text-[#647196]">{description}</p>
        <span className="mt-3 inline-block rounded-[10px] bg-[#F2F4FE] px-4 py-1.5 text-[13px] font-semibold capitalize text-[#4661E6]">
          {category}
        </span>
      </article>
      <div className="flex items-center gap-2 self-center">
        <img src={CommentsIcon} alt="comment icon" className="h-4 w-4.5" />
        <span
          className={`font-bold ${totalComments > 0 ? "text-[#3A4374]" : "text-[#647196] opacity-50"}`}
        >
          {totalComments}
        </span>
      </div>
    </div>
  );
};

export default DetailCard;
