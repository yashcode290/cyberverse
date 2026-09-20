import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/' || pathnames.length === 0) return null;

  const formatBreadcrumb = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs font-mono text-slate-400 py-1">
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              {isLast ? (
                <span className="text-cyan-300 font-semibold">{formatBreadcrumb(name)}</span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {formatBreadcrumb(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
