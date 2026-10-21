import { useFeedbackContext } from "../hooks/useFeedbackContext";
import { type Category } from "../domain/schema";
import { motion } from "framer-motion";
import MobileRoadmapCard from "./mobileRoadmapCard";
import { createSidebarModel } from "../useCases/viewProductFeedback/sidebarModel";
import { useMemo } from "react";

const MobileMenu = () => {
  const panelSpring = {
    type: "spring",
    stiffness: 140,
    damping: 24,
    mass: 1,
  } as const;
  const {
    setFilterBy,
    setSelectedFeature,
    filterBy,
    state: { feedbacks },
    openMobileMenu,
    setOpenMobileMenu,
  } = useFeedbackContext();
  const menu = useMemo(
    () => createSidebarModel(feedbacks, filterBy),
    [feedbacks, filterBy],
  );
  const { categories, roadmap } = menu;
  return (
    <>
      <motion.div
        key="overlay"
        onClick={() => setOpenMobileMenu(false)}
        aria-hidden="true"
        className="fixed inset-x-0 top-24.5 bottom-0 z-10 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      />
      <motion.div
        key="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Filters and roadmap"
        inert={!openMobileMenu}
        className="fixed top-24.5 right-0 bottom-0 z-20 flex w-80 flex-col gap-6 bg-[#F7F8FD] px-6 pt-6"
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: panelSpring }}
        exit={{
          x: "100%",
          transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.2, duration: 0.5 },
          }}
          className="flex flex-wrap gap-2 rounded-[10px] bg-white p-6"
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.3, duration: 0.5 },
          }}
        >
          <MobileRoadmapCard
            roadmap={roadmap}
            hideMenu={() => setOpenMobileMenu(false)}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default MobileMenu;
