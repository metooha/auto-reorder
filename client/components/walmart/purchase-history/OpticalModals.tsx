import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Check, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Chip } from '@/components/ui/Chip';
import { Scrim } from '@/components/ui/Scrim';
import { OpticalOrderDetailModal } from './OpticalOrderDetailModal';
import styles from './AutoCareModals.module.css';

export type OpticalModalType = 'pickup' | 'reschedule' | 'viewDetails' | null;

function useModalEffects(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}

const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ── Mini Calendar (reused from AutoCareModals pattern) ────────────────────────
function AppointmentCalendar({
  selectedDate, onSelect,
}: {
  selectedDate: Date; onSelect: (d: Date) => void;
}) {
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isSelected = (d: number) =>
    d === selectedDate.getDate() &&
    viewMonth === selectedDate.getMonth() &&
    viewYear === selectedDate.getFullYear();
  const isPast = (d: number) => new Date(viewYear, viewMonth, d) < today;

  return (
    <div className={styles.calendar}>
      <div className={styles.calNav}>
        <IconButton aria-label="Previous month" variant="ghost" size="small" onClick={prevMonth}>
          <ChevronLeft style={{ width: 20, height: 20 }} />
        </IconButton>
        <span className={styles.calMonthLabel}>{MONTHS_FULL[viewMonth]} {viewYear}</span>
        <IconButton aria-label="Next month" variant="ghost" size="small" onClick={nextMonth}>
          <ChevronRight style={{ width: 20, height: 20 }} />
        </IconButton>
      </div>
      <div className={styles.calGrid}>
        {WEEK_DAYS.map(d => <span key={d} className={styles.calDayHeader}>{d}</span>)}
        {cells.map((d, i) =>
          d === null ? <span key={`e-${i}`} /> : (
            <button
              key={d}
              className={[
                styles.calDay,
                isSelected(d) ? styles.calDaySelected : '',
                isPast(d) ? styles.calDayPast : '',
              ].filter(Boolean).join(' ')}
              onClick={() => !isPast(d) && onSelect(new Date(viewYear, viewMonth, d))}
              disabled={isPast(d)}
              aria-pressed={isSelected(d)}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Pickup Confirmation Modal ─────────────────────────────────────────────────
function PickupModal({
  open, onClose, orderRef, location,
}: {
  open: boolean; onClose: () => void;
  orderRef?: string; location?: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  useModalEffects(open, onClose);
  if (!open) return null;

  const handleDone = () => { setConfirmed(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="optical-pickup-title">
        {confirmed ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Order picked up!</h2>
            <p className={styles.confirmedText}>
              Your optical order has been marked as picked up. Enjoy your new eyewear!
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>Done</Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="optical-pickup-title" className={styles.modalTitle}>Pick up optical order</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img src="/illustrations/spot-illustration/Glasses.svg" alt="" aria-hidden="true" width={56} height={56} />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>Optical order</p>
                  {orderRef && <p className={styles.detailSub}>{orderRef}</p>}
                  {location && <p className={styles.detailSub}>{location}</p>}
                </div>
              </div>
              <p className={styles.checkInNote}>
                Please bring your order confirmation and a valid photo ID. Your optician will verify the fit and make adjustments.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>Not yet</Button>
              <Button variant="primary" onClick={() => setConfirmed(true)} UNSAFE_className={styles.halfWidthBtn}>Confirm pickup</Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Reschedule Modal ──────────────────────────────────────────────────────────
function RescheduleModal({
  open, onClose, orderRef, location,
}: {
  open: boolean; onClose: () => void;
  orderRef?: string; location?: string;
}) {
  const initDate = new Date(2026, 2, 10);
  const [saved, setSaved] = useState(false);
  const [expandedField, setExpandedField] = useState<'date' | 'time' | null>('date');
  const [selectedDate, setSelectedDate] = useState(initDate);
  const [pendingDate, setPendingDate] = useState(initDate);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [pendingTime, setPendingTime] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (open) {
      setSaved(false);
      setExpandedField('date');
      setHasChanges(false);
      setSelectedDate(initDate);
      setPendingDate(initDate);
    }
  }, [open]);

  useModalEffects(open, onClose);
  if (!open) return null;

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });

  const toggleField = (field: 'date' | 'time') => {
    if (field === 'date') setPendingDate(selectedDate);
    if (field === 'time') setPendingTime(null);
    setExpandedField(prev => prev === field ? null : field);
  };

  const confirmDate = () => {
    setSelectedDate(pendingDate);
    setExpandedField(null);
    setHasChanges(true);
  };

  const confirmTime = () => {
    if (pendingTime) { setSelectedTime(pendingTime); setHasChanges(true); }
    setExpandedField(null);
  };

  const chevronStyle = { width: 18, height: 18, color: 'var(--ld-semantic-color-text-subtle)', flexShrink: 0 as const };

  if (saved) {
    return createPortal(
      <>
        <Scrim onClick={onClose} style={{ zIndex: 100 }} />
        <div className={styles.modalWrap} role="dialog" aria-modal="true">
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Appointment updated!</h2>
            <p className={styles.confirmedText}>
              Your optical pickup is now scheduled for <strong>{formattedDate}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <Button variant="primary" onClick={onClose} UNSAFE_className={styles.fullWidthBtn}>Done</Button>
          </div>
        </div>
      </>,
      document.body
    );
  }

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="optical-reschedule-title">
        <div className={styles.modalHeader}>
          <h2 id="optical-reschedule-title" className={styles.modalTitleLarge}>Reschedule pickup</h2>
          <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
            <X style={{ width: 20, height: 20 }} />
          </IconButton>
        </div>

        <div className={styles.detailsScrollBody}>
          {/* Order info */}
          <div className={styles.apptServiceRow}>
            <img src="/illustrations/spot-illustration/Glasses.svg" alt="" aria-hidden="true" width={48} height={48} className={styles.apptServiceIcon} />
            <div className={styles.apptServiceInfo}>
              <p className={styles.apptServiceName}>Optical order</p>
              {orderRef && <p className={styles.apptServiceDesc}>{orderRef}</p>}
              {location && <p className={styles.apptServicePrice}>{location}</p>}
            </div>
          </div>

          {/* Editable fields */}
          <div className={styles.apptFields}>
            <div className={styles.apptFieldGroup}>
              <span className={styles.apptFieldLabel}>Date</span>
              <button
                className={[styles.apptFieldValue, expandedField === 'date' ? styles.apptFieldValueOpen : ''].filter(Boolean).join(' ')}
                onClick={() => toggleField('date')}
                aria-expanded={expandedField === 'date'}
              >
                <span>{formattedDate}</span>
                {expandedField === 'date' ? <ChevronUp style={chevronStyle} /> : <ChevronDown style={chevronStyle} />}
              </button>
              {expandedField === 'date' && (
                <div className={styles.fieldExpandPanel}>
                  <AppointmentCalendar selectedDate={pendingDate} onSelect={setPendingDate} />
                  <Button variant="secondary" size="small" onClick={confirmDate} UNSAFE_className={styles.fullWidthBtn}>
                    Confirm date
                  </Button>
                </div>
              )}
            </div>

            <div className={styles.apptFieldGroup}>
              <span className={styles.apptFieldLabel}>Time</span>
              <button
                className={[styles.apptFieldValue, expandedField === 'time' ? styles.apptFieldValueOpen : ''].filter(Boolean).join(' ')}
                onClick={() => toggleField('time')}
                aria-expanded={expandedField === 'time'}
              >
                <span>{selectedTime}</span>
                {expandedField === 'time' ? <ChevronUp style={chevronStyle} /> : <ChevronDown style={chevronStyle} />}
              </button>
              {expandedField === 'time' && (
                <div className={styles.fieldExpandPanel}>
                  <p className={styles.editStepHint}>Available times for {formattedDate}</p>
                  <div className={styles.timeChips}>
                    {TIMES.map(t => (
                      <Chip key={t} selected={pendingTime === t} onSelectedChange={() => setPendingTime(t)} size="small">
                        {t}
                      </Chip>
                    ))}
                  </div>
                  <Button variant="secondary" size="small" onClick={confirmTime} disabled={!pendingTime} UNSAFE_className={styles.fullWidthBtn}>
                    Confirm time
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button variant="secondary" size="small" onClick={onClose}>Cancel</Button>
          {hasChanges && (
            <Button variant="primary" size="small" onClick={() => setSaved(true)}>Save changes</Button>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}

// ── Exported orchestrator ─────────────────────────────────────────────────────
export interface OpticalModalsProps {
  openModal: OpticalModalType;
  onClose: () => void;
  orderRef?: string;
  location?: string;
  provider?: string;
  pickupWindow?: string;
}

export function OpticalModals({
  openModal, onClose, orderRef, location, provider, pickupWindow,
}: OpticalModalsProps) {
  return (
    <>
      <OpticalOrderDetailModal
        open={openModal === 'viewDetails'}
        onClose={onClose}
        orderRef={orderRef}
        location={location}
        provider={provider}
        pickupWindow={pickupWindow}
      />
      <PickupModal
        open={openModal === 'pickup'}
        onClose={onClose}
        orderRef={orderRef}
        location={location}
      />
      <RescheduleModal
        open={openModal === 'reschedule'}
        onClose={onClose}
        orderRef={orderRef}
        location={location}
      />
    </>
  );
}
