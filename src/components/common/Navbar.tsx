import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search, Menu, X, Zap } from 'lucide-react';

import { useUserProgress } from '../../hooks/useUserProgress';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { profile } = useUserProgress();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/roadmap' },
    { name: 'Labs', path: '/labs' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'Projects', path: '/projects' },
    { name: 'Playground', path: '/playground' },
    { name: 'Resources', path: '/tools' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                Cyber<span className="text-cyan-400">Verse</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1 tracking-wider uppercase">
                Learn • Defend
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Input Trigger */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search topics and labs"
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
              
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#121824] border border-slate-700 rounded-xl p-2 shadow-2xl z-50">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 rounded-lg border border-slate-800">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search SQLi, Linux, Logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* User XP & Level Quick Stats */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-2.5 py-1 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-mono text-slate-300 transition-colors"
            >
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                {profile.streakDays}d
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-semibold">Lvl {profile.level}</span>
            </Link>

            {/* Account / Dashboard Button */}
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
            >
              Student Hub
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F17] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 mb-3 bg-slate-900 rounded-lg border border-slate-800">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search labs, paths..."
              className="w-full bg-transparent text-sm text-white focus:outline-none"
            />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-bold">⚡ {profile.streakDays} Day Streak</span>
              <span>•</span>
              <span className="text-cyan-400 font-bold">Level {profile.level}</span>
            </div>

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-cyan-500 text-slate-950"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
