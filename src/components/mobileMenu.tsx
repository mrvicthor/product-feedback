import { useFeedbackContext } from "../hooks/useFeedbackContext";
import { CATEGORIES, type Category } from "../domain/schema";

import MobileRoadmapCard from "./mobileRoadmapCard";

const MobileMenu = () => {
  const {
    setFilterBy,
    setSelectedFeature,
    filterBy,
    state: { feedbacks },
    openMobileMenu,
    setOpenMobileMenu,
  } = useFeedbackContext();
  const plannedTotal = feedbacks.filter((f) => f.status === "planned").length;
  const inProgressTotal = feedbacks.filter(
    (f) => f.status === "in-progress",
  ).length;
  const liveTotal = feedbacks.filter((f) => f.status === "live").length;
  return (
    <>
      <div
        onClick={() => setOpenMobileMenu(false)}
        aria-hidden="true"
        className={`fixed inset-x-0 top-24 bottom-0 z-10 bg-black/50 transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
          openMobileMenu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters and roadmap"
        inert={!openMobileMenu}
        className={`fixed top-24 right-0 bottom-0 z-20 w-80 bg-[#F7F8FD] px-6 pt-6 flex flex-col gap-6 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
          openMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-white rounded-[10px] p-6 flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setFilterBy(null);
              setSelectedFeature("all" as Category);
            }}
            className={`${filterBy === null ? "bg-[#4661E6] text-white" : "text-[#4661E6] bg-[#f2f4ff] hover:bg-[#CFD7FF]"} px-4 py-1 rounded-xl text-[13px] font-semibold cursor-pointer capitalize`}
          >
            all
          </button>
          {CATEGORIES.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setFilterBy(category);
                setSelectedFeature(category);
              }}
              className={`${filterBy?.toLowerCase() === category.toLowerCase() ? "bg-[#4661E6] text-white" : "text-[#4661E6] bg-[#f2f4ff] hover:bg-[#CFD7FF]"} px-4 py-1 rounded-xl text-[13px] font-semibold cursor-pointer capitalize `}
            >
              {category}
            </button>
          ))}
        </div>
        <MobileRoadmapCard
          plannedTotal={plannedTotal}
          inProgressTotal={inProgressTotal}
          liveTotal={liveTotal}
          hideMenu={() => setOpenMobileMenu(false)}
        />
      </div>
    </>
  );
};

export default MobileMenu;
