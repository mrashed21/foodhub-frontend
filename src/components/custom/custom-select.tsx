"use client";

import { useEffect, useRef, useState } from "react";

export interface SelectOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

interface CustomSelectProps<T = SelectOption> {
  id?: string;
  name?: string;
  options?: T[];
  value?: T | T[] | null;
  defaultValue?: T | T[] | null;
  onChange?: (value: T | T[] | null) => void;
  placeholder?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  className?: string;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
}

const CustomSelect = <T,>({
  id,
  name,
  options = [],
  value,
  defaultValue = null,
  onChange,
  placeholder = "",
  isMulti = false,
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  className = "",
  getOptionLabel = (o: any) => o?.label,
  getOptionValue = (o: any) => o?.value,
}: CustomSelectProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [selectedHighlightIndex, setSelectedHighlightIndex] =
    useState<number>(-1);

  const [internalValue, setInternalValue] = useState<T | T[] | null>(
    value !== undefined ? value : defaultValue,
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSelectedHighlightIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);
  useEffect(() => {
    const el = optionRefs.current[highlightedIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  useEffect(() => {
    if (open) setHighlightedIndex(0);
  }, [open, search]);
  useEffect(() => {
    if (isMulti && valueContainerRef.current) {
      valueContainerRef.current.scrollTop =
        valueContainerRef.current.scrollHeight;
    }
  }, [isMulti, internalValue]);

  const selected: T[] = (() => {
    if (isMulti) {
      return Array.isArray(internalValue) ? internalValue : [];
    }

    if (internalValue && !Array.isArray(internalValue)) {
      return [internalValue];
    }

    return [];
  })();

  const handleChange = (val: T | T[] | null) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const selectOption = (option: T) => {
    if (isMulti) {
      handleChange([...selected, option]);
    } else {
      handleChange(option);
      setOpen(false);
    }
    setSearch("");
  };

  const removeOption = (option: T) => {
    if (isMulti) {
      handleChange(
        selected.filter((v) => getOptionValue(v) !== getOptionValue(option)),
      );
    } else {
      handleChange(null);
    }
  };

  const filteredOptions = options.filter((o) => {
    const alreadySelected = selected.some(
      (s) => getOptionValue(s) === getOptionValue(o),
    );
    if (alreadySelected) return false;
    if (!isSearchable) return true;

    return getOptionLabel(o)?.toLowerCase().includes(search.toLowerCase());
  });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>,
  ) => {
    if (isMulti && !open && selected.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedHighlightIndex((i) => Math.min(i + 1, selected.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedHighlightIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter" && selectedHighlightIndex >= 0) {
        e.preventDefault();
        removeOption(selected[selectedHighlightIndex]);
        setSelectedHighlightIndex(-1);
        return;
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(0);
        return;
      }
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    }

    if (!open) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredOptions[highlightedIndex];
      if (opt) selectOption(opt);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className} ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {name && (
        <label htmlFor={id} className="block mb-1 text-muted text-sm">
          {name}
        </label>
      )}

      <div
        ref={valueContainerRef}
        className={`border rounded-md flex gap-1 items-center cursor-text
        ${isMulti ? "min-h-10 max-h-16 flex-wrap overflow-y-auto px-2 py-1" : "px-4 py-1.5"}`}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        onKeyDown={handleKeyDown}
      >
        <input type="hidden" id={id} name={name} />

        {selected.map((item, index) => (
          <span
            key={getOptionValue(item)}
            className={`px-2 rounded flex items-center gap-2
            ${
              isMulti && index === selectedHighlightIndex
                ? "bg-gray-200"
                : "bg-primary-bg"
            }`}
          >
            <span className="truncate">{getOptionLabel(item)}</span>
            {isClearable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(item);
                }}
                className="text-sm font-bold text-red-500"
              >
                ✕
              </button>
            )}
          </span>
        ))}

        {isSearchable && (
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              selected.length === 0 && search.length === 0 ? placeholder : ""
            }
            readOnly={!isSearchable}
            className="flex-1 outline-none text-sm min-w-30 bg-transparent"
          />
        )}
      </div>

      {open && (
        <div className="absolute z-20 w-full mt-0.5 border rounded bg-white max-h-56 overflow-y-auto shadow">
          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm">No options</div>
          )}

          {filteredOptions.map((opt, index) => (
            <div
              key={getOptionValue(opt)}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(opt)}
              className={`px-3 py-2 cursor-pointer text-sm
              ${
                index === highlightedIndex
                  ? "bg-primary-soft"
                  : "hover:bg-primary-bg"
              }`}
            >
              {getOptionLabel(opt)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
