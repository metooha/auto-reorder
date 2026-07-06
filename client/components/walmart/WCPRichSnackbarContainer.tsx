import React, { useEffect, useState } from 'react';
import { WCPRichSnackbar } from './WCPRichSnackbar';
import {
  subscribeWCPRichSnackbar,
  dismissWCPRichSnackbar,
} from '@/hooks/use-wcp-rich-snackbar';
import type { WCPRichSnackbarState } from '@/hooks/use-wcp-rich-snackbar';

export const WCPRichSnackbarContainer: React.FC = () => {
  const [current, setCurrent] = useState<WCPRichSnackbarState | null>(null);

  useEffect(() => {
    const unsub = subscribeWCPRichSnackbar(setCurrent);
    return unsub;
  }, []);

  if (!current) return null;

  return (
    <WCPRichSnackbar
      id={current.id}
      open={current.open}
      color={current.color}
      contentVariant={current.contentVariant}
      leadingSlot={current.leadingSlot}
      message={current.message}
      actionLabel={current.actionLabel}
      onAction={current.onAction}
      onClose={dismissWCPRichSnackbar}
      duration={current.duration}
      position={current.position}
    />
  );
};

export default WCPRichSnackbarContainer;
