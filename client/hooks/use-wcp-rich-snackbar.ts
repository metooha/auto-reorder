import React, { useState, useCallback, useEffect } from 'react';
import type {
  WCPRichSnackbarColor,
  WCPRichSnackbarContentVariant,
} from '@/components/walmart/WCPRichSnackbar';

export interface WCPRichSnackbarState {
  id: string;
  open: boolean;
  color: WCPRichSnackbarColor;
  contentVariant: WCPRichSnackbarContentVariant;
  leadingSlot?: React.ReactNode;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface WCPRichSnackbarOptions {
  color?: WCPRichSnackbarColor;
  contentVariant?: WCPRichSnackbarContentVariant;
  leadingSlot?: React.ReactNode;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

// Global singleton state
let state: WCPRichSnackbarState | null = null;
let listeners: Array<(s: WCPRichSnackbarState | null) => void> = [];

const generateId = () => Math.random().toString(36).substring(2, 9);

export const subscribeWCPRichSnackbar = (
  listener: (s: WCPRichSnackbarState | null) => void,
) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const notify = () => listeners.forEach((l) => l(state));

export const wcpRichSnackbar = (options: WCPRichSnackbarOptions): string => {
  const id = generateId();
  state = {
    id,
    open: true,
    color: options.color ?? 'primary',
    contentVariant: options.contentVariant ?? 'left-regular',
    leadingSlot: options.leadingSlot,
    message: options.message,
    actionLabel: options.actionLabel,
    onAction: options.onAction,
    duration: options.duration ?? 4000,
    position: options.position ?? 'bottom-center',
  };
  notify();
  return id;
};

export const dismissWCPRichSnackbar = () => {
  if (state) {
    state = { ...state, open: false };
    notify();
    setTimeout(() => {
      state = null;
      notify();
    }, 200);
  }
};

export const useWCPRichSnackbar = () => {
  const [current, setCurrent] = useState<WCPRichSnackbarState | null>(state);

  useEffect(() => {
    const unsub = subscribeWCPRichSnackbar(setCurrent);
    return unsub;
  }, []);

  const show = useCallback((options: WCPRichSnackbarOptions) => {
    return wcpRichSnackbar(options);
  }, []);

  const dismiss = useCallback(() => {
    dismissWCPRichSnackbar();
  }, []);

  return { snackbar: current, show, dismiss };
};
