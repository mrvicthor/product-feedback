import { Check, ChevronDown } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type Ref,
} from "react";

type Props<T extends string> = {
  label: string;
  description: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  name?: string;
  error?: string;
  ref: Ref<HTMLButtonElement>;
};

const CustomSelectField = <T extends string>({
  label,
  description,
  options,
  value,
  onChange,
  error,
  ref,
  name,
  onBlur,
}: Props<T>) => {
  const id = useId();
  const buttonId = `${id}-button`;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const selectedIndex = Math.max(0, options.indexOf(value));

  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const typeahead = useRef({ query: "", timeout: 0 });

  const open = (index = selectedIndex) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const handleSelect = (index: number) => {
    onChange(options[index]);
    close();
  };

  const toggleMenu = () => (isOpen ? close() : open());

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
    if (!isOpen) return;

    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [isOpen]);

  const handleTypeahead = (char: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timeout);
    state.query += char.toLowerCase();
    state.timeout = window.setTimeout(() => {
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
  const describedBy =
    [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div ref={rootRef} className="relative flex flex-col">
      <label
        id={labelId}
        htmlFor={buttonId}
        className="text-sm font-bold tracking-[-0.19px] text-[#3A4374] capitalize"
      >
        {label}
      </label>
      {description && (
        <span id={descriptionId} className="mt-0.5 text-sm text-[#647196]">
          {description}
        </span>
      )}

      <button
        ref={ref}
        name={name}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={error ? true : undefined}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        tabIndex={0}
        onKeyDown={handleKeydown}
        onKeyUp={(event) => {
          if (event.key === "  ") event.preventDefault();
        }}
        onClick={toggleMenu}
        onBlur={() => {
          close();
          onBlur?.();
        }}
        className={`mt-4 flex h-12 w-full cursor-pointer items-center justify-between rounded-[5px] border bg-[#F7F8FD] px-6 text-[15px] text-[#3A4374] capitalize outline-none hover:border-[#4661E6] focus-visible:border-[#4661E6] ${
          error
            ? "border-[#D73737]"
            : isOpen
              ? "border-[#4661E6]"
              : "border-transparent"
        }`}
      >
        {value}
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={2.5}
          className={`text-[#4661E6] transition-transform motion-reduce:transition-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-[#D73737]">
          {error}
        </p>
      )}

      {isOpen && (
        <ul
          role="listbox"
          id={listboxId}
          aria-labelledby={labelId}
          onMouseDown={(event) => event.preventDefault()}
          className="absolute top-full left-0 z-10 mt-4 w-full divide-y divide-[#3A4374]/15 overflow-hidden rounded-[10px] bg-white shadow-[0_10px_40px_-7px_rgba(55,63,104,0.35)]"
        >
          {options.map((option, index) => {
            return (
              <li
                key={index}
                role="option"
                id={optionId(index)}
                aria-selected={option === value}
                onClick={() => handleSelect(index)}
                onMouseMove={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center justify-between px-6 py-3 text-base capitalize ${
                  activeIndex === index ? "text-[#AD1FEA]" : "text-[#647196]"
                }`}
              >
                {option}
                {option === value && (
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
