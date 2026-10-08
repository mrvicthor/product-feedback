import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { DropdownOption } from "../components/sortDropdown";

export function useSortDropdown<T extends string>(
  options: readonly DropdownOption<T>[],
  value: T,
  onChange: (value: T) => void,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean,
) {
  const id = useId();
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selectedOption = options[selectedIndex];

  //   const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ query: "", timeout: 0 });

  const lastIndex = options.length - 1;

  function open(index = selectedIndex) {
    setActiveIndex(index);
    setIsOpen(true);
    console.log({ isOpen });
  }

  function close() {
    setIsOpen(false);
  }

  function select(index: number) {
    onChange(options[index].value);
    close();
  }

  // Close when clicking outside. Needed alongside onBlur because Safari
  // does not focus buttons on click, so blur never fires there.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, setIsOpen]);

  // Keep the highlighted option visible if the list ever scrolls.
  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [isOpen, activeIndex]);

  // Typing a letter jumps to the next option that starts with it.
  function handleTypeahead(char: string) {
    const state = typeahead.current;
    window.clearTimeout(state.timeout);
    state.query += char.toLowerCase();
    state.timeout = window.setTimeout(() => {
      state.query = "";
    }, 500);

    const start = isOpen ? activeIndex : selectedIndex;
    // A single key cycles through matches; a longer query refines in place.
    const offset = state.query.length === 1 ? 1 : 0;

    for (let i = 0; i < options.length; i++) {
      const index = (start + offset + i) % options.length;
      if (options[index].label.toLowerCase().startsWith(state.query)) {
        open(index);
        return;
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const { key, altKey, ctrlKey, metaKey } = event;

    if (!isOpen) {
      switch (key) {
        case "ArrowDown":
        case "ArrowUp":
        case "Enter":
        case " ":
          event.preventDefault();
          open();
          return;
        case "Home":
          event.preventDefault();
          open(0);
          return;
        case "End":
          event.preventDefault();
          open(lastIndex);
          return;
      }
    } else {
      switch (key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, lastIndex));
          return;
        case "ArrowUp":
          event.preventDefault();
          if (altKey) {
            select(activeIndex);
          } else {
            setActiveIndex((i) => Math.max(i - 1, 0));
          }
          return;
        case "Home":
          event.preventDefault();
          setActiveIndex(0);
          return;
        case "End":
          event.preventDefault();
          setActiveIndex(lastIndex);
          return;
        case "Enter":
        case " ":
          event.preventDefault();
          select(activeIndex);
          return;
        case "Escape":
          event.preventDefault();
          close();
          return;
        case "Tab":
          // Commit the highlighted option, then let focus move on.
          select(activeIndex);
          return;
      }
    }

    if (key.length === 1 && !ctrlKey && !metaKey && !altKey) {
      handleTypeahead(key);
    }
  }
  return {
    labelId,
    listboxId,
    optionId,
    selectedOption,
    handleKeyDown,
    rootRef,
    listRef,
    selectedIndex,
    activeIndex,
    select,
    setActiveIndex,
    close,
    open,
  };
}
