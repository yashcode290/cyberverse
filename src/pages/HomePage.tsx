import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Terminal, Database, FileText, Globe, Zap, 
  ArrowRight, CheckCircle2, Cpu, Server, Target, Users, BookOpen
} from 'lucide-react';

import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SimulatedTerminal } from '../features/terminal/SimulatedTerminal';
import { SqliLab } from '../features/web-security/SqliLab';

export const HomePage: React.FC = () => {
  const [activePreviewTab, setActivePreviewTab] = useState<'terminal' | 'sqli'>('terminal');

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80">
        {/* Subtle Cyber Grid Background Pattern */}
        <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Announcement Tag */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-cyan-300 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              100% Free • Student-Focused Practical Platform • No Paid Tier
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
            >
              Cybersecurity is learned <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                by doing.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Learn cybersecurity concepts, practice in safe interactive labs, solve challenges, and build real defensive projects.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link to="/roadmap" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" icon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>

              <Link to="/labs" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" icon={<Terminal className="w-5 h-5" />} className="w-full sm:w-auto">
                  Explore Labs
                </Button>
              </Link>
            </motion.div>

            {/* Trust Metrics Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80 font-mono text-xs text-slate-400">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-cyan-400 font-bold text-base block">80%</span> Practical Focus
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-emerald-400 font-bold text-base block">100%</span> Educational Target
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-amber-400 font-bold text-base block">8+</span> Learning Paths
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-purple-400 font-bold text-base block">0</span> Paid Wall
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. VALUE PROPOSITION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <Badge variant="cyan" mono>Core Pillars</Badge>
          <h2 className="text-3xl font-extrabold text-white">Built Around Practical Mastery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: LEARN */}
          <div className="bg-[#121824] p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">LEARN</h3>
            <p className="text-sm font-semibold text-cyan-400">Understand the concepts.</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Short, focused theory paired with visual diagrams explaining networking, web vulnerabilities, Linux CLI, and defense fundamentals without fluff.
            </p>
          </div>

          {/* Card 2: PRACTICE */}
          <div className="bg-[#121824] p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">PRACTICE</h3>
            <p className="text-sm font-semibold text-emerald-400">Use interactive labs.</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Execute CLI commands, test dynamic SQL injection queries, isolate XSS script tags, and triage SIEM access logs directly inside isolated browser sandboxes.
            </p>
          </div>

          {/* Card 3: BUILD */}
          <div className="bg-[#121824] p-8 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">BUILD</h3>
            <p className="text-sm font-semibold text-amber-400">Create security projects.</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Apply knowledge by constructing production-ready defensive tools like File Integrity Monitors, Log Analyzers, and Parameterized Auth Services.
            </p>
          </div>

        </div>
      </section>


      {/* 3. PRACTICAL-FIRST SECTION */}
      <section className="bg-slate-950/80 py-16 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="green" mono>Philosophy</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Less Reading. More Doing.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              CyberVerse replaces passive PDF reading with an active 7-stage experiential learning cycle.
            </p>
          </div>

          {/* Ratio Progress Bar */}
          <div className="max-w-xl mx-auto bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span className="text-slate-400">20% Theory</span>
              <span className="text-cyan-400">80% Practical Hands-On</span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div className="w-[20%] bg-slate-600" />
              <div className="w-[80%] bg-gradient-to-r from-cyan-400 to-emerald-400" />
            </div>
          </div>

          {/* Visual Learning Flow Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Traditional Learning Card */}
            <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-4 opacity-75">
              <span className="text-xs font-mono text-red-400 uppercase font-bold tracking-wider">
                Traditional Platform Method
              </span>
              <div className="flex items-center gap-3 font-mono text-sm text-slate-400 p-4 bg-slate-900 rounded-xl">
                <span>Read 50-page PDF</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <span>Multiple Choice Quiz</span>
              </div>
              <p className="text-xs text-slate-500">
                Leaves students with passive memory and zero actual command line or code auditing confidence.
              </p>
            </div>

            {/* CyberVerse Method Card */}
            <div className="bg-[#121824] p-6 rounded-2xl border border-cyan-500/40 shadow-xl space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> CyberVerse Interactive Engine
              </span>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 font-mono text-[11px] font-bold text-center">
                <div className="p-2 rounded bg-slate-900 text-slate-300 border border-slate-800">Learn</div>
                <div className="p-2 rounded bg-slate-900 text-cyan-400 border border-cyan-500/30">Visualize</div>
                <div className="p-2 rounded bg-slate-900 text-emerald-400 border border-emerald-500/30">Practice</div>
                <div className="p-2 rounded bg-slate-900 text-amber-400 border border-amber-500/30">Challenge</div>
                <div className="p-2 rounded bg-slate-900 text-purple-400 border border-purple-500/30">Build</div>
                <div className="p-2 rounded bg-cyan-500 text-slate-950 font-extrabold">Defend</div>
              </div>

              <p className="text-xs text-slate-300">
                Students execute inputs, break dynamic queries, fix unescaped parameters, and verify defense code.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* 4. LEARNING PATHS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="cyan" mono>Curriculum</Badge>
            <h2 className="text-3xl font-extrabold text-white">Structured Learning Paths</h2>
            <p className="text-slate-400 text-sm">Step-by-step career tracks tailored for beginners to intermediate defenders.</p>
          </div>

          <Link to="/roadmap">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              View All Paths
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Path 1: Foundations */}
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <Badge variant="green" mono size="sm">Beginner</Badge>
              </div>

              <h3 className="text-lg font-bold text-white">Computer & Linux Foundations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Linux shell navigation, file system permissions, TCP/IP networking, and CLI scripting.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">6 Modules • 14 Hours</span>
              <Link to="/roadmap" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Path 2: Web Security */}
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Globe className="w-5 h-5" />
                </div>
                <Badge variant="amber" mono size="sm">Beginner - Inter</Badge>
              </div>

              <h3 className="text-lg font-bold text-white">Web Application Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                OWASP Top 10: SQL Injection, XSS, CSRF, IDOR, SSRF, and safe prepared query implementation.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">8 Modules • 18 Hours</span>
              <Link to="/roadmap" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Path 3: Blue Team */}
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
                <Badge variant="purple" mono size="sm">Intermediate</Badge>
              </div>

              <h3 className="text-lg font-bold text-white">Blue Team & Cyber Defense</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log analysis, SIEM monitoring, firewall rules, brute-force IP triage, and incident response.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">6 Modules • 16 Hours</span>
              <Link to="/roadmap" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Path 4: Ethical Hacking */}
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Target className="w-5 h-5" />
                </div>
                <Badge variant="purple" mono size="sm">Intermediate</Badge>
              </div>

              <h3 className="text-lg font-bold text-white">Ethical Hacking & Recon</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Passive recon, active service scanning, Nmap concepts, and security auditing methodologies.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">7 Modules • 20 Hours</span>
              <Link to="/roadmap" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Path 5: Digital Forensics */}
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <FileText className="w-5 h-5" />
                </div>
                <Badge variant="purple" mono size="sm">Intermediate</Badge>
              </div>

              <h3 className="text-lg font-bold text-white">Digital Forensics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                File metadata analysis, cryptographic hashing (SHA256), artifact extraction, and timeline reconstruction.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">5 Modules • 15 Hours</span>
              <Link to="/roadmap" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Path 6: Cloud Security */}
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Server className="w-5 h-5" />
                </div>
                <Badge variant="red" mono size="sm">Advanced</Badge>
              </div>

              <h3 className="text-lg font-bold text-white">Cloud Security & IAM</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cloud identity access policies, S3 storage permissions, and audit log analysis.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">5 Modules • 16 Hours</span>
              <Link to="/roadmap" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 5. PRACTICAL LAB PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="green" mono>Live Sandbox Preview</Badge>
            <h2 className="text-3xl font-extrabold text-white">Try an Interactive Lab Now</h2>
            <p className="text-slate-400 text-sm">
              All labs run against intentionally created educational target environments. 100% Client-Side Safe.
            </p>
          </div>

          {/* Preview Tab Switcher */}
          <div className="flex items-center gap-2 bg-[#121824] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActivePreviewTab('terminal')}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-2 ${
                activePreviewTab === 'terminal' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" /> Linux Terminal
            </button>
            <button
              onClick={() => setActivePreviewTab('sqli')}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-2 ${
                activePreviewTab === 'sqli' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" /> SQL Injection Lab
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Lab Runner Component */}
        {activePreviewTab === 'terminal' ? <SimulatedTerminal /> : <SqliLab />}
      </section>


      {/* 6. HOW IT WORKS */}
      <section className="bg-slate-950/90 py-16 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="cyan" mono>Student Workflow</Badge>
            <h2 className="text-3xl font-extrabold text-white">How CyberVerse Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-2xl font-mono font-extrabold text-cyan-400">01</span>
              <h4 className="text-base font-bold text-white">Learn</h4>
              <p className="text-xs text-slate-400">Understand concise core security theory & concepts.</p>
            </div>

            <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-2xl font-mono font-extrabold text-emerald-400">02</span>
              <h4 className="text-base font-bold text-white">Practice</h4>
              <p className="text-xs text-slate-400">Interact with simulated target environments & CLI commands.</p>
            </div>

            <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-2xl font-mono font-extrabold text-amber-400">03</span>
              <h4 className="text-base font-bold text-white">Solve</h4>
              <p className="text-xs text-slate-400">Complete Jeopardy CTF challenges & earn XP rewards.</p>
            </div>

            <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <span className="text-2xl font-mono font-extrabold text-purple-400">04</span>
              <h4 className="text-base font-bold text-white">Build</h4>
              <p className="text-xs text-slate-400">Construct security tools & defense mechanisms.</p>
            </div>

            <div className="bg-[#121824] p-6 rounded-2xl border border-cyan-500/40 space-y-3 relative">
              <span className="text-2xl font-mono font-extrabold text-cyan-300">05</span>
              <h4 className="text-base font-bold text-white">Defend</h4>
              <p className="text-xs text-slate-400">Remediate vulnerable code and implement fixes.</p>
            </div>

          </div>

        </div>
      </section>


      {/* 7. PROJECT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="amber" mono>Hands-On Portfolio</Badge>
            <h2 className="text-3xl font-extrabold text-white">
              Don't just finish lessons. Build things.
            </h2>
            <p className="text-slate-400 text-sm">Create actual defensive tools to showcase your practical skills.</p>
          </div>

          <Link to="/projects">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Mini-Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
            <Badge variant="cyan" mono size="sm">Defense Tool</Badge>
            <h3 className="text-lg font-bold text-white">Secure Authentication System</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Node.js server with bcrypt hashing, prepared queries, HttpOnly JWT cookies, and rate limiting.
            </p>
            <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:underline">
              View Guide & Code <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
            <Badge variant="green" mono size="sm">Python Security</Badge>
            <h3 className="text-lg font-bold text-white">Cryptographic File Integrity Checker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python utility using SHA-256 digests to continuously audit system configuration file tampering.
            </p>
            <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:underline">
              View Guide & Code <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#121824] p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
            <Badge variant="purple" mono size="sm">Monitoring</Badge>
            <h3 className="text-lg font-bold text-white">Log Analysis & SIEM Dashboard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated log parser detecting brute-force IP attempts and mapping status code metrics.
            </p>
            <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:underline">
              View Guide & Code <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>


      {/* 8. COMMUNITY SECTION */}
      <section className="bg-slate-950/80 py-16 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-[#121824] to-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-xl">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Built for students who want to learn together.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect with student defenders, share walk-through writeups, ask questions, and collaborate on open-source cybersecurity defense projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link to="/dashboard">
                <Button variant="primary" size="lg" icon={<Zap className="w-5 h-5" />}>
                  Join Student Hub
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* 9. FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-[#121824] p-12 rounded-3xl border border-cyan-500/30 space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Start your cybersecurity journey today.
          </h2>

          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            No credit card, no subscription, no paywalls. Built 100% for students and cybersecurity enthusiasts.
          </p>

          <div className="pt-2">
            <Link to="/dashboard">
              <Button size="lg" variant="primary" icon={<Shield className="w-5 h-5" />}>
                Enter CyberVerse
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
