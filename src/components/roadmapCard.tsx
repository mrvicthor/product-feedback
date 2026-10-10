import { Link } from "react-router";

type RoadmapCardProps = {
  plannedTotal: number;
  inProgressTotal: number;
  liveTotal: number;
};

const RoadmapCard = ({
  plannedTotal,
  inProgressTotal,
  liveTotal,
}: RoadmapCardProps) => {
  return (
    <div className="bg-white p-6 rounded-[10px]">
      <div className="flex justify-between items-center">
        <h2 className="text-[#3A4374] font-bold text-lg tracking-[-0.25px]">
          Roadmap
        </h2>
        <Link
          to="/roadmap"
          className="text-[#4661E6] underline hover:text-[#8397F8] text-[13px] font-semibold"
        >
          View
        </Link>
      </div>
      <ul className="mt-6 space-y-2">
        <li className="flex items-center justify-between gap-4">
          <div className="h-2 w-2 rounded-full bg-[#F49F85]" />{" "}
          <span className="text-[#647196] mr-auto">Planned</span>
          <span className="text-[#647196] font-bold">{plannedTotal}</span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <div className="h-2 w-2 rounded-full bg-[#AD1FEA]" />{" "}
          <span className="text-[#647196] mr-auto">In-Progress</span>
          <span className="text-[#647196] font-bold">{inProgressTotal}</span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <div className="h-2 w-2 rounded-full bg-[#62BCFA]" />{" "}
          <span className="text-[#647196] mr-auto">Live</span>
          <span className="text-[#647196] font-bold">{liveTotal}</span>
        </li>
      </ul>
    </div>
  );
};

export default RoadmapCard;
