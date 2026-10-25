import { useFeedbackContext } from "../hooks/useFeedbackContext";
import RoadmapHeader from "../components/roadmapHeader";
import Card from "../components/card";
import Tabs from "../components/tabs";
import { ROADMAPSTATUS } from "../domain/schema";
import { createRoadmapPageModel } from "../useCases/viewRoadmapPageModel/roadmapPageModel";

const Roadmap = () => {
  const {
    state: { feedbacks },
    upvotedSet,
  } = useFeedbackContext();
  const viewModel = createRoadmapPageModel(feedbacks, upvotedSet);

  const plannedFeedback = viewModel.roadmap.filter(
    (f) => f.status === "planned",
  );
  const inProgessFeedback = viewModel.roadmap.filter(
    (f) => f.status === "in-progress",
  );
  const liveFeedback = viewModel.roadmap.filter((f) => f.status === "live");

  return (
    <section className="md:mt-6 max-w-6xl mx-auto md:px-10">
      <RoadmapHeader />
      <div className="hidden md:grid md:grid-cols-3 gap-2.5 lg:gap-7.5 mt-12 pb-6">
        <div className="space-y-1">
          <h2 className="text-lg text-[#3A4374] font-bold">
            Planned ({viewModel.plannedCount})
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
            In-Progress ({viewModel.inProgressCount})
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
            Live ({viewModel.liveCount})
          </h2>
          <p className="text-[#647196]">Released features</p>
          <div className="mt-7 space-y-6">
            {liveFeedback.map((p) => (
              <Card key={p.id} cardColor="#62BCFA" feedback={p} />
            ))}
          </div>
        </div>
      </div>
      <Tabs tabs={ROADMAPSTATUS} feedbacks={viewModel.roadmap} />
    </section>
  );
};

export default Roadmap;
