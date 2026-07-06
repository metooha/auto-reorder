import React, { useState } from 'react';
import { DaySelector } from '@/components/walmart/DaySelector';
import { TimeSelector } from '@/components/walmart/TimeSelector';
import styles from './DeliverySchedulerExample.module.css';

// ── Sample data ────────────────────────────────────────────────────────────────
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ALL_TIME_SLOTS = [
  '7am–9am',
  '9am–11am',
  '11am–1pm',
  '1pm–3pm',
  '3pm–5pm',
  '5pm–7pm',
  '7pm–9pm',
];

// Simulate some slots being unavailable on certain days
const UNAVAILABLE: Record<string, string[]> = {
  Mon: ['7am–9am', '9am–11am'],
  Fri: ['7pm–9pm'],
  Sun: ['7am–9am', '9am–11am', '11am–1pm'],
};

// ── Component ─────────────────────────────────────────────────────────────────
export function DeliverySchedulerExample() {
  const today = new Date();
  const todayIdx = today.getDay();
  const todayName = DAYS[todayIdx];

  const [selectedDay, setSelectedDay] = useState<string>(todayName);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const unavailable = UNAVAILABLE[selectedDay] ?? [];
  const availableSlots = ALL_TIME_SLOTS.filter((s) => !unavailable.includes(s));

  function handleDayChange(day: string) {
    setSelectedDay(day);
    // Reset slot if it's not available on the new day
    if (selectedSlot && (UNAVAILABLE[day] ?? []).includes(selectedSlot)) {
      setSelectedSlot(null);
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* ── Day picker ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Choose a day</h3>
        <DaySelector
          days={DAYS}
          selectedDays={selectedDay}
          onChange={handleDayChange}
        />
      </section>

      {/* ── Time picker ── */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Choose a time
          {availableSlots.length < ALL_TIME_SLOTS.length && (
            <span className={styles.availability}>
              {availableSlots.length} slots available
            </span>
          )}
        </h3>
        <TimeSelector
          timeSlots={availableSlots}
          selectedSlot={selectedSlot}
          onChange={setSelectedSlot}
        />
        {availableSlots.length === 0 && (
          <p className={styles.noSlots}>No delivery slots available on {selectedDay}.</p>
        )}
      </section>

      {/* ── Confirmation strip ── */}
      {selectedDay && selectedSlot && (
        <div className={styles.confirmation}>
          <div className={styles.confirmIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
              <path d="M5.5 10.5L8.5 13.5L14.5 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className={styles.confirmText}>
            Scheduled for <strong>{selectedDay}</strong>, <strong>{selectedSlot}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

// ── States showcase ────────────────────────────────────────────────────────────
export function DaySelectorStates() {
  const [single, setSingle] = useState<string>('Fri');
  const [multi, setMulti] = useState<string[]>(['Mon', 'Wed', 'Fri']);

  function toggleMulti(day: string) {
    setMulti((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  return (
    <div className={styles.statesWrapper}>
      {/* Single-select */}
      <div className={styles.stateRow}>
        <span className={styles.stateLabel}>Single select</span>
        <DaySelector days={DAYS} selectedDays={single} onChange={setSingle} />
      </div>

      {/* Multi-select */}
      <div className={styles.stateRow}>
        <span className={styles.stateLabel}>Multi-select</span>
        <DaySelector
          days={DAYS}
          selectedDays={multi}
          onChange={toggleMulti}
          multiSelect
        />
      </div>

      {/* Disabled */}
      <div className={styles.stateRow}>
        <span className={styles.stateLabel}>Disabled</span>
        <DaySelector days={DAYS} selectedDays="Fri" onChange={() => {}} disabled />
      </div>
    </div>
  );
}

export function TimeSelectorStates() {
  const [selected, setSelected] = useState<string | null>('4pm–5pm');

  const SHORT_SLOTS = ['1pm–2pm', '2pm–3pm', '3pm–4pm', '4pm–5pm', '5pm–6pm'];

  return (
    <div className={styles.statesWrapper}>
      {/* Default */}
      <div className={styles.stateRow}>
        <span className={styles.stateLabel}>Default (interactive)</span>
        <TimeSelector
          timeSlots={SHORT_SLOTS}
          selectedSlot={selected}
          onChange={setSelected}
        />
      </div>

      {/* Disabled */}
      <div className={styles.stateRow}>
        <span className={styles.stateLabel}>Disabled</span>
        <TimeSelector
          timeSlots={SHORT_SLOTS}
          selectedSlot="4pm–5pm"
          onChange={() => {}}
          disabled
        />
      </div>

      {/* Nothing selected */}
      <div className={styles.stateRow}>
        <span className={styles.stateLabel}>Nothing selected</span>
        <TimeSelector
          timeSlots={SHORT_SLOTS}
          selectedSlot={null}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}
