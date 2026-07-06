import styles from './NativeStatusBar.module.css';

interface NativeStatusBarProps {
  platform: 'ios' | 'android';
  color?: string;
}

export function NativeStatusBar({ platform, color }: NativeStatusBarProps) {
  if (platform === 'ios') {
    return <IOSStatusBar color={color} />;
  }
  return <AndroidStatusBar color={color} />;
}

function IOSStatusBar({ color }: { color?: string }) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const timeStr = `${displayHours}:${minutes}`;

  return (
    <div className={styles.iosStatusBar} style={color ? { color } : undefined}>
      <div className={styles.iosLeft}>
        <span className={styles.iosTime}>{timeStr}</span>
      </div>
      <div className={styles.iosCenter}>
        <div className={styles.iosDynamicIsland} />
      </div>
      <div className={styles.iosRight}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 3.6C9.98 3.6 11.78 4.36 13.12 5.62L14.4 4.2C12.72 2.62 10.48 1.6 8 1.6C5.52 1.6 3.28 2.62 1.6 4.2L2.88 5.62C4.22 4.36 6.02 3.6 8 3.6Z" fill="currentColor" />
          <path d="M4.64 7.38L5.92 8.8C6.48 8.28 7.2 7.96 8 7.96C8.8 7.96 9.52 8.28 10.08 8.8L11.36 7.38C10.48 6.54 9.3 6 8 6C6.7 6 5.52 6.54 4.64 7.38Z" fill="currentColor" />
          <circle cx="8" cy="11" r="1.2" fill="currentColor" />
        </svg>
        {/* Battery */}
        <div className={styles.iosBattery}>
          <div className={styles.iosBatteryBody}>
            <div className={styles.iosBatteryFill} />
          </div>
          <div className={styles.iosBatteryCap} />
        </div>
      </div>
    </div>
  );
}

function AndroidStatusBar({ color }: { color?: string }) {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  return (
    <div className={styles.androidStatusBar} style={color ? { color } : undefined}>
      <div className={styles.androidLeft}>
        <span className={styles.androidTime}>{timeStr}</span>
      </div>
      <div className={styles.androidRight}>
        {/* Signal bars */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 14L14 0V14H0Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M0 14L10 4V14H0Z" fill="currentColor" />
        </svg>
        {/* WiFi */}
        <svg width="14" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 3.6C9.98 3.6 11.78 4.36 13.12 5.62L14.4 4.2C12.72 2.62 10.48 1.6 8 1.6C5.52 1.6 3.28 2.62 1.6 4.2L2.88 5.62C4.22 4.36 6.02 3.6 8 3.6Z" fill="currentColor" />
          <path d="M4.64 7.38L5.92 8.8C6.48 8.28 7.2 7.96 8 7.96C8.8 7.96 9.52 8.28 10.08 8.8L11.36 7.38C10.48 6.54 9.3 6 8 6C6.7 6 5.52 6.54 4.64 7.38Z" fill="currentColor" />
          <circle cx="8" cy="11" r="1.2" fill="currentColor" />
        </svg>
        {/* Battery */}
        <div className={styles.androidBattery}>
          <div className={styles.androidBatteryBody}>
            <div className={styles.androidBatteryFill} />
          </div>
          <div className={styles.androidBatteryCap} />
        </div>
      </div>
    </div>
  );
}
