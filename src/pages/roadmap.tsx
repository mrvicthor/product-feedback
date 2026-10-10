import { useFeedbackContext } from "../hooks/useFeedbackContext";
import RoadmapHeader from "../components/roadmapHeader";
import Card from "../components/card";

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
              <Card key={p.id} cardColor="#F49F85" feedback={p} />
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
              <Card key={p.id} cardColor="#AD1FEA" feedback={p} />
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
              <Card key={p.id} cardColor="#62BCFA" feedback={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
