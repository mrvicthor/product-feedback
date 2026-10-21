import { Link } from "react-router";

type MobileRoadmapCardProps = {
  roadmap: {
    status: string;
    label: string;
    count: number;
    color: string;
  }[];
  hideMenu: () => void;
};

const MobileRoadmapCard = ({ roadmap, hideMenu }: MobileRoadmapCardProps) => {
  return (
    <div className="bg-white p-6 rounded-[10px]">
      <div className="flex justify-between items-center">
        <h2 className="text-[#3A4374] font-bold text-lg tracking-[-0.25px]">
          Roadmap
        </h2>
        <Link
          to="/roadmap"
          onClick={hideMenu}
          className="text-[#4661E6] underline hover:text-[#8397F8] text-[13px] font-semibold"
        >
          View
        </Link>
      </div>
      <ul className="mt-6 space-y-2">
        {roadmap.map((r, index) => (
          <li key={index} className="flex items-center justify-between gap-4">
            <div
              style={{ backgroundColor: r.color }}
              className="h-2 w-2 rounded-full"
            />{" "}
            <span className="text-[#647196] mr-auto">{r.label}</span>
            <span className="text-[#647196] font-bold">{r.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileRoadmapCard;
