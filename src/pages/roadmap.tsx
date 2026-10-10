import { useFeedbackContext } from "../hooks/useFeedbackContext";
import RoadmapHeader from "../components/roadmapHeader";
import arrowUp from "/assets/shared/icon-arrow-up.svg";
import commentIcon from "/assets/shared/icon-comments.svg";

const Roadmap = () => {
  const {
    state: { feedbacks },
  } = useFeedbackContext();
  const plannedTotal = feedbacks.filter((f) => f.status === "planned").length;
  const inProgressTotal = feedbacks.filter(
    (f) => f.status === "in-progress",
  ).length;
  const liveTotal = feedbacks.filter((f) => f.status === "live").length;
  const plannedFeedback = feedbacks.filter((f) => f.status === "planned");
  const inProgessFeedback = feedbacks.filter((f) => f.status === "in-progress");
  const liveFeedback = feedbacks.filter((f) => f.status === "live");
  return (
    <section className="mt-6 max-w-6xl mx-auto">
      <RoadmapHeader />
      <div className="grid grid-cols-3 gap-7.5 mt-12 pb-6">
        <div className="space-y-1">
          <h2 className="text-lg text-[#3A4374] font-bold">
            Planned ({plannedTotal})
          </h2>
          <p className="text-[#647196]">Ideas prioritized for research</p>
          <div className="mt-7 space-y-6">
            {plannedFeedback.map((p) => (
              <div key={p.id}>
                <div className="py-6 px-8 bg-white rounded-lg border-t-4 border-[#f49f85]">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-2 rounded-full bg-[#F49F85]" />{" "}
                    <span className="text-[#647196] mr-auto">Planned</span>
                  </div>
                  <h3 className="mt-2 text-[#3A4374] text-lg font-bold hover:text-[#4661E6]">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[#647196]">{p.description}</p>
                  <span className="bg-[#F2F4FF] text-[13px] font-semibold text-[#4661E6] capitalize inline-block py-2 px-4 mt-4 rounded-lg">
                    {p.category}
                  </span>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-[#F2F4FE] cursor-pointer hover:bg[#CFD7FF]  flex gap-2 items-center px-4 py-2.75 rounded-lg">
                      <img src={arrowUp} className="h-1 w-2" />{" "}
                      <span className="font-bold text-[13px] text-[#3A4374]">
                        {p.upvotes}
                      </span>
                    </button>
                    <div className="flex items-center gap-2">
                      <img src={commentIcon} />{" "}
                      <span className="font-bold text-[#3A4374]">
                        {p.comments?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg text-[#3A4374] font-bold">
            In-Progress ({inProgressTotal})
          </h2>
          <p className="text-[#647196]">Currently being developed</p>
          <div className="mt-7 space-y-6">
            {inProgessFeedback.map((p) => (
              <div key={p.id}>
                <div className="py-6 px-8 bg-white rounded-lg border-t-4 border-[#AD1FEA]">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-2 rounded-full bg-[#AD1FEA]" />{" "}
                    <span className="text-[#647196] mr-auto">In Progress</span>
                  </div>
                  <h3 className="mt-2 text-[#3A4374] text-lg font-bold hover:text-[#4661E6]">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[#647196]">{p.description}</p>
                  <span className="bg-[#F2F4FF] text-[13px] font-semibold text-[#4661E6] capitalize inline-block py-2 px-4 mt-4 rounded-lg">
                    {p.category}
                  </span>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      className="bg-[#F2F4FE] cursor-pointer hover:bg[#CFD7FF] flex gap-2 items-center px-4 py-2.75 rounded-lg"
                    >
                      <img src={arrowUp} className="h-1 w-2" />{" "}
                      <span className="font-bold text-[13px] text-[#3A4374]">
                        {p.upvotes}
                      </span>
                    </button>
                    <div className="flex items-center gap-2">
                      <img src={commentIcon} />{" "}
                      <span className="font-bold text-[#3A4374]">
                        {p.comments?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg text-[#3A4374] font-bold">
            Live ({liveTotal})
          </h2>
          <p className="text-[#647196]">Released features</p>
          <div className="mt-7 space-y-6">
            {liveFeedback.map((p) => (
              <div key={p.id}>
                <div className="py-6 px-8 bg-white rounded-lg border-t-4 border-[#62BCFA]">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-2 rounded-full bg-[#62BCFA]" />{" "}
                    <span className="text-[#647196] mr-auto">In Progress</span>
                  </div>
                  <h3 className="mt-2 text-[#3A4374] text-lg font-bold hover:text-[#4661E6]">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[#647196]">{p.description}</p>
                  <span className="bg-[#F2F4FF] text-[13px] font-semibold text-[#4661E6] capitalize inline-block py-2 px-4 mt-4 rounded-lg">
                    {p.category}
                  </span>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-[#F2F4FE] cursor-pointer hover:bg[#CFD7FF]  flex gap-2 items-center px-4 py-2.75 rounded-lg">
                      <img src={arrowUp} className="h-1 w-2" />{" "}
                      <span className="font-bold text-[13px] text-[#3A4374]">
                        {p.upvotes}
                      </span>
                    </button>
                    <div className="flex items-center gap-2">
                      <img src={commentIcon} />{" "}
                      <span className="font-bold text-[#3A4374]">
                        {p.comments?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
