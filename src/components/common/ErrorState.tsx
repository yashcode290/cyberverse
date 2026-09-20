import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Connection Error Detected',
  message = 'Failed to load module telemetry. Please check your target connection or try refreshing.',
  onRetry
}) => {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto my-8">
      <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-red-300">{title}</h3>
        <p className="text-xs text-red-200/80 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button variant="danger" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />} onClick={onRetry}>
          Retry Connection
        </Button>
      )}
    </div>
  );
};
