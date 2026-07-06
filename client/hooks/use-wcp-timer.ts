import { useState, useEffect, useCallback, useRef } from 'react';

export type WCPTimerUrgency = 'normal' | 'warning' | 'critical';

export interface WCPTimerState {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
  urgency: WCPTimerUrgency;
  /** "HH:MM:SS" or "MM:SS" when hours === 0 */
  formatted: string;
}

function computeState(endTime: Date | number | string): WCPTimerState {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const diff = Math.max(0, Math.floor((end - now) / 1000));

  if (diff <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
      urgency: 'critical',
      formatted: '00:00',
    };
  }

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  let urgency: WCPTimerUrgency = 'normal';
  if (diff < 60) urgency = 'critical';
  else if (diff < 600) urgency = 'warning';

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatted =
    hours > 0
      ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
      : `${pad(minutes)}:${pad(seconds)}`;

  return { hours, minutes, seconds, totalSeconds: diff, isExpired: false, urgency, formatted };
}

export function useWCPTimer(
  endTime: Date | number | string,
  onExpire?: () => void,
): WCPTimerState {
  const [state, setState] = useState<WCPTimerState>(() => computeState(endTime));
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;
  const expiredFiredRef = useRef(false);

  const tick = useCallback(() => {
    const next = computeState(endTime);
    setState(next);
    if (next.isExpired && !expiredFiredRef.current) {
      expiredFiredRef.current = true;
      onExpireRef.current?.();
    }
  }, [endTime]);

  useEffect(() => {
    expiredFiredRef.current = false;
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return state;
}
