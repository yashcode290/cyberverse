import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'green' | 'amber' | 'red' | 'purple' | 'slate';
  size?: 'sm' | 'md';
  mono?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  mono = false
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded border ${variantStyles[variant]} ${sizeStyles[size]} ${
        mono ? 'font-mono' : ''
      }`}
    >
      {children}
    </span>
  );
};
