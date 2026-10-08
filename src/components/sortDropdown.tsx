import type { SortBy } from "../domain/schema";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import { useSortDropdown } from "../hooks/useSortDropdown";

export type DropdownOption<T extends SortBy> = {
  value: T;
  label: string;
};

type SortDropdownProps<T extends SortBy> = {
  options: readonly DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Select-only combobox (WAI-ARIA APG pattern).
 * Focus stays on the button; the highlighted option is announced through
 * aria-activedescendant, so screen readers follow it without focus moving.
 */
export function SortDropdown<T extends SortBy>({
  options,
  value,
  onChange,
  isOpen,
  setIsOpen,
}: SortDropdownProps<T>) {
  const {
    labelId,
    listboxId,
    optionId,
    rootRef,
    handleKeyDown,
    selectedOption,
    listRef,
    selectedIndex,
    activeIndex,
    select,
    setActiveIndex,
    close,
    open,
  } = useSortDropdown(options, value, onChange, setIsOpen, isOpen);
  const { dispatch } = useFeedbackContext();

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
        // Space would otherwise fire a click on keyup and reopen the list.
        onKeyUp={(event) => {
          if (event.key === " ") event.preventDefault();
        }}
        onBlur={close}
        className="flex items-center cursor-pointer gap-2 rounded-md px-2 py-1 text-sm text-[#F2F4FE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span id={labelId} className="text-sm">
          Sort by :{" "}
        </span>
        <span className="font-bold capitalize">{selectedOption.label}</span>
        <svg
          aria-hidden="true"
          width="9"
          height="7"
          viewBox="0 0 9 7"
          className={`transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1l3.5 4L8 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      <ul
        ref={listRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!isOpen}
        // Keep focus on the button when an option is clicked.
        onMouseDown={(event) => event.preventDefault()}
        className="absolute top-full left-0 z-10 mt-10 w-64 divide-y divide-[#3A4374]/15 overflow-hidden rounded-[10px] bg-white shadow-[0_10px_40px_-7px_rgba(55,63,104,0.35)]"
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          const isActive = index === activeIndex;

          return (
            <li
              key={option.value}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                select(index);
                dispatch({ type: "sort", sortBy: option.value });
              }}
              onMouseMove={() => setActiveIndex(index)}
              className={`flex cursor-pointer items-center justify-between px-6 py-3 capitalize ${
                isActive ? "text-[#AD1FEA]" : "text-[#647196]"
              }`}
            >
              {option.label}
              {isSelected && (
                <svg
                  aria-hidden="true"
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                >
                  <path
                    d="M1 5.233L4.522 9 12 1"
                    fill="none"
                    stroke="#AD1FEA"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
