import type { RoadmapStatus } from "../domain/schema";

const roadmap: Record<RoadmapStatus, string> = {
  "in-progress": "#AD1FEA",
  planned: "#F49F85",
  live: "#62BCFA",
};

export const getBgColor = (value: RoadmapStatus) => roadmap[value];
