import { CATEGORIES, type Category } from "../domain/schema";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import RoadmapCard from "./roadmapCard";
import menuIcon from "/assets/shared/mobile/icon-hamburger.svg";
import closeIcon from "/assets/shared/mobile/icon-close.svg";
import MobileMenu from "./mobileMenu";
const Sidebar = () => {
  const {
    setSelectedFeature,
    setFilterBy,
    filterBy,
    state: { feedbacks },
    setOpenMobileMenu,
    openMobileMenu,
  } = useFeedbackContext();
  const plannedTotal = feedbacks.filter((f) => f.status === "planned").length;
  const inProgressTotal = feedbacks.filter(
    (f) => f.status === "in-progress",
  ).length;
  const liveTotal = feedbacks.filter((f) => f.status === "live").length;
  return (
    <>
      <section className="lg:col-span-1 flex lg:flex-col gap-2.5 lg:gap-6 shrink-0">
        <div className="flex-1 bg-header-mobile md:bg-header-tablet lg:bg-header-desktop bg-center bg-no-repeat bg-cover flex justify-between md:rounded-[10px] p-6">
          <div>
            <h1 className="text-xl font-bold text-white">Frontend Mentor</h1>
            <p className="text-[15px] font-medium text-white/75">
              Feedback Board
            </p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            <img src={openMobileMenu ? closeIcon : menuIcon} />
          </button>
        </div>
        <div className="bg-white hidden md:flex-1 rounded-[10px] p-6 md:flex gap-x-2 gap-y-3.5 flex-wrap">
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
        <RoadmapCard
          plannedTotal={plannedTotal}
          inProgressTotal={inProgressTotal}
          liveTotal={liveTotal}
        />
      </section>
      {openMobileMenu && <MobileMenu />}
    </>
  );
};

export default Sidebar;
