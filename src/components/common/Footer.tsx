import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Lock, Code2 } from 'lucide-react';


export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090D14] border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Brand & Purpose Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Cyber<span className="text-cyan-400">Verse</span>
              </span>
            </div>

            <p className="text-sm font-mono text-cyan-400/90 font-semibold">
              Learn. Practice. Build. Defend.
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A free, student-focused cybersecurity practical training platform. Designed to help beginners master security engineering through interactive simulated labs, code defense, and hands-on projects.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Lock className="w-3.5 h-3.5" /> 100% Free & Student Focused • No Paid Wall
            </div>
          </div>

          {/* Core Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Learning Paths
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/roadmap" className="hover:text-cyan-400 transition-colors">Foundations</Link></li>
              <li><Link to="/roadmap" className="hover:text-cyan-400 transition-colors">Web Security</Link></li>
              <li><Link to="/roadmap" className="hover:text-cyan-400 transition-colors">Blue Team Defense</Link></li>
              <li><Link to="/roadmap" className="hover:text-cyan-400 transition-colors">Ethical Hacking</Link></li>
              <li><Link to="/roadmap" className="hover:text-cyan-400 transition-colors">Digital Forensics</Link></li>
            </ul>
          </div>

          {/* Interactive Tools & Labs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Practical Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/labs" className="hover:text-cyan-400 transition-colors">Linux Terminal CLI</Link></li>
              <li><Link to="/labs" className="hover:text-cyan-400 transition-colors">SQL Injection Sandbox</Link></li>
              <li><Link to="/labs" className="hover:text-cyan-400 transition-colors">XSS Playground</Link></li>
              <li><Link to="/challenges" className="hover:text-cyan-400 transition-colors">Jeopardy CTF Matrix</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Defensive Mini-Projects</Link></li>
              <li><Link to="/tools" className="hover:text-cyan-400 transition-colors">Cyber Calculators</Link></li>
            </ul>
          </div>

          {/* Community & Open Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Community & Code
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Code2 className="w-4 h-4 text-slate-400" /> GitHub Repository

                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@cyberverse.edu"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400" /> Student Contact
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CyberVerse. Built strictly for defensive educational purposes.</p>
          <p className="flex items-center gap-1 font-mono">
            Crafted for cybersecurity students worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
