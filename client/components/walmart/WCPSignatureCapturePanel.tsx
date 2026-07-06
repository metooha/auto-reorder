import * as React from 'react';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/Button';
import { SignatureBase, SignatureBaseProps } from './WCPSignatureCapture';

// ── WCPSignatureCapturePanel ───────────────────────────────────────────────
// Renders the full Signature Base form inside an LD 3.5 side Panel.
//
// Use this pattern on desktop (900+px) where a slide-out side panel is
// preferred over the mobile bottom sheet. The flow is identical:
//  1. Trigger button opens the panel
//  2. User types their name → previews signature → checks checkbox
//  3. Taps "Agree & sign" in the panel footer → onSubmit fires
//  4. Panel closes; parent updates to show SignatureTerms (signed state)

export interface WCPSignatureCapturePanelProps extends SignatureBaseProps {
  /** Controls whether the panel is visible. */
  isOpen: boolean;
  /** Called when the panel should close (X button, Escape key, or scrim click). */
  onClose: () => void;
  /** Title shown in the Panel header. */
  title?: string;
  /** Panel width variant. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Which side the panel slides in from. @default 'right' */
  position?: 'left' | 'right';
  /** Called when the user taps the primary "Agree & sign" footer button. */
  onSubmit?: () => void;
  /** Label for the primary footer button. */
  submitLabel?: string;
}

export function WCPSignatureCapturePanel({
  isOpen,
  onClose,
  title = 'Subscription agreement',
  size = 'medium',
  position = 'right',
  onSubmit,
  submitLabel = 'Agree & sign',
  ...signatureBaseProps
}: WCPSignatureCapturePanelProps) {
  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      position={position}
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
    </Panel>
  );
}
