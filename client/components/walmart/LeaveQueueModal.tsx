import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';

export interface LeaveQueueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when user confirms leaving */
  onLeave?: () => void;
  /** Called when user chooses to stay */
  onStay?: () => void;
  /** Title text */
  title?: string;
  /** Body description */
  description?: string;
  /** Label for the leave action */
  leaveLabel?: string;
  /** Label for the stay action */
  stayLabel?: string;
}

export const LeaveQueueModal: React.FC<LeaveQueueModalProps> = ({
  open,
  onOpenChange,
  onLeave,
  onStay,
  title = 'Leave the line?',
  description = "If you leave now, you\u2019ll lose your chance to purchase this item.",
  leaveLabel = 'Leave',
  stayLabel = 'Stay in line',
}) => {
  const handleLeave = () => {
    onLeave?.();
    onOpenChange(false);
  };

  const handleStay = () => {
    onStay?.();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="small">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalDescription style={{ padding: '0 24px 16px' }}>
          {description}
        </ModalDescription>
        <ModalFooter>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 'var(--ld-primitive-scale-space-200, 16px)',
            width: '100%',
          }}>
            <LinkButton color="default" size="medium" onClick={handleLeave}>
              {leaveLabel}
            </LinkButton>
            <Button variant="primary" size="medium" onClick={handleStay}>
              {stayLabel}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
