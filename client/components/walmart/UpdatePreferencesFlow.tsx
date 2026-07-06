import { useEffect, useRef, useState } from 'react';
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { ViewOrderBottomSheet } from './ViewOrderBottomSheet';
import { ReplenishFlow } from './ReplenishFlow';
import { snackbar } from '@/hooks/use-snackbar';

/**
 * Orchestrates the "Update Preferences" dev-toolbar flow:
 *  1. When prefsMode flips from 'none' → 'non-member' or 'member-inhome',
 *     open the Delivery Preferences bottom sheet (schedule view).
 *  2. When the user taps Save changes:
 *     - Show the "Your preferences have been updated." snackbar.
 *     - Close the sheet and open the Start Recurring Deliveries page
 *       (ReplenishFlow → deliveryDetails screen) so they can confirm.
 */
export function UpdatePreferencesFlow() {
  const { prefsMode, setBasketVisible } = useWalmartScenario();
  const [showSheet, setShowSheet] = useState(false);
  const [showStartRecurring, setShowStartRecurring] = useState(false);
  const lastModeRef = useRef(prefsMode);

  // Open the prefs sheet whenever the toolbar enters a non-'none' mode.
  useEffect(() => {
    const prev = lastModeRef.current;
    lastModeRef.current = prefsMode;
    if (prefsMode !== 'none' && prev !== prefsMode) {
      setShowSheet(true);
    }
  }, [prefsMode]);

  return (
    <>
      <ViewOrderBottomSheet
        isOpen={showSheet}
        onClose={() => setShowSheet(false)}
        initialView="schedule"
        customerName="Emilia Garcia"
        customerAddress="3743 Park Ln, Dallas, TX 75220"
        canChangeAddress={prefsMode === 'member-inhome'}
        deliveryDay="Friday"
        deliveryTime="2pm"
        onSaved={() => {
          snackbar({
            message: 'Your preferences have been updated.',
            position: 'bottom-center',
            duration: 4000,
          });
          setShowSheet(false);
          setShowStartRecurring(true);
        }}
      />

      <ReplenishFlow
        isOpen={showStartRecurring}
        onClose={() => setShowStartRecurring(false)}
        initialScreen="deliveryDetails"
        onFlowComplete={() => setBasketVisible(true)}
      />
    </>
  );
}
