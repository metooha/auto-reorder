import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/Radio';
import styles from './TimeSelector.module.css';

export interface TimeSelectorProps {
  /** Array of time slot strings, e.g. ["1pm–2pm", "2pm–3pm"] */
  timeSlots: string[];
  /** Currently selected slot. Pass null for nothing selected. */
  selectedSlot: string | null;
  /** Called with the newly selected slot string */
  onChange: (slot: string) => void;
  /** Makes all options non-interactive */
  disabled?: boolean;
}

export function TimeSelector({
  timeSlots,
  selectedSlot,
  onChange,
  disabled = false,
}: TimeSelectorProps) {
  return (
    <RadioGroup
      value={selectedSlot ?? undefined}
      onValueChange={onChange}
      disabled={disabled}
      className={styles.list}
    >
      {timeSlots.map((slot) => {
        const checked = slot === selectedSlot;
        return (
          <div
            key={slot}
            className={[
              styles.row,
              checked ? styles.rowChecked : styles.rowUnchecked,
              disabled ? styles.rowDisabled : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <Radio
              value={slot}
              label={slot}
              UNSAFE_className={styles.radioBtn}
            />
          </div>
        );
      })}
    </RadioGroup>
  );
}
