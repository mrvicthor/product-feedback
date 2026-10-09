import { Check, ChevronDown } from "lucide-react";
import { CATEGORIES } from "../../domain/schema";
import { useFeedbackContext } from "../../hooks/useFeedbackContext";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

const CustomSelectField = () => {
  const {
    selectedFeature,
    openFeatures,
    setOpendFeatures,
    setSelectedFeature,
  } = useFeedbackContext();
  const id = useId();
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const selectedIndex = Math.max(
    0,
    CATEGORIES.findIndex(
      (category) => category.toLowerCase() === selectedFeature.toLowerCase(),
    ),
  );

  const menuRef = useRef<HTMLUListElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const typeahead = useRef({ query: "", timeout: 0 });
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const handleClick = () => {
    setOpendFeatures((prev) => !prev);
  };

  const open = (index = selectedIndex) => {
    setActiveIndex(index);
    setOpendFeatures(true);
  };

  const handleSelect = (index: number) => {
    setSelectedFeature(CATEGORIES[index]);
    setOpendFeatures(false);
    console.log({ openFeatures });
  };

  function handleKeydown(e: KeyboardEvent<HTMLButtonElement>) {
    const { key, altKey, ctrlKey, metaKey } = e;
    console.log({ key });
    if (!openFeatures) {
      setOpendFeatures(true);
      e.preventDefault();
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
          open(CATEGORIES.length - 1);
          return;
      }
    } else {
      switch (key) {
        case "ArrowDown":
          if (altKey) {
            handleSelect(activeIndex);
          } else {
            setActiveIndex((prev) =>
              prev === CATEGORIES.length - 1 ? 0 : prev + 1,
            );
          }
          return;
        case "ArrowUp":
          if (altKey) {
            handleSelect(activeIndex);
          } else {
            setActiveIndex((prev) =>
              prev === 0 ? CATEGORIES.length - 1 : prev - 1,
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
          setActiveIndex(CATEGORIES.length - 1);
          return;
        case "Escape":
          e.preventDefault();
          close();
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
    if (!openFeatures) return;

    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpendFeatures(false);
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [openFeatures, setOpendFeatures]);

  const handleTypeahead = (char: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timeout);
    state.query += char.toLowerCase();
    state.timeout = setTimeout(() => {
      state.query = "";
    }, 500);

    const start = openFeatures ? activeIndex : selectedIndex;
    const offset = state.query.length === 1 ? 1 : 0;

    for (let i = 0; i < CATEGORIES.length; i++) {
      const index = (start + offset + i) % CATEGORIES.length;
      if (CATEGORIES[index].toLowerCase().startsWith(state.query)) {
        open(index);
        return;
      }
    }
  };
  return (
    <div ref={rootRef} className="relative flex flex-col">
      <label
        htmlFor="category"
        className="text-sm font-bold tracking-[-0.19px] text-[#3A4374]"
      >
        Category
      </label>
      <span className="mt-0.5 text-sm text-[#647196]">
        Choose a category for your feedback
      </span>
      <button
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-activedescendant={openFeatures ? optionId(activeIndex) : undefined}
        tabIndex={0}
        aria-expanded={openFeatures}
        onKeyDown={handleKeydown}
        onKeyUp={(event) => {
          if (event.key === "  ") event.preventDefault();
        }}
        onClick={handleClick}
        className={`mt-4 flex h-12 w-full cursor-pointer items-center justify-between rounded-[5px] border bg-[#F7F8FD] px-6 text-[15px] text-[#3A4374] capitalize outline-none focus-visible:border-[#4661E6] ${
          openFeatures ? "border-[#4661E6]" : "border-transparent"
        }`}
      >
        {selectedFeature}
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={2.5}
          className={`text-[#4661E6] transition-transform motion-reduce:transition-none ${
            openFeatures ? "rotate-180" : ""
          }`}
        />
      </button>
      {openFeatures && (
        <ul
          ref={menuRef}
          role="listbox"
          id={listboxId}
          aria-labelledby={labelId}
          hidden={!openFeatures}
          onMouseDown={(event) => event.preventDefault()}
          className="absolute top-full left-0 z-10 mt-4 w-full divide-y divide-[#3A4374]/15 overflow-hidden rounded-[10px] bg-white shadow-[0_10px_40px_-7px_rgba(55,63,104,0.35)]"
        >
          {CATEGORIES.map((category, index) => {
            return (
              <li
                key={index}
                role="option"
                className={`flex cursor-pointer items-center justify-between px-6 py-3 text-base text-[#647196] capitalize hover:text-[#AD1FEA] ${activeIndex === index && "text-[#AD1FEA]"}`}
              >
                {category}
                {category === selectedFeature && (
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
