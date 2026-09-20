import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Results Found',
  description = 'We couldn\'t find any security modules or labs matching your current criteria.',
  onReset,
  icon = <Search className="w-8 h-8 text-slate-500" />
}) => {
  return (
    <div className="bg-[#121824] border border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
      {onReset && (
        <Button variant="outline" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />} onClick={onReset}>
          Reset Search Filters
        </Button>
      )}
    </div>
  );
};
