import logoIcon from "/assets/suggestions/icon-suggestions.svg";
import { SortDropdown } from "./sortDropdown";
import { SORT_OPTIONS } from "../domain/schema";
import { useFeedbackContext } from "../hooks/useFeedbackContext";

import AddNewFeedbackButton from "./addNewFeedbackButton";

type Props = {
  suggestionCount: number;
};
const Header = ({ suggestionCount }: Props) => {
  const { sortBy, setSortBy, openSortBy, setOpenSortBy } = useFeedbackContext();

  return (
    <header className="bg-[#373F68] h-18 md:rounded-[10px] flex items-center pl-6 pr-4 gap-4">
      <div className="hidden md:block">
        <img src={logoIcon} alt="logo" />
      </div>
      <h3 className="text-white text-lg font-bold hidden md:block capitalize">
        {suggestionCount} suggestion{suggestionCount === 0 ? "" : "s"}
      </h3>

      <SortDropdown
        options={SORT_OPTIONS}
        value={sortBy}
        onChange={setSortBy}
        isOpen={openSortBy}
        setIsOpen={setOpenSortBy}
      />
      <AddNewFeedbackButton classes="ml-auto" />
    </header>
  );
};

export default Header;
