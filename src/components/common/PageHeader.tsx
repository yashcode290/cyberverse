import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Badge } from './Badge';

interface PageHeaderProps {
  title: string;
  description?: string;
  categoryTag?: string;
  actions?: React.ReactNode;
  showBreadcrumbs?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  categoryTag,
  actions,
  showBreadcrumbs = true
}) => {
  return (
    <div className="space-y-3 pb-6 border-b border-slate-800/80">
      {showBreadcrumbs && <Breadcrumbs />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          {categoryTag && (
            <div className="mb-1">
              <Badge variant="cyan" mono size="sm">{categoryTag}</Badge>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
