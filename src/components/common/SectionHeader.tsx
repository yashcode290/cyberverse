import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'cyan' | 'green' | 'amber' | 'red' | 'purple';
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeVariant = 'cyan',
  action
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-slate-800/60">
      <div className="space-y-1">
        {badge && <Badge variant={badgeVariant} mono size="sm">{badge}</Badge>}
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
