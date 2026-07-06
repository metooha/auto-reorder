import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, Search } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { TextField } from '@/components/ui/TextField';
import { Scrim } from '@/components/ui/Scrim';
import { PharmacyOrderDetailModal } from './PharmacyOrderDetailModal';
import styles from './AutoCareModals.module.css';

export type PharmacyModalType = 'pickup' | 'transferRx' | 'viewDetails' | null;

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

// ── Pickup Confirmation Modal ─────────────────────────────────────────────────
function PickupModal({
  open, onClose, rxName, rxNumber, location, pickupWindow,
}: {
  open: boolean; onClose: () => void;
  rxName?: string; rxNumber?: string; location?: string; pickupWindow?: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  useModalEffects(open, onClose);
  if (!open) return null;

  const handleDone = () => { setConfirmed(false); onClose(); };

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="pharmacy-pickup-title">
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
            <h2 className={styles.confirmedTitle}>Prescription picked up!</h2>
            <p className={styles.confirmedText}>
              Your prescription for <strong>{rxName || 'your medication'}</strong> has been marked as picked up.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="pharmacy-pickup-title" className={styles.modalTitle}>Pick up prescription</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img
                  src="/illustrations/spot-illustration/Pharmacy.svg"
                  alt="" aria-hidden="true" width={56} height={56}
                />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{rxName || 'Prescription'}</p>
                  {rxNumber && <p className={styles.detailSub}>{rxNumber}</p>}
                  {location && <p className={styles.detailSub}>{location}</p>}
                  {pickupWindow && <p className={styles.detailSub}>Pickup window: {pickupWindow}</p>}
                </div>
              </div>
              <p className={styles.checkInNote}>
                Please bring a valid photo ID. If picking up for someone else, you may need their date of birth.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>
                Not yet
              </Button>
              <Button variant="primary" onClick={() => setConfirmed(true)} UNSAFE_className={styles.halfWidthBtn}>
                Confirm pickup
              </Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Nearby Walmart Pharmacies (demo data) ────────────────────────────────────
const NEARBY_PHARMACIES = [
  { id: '1', name: 'Oak Lawn Supercenter', address: '1521 N Cockrell Hill Rd, Dallas, TX 75211', distance: '2.3 mi' },
  { id: '2', name: 'Carrollton Supercenter', address: '1213 E Trinity Mills Rd, Carrollton, TX 75006', distance: '4.1 mi' },
  { id: '3', name: 'Irving Supercenter', address: '4100 W Airport Fwy, Irving, TX 75062', distance: '5.8 mi' },
  { id: '4', name: 'Garland Neighborhood Market', address: '555 W Centerville Rd, Garland, TX 75041', distance: '8.2 mi' },
  { id: '5', name: 'Plano Supercenter', address: '6001 Central Expy, Plano, TX 75023', distance: '12.4 mi' },
];

// ── Transfer Rx Modal ─────────────────────────────────────────────────────────
function TransferRxModal({
  open, onClose, rxName, currentLocation,
}: {
  open: boolean; onClose: () => void;
  rxName?: string; currentLocation?: string;
}) {
  const [transferred, setTransferred] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<typeof NEARBY_PHARMACIES[number] | null>(null);

  useModalEffects(open, onClose);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setTransferred(false);
      setSearchQuery('');
      setSelectedPharmacy(null);
    }
  }, [open]);

  if (!open) return null;

  const handleDone = () => { setTransferred(false); setSelectedPharmacy(null); setSearchQuery(''); onClose(); };

  const filteredPharmacies = useMemo(() => {
    if (!searchQuery.trim()) return NEARBY_PHARMACIES;
    const q = searchQuery.toLowerCase();
    return NEARBY_PHARMACIES.filter(
      p => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Exclude current location from results
  const results = filteredPharmacies.filter(
    p => !currentLocation || !p.name.toLowerCase().includes(currentLocation.toLowerCase().replace(/ supercenter| neighborhood market/gi, '').trim().toLowerCase())
  );

  return createPortal(
    <>
      <Scrim onClick={onClose} style={{ zIndex: 100 }} />
      <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="transfer-rx-title">
        {transferred ? (
          <div className={styles.confirmedBody}>
            <div className={styles.closeBtnWrap}>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={handleDone}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.successIcon}>
              <Check style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-inverse)' }} />
            </div>
            <h2 className={styles.confirmedTitle}>Transfer requested!</h2>
            <p className={styles.confirmedText}>
              Your pharmacist will process the transfer. You'll receive a notification when it's ready at the new location.
            </p>
            <Button variant="primary" onClick={handleDone} UNSAFE_className={styles.fullWidthBtn}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 id="transfer-rx-title" className={styles.modalTitle}>Transfer prescription</h2>
              <IconButton aria-label="Close" variant="ghost" size="small" onClick={onClose}>
                <X style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
            <div className={styles.checkInBody}>
              <div className={styles.detailCard}>
                <img
                  src="/illustrations/spot-illustration/Pharmacy.svg"
                  alt="" aria-hidden="true" width={56} height={56}
                />
                <div className={styles.detailInfo}>
                  <p className={styles.detailHeading}>{rxName || 'Prescription'}</p>
                  {currentLocation && <p className={styles.detailSub}>Current: {currentLocation}</p>}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <TextField
                  label="Transfer to"
                  type="search"
                  size="large"
                  placeholder="Search for a Walmart Pharmacy near you"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setSelectedPharmacy(null); }}
                  leadingIcon={<Search style={{ width: 18, height: 18 }} />}
                />

                {/* Results list */}
                {!selectedPharmacy && (
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                    borderRadius: 8, overflow: 'hidden',
                    maxHeight: 220, overflowY: 'auto',
                  }}>
                    {results.length > 0 ? results.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedPharmacy(p); setSearchQuery(p.name); }}
                        style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                          gap: 12, padding: '12px 14px', border: 'none',
                          borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                          background: 'none', cursor: 'pointer', textAlign: 'left',
                          fontFamily: 'inherit', transition: 'background 120ms',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--ld-semantic-color-fill-subtle)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>
                            {p.name}
                          </span>
                          <span style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)' }}>
                            {p.address}
                          </span>
                        </div>
                        <span style={{
                          fontSize: 12, fontWeight: 600, flexShrink: 0, marginTop: 2,
                          color: 'var(--ld-semantic-color-text-subtle)',
                        }}>
                          {p.distance}
                        </span>
                      </button>
                    )) : (
                      <div style={{ padding: '16px 14px', fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', textAlign: 'center' }}>
                        No pharmacies found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}

                {/* Selected pharmacy confirmation */}
                {selectedPharmacy && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    border: '1px solid var(--ld-semantic-color-action-fill-primary)',
                    borderRadius: 8,
                    background: 'var(--ld-semantic-color-fill-info-subtle)',
                  }}>
                    <Check style={{ width: 18, height: 18, color: 'var(--ld-semantic-color-action-fill-primary)', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>
                        {selectedPharmacy.name}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {selectedPharmacy.address} · {selectedPharmacy.distance}
                      </span>
                    </div>
                    <IconButton
                      aria-label="Change pharmacy"
                      variant="ghost" size="small"
                      onClick={() => { setSelectedPharmacy(null); setSearchQuery(''); }}
                    >
                      <X style={{ width: 16, height: 16 }} />
                    </IconButton>
                  </div>
                )}
              </div>

              <p className={styles.checkInNote}>
                Transfers typically take 24–48 hours. Your pharmacist may contact you if additional information is needed.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={onClose} UNSAFE_className={styles.halfWidthBtn}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => setTransferred(true)}
                UNSAFE_className={styles.halfWidthBtn}
                disabled={!selectedPharmacy}
              >
                Transfer prescription
              </Button>
            </div>
          </>
        )}
      </div>
    </>,
    document.body
  );
}

// ── Exported orchestrator ─────────────────────────────────────────────────────
export interface PharmacyModalsProps {
  openModal: PharmacyModalType;
  onClose: () => void;
  rxName?: string;
  rxNumber?: string;
  location?: string;
  pickupWindow?: string;
  provider?: string;
  plan?: string;
}

export function PharmacyModals({
  openModal, onClose, rxName, rxNumber, location, pickupWindow, provider, plan,
}: PharmacyModalsProps) {
  return (
    <>
      <PharmacyOrderDetailModal
        open={openModal === 'viewDetails'}
        onClose={onClose}
        rxName={rxName}
        rxNumber={rxNumber}
        location={location}
        pickupWindow={pickupWindow}
        provider={provider}
        plan={plan}
      />
      <PickupModal
        open={openModal === 'pickup'}
        onClose={onClose}
        rxName={rxName}
        rxNumber={rxNumber}
        location={location}
        pickupWindow={pickupWindow}
      />
      <TransferRxModal
        open={openModal === 'transferRx'}
        onClose={onClose}
        rxName={rxName}
        currentLocation={location}
      />
    </>
  );
}
