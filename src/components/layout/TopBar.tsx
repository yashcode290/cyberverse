import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Zap, Menu, User, Settings, LogOut, Shield } from 'lucide-react';
import { useUserProgress } from '../../hooks/useUserProgress';

interface TopBarProps {
  onOpenMobileNav: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobileNav }) => {
  const { profile } = useUserProgress();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockNotifications = [
    { id: '1', title: 'New Lab Available', time: '10m ago', text: 'Safe XSS Playground v2 is live.' },
    { id: '2', title: 'Streak Bonus', time: '1h ago', text: 'You maintained a 4-day learning streak!' },
    { id: '3', title: 'Challenge Solved', time: '1d ago', text: 'Verified flag for "The Unquoted Shell".' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/80 h-16 flex items-center px-4 sm:px-6">
      <div className="flex items-center justify-between w-full">
        
        {/* Left: Mobile Navigation Drawer Trigger & Search Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono text-slate-400 transition-colors w-44 sm:w-64"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Search labs, paths, flags...</span>
              <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Quick Search Popover Modal */}
            {searchOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-[#121824] border border-slate-700 rounded-xl p-3 shadow-2xl z-50">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-950 rounded-lg border border-slate-800">
                  <Search className="w-4 h-4 text-cyan-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search SQLi, Linux, Logs, CTF..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                    autoFocus
                  />
                </div>

                <div className="mt-3 space-y-1 text-xs font-mono">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block px-2">Popular Targets</span>
                  <Link
                    to="/labs"
                    onClick={() => setSearchOpen(false)}
                    className="block px-2 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                  >
                    Linux Navigation Sandbox
                  </Link>
                  <Link
                    to="/labs"
                    onClick={() => setSearchOpen(false)}
                    className="block px-2 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                  >
                    SQL Injection Auth Bypass
                  </Link>
                  <Link
                    to="/challenges"
                    onClick={() => setSearchOpen(false)}
                    className="block px-2 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                  >
                    The Unquoted Shell CTF
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: XP / Notifications / User Avatar */}
        <div className="flex items-center gap-3">
          
          {/* XP & Level Indicator */}
          <Link
            to="/profile"
            className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono transition-colors"
          >
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Zap className="w-3.5 h-3.5 fill-amber-400" /> {profile.streakDays}d
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-bold">Lvl {profile.level} ({profile.xp} XP)</span>
          </Link>

          {/* Notifications Popover Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors relative"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#121824] border border-slate-700 rounded-xl p-3 shadow-2xl z-50 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 px-1">
                  <span className="text-xs font-mono font-bold text-white">Notifications</span>
                  <span className="text-[10px] text-cyan-400 font-mono">3 New</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockNotifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-200">
                        <span>{n.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="w-7 h-7 rounded-lg object-cover"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#121824] border border-slate-700 rounded-xl p-2 shadow-2xl z-50 space-y-1 text-xs">
                <div className="p-2 border-b border-slate-800 space-y-0.5">
                  <span className="font-bold text-white block">{profile.displayName}</span>
                  <span className="text-[10px] font-mono text-slate-400">@{profile.username}</span>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60"
                >
                  <User className="w-3.5 h-3.5" /> View Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60"
                >
                  <Settings className="w-3.5 h-3.5" /> Settings
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-purple-300 hover:bg-slate-800/60"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" /> Admin Command Center
                </Link>

                <div className="pt-1 border-t border-slate-800">
                  <Link
                    to="/login"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
