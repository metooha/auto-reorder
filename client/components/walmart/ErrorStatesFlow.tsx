import { useState } from 'react';
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { ViewOrderBottomSheet } from './ViewOrderBottomSheet';
import { ReplenishFlow } from './ReplenishFlow';

/**
 * Orchestrates dev-toolbar driven flows.
 * - Error-state chips no longer auto-open; the View order button drives that.
 * - The Onboarding scenario chip opens the recurring-delivery overview sheet.
 * - "Review items you need" hands off to ReplenishFlow.
 */
export function ErrorStatesFlow() {
  const { onboardingOpen, setOnboardingOpen, setBasketVisible } = useWalmartScenario();
  const [showReplenishFlow, setShowReplenishFlow] = useState(false);

  return (
    <>
      <ViewOrderBottomSheet
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        initialView="overview"
        customerName="Emilia Garcia"
        customerAddress="3743 Park Ln, Dallas, TX 75220"
        deliveryDay="Friday"
        deliveryTime="4pm"
        onViewUsuals={() => {
          setOnboardingOpen(false);
          setShowReplenishFlow(true);
        }}
      />

      <ReplenishFlow
        isOpen={showReplenishFlow}
        onClose={() => setShowReplenishFlow(false)}
        initialScreen="overview"
        onFlowComplete={() => setBasketVisible(true)}
      />
    </>
  );
}
