import React from 'react';
import { Panel } from '@/components/ui/Panel';
import { WCPQueueItemCard } from './WCPQueueItemCard';
import type { QueueItem } from './WCPQueueItemCard';
import styles from './WCPQueuePanel.module.css';

export interface WCPQueuePanelProps {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Called when the panel should close */
  onClose: () => void;
  /** List of queue items to display */
  items: QueueItem[];
}

export const WCPQueuePanel: React.FC<WCPQueuePanelProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const itemCount = items.length;
  const title = `You\u2019re in line for ${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="medium"
      position="right"
      ariaLabel={title}
      closeButtonAriaLabel="Close queue panel"
    >
      <div className={styles.cardList}>
        {items.map((item) => (
          <WCPQueueItemCard key={item.id} item={item} />
        ))}
      </div>
    </Panel>
  );
};
