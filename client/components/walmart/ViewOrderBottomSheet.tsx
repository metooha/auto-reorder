import { useState } from 'react';
import { WCPRichMediaSheet } from './WCPRichMediaSheet';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Alert } from '@/components/ui/Alert';
import { DaySelector } from './DaySelector';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Chip } from '@/components/ui/Chip';
import { TextField } from '@/components/ui/TextField';
import { Calendar, Pencil, MagicFill, ChevronRight, InfoCircle, Location, StarFill } from '@/components/icons';
import { WCPLocationFillIcon } from '@/components/icons-custom';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/Radio';
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import styles from './ViewOrderBottomSheet.module.css';

const INHOME_ICON_URL = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4c3295e9dba2400c94d794b5ef5e9aaf?format=webp&width=800&height=1200';

const INHOME_TIME_SLOTS = ['9am\u20131pm', '2pm\u20136pm'];

interface ViewOrderBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryDay?: string;
  deliveryTime?: string;
  onViewUsuals?: () => void;
  customerName?: string;
  customerAddress?: string;
  /** Open the sheet directly to a particular view. Defaults to 'overview'. */
  initialView?: 'overview' | 'schedule';
  /** Whether the address can be changed (Member flow). */
  canChangeAddress?: boolean;
  /** Called after the user taps Save in the schedule view. */
  onSaved?: () => void;
  /** When true, shows the "Select a delivery time." error alert in the schedule view. */
  showSlotError?: boolean;
  /** Called when the user changes the day or time in the schedule view. */
  onSlotChanged?: () => void;
  /** Controlled frequency value ('weekly' | 'biweekly' | 'monthly'). */
  selectedFrequency?: string;
  /** Called whenever the frequency chip selection changes. */
  onFrequencyChange?: (freq: string) => void;
}

const DAYS = ['Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const TIME_SLOTS = ['1pm\u20132pm', '2pm\u20133pm', '3pm\u20134pm', '4pm\u20135pm', '5pm\u20136pm'];

const DAY_TO_FULL: Record<string, string> = {
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thur: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
};

const FULL_TO_SHORT: Record<string, string> = {
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thur',
  Friday: 'Fri',
  Saturday: 'Sat',
};

const DAY_NAME_TO_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const DEMO_ADDRESSES = [
  { id: '1', name: 'Emilia Garcia', address: '3743 Park Ln, Dallas, TX 75220' },
  { id: '2', name: 'Camila Garcia', address: '2703 SE G St, Rogers, AR 72756' },
  { id: '3', name: 'Emilia Garcia', address: '180 Bluff View Dr, Brentwood, TN 37027' },
];

const FREQUENCY_OPTIONS = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Every 2 weeks', value: 'biweekly' },
  { label: 'Every 4 weeks', value: 'monthly' },
];

function timeSlotToLabel(slot: string): string {
  const match = slot.match(/^(\d+[ap]m)/);
  return match ? match[1] : slot;
}

/** Adds 2 hours to a time string like "2pm" → "4pm" */
function deriveEndTime(startTime: string): string {
  const match = startTime.match(/^(\d+)(am|pm)$/);
  if (!match) return startTime;
  const hour = parseInt(match[1], 10);
  const period = match[2];
  return `${hour + 2}${period}`;
}

/**
 * Finds the next occurrence of a weekday from today.
 * Returns a formatted string like "Fri, March 20".
 */
function getNextDeliveryDate(dayName: string): string {
  const targetIndex = DAY_NAME_TO_INDEX[dayName];
  if (targetIndex === undefined) return dayName;

  const today = new Date();
  const todayIndex = today.getDay();
  let daysUntil = targetIndex - todayIndex;
  if (daysUntil <= 0) daysUntil += 7;

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntil);

  const shortDay = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
  const month = nextDate.toLocaleDateString('en-US', { month: 'long' });
  const day = nextDate.getDate();

  return `${shortDay}, ${month} ${day}`;
}

