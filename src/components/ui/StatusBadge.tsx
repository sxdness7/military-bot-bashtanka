
import React from 'react';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: 'alert' | 'warning' | 'safe' | 'neutral';
  pulsing?: boolean;
  children: React.ReactNode;
  className?: string;
};

const statusConfig = {
  alert: 'bg-military-alert/90 text-white',
  warning: 'bg-military-warning/90 text-black',
  safe: 'bg-military-safe/90 text-white',
  neutral: 'bg-military-neutral/90 text-black',
};

const pulseConfig = {
  alert: 'animate-pulse-alert alert-glow',
  warning: 'animate-pulse-warning warning-glow',
  safe: '',
  neutral: '',
};

export const StatusBadge = ({ status, pulsing = false, children, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'military-badge font-medium px-3 py-1 inline-flex items-center gap-2',
        statusConfig[status],
        pulsing ? pulseConfig[status] : '',
        className
      )}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
