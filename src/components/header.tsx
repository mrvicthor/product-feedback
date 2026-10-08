import logoIcon from "/assets/suggestions/icon-suggestions.svg";
import plusIcon from "/assets/shared/icon-plus.svg";
import { SortDropdown } from "./sortDropdown";
import { SORT_OPTIONS } from "../domain/schema";

import { useFeedbackContext } from "../hooks/useFeedbackContext";
const Header = () => {
  const {
    sortBy,
    setSortBy,
    openSortBy,
    setOpenSortBy,
    state: { feedbacks },
  } = useFeedbackContext();
  const suggestionsLength = feedbacks.filter(
    (item) => item.status === "suggestion",
  ).length;

  return (
    <header className="bg-[#373F68] h-18 rounded-[10px] flex items-center pl-6 pr-4 gap-4">
      <div>
        <img src={logoIcon} />
      </div>
      <h3 className="text-white text-lg font-bold">
        {suggestionsLength} suggestions
      </h3>

      <SortDropdown
        options={SORT_OPTIONS}
        value={sortBy}
        onChange={setSortBy}
        isOpen={openSortBy}
        setIsOpen={setOpenSortBy}
      />
      <button className="ml-auto flex py-3 text-white gap-2 capitalize items-center bg-[#C75AF6] px-5 cursor-pointer rounded-[10px] text-sm font-bold">
        <img src={plusIcon} className="w-3 h-3" /> add feedback
      </button>
    </header>
  );
};

export default Header;
