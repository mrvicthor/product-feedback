import { type Category } from "../domain/schema";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import RoadmapCard from "./roadmapCard";
import menuIcon from "/assets/shared/mobile/icon-hamburger.svg";
import closeIcon from "/assets/shared/mobile/icon-close.svg";
import MobileMenu from "./mobileMenu";
import { createSidebarModel } from "../useCases/viewProductFeedback/sidebarModel";
import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
const Sidebar = () => {
  const {
    setSelectedFeature,
    setFilterBy,
    filterBy,
    state: { feedbacks },
    setOpenMobileMenu,
    openMobileMenu,
  } = useFeedbackContext();
  const viewModel = useMemo(
    () => createSidebarModel(feedbacks, filterBy),
    [feedbacks, filterBy],
  );
  const { roadmap, categories } = viewModel;
  return (
    <>
      <section className="lg:col-span-1 flex lg:flex-col gap-2.5 lg:gap-6 shrink-0">
        <div className="flex-1 lg:flex-none lg:h-34.25 bg-header-mobile md:bg-header-tablet lg:bg-header-desktop bg-center bg-no-repeat bg-cover flex justify-between md:rounded-[10px] p-6">
          <div className="md:flex md:justify-end md:flex-col">
            <h1 className="text-xl font-bold text-white">Frontend Mentor</h1>
            <p className="text-[15px] font-medium text-white/75">
              Feedback Board
            </p>
          </div>
          <button
            type="button"
            className="cursor-pointer md:hidden"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            <img
              src={openMobileMenu ? closeIcon : menuIcon}
              alt="open and close menu icon"
            />
          </button>
        </div>
        <div className="bg-white hidden md:flex-1 lg:flex-none rounded-[10px] p-6 md:flex gap-x-2 gap-y-3.5 flex-wrap">
          {categories.map((category, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                setFilterBy(category.value);
                setSelectedFeature(category.value as Category);
              }}
              className={`${category.isActive ? "bg-[#4661E6] text-white" : "text-[#4661E6] bg-[#f2f4ff] hover:bg-[#CFD7FF]"} px-4 py-1 rounded-xl text-[13px] font-semibold cursor-pointer capitalize `}
            >
              {category.label}
            </button>
          ))}
        </div>
        <RoadmapCard roadmap={roadmap} />
      </section>
      {openMobileMenu && (
        <AnimatePresence>
          <MobileMenu />
        </AnimatePresence>
      )}
    </>
  );
};

export default Sidebar;
