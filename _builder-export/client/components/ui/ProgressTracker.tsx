import React from 'react';
import styles from './ProgressTracker.module.css';

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  status?: 'complete' | 'current' | 'upcoming';
}

export interface ProgressTrackerProps {
  steps: (ProgressStep | string)[];
  currentStep?: number;
  activeStep?: number;
  status?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  UNSAFE_className?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  steps,
  currentStep,
  activeStep,
  orientation = 'horizontal',
  className,
  UNSAFE_className,
}) => {
  const resolvedStep = currentStep ?? activeStep ?? 0;
  const classNames = [styles.tracker, UNSAFE_className, className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={{ display: 'flex', flexDirection: orientation === 'vertical' ? 'column' : 'row', gap: 8, alignItems: orientation === 'vertical' ? 'flex-start' : 'center' }}>
      {steps.map((rawStep, index) => {
        const step: ProgressStep = typeof rawStep === 'string' ? { id: rawStep, label: rawStep } : rawStep;
        const status = step.status ?? (index < resolvedStep ? 'complete' : index === resolvedStep ? 'current' : 'upcoming');
        return (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <div style={{ flex: 1, height: orientation === 'vertical' ? 24 : 2, width: orientation === 'vertical' ? 2 : undefined, background: status === 'complete' || index <= resolvedStep ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-fill-subtle, #e6e6e8)' }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                background: status === 'complete' ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : status === 'current' ? '#fff' : 'var(--ld-semantic-color-fill-subtle, #e6e6e8)',
                color: status === 'complete' ? '#fff' : status === 'current' ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : '#74767c',
                border: status === 'current' ? '2px solid var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'none',
              }}>
                {status === 'complete' ? '✓' : index + 1}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: status === 'current' ? 700 : 400 }}>{step.label}</div>
                {step.description && <div style={{ fontSize: 12, color: '#74767c' }}>{step.description}</div>}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
