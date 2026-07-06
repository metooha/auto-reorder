import React from 'react';

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = [50],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}) => {
  const currentValue = value?.[0] ?? defaultValue[0];
  const percent = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: 20, display: 'flex', alignItems: 'center' }}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        disabled={disabled}
        onChange={(e) => onValueChange?.([Number(e.target.value)])}
        style={{ width: '100%', cursor: disabled ? 'not-allowed' : 'pointer', accentColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)' }}
      />
    </div>
  );
};

export default Slider;
