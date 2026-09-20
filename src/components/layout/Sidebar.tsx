import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Compass, BookOpen, Terminal, Target, ShieldAlert, Cpu, 
  Layers, Wrench, Users, Trophy, User, Settings, Shield, ChevronRight
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const sections: NavSection[] = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'LEARN',
      items: [
        { label: 'Roadmap', path: '/roadmap', icon: Map },
        { label: 'Learning Paths', path: '/paths', icon: Compass },
        { label: 'Modules', path: '/modules', icon: BookOpen }
      ]
    },
    {
      title: 'PRACTICE',
      items: [
        { label: 'Interactive Labs', path: '/labs', icon: Terminal },
        { label: 'Challenges (CTF)', path: '/challenges', icon: Target },
        { label: 'Missions', path: '/missions', icon: ShieldAlert, badge: 'New' },
        { label: 'Playground', path: '/playground', icon: Cpu }
      ]
    },
    {
      title: 'BUILD',
      items: [
        { label: 'Defensive Projects', path: '/projects', icon: Layers }
      ]
    },
    {
      title: 'RESOURCES',
      items: [
        { label: 'Resources', path: '/resources', icon: BookOpen },
        { label: 'Tools & Utilities', path: '/tools', icon: Wrench }
      ]
    },
    {
      title: 'COMMUNITY',
      items: [
        { label: 'Community Forum', path: '/community', icon: Users },
        { label: 'Leaderboard', path: '/leaderboard', icon: Trophy }
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-64 bg-[#090D14] border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 shrink-0 hidden lg:flex select-none">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              Cyber<span className="text-cyan-400">Verse</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 -mt-1 tracking-wider uppercase">
              Student Platform
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Menu Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              {sec.title}
            </span>

            <div className="space-y-0.5 pt-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    ) : (
                      active && <ChevronRight className="w-3 h-3 text-cyan-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom User Action Section */}
      <div className="p-3 border-t border-slate-800/80 space-y-1 bg-slate-950/60">
        <Link
          to="/profile"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            isActive('/profile') ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <User className="w-4 h-4 text-slate-400" />
          <span>Profile</span>
        </Link>

        <Link
          to="/settings"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            isActive('/settings') ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </Link>

        <Link
          to="/admin"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            isActive('/admin') ? 'bg-purple-500/10 text-purple-400 font-semibold' : 'text-slate-300 hover:text-purple-300 hover:bg-slate-800/50'
          }`}
        >
          <Shield className="w-4 h-4 text-purple-400" />
          <span>Admin Center</span>
        </Link>
      </div>

    </aside>
  );
};
