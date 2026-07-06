import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './DayTimePicker.module.css';

const DAYS = ['Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const TIME_SLOTS = ['1pm–2pm', '2pm–3pm', '3pm–4pm', '4pm–5pm'];

interface DayTimePickerProps {
  initialDay: string;
  initialTime: string;
  onSave: (day: string, time: string) => void;
}

export function DayTimePicker({ initialDay, initialTime, onSave }: DayTimePickerProps) {
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleSave = useCallback(() => {
    onSave(selectedDay, selectedTime);
  }, [selectedDay, selectedTime, onSave]);

  const handleScrimClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSave(initialDay, initialTime);
    }
  }, [onSave, initialDay, initialTime]);

  return (
    <div className={styles.scrim} onClick={handleScrimClick}>
      <div className={styles.sheet}>
        <div className={styles.backgroundLayer} />
        <svg className={styles.arch} width="375" height="179" viewBox="0 0 375 179" fill="none">
          <path
            d="M375 17.9705V179H0V17.9705C56.2425 6.48158 119.974 0 187.5 0C255.026 0 318.758 6.48158 375 17.9705Z"
            fill="var(--ld-semantic-color-text-info-bold, #002E99)"
          />
        </svg>
        <div className={styles.content}>
          <div className={styles.grabber} />
          <div className={styles.innerContent}>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                Select your delivery day and time
              </div>
            </div>
            <div className={styles.bookslotContent}>
              <div className={styles.subhead}>
                This will be your preferred day and time for future orders.
              </div>
              <div className={styles.dayCarousel} role="radiogroup" aria-label="Delivery day">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={selectedDay === day ? styles.dayButtonSelected : styles.dayButton}
                    onClick={() => setSelectedDay(day)}
                    role="radio"
                    aria-checked={selectedDay === day}
                  >
                    <span className={selectedDay === day ? styles.dayLabelSelected : styles.dayLabel}>
                      {day}
                    </span>
                  </button>
                ))}
              </div>
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={selectedTime === time ? styles.timeSlotSelected : styles.timeSlot}
                  onClick={() => setSelectedTime(time)}
                  role="radio"
                  aria-checked={selectedTime === time}
                >
                  <div className={styles.timeSlotContent}>
                    <div className={styles.radioLabel}>
                      <div className={selectedTime === time ? styles.radioCircleSelected : styles.radioCircle}>
                        {selectedTime === time && <div className={styles.radioInner} />}
                      </div>
                      <span className={selectedTime === time ? styles.timeLabelSelected : styles.timeLabel}>
                        {time}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.ctaSection}>
            <Button variant="primary" size="medium" isFullWidth onClick={handleSave}>
              Save changes
            </Button>
            <button type="button" className={styles.viewPrefsLink}>
              View all preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
