import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, type KeyboardEvent } from "react";

type Props = {
  selectedIndex: number;
  label: string;
  description: string;
  options: string[];
  activeIndex: number;
  toggleMenu: () => void;
  open: (index?: number) => void;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  handleSelect: (index: number) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
};

const CustomSelectField = ({
  label,
  description,
  options,
  selectedIndex,
  activeIndex,
  toggleMenu,
  open,
  setActiveIndex,
  handleSelect,
  isOpen,
  setIsOpen,
  selectedOption,
}: Props) => {
  const id = useId();
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const menuRef = useRef<HTMLUListElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const typeahead = useRef({ query: "", timeout: 0 });

  function handleKeydown(e: KeyboardEvent<HTMLButtonElement>) {
    const { key, altKey, ctrlKey, metaKey } = e;

    if (!isOpen) {
      switch (key) {
        case "ArrowDown":
        case "ArrowUp":
        case "Enter":
        case " ":
          e.preventDefault();
          open();
          return;
        case "Home":
          e.preventDefault();
          open(0);
          return;
        case "End":
          e.preventDefault();
          open(options.length - 1);
          return;
      }
    } else {
      switch (key) {
        case "ArrowDown":
          if (altKey) {
            handleSelect(activeIndex);
          } else {
            setActiveIndex((prev) =>
              prev === options.length - 1 ? 0 : prev + 1,
            );
          }
          return;
        case "ArrowUp":
          if (altKey) {
            handleSelect(activeIndex);
          } else {
            setActiveIndex((prev) =>
              prev === 0 ? options.length - 1 : prev - 1,
            );
          }
          return;
        case " ":
        case "Enter":
          e.preventDefault();
          handleSelect(activeIndex);
          return;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          return;
        case "End":
          e.preventDefault();
          setActiveIndex(options.length - 1);
          return;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          return;
        case "Tab":
          handleSelect(activeIndex);
          return;
      }
    }
    if (key.length === 1 && !ctrlKey && !metaKey && !altKey) {
      handleTypeahead(key);
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [isOpen, setIsOpen]);

  const handleTypeahead = (char: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timeout);
    state.query += char.toLowerCase();
    state.timeout = setTimeout(() => {
      state.query = "";
    }, 500);

    const start = isOpen ? activeIndex : selectedIndex;
    const offset = state.query.length === 1 ? 1 : 0;

    for (let i = 0; i < options.length; i++) {
      const index = (start + offset + i) % options.length;
      if (options[index].toLowerCase().startsWith(state.query)) {
        open(index);
        return;
      }
    }
  };
  return (
    <div ref={rootRef} className="relative flex flex-col">
      <label
        htmlFor={label}
        className="text-sm font-bold tracking-[-0.19px] text-[#3A4374] capitalize"
      >
        {label}
      </label>
      <span className="mt-0.5 text-sm text-[#647196]">{description}</span>
      <button
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={handleKeydown}
        onKeyUp={(event) => {
          if (event.key === "  ") event.preventDefault();
        }}
        onClick={toggleMenu}
        className={`hover:border hover:border-[#4661E6] mt-4 flex h-12 w-full cursor-pointer items-center justify-between rounded-[5px] border bg-[#F7F8FD] px-6 text-[15px] text-[#3A4374] capitalize outline-none focus-visible:border-[#4661E6] ${
          isOpen ? "border-[#4661E6]" : "border-transparent"
        }`}
      >
        {selectedOption}
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={2.5}
          className={`text-[#4661E6] transition-transform motion-reduce:transition-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          role="listbox"
          id={listboxId}
          aria-labelledby={labelId}
          hidden={!isOpen}
          onMouseDown={(event) => event.preventDefault()}
          className="absolute top-full left-0 z-10 mt-4 w-full divide-y divide-[#3A4374]/15 overflow-hidden rounded-[10px] bg-white shadow-[0_10px_40px_-7px_rgba(55,63,104,0.35)]"
        >
          {options.map((category, index) => {
            return (
              <li
                key={index}
                role="option"
                id={optionId(index)}
                aria-selected={index === selectedIndex}
                onClick={() => handleSelect(index)}
                onMouseMove={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center justify-between px-6 py-3 text-base text-[#647196] capitalize hover:text-[#AD1FEA] ${activeIndex === index && "text-[#AD1FEA]"}`}
              >
                {category}
                {category === selectedOption && (
                  <Check
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2.5}
                    className="text-[#AD1FEA]"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectField;
