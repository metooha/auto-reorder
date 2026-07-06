import { Chip } from '@/components/ui/Chip';
import styles from './DaySelector.module.css';

export interface DaySelectorProps {
  /** Array of day labels, e.g. ["Sun", "Mon", "Tue"] */
  days: string[];
  /** Currently selected day(s). Pass a single string for single-select mode. */
  selectedDays: string | string[];
  /** Called with the clicked day string */
  onChange: (day: string) => void;
  /** Makes all buttons non-interactive */
  disabled?: boolean;
  /** Allow selecting multiple days at once */
  multiSelect?: boolean;
}

export function DaySelector({
  days,
  selectedDays,
  onChange,
  disabled = false,
}: DaySelectorProps) {
  const selected = Array.isArray(selectedDays) ? selectedDays : [selectedDays];

  return (
    <div className={styles.row} role="group" aria-label="Select day">
      {days.map((day) => (
        <Chip
          key={day}
          variant="primary"
          selected={selected.includes(day)}
          onSelectedChange={() => !disabled && onChange(day)}
          disabled={disabled}
          aria-label={day}
        >
          {day}
        </Chip>
      ))}
    </div>
  );
}
