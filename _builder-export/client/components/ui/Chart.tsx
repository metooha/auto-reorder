import React from 'react';

export type ChartConfig = Record<string, { label: string; color?: string; icon?: React.ComponentType }>;

export const ChartContainer: React.FC<{ children: React.ReactNode; config: ChartConfig; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ width: '100%', height: '100%' }}>{children}</div>
);

export const ChartTooltip: React.FC<{ content?: React.ReactNode; cursor?: boolean }> = () => null;
export const ChartTooltipContent: React.FC<{ hideLabel?: boolean; className?: string; nameKey?: string }> = () => null;
export const ChartLegend: React.FC<{ content?: React.ReactNode }> = () => null;
export const ChartLegendContent: React.FC<{ className?: string; nameKey?: string }> = () => null;

export default ChartContainer;
