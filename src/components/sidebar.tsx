import { CATEGORIES, type Category } from "../domain/schema";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import RoadmapCard from "./roadmapCard";

const Sidebar = () => {
  const {
    setSelectedFeature,
    setFilterBy,
    filterBy,
    state: { feedbacks },
  } = useFeedbackContext();
  const plannedTotal = feedbacks.filter((f) => f.status === "planned").length;
  const inProgressTotal = feedbacks.filter(
    (f) => f.status === "in-progress",
  ).length;
  const liveTotal = feedbacks.filter((f) => f.status === "live").length;
  return (
    <section className="col-span-1 flex flex-col gap-6">
      <div className="bg-header-mobile md:bg-header-tablet lg:bg-header-desktop bg-center bg-no-repeat bg-cover flex h-34.25 flex-col justify-end rounded-[10px] p-6">
        <h1 className="text-xl font-bold text-white">Frontend Mentor</h1>
        <p className="text-[15px] font-medium text-white/75">Feedback Board</p>
      </div>
      <div className="bg-white rounded-[10px] p-6 flex gap-x-2 gap-y-3.5 flex-wrap">
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
  );
};

export default Sidebar;
