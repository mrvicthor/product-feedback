import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { ProductRequest, Status } from "../domain/schema";
import { getBgColor } from "../helpers/getBgColor";
import arrowUp from "/assets/shared/icon-arrow-up.svg";
import commentIcon from "/assets/shared/icon-comments.svg";
import { Link } from "react-router";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

type Props<T extends string> = {
  tabs: readonly T[];
  feedbacks: ProductRequest[];
};
const Tabs = <T extends string>({ tabs, feedbacks }: Props<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { dispatch } = useFeedbackContext();
  const filteredTabs = tabs.filter((tab) => tab !== "suggestion");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = filteredTabs.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in targets)) return;
    e.preventDefault();
    setActiveIndex(targets[e.key]);
    tabRefs.current[targets[e.key]]?.focus();
  }
  const visibleFeedbacks = useMemo(
    () => feedbacks.filter((f) => f.status === filteredTabs[activeIndex]),
    [activeIndex, feedbacks, filteredTabs],
  );

  return (
    <div className="md:hidden">
      <div role="tablist" className="flex justify-between items-center">
        {tabs
          .filter((option) => option !== "suggestion")
          .map((option, index) => (
            <button
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              key={index}
              id={`${option}-tab`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex ? "true" : "false"}
              aria-controls={`${option}-panel`}
              tabIndex={index === activeIndex ? 0 : -1}
              className={`flex flex-1 justify-center items-center capitalize ${index === activeIndex ? "border-b-4 text-[#3A4374]" : "border-0 text-gray-400"} text-[13px] font-bold focus-visible:text-[#3A4374] py-5`}
              style={{
                borderBottomColor: getBgColor(option as Status),
              }}
              onKeyDown={handleKeyDown}
              onClick={() => setActiveIndex(index)}
            >
              {option} ({feedbacks.filter((f) => f.status === option).length})
            </button>
          ))}
      </div>
      <div
        id={`${filteredTabs[activeIndex]}-panel`}
        role="tabpanel"
        aria-labelledby={`${filteredTabs[activeIndex]}-tab`}
        className="p-6"
      >
        <h2 className="text-lg font-bold text-[#3A4374] capitalize">
          {filteredTabs[activeIndex]} (
          {
            feedbacks.filter((f) => f.status === filteredTabs[activeIndex])
              .length
          }
          )
        </h2>
        <p className="text-[13px] text-[#647196]">
          {filteredTabs[activeIndex] === "in-progress"
            ? "Features currently being developed"
            : filteredTabs[activeIndex] === "planned"
              ? "Ideas prioritized for research"
              : "Released features"}
        </p>
        <ul className="mt-6 flex flex-col gap-4">
          {visibleFeedbacks.map((f) => (
            <li
              key={f.id}
              style={{
                borderTopColor: getBgColor(filteredTabs[activeIndex] as Status),
              }}
              className="border-t-4 rounded-lg px-6 pt-5.5 bg-white pb-6"
            >
              <div className="flex gap-2 items-center">
                <div
                  style={{
                    backgroundColor: getBgColor(
                      filteredTabs[activeIndex] as Status,
                    ),
                  }}
                  className="h-2 w-2 rounded-full"
                />
                <span className="text-[13px] text-[#647196] capitalize">
                  {f.status}
                </span>
              </div>
              <Link
                to={`/detail/${f.id}`}
                className="mt-4 font-bold text-[#3A4374]"
              >
                {f.title}
              </Link>
              <p className="text-[#647196] text-[13px] mt-2.25">
                {f.description}
              </p>
              <span className="bg-[#F2F4FF] text-[#4661E6] py-1.5 px-4 rounded-lg mt-2 inline-block capitalize text-[13px] font-semibold">
                {f.category}
              </span>
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "upvote", feedbackId: f.id })}
                  className="bg-[#F2F4FE] cursor-pointer hover:bg[#CFD7FF]  flex gap-2 items-center px-6 py-2.75 rounded-lg"
                >
                  <img src={arrowUp} className="h-1 w-2" alt="arrow up" />{" "}
                  <span className="font-bold text-[13px] text-[#3A4374]">
                    {f.upvotes}
                  </span>
                </button>
                <div className="flex items-center gap-2">
                  <img src={commentIcon} />{" "}
                  <span className="font-bold text-[#3A4374] text-[13px]">
                    {f.comments?.length}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