/* ── Overview View ── */
function OverviewView({
  day,
  time,
  onChangeSchedule,
  onViewUsuals,
}: {
  day: string;
  time: string;
  onChangeSchedule: () => void;
  onViewUsuals?: () => void;
}) {
  const endTime = deriveEndTime(time);

  return (
    <div className={styles.overviewWrapper}>
      {/* Title */}
      <div className={styles.titleSection}>
        <p className={styles.title}>
          Get your own delivery day and time with smart recurring deliveries
        </p>
      </div>

      {/* Product images row */}
      <div className={styles.imagesRow} aria-hidden="true">
        {[
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5221159011d24821921284d6c8f8c96c?format=webp&width=200',
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F611adfc04751425ea0c1d4d27b589a7f?format=webp&width=200',
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F817d87905c27422a92efee656f26ff87?format=webp&width=200',
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F9e7ff61bbd44483fbbf9b314462714e3?format=webp&width=200',
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F44533e3557be4321a22b53c7fdf00ca6?format=webp&width=200',
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff22fb0219b6042b087eb696f61171ecb?format=webp&width=200',
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5d92ba87300544b48bf113aadc9676f0?format=webp&width=200',
          'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb2b58c7a91594686be2cb0913468395e?format=webp&width=200',
        ].map((src, i) => (
          <img key={i} src={src} alt="" className={styles.groceryImage} />
        ))}
      </div>

      {/* Feature bullets + delivery time card */}
      <div className={styles.featureCard}>
        {/* Feature bullets */}
        <div className={styles.featureBulletsCard}>
          <div className={styles.featureRow}>
            <div className={styles.featureIconCircle}>
              <Calendar width={17} height={17} />
            </div>
            <span className={styles.featureText}>Reminds you 4 days before delivery.</span>
          </div>
          <div className={styles.featureRow}>
            <div className={styles.featureIconCircle}>
              <Pencil width={16} height={16} />
            </div>
            <span className={styles.featureText}>Add, edit or skip until 3 hours before.</span>
          </div>
          <div className={styles.featureRow}>
            <div className={styles.featureIconCircle}>
              <MagicFill width={19} height={19} />
            </div>
            <span className={styles.featureText}>Uses your history to decide items needed.</span>
          </div>
        </div>

        {/* Delivery time row — tapping opens schedule picker */}
        <button
          type="button"
          className={styles.deliveryTimeRow}
          onClick={onChangeSchedule}
          aria-label={`Every ${day}, ${time}–${endTime}. Recommended for you. Tap to change.`}
        >
          <div className={styles.deliveryTimeContent}>
            <span className={styles.deliveryTimeMain}>
              Every {day}, {time}–{endTime}
            </span>
            <span className={styles.deliveryTimeCaption}>
              Recommended for you. Change it anytime.
            </span>
          </div>
          <ChevronRight width={24} height={24} className={styles.deliveryTimeChevron} />
        </button>
      </div>

      {/* Navy arch + CTA section at the bottom */}
      <div className={styles.bottomSection}>
        <svg
          className={styles.archSvg}
          width="100%"
          height="30"
          viewBox="0 0 375 119"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className={styles.archPath}
            d="M375 17.9705V118.437H0V17.9705C56.2425 6.48158 119.974 0 187.5 0C255.026 0 318.758 6.48158 375 17.9705Z"
          />
        </svg>
        <div className={styles.ctaSection}>
          <Button
            variant="primary"
            size="medium"
            isFullWidth
            strokeOn
            onClick={onViewUsuals}
          >
            Review items you need
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Schedule View ── */
function ScheduleView({
  customerName,
  customerAddress,
  canChangeAddress,
  onChangeAddress,
  selectedDay,
  selectedTime,
  selectedFrequency,
  onDayChange,
  onTimeChange,
  onFrequencyChange,
  onSave,
  showSlotError,
}: {
  customerName?: string;
  customerAddress?: string;
  canChangeAddress?: boolean;
  onChangeAddress?: () => void;
  selectedDay: string;
  selectedTime: string;
  selectedFrequency: string;
  onDayChange: (day: string) => void;
  onTimeChange: (slot: string) => void;
  onFrequencyChange: (freq: string) => void;
  onSave: () => void;
  showSlotError?: boolean;
}) {
  const { prefsMode } = useWalmartScenario();
  const showInHome = prefsMode === 'member-inhome';
  const fullDay = DAY_TO_FULL[selectedDay] ?? selectedDay;
  const nextDelivery = getNextDeliveryDate(fullDay);

  return (
    <div className={styles.scheduleWrapper}>
      <div className={styles.scheduleContentLayer}>
        <div className={styles.scheduleBody}>

          {showSlotError && (
            <div className={styles.scheduleSlotError}>
              <Alert variant="error">Select a delivery time.</Alert>
            </div>
          )}

          {/* Address section */}
          {(customerName || customerAddress) && (
            <div className={styles.scheduleAddressRow}>
              <div className={styles.scheduleAddressSection}>
                {customerName && (
                  <span className={styles.scheduleName}>{customerName}</span>
                )}
                {customerAddress && (
                  <span className={styles.scheduleAddress}>{customerAddress}</span>
                )}
              </div>
              {canChangeAddress && onChangeAddress && (
                <LinkButton size="small" color="default" onClick={onChangeAddress}>
                  Change
                </LinkButton>
              )}
            </div>
          )}

          {/* Divider */}
          <div className={styles.scheduleDivider} role="separator" />

          {/* Frequency section */}
          <div className={styles.scheduleFrequencySection}>
            <span className={styles.scheduleFrequencyLabel}>
              How often you'll get deliveries
            </span>
            <div className={styles.scheduleFrequencyChips} role="group" aria-label="Delivery frequency">
              {FREQUENCY_OPTIONS.map((option) => (
                <Chip
                  key={option.value}
                  selected={selectedFrequency === option.value}
                  onSelectedChange={() => onFrequencyChange(option.value)}
                  size="medium"
                  aria-pressed={selectedFrequency === option.value}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className={styles.scheduleDivider} role="separator" />

          {/* Day + time section */}
          <div className={styles.scheduleDayTimeSection}>
            <span className={styles.scheduleDayTimeLabel}>
              Select your delivery day and time
            </span>
            <span className={styles.scheduleDayTimeSubLabel}>
              This will be your preferred day and time for future orders.
            </span>
            <div className={styles.dayCarouselWrap}>
              <DaySelector
                days={DAYS}
                selectedDays={selectedDay}
                onChange={onDayChange}
              />
            </div>
            <RadioGroup
              value={selectedTime}
              onValueChange={onTimeChange}
              className={styles.slotGroup}
            >
              {showInHome && (
                <div className={styles.slotSection}>
                  <div className={styles.slotSectionHeader}>
                    <span className={styles.slotSectionLabel}>InHome — Tip free delivery</span>
                    <InfoCircle width={16} height={16} aria-hidden="true" />
                  </div>
                  <div className={styles.slotList}>
                    {INHOME_TIME_SLOTS.map((slot) => {
                      const checked = slot === selectedTime;
                      return (
                        <div
                          key={slot}
                          className={[styles.slotRow, checked ? styles.slotRowChecked : ''].filter(Boolean).join(' ')}
                        >
                          <Radio value={slot} label={slot} UNSAFE_className={styles.slotRadio} />
                          <div className={styles.slotMeta}>
                            <img
                              src={INHOME_ICON_URL}
                              alt="InHome"
                              className={styles.inhomeIcon}
                            />
                            <span className={styles.priceStrike}>$9.95</span>
                            <span className={styles.priceFree}>$0</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={styles.slotSection}>
                {showInHome && (
                  <div className={styles.slotSectionHeader}>
                    <span className={styles.slotSectionLabel}>Other delivery options</span>
                    <InfoCircle width={16} height={16} aria-hidden="true" />
                  </div>
                )}
                <div className={styles.slotList}>
                  {TIME_SLOTS.map((slot) => {
                    const checked = slot === selectedTime;
                    return (
                      <div
                        key={slot}
                        className={[styles.slotRow, checked ? styles.slotRowChecked : ''].filter(Boolean).join(' ')}
                      >
                        <Radio value={slot} label={slot} UNSAFE_className={styles.slotRadio} />
                        {showInHome && (
                          <div className={styles.slotMeta}>
                            <span className={styles.priceStrike}>$9.95</span>
                            <span className={styles.priceFree}>$0</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </RadioGroup>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Schedule sticky-footer CTA (rendered via BottomSheet `actions`) ── */
function ScheduleActions({ onSave }: { onSave: () => void }) {
  return (
    <div className={styles.scheduleActions}>
      <p className={styles.scheduleNextDelivery}>
        Your first delivery will be on Fri, May 18.
      </p>
      <Button
        variant="primary"
        size="medium"
        isFullWidth
        strokeOn
        onClick={onSave}
      >
        Save changes
      </Button>
    </div>
  );
}

/* ── Address Row sub-component ── */
function AddressRow({
  name,
  address,
  selected,
  preferred,
  onSelect,
  onSaveEdit,
}: {
  name: string;
  address: string;
  selected: boolean;
  preferred: boolean;
  onSelect: () => void;
  onSaveEdit: (next: { name: string; address: string }) => void;
}) {
  const Icon = preferred ? StarFill : selected ? WCPLocationFillIcon : Location;
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftAddress, setDraftAddress] = useState(address);

  const startEdit = () => {
    setDraftName(name);
    setDraftAddress(address);
    setEditing(true);
  };

  const saveEdit = () => {
    onSaveEdit({ name: draftName.trim() || name, address: draftAddress.trim() || address });
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraftName(name);
    setDraftAddress(address);
    setEditing(false);
  };

  return (
    <div className={[styles.addressRow, selected ? styles.addressRowSelected : ''].filter(Boolean).join(' ')}>
      {editing ? (
        <div className={styles.addressRowEditing}>
          <Icon
            width={24}
            height={24}
            className={[styles.addressRowIcon, preferred ? styles.addressRowIconSelected : ''].filter(Boolean).join(' ')}
            aria-hidden="true"
          />
          <div className={styles.addressRowEditFields}>
            <TextField
              label="Name"
              size="small"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
            />
            <TextField
              label="Address"
              size="small"
              value={draftAddress}
              onChange={(e) => setDraftAddress(e.target.value)}
            />
            <div className={styles.addressRowEditActions}>
              <LinkButton size="small" color="default" onClick={cancelEdit}>
                Cancel
              </LinkButton>
              <LinkButton size="small" color="default" onClick={saveEdit}>
                Save
              </LinkButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            className={styles.addressRowMain}
            onClick={onSelect}
            aria-pressed={selected}
          >
            <Icon
              width={24}
              height={24}
              className={[styles.addressRowIcon, preferred ? styles.addressRowIconSelected : ''].filter(Boolean).join(' ')}
              aria-hidden="true"
            />
            <div className={styles.addressRowText}>
              {preferred && (
                <span className={styles.addressRowPreferredLabel}>Preferred address</span>
              )}
              <span className={styles.addressRowName}>{name}</span>
              <span className={styles.addressRowAddress}>{address}</span>
            </div>
          </button>
          <div className={styles.addressRowEdit}>
            <LinkButton size="small" color="default" onClick={startEdit}>
              Edit
            </LinkButton>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Address View ── */
function AddressView({
  addresses,
  selectedId,
  onSelect,
  onEditAddress,
  onBack,
}: {
  addresses: typeof DEMO_ADDRESSES;
  selectedId: string;
  onSelect: (id: string) => void;
  onEditAddress: (id: string, next: { name: string; address: string }) => void;
  onBack: () => void;
}) {
  return (
    <div className={styles.scheduleWrapper}>
      <div className={styles.scheduleContentLayer}>
        <div className={styles.addressBody}>
          <div className={styles.addressBackRow}>
            <LinkButton size="small" color="default" onClick={onBack}>
              Back
            </LinkButton>
          </div>
          <div className={styles.addressList}>
            {addresses.map((a) => (
              <AddressRow
                key={a.id}
                name={a.name}
                address={a.address}
                selected={a.id === selectedId}
                preferred={a.id === '1'}
                onSelect={() => onSelect(a.id)}
                onSaveEdit={(next) => onEditAddress(a.id, next)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export function ViewOrderBottomSheet({
  isOpen,
  onClose,
  deliveryDay = 'Friday',
  deliveryTime = '4pm',
  onViewUsuals,
  customerName,
  customerAddress,
  initialView = 'overview',
  canChangeAddress = true,
  onSaved,
  showSlotError = false,
  onSlotChanged,
  selectedFrequency: controlledFrequency,
  onFrequencyChange: onControlledFrequencyChange,
}: ViewOrderBottomSheetProps) {
  const [view, setView] = useState<'overview' | 'schedule' | 'address'>(initialView);
  const [selectedAddressId, setSelectedAddressId] = useState('1');
  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const selectedDemoAddress = addresses.find((a) => a.id === selectedAddressId);
  const effectiveName = canChangeAddress ? selectedDemoAddress?.name ?? customerName : customerName;
  const effectiveAddress = canChangeAddress ? selectedDemoAddress?.address ?? customerAddress : customerAddress;
  const [savedDay, setSavedDay] = useState(deliveryDay);
  const [savedTime, setSavedTime] = useState(deliveryTime);
  const [internalFrequency, setInternalFrequency] = useState<string>('weekly');
  const selectedFrequency = controlledFrequency ?? internalFrequency;
  const setSelectedFrequency = (freq: string) => {
    setInternalFrequency(freq);
    onControlledFrequencyChange?.(freq);
  };

  const shortDay = FULL_TO_SHORT[savedDay] ?? 'Fri';
  const [editDay, setEditDay] = useState(shortDay);
  const [editTime, setEditTime] = useState(
    TIME_SLOTS.find((s) => s.startsWith(savedTime.replace('pm', 'pm'))) ??
      TIME_SLOTS[TIME_SLOTS.length - 1]
  );

  const handleChangeSchedule = () => {
    setEditDay(FULL_TO_SHORT[savedDay] ?? 'Fri');
    setEditTime(
      TIME_SLOTS.find((s) => s.startsWith(savedTime)) ??
        TIME_SLOTS[TIME_SLOTS.length - 1]
    );
    setView('schedule');
  };

  const handleSave = () => {
    const fullDay = DAY_TO_FULL[editDay] ?? editDay;
    const timeLabel = timeSlotToLabel(editTime);
    setSavedDay(fullDay);
    setSavedTime(timeLabel);
    onSaved?.();
    if (initialView === 'schedule') {
      handleClose();
    } else {
      setView('overview');
    }
  };

  const handleClose = () => {
    setView(initialView);
    onClose();
  };

  const handleViewUsuals = () => {
    onViewUsuals?.();
    handleClose();
  };

  if (view === 'address') {
    return (
      <BottomSheet
        isOpen={isOpen}
        onClose={handleClose}
        title="Select delivery address"
        adjustHeight="fixed"
      >
        <AddressView
          addresses={addresses}
          selectedId={selectedAddressId}
          onSelect={(id) => {
            setSelectedAddressId(id);
            setView('schedule');
          }}
          onEditAddress={(id, next) => {
            setAddresses((prev) =>
              prev.map((a) => (a.id === id ? { ...a, ...next } : a))
            );
            setSelectedAddressId(id);
            setView('schedule');
          }}
          onBack={() => setView('schedule')}
        />
      </BottomSheet>
    );
  }

  if (view === 'schedule') {
    return (
      <BottomSheet
        isOpen={isOpen}
        onClose={handleClose}
        title="Delivery preferences"
        adjustHeight="fixed"
        actions={<ScheduleActions onSave={handleSave} />}
      >
        <ScheduleView
          customerName={effectiveName}
          customerAddress={effectiveAddress}
          canChangeAddress={canChangeAddress}
          onChangeAddress={() => setView('address')}
          selectedDay={editDay}
          selectedTime={editTime}
          selectedFrequency={selectedFrequency}
          onDayChange={(d) => {
            setEditDay(d);
            onSlotChanged?.();
          }}
          onTimeChange={(t) => {
            setEditTime(t);
            onSlotChanged?.();
          }}
          onFrequencyChange={(freq) => setSelectedFrequency(freq)}
          onSave={handleSave}
          showSlotError={showSlotError}
        />
      </BottomSheet>
    );
  }

  return (
    <WCPRichMediaSheet
      isOpen={isOpen}
      onClose={handleClose}
      headerVariant="none"
      title="Get your own delivery day and time with smart recurring deliveries"
      surfaceVariant="brand-gradient"
      adjustHeight="content"
      ariaLabel="View your upcoming delivery"
    >
      <OverviewView
        day={savedDay}
        time={savedTime}
        onChangeSchedule={handleChangeSchedule}
        onViewUsuals={handleViewUsuals}
      />
    </WCPRichMediaSheet>
  );
}
