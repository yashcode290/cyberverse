import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, Shield, LayoutDashboard, Map, Compass, BookOpen, Terminal, 
  Target, ShieldAlert, Cpu, Layers, Wrench, Users, Trophy, User, Settings
} from 'lucide-react';
import { useUserProgress } from '../../hooks/useUserProgress';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { profile } = useUserProgress();

  if (!isOpen) return null;

  const sections = [
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
        { label: 'Missions', path: '/missions', icon: ShieldAlert },
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
        { label: 'Community', path: '/community', icon: Users },
        { label: 'Leaderboard', path: '/leaderboard', icon: Trophy }
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose} 
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#090D14] border-r border-slate-800 flex flex-col justify-between shadow-2xl z-50">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">Cyber<span className="text-cyan-400">Verse</span></span>
          </Link>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          
          {/* User Quick Bar */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold">⚡ {profile.streakDays} Day Streak</span>
            <span className="text-cyan-400 font-bold">Lvl {profile.level}</span>
          </div>

          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block px-2">
                {sec.title}
              </span>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        active
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950">
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Student Profile</span>
          </Link>
          <Link
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
