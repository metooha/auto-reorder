import { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { TextField } from '@/components/ui/TextField';
import { IconButton } from '@/components/ui/IconButton';
import { InfoCircle } from '@/components/icons/InfoCircle';
import { ChevronLeft } from '@/components/icons/ChevronLeft';
import styles from './DriverTipSheet.module.css';

const TIP_OPTIONS = ['5%', '10%', '15%', 'No tip', 'Custom'] as const;
type TipOption = (typeof TIP_OPTIONS)[number];

export interface DriverTipSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialTip?: string;
  onSave: (tip: string) => void;
}

function isPresetOption(value: string): value is TipOption {
  return (TIP_OPTIONS as readonly string[]).includes(value);
}

export function DriverTipSheet({
  isOpen,
  onClose,
  initialTip = '10%',
  onSave,
}: DriverTipSheetProps) {
  const [view, setView] = useState<'main' | 'details'>('main');
  const [selected, setSelected] = useState<TipOption>(
    isPresetOption(initialTip) ? initialTip : 'Custom',
  );
  const [customAmount, setCustomAmount] = useState<string>(
    isPresetOption(initialTip) ? '' : initialTip.replace(/^\$/, ''),
  );

  useEffect(() => {
    if (isOpen) {
      setView('main');
      if (isPresetOption(initialTip)) {
        setSelected(initialTip);
        setCustomAmount('');
      } else {
        setSelected('Custom');
        setCustomAmount(initialTip.replace(/^\$/, ''));
      }
    }
  }, [isOpen, initialTip]);

  const handleSave = () => {
    const value =
      selected === 'Custom'
        ? customAmount
          ? `$${customAmount}`
          : 'Custom'
        : selected;
    onSave(value);
    onClose();
  };

  const title = view === 'main' ? 'Tip preferences' : 'Driver tip details';

  const actions =
    view === 'main' ? (
      <Button variant="primary" size="medium" isFullWidth strokeOn onClick={handleSave}>
        Save
      </Button>
    ) : (
      <Button
        variant="primary"
        size="medium"
        isFullWidth
        strokeOn
        onClick={() => setView('main')}
      >
        Okay
      </Button>
    );

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={actions}
      shouldScaleBackground={false}
    >
      {view === 'main' ? (
        <div className={styles.body} data-driver-tip-sheet>
          <div className={styles.infoRow}>
            <p className={styles.infoTitle}>Want to thank the driver?</p>
            <div className={styles.infoDescRow}>
              <p className={styles.infoText}>
                100% of your tip goes to the drivers.
              </p>
              <IconButton
                variant="ghost"
                shape="rounded"
                size="small"
                aria-label="Driver tip details"
                onClick={() => setView('details')}
              >
                <InfoCircle />
              </IconButton>
            </div>
          </div>

          <div className={styles.tipBanner}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4f6790ead7924df19f964887276de764?format=webp&width=800&height=1200"
              alt=""
              className={styles.tipBannerImage}
              aria-hidden="true"
            />
            <p className={styles.tipBannerText}>You can show your appreciation with a tip.</p>
          </div>

          <div className={styles.chipRow}>
            {TIP_OPTIONS.map((option) => (
              <Chip
                key={option}
                variant="primary"
                size="medium"
                selected={selected === option}
                onSelectedChange={(isSel) => {
                  if (isSel) setSelected(option);
                }}
              >
                {option}
              </Chip>
            ))}
          </div>

          <p className={styles.tipDetails}>
            You can change your tip amount up to 3 hours after delivery. You won&apos;t be charged until 24 hours after delivery. Driver tips are divided when there are multiple deliveries. Your tip total is based on your delivery subtotal.
          </p>

          {selected === 'Custom' && (
            <div className={styles.customField}>
              <TextField
                label="Custom tip amount"
                placeholder="0.00"
                inputMode="decimal"
                value={customAmount}
                onChange={(e) =>
                  setCustomAmount(e.target.value.replace(/[^0-9.]/g, ''))
                }
                leadingIcon={<span aria-hidden="true">$</span>}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.detailsBody} data-driver-tip-sheet>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => setView('main')}
            aria-label="Back to driver tip"
          >
            <ChevronLeft width={20} height={20} />
            Back
          </button>
          <p className={styles.detailsText}>
            All tips are transferred to 3rd party delivery providers for distribution to drivers according to their contractual agreements on tip payout. Their practices may be available on their web sites.
            {'\n\n'}
            Changes to your order total won&apos;t affect your tip amount.
          </p>
        </div>
      )}
    </BottomSheet>
  );
}
