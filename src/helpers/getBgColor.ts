import type { Status } from "../domain/schema";

const roadmap: Record<Status, string> = {
  "in-progress": "#AD1FEA",
  planned: "#F49F85",
  live: "#62BCFA",
  suggestion: "#62BCFA",
};

export const getBgColor = (value: Status) => roadmap[value];
