import React from 'react';
import styles from './ProgressIndicator.module.css';

export interface ProgressIndicatorProps {
  value?: number;
  max?: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'linear' | 'circular' | 'primary' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  valueLabel?: string;
  className?: string;
  UNSAFE_className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value = 0,
  max = 100,
  label,
  size = 'medium',
  variant = 'linear',
  showValue = false,
  className,
  UNSAFE_className,
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const classNames = [styles.progress, UNSAFE_className, className].filter(Boolean).join(' ');

  if (variant === 'circular') {
    const circleSize = size === 'small' ? 32 : size === 'large' ? 64 : 48;
    const strokeWidth = size === 'small' ? 3 : 4;
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className={classNames} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        <svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
          <circle cx={circleSize / 2} cy={circleSize / 2} r={radius} fill="none" stroke="var(--ld-semantic-color-fill-subtle, #e6e6e8)" strokeWidth={strokeWidth} />
          <circle cx={circleSize / 2} cy={circleSize / 2} r={radius} fill="none" stroke="var(--ld-semantic-color-action-fill-primary, #0071DC)" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`} />
        </svg>
        {showValue && <span style={{ fontSize: 12 }}>{Math.round(percent)}%</span>}
      </div>
    );
  }

  const height = size === 'small' ? 4 : size === 'large' ? 12 : 8;

  return (
    <div className={classNames} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      {label && <span style={{ fontSize: 14, marginBottom: 4, display: 'block' }}>{label}</span>}
      <div style={{ width: '100%', height, background: 'var(--ld-semantic-color-fill-subtle, #e6e6e8)', borderRadius: height / 2, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', borderRadius: height / 2, transition: 'width 0.3s ease' }} />
      </div>
      {showValue && <span style={{ fontSize: 12, marginTop: 4 }}>{Math.round(percent)}%</span>}
    </div>
  );
};

export default ProgressIndicator;
