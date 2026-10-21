import {
  CATEGORIES,
  type Category,
  type ProductRequest,
} from "../../domain/schema";

type SidebarModel = {
  categories: { label: string; value: Category | null; isActive: boolean }[];
  roadmap: { status: string; label: string; count: number; color: string }[];
};

const ROADMAP = [
  { status: "planned", label: "Planned", color: "#F49F85" },
  { status: "in-progress", label: "In-Progress", color: "#AD1FEA" },
  { status: "live", label: "Live", color: "#62BCFA" },
] as const;

export function createSidebarModel(
  requests: ProductRequest[],
  filterBy: Category | null,
): SidebarModel {
  return {
    categories: [
      { label: "All", value: null, isActive: filterBy === null },
      ...CATEGORIES.map((c) => ({
        label: c,
        value: c,
        isActive: filterBy?.toLowerCase() === c.toLowerCase(),
      })),
    ],
    roadmap: ROADMAP.map((r) => ({
      ...r,
      count: requests.filter((f) => f.status === r.status).length,
    })),
  };
}
