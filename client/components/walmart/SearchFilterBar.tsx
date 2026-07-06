import { useState } from "react";
import { SortingArrows } from "@/components/icons";
import { FilterChip } from "@/components/ui/FilterChip";
import styles from "./SearchFilterBar.module.css";

interface SearchFilterBarProps {
  chips: readonly string[];
}

export function SearchFilterBar({ chips }: SearchFilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className={styles.bar}>
      {/* All Filters — icon-only FilterChip */}
      <FilterChip isAllFilters showLabel={false} aria-label="All filters" />

      {/* Filter chips */}
      {chips.map((chip) => (
        <FilterChip
          key={chip}
          selected={activeFilters.includes(chip)}
          onSelectedChange={() => toggleFilter(chip)}
          isMultiSelect
        >
          {chip}
        </FilterChip>
      ))}
    </div>
  );
}
