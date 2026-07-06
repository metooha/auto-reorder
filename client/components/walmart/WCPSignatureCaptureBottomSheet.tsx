import * as React from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { SignatureBase, SignatureBaseProps } from './WCPSignatureCapture';

// ── WCPSignatureCaptureBottomSheet ─────────────────────────────────────────
// Renders the full Signature Base form inside an LD 3.5 BottomSheet.
//
// Typical flow:
//  1. User is in "trigger" state → sees "Agree & sign" button
//  2. Clicking opens this bottom sheet
//  3. User types their name, clicks "Preview signature"
//  4. Checks the "Sign as …" checkbox
//  5. Taps "Agree & sign" in the sheet footer → onSubmit fires
//  6. Sheet closes; parent updates to show SignatureTerms (signed state)

export interface WCPSignatureCaptureBottomSheetProps extends SignatureBaseProps {
  /** Controls whether the sheet is visible. */
  isOpen: boolean;
  /** Called when the sheet should close (swipe-down, X button, or overlay tap). */
  onClose: () => void;
  /** Title shown in the BottomSheet header. */
  title?: string;
  /** Called when the user taps the primary "Agree & sign" footer button. */
  onSubmit?: () => void;
  /** Label for the primary footer button. */
  submitLabel?: string;
  /** Whether the footer submit button is disabled (e.g. form not complete). */
  submitDisabled?: boolean;
}

export function WCPSignatureCaptureBottomSheet({
  isOpen,
  onClose,
  title = 'Subscription agreement',
  onSubmit,
  submitLabel = 'Agree & sign',
  submitDisabled = false,
  ...signatureBaseProps
}: WCPSignatureCaptureBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      adjustHeight="fixed"
      actions={
        <Button
          variant="primary"
          size="medium"
          isFullWidth
          onClick={onSubmit}
        >
          {submitLabel}
        </Button>
      }
    >
      <SignatureBase {...signatureBaseProps} />
    </BottomSheet>
  );
}
