import { useState } from 'react';
import styles from './DeliveryScheduler.module.css';

interface DayOption {
  label: string;
  date: string;
}

interface TimeOption {
  label: string;
  value: string;
}

export interface DeliverySchedulerProps {
  /** Currently selected day */
  selectedDay?: string;
  /** Currently selected time */
  selectedTime?: string;
  /** Callback when day changes */
  onDayChange?: (day: string) => void;
  /** Callback when time changes */
  onTimeChange?: (time: string) => void;
}

const DAYS: DayOption[] = [
  { label: 'Tue', date: 'Feb 4' },
  { label: 'Wed', date: 'Feb 5' },
  { label: 'Thu', date: 'Feb 6' },
  { label: 'Fri', date: 'Feb 7' },
  { label: 'Sat', date: 'Feb 8' },
];

const TIMES: TimeOption[] = [
  { label: '9am–10am', value: '9am-10am' },
  { label: '10am–11am', value: '10am-11am' },
  { label: '11am–12pm', value: '11am-12pm' },
  { label: '1pm–2pm', value: '1pm-2pm' },
  { label: '2pm–3pm', value: '2pm-3pm' },
  { label: '4pm–5pm', value: '4pm-5pm' },
];

export function DeliveryScheduler({
  selectedDay: controlledDay,
  selectedTime: controlledTime,
  onDayChange,
  onTimeChange,
}: DeliverySchedulerProps) {
  const [internalDay, setInternalDay] = useState('Fri');
  const [internalTime, setInternalTime] = useState('4pm-5pm');

  const selectedDay = controlledDay ?? internalDay;
  const selectedTime = controlledTime ?? internalTime;

  const handleDaySelect = (day: string) => {
    setInternalDay(day);
    onDayChange?.(day);
  };

  const handleTimeSelect = (time: string) => {
    setInternalTime(time);
    onTimeChange?.(time);
  };

  return (
    <div className={styles.scheduler} role="group" aria-label="Delivery scheduling">
      {/* Day selector */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Choose a day</span>
        <div className={styles.dayRow} role="radiogroup" aria-label="Delivery day">
          {DAYS.map((day) => {
            const isSelected = selectedDay === day.label;
            return (
              <button
                key={day.label}
                className={[
                  styles.dayBtn,
                  isSelected ? styles.dayBtnSelected : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleDaySelect(day.label)}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${day.label} ${day.date}`}
              >
                <span className={styles.dayLabel}>{day.label}</span>
                <span className={styles.dayDate}>{day.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time selector */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Choose a time</span>
        <div className={styles.timeList} role="radiogroup" aria-label="Delivery time">
          {TIMES.map((time) => {
            const isSelected = selectedTime === time.value;
            return (
              <button
                key={time.value}
                className={styles.timeRow}
                onClick={() => handleTimeSelect(time.value)}
                role="radio"
                aria-checked={isSelected}
              >
                <span className={styles.radioOuter}>
                  {isSelected && <span className={styles.radioInner} />}
                </span>
                <span
                  className={[
                    styles.timeLabel,
                    isSelected ? styles.timeLabelSelected : '',
                  ].filter(Boolean).join(' ')}
                >
                  {time.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
