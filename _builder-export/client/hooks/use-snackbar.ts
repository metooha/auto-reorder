import React from 'react';

export interface SnackbarState {
  id: string;
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  open: boolean;
}

interface SnackbarOptions {
  message: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

type Subscriber = (state: SnackbarState | null) => void;

let currentSnackbar: SnackbarState | null = null;
const subscribers: Set<Subscriber> = new Set();

function notify() {
  subscribers.forEach((sub) => sub(currentSnackbar));
}

export function subscribe(callback: Subscriber): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export function dismissSnackbar() {
  if (currentSnackbar) {
    currentSnackbar = { ...currentSnackbar, open: false };
    notify();
    // Clear after animation
    setTimeout(() => {
      currentSnackbar = null;
      notify();
    }, 300);
  }
}

export function snackbar(options: SnackbarOptions) {
  const id = Date.now().toString();
  currentSnackbar = {
    id,
    open: true,
    ...options,
  };
  notify();
}
