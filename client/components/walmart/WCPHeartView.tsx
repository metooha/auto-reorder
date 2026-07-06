import React from 'react';
import { Heart } from '@/components/icons/Heart';
import { HeartFill } from '@/components/icons/HeartFill';
import { WCPIconToggle } from './WCPIconToggle';
import { snackbar } from '@/hooks/use-snackbar';
import styles from './WCPHeartView.module.css';

export interface WCPHeartViewProps {
  /** Whether the button is in activated (favorited) state — controlled */
  activated?: boolean;
  /** Initial activated state — uncontrolled */
  defaultActivated?: boolean;
  /** Called when toggle state changes */
  onChange?: (activated: boolean) => void;
  /**
   * Size variant.
   * When omitted the component is responsive:
   *   – medium (40px) at 900px+ breakpoints (desktop)
   *   – small (32px) below 900px (mobile)
   */
  size?: 'small' | 'medium';
  /** Favorites list name shown in callout and snackbar messages */
  listName?: string;
  /** Called when user clicks the "View" action in the desktop callout */
  onViewList?: () => void;
  /** Auto-dismiss duration for mobile snackbar (ms). Default 3500. */
  snackbarDuration?: number;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Accessible label; defaults to dynamic "Add to favorites" / "Remove from favorites" */
  'aria-label'?: string;
  /** Extra class for positioning overrides */
  UNSAFE_className?: string;
  /**
   * Where the callout appears relative to the heart button.
   * @default 'left'
   */
  calloutPosition?: 'left' | 'right' | 'bottom' | 'top';
}

type CalloutType = 'add' | 'saved' | 'removed' | null;

export function WCPHeartView({
  activated: controlledActivated,
  defaultActivated = false,
  onChange,
  size,
  listName = "My List",
  onViewList,
  snackbarDuration = 3500,
  disabled = false,
  'aria-label': ariaLabel,
  UNSAFE_className,
  calloutPosition = 'left',
}: WCPHeartViewProps) {
  const isControlled = controlledActivated !== undefined;
  const [internalActivated, setInternalActivated] = React.useState(defaultActivated);
  const activated = isControlled ? controlledActivated : internalActivated;

  // Desktop callout state
  const [callout, setCallout] = React.useState<CalloutType>(null);
  const calloutTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs to avoid stale closures in timeouts
  const isHoveredRef = React.useRef(false);
  const justToggledRef = React.useRef(false);

  const toggle = () => {
    if (disabled) return;

    const nextActivated = !activated;

    if (!isControlled) {
      setInternalActivated(nextActivated);
    }
    onChange?.(nextActivated);

    justToggledRef.current = true;

    // Desktop: show transient post-toggle callout
    if (calloutTimerRef.current) clearTimeout(calloutTimerRef.current);
    setCallout(nextActivated ? 'saved' : 'removed');
    calloutTimerRef.current = setTimeout(() => {
      justToggledRef.current = false;
      setCallout(isHoveredRef.current ? (nextActivated ? 'saved' : 'add') : null);
    }, 2000);

    // Mobile: trigger snackbar
    const msg = nextActivated
      ? `Saved to favorites: ${listName}`
      : `Removed from favorites: ${listName}`;

    snackbar({
      message: msg,
      actionLabel: nextActivated ? 'View' : undefined,
      onAction: nextActivated ? onViewList : undefined,
      duration: snackbarDuration,
      position: 'bottom-center',
    });
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (!justToggledRef.current) {
      setCallout(activated ? 'saved' : 'add');
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    hoverTimerRef.current = setTimeout(() => {
      if (!justToggledRef.current) setCallout(null);
    }, 100);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (calloutTimerRef.current) clearTimeout(calloutTimerRef.current);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const defaultAriaLabel = activated ? `Remove from favorites` : `Add to favorites`;

  const toggleButtonClass = [
    styles.heartButton,
    size === 'small' ? styles.sizeSmall : size === 'medium' ? styles.sizeMedium : styles.sizeResponsive,
    UNSAFE_className,
  ].filter(Boolean).join(' ');

  const calloutText = (() => {
    if (callout === 'add') return 'Add to favorites';
    if (callout === 'saved') return `Saved to favorites: ${listName}`;
    if (callout === 'removed') return `Removed from favorites: ${listName}`;
    return null;
  })();

  return (
    <div className={styles.wrapper}>
      {/* Desktop callout tooltip */}
      {callout && calloutText && (
        <div
          className={[
            styles.callout,
            styles[`callout--${calloutPosition}`],
          ].filter(Boolean).join(' ')}
          role="tooltip"
        >
          <span className={styles.calloutText}>{calloutText}</span>
          {callout === 'saved' && onViewList && (
            <button
              type="button"
              className={styles.calloutAction}
              onClick={(e) => { e.stopPropagation(); onViewList(); }}
            >
              View
            </button>
          )}
          <span className={styles.calloutArrow} aria-hidden="true" />
        </div>
      )}

      {/* Heart toggle button — composed from WCPIconToggle */}
      <WCPIconToggle
        uncheckedIcon={<Heart className={styles.iconOutline} />}
        checkedIcon={<HeartFill className={styles.iconFill} />}
        checked={activated}
        onChange={toggle}
        aria-label={ariaLabel ?? defaultAriaLabel}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        shape="circle"
        UNSAFE_className={toggleButtonClass}
      />
    </div>
  );
}
