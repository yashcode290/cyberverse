import React, { useState, useRef, useEffect } from 'react';
import LabHeader from './LabHeader';
import TaskChecklist from './TaskChecklist';
import HintPanel from './HintPanel';
import FlagInput from './FlagInput';
import CompletionModal from './CompletionModal';
import { Terminal, BookOpen, RotateCw } from 'lucide-react';

export default function LinuxFileHuntLab({ onBack, onCompleteLab }) {
  const labConfig = {
    id: 'linux-file-hunt',
    title: 'Linux File Hunt: Find Hidden Incident Report',
    category: 'System Administration',
    difficulty: 'Beginner',
    estimatedTime: '15 mins',
    xp: 100,
    flag: 'CYBERV3RSE{LINUX_EXPLORER}',
    skillsLearned: ['Linux CLI Navigation', 'Hidden Files (.filename)', 'grep & cat Commands', 'Privilege Verification']
  };

  const [currentPath, setCurrentPath] = useState('/home/student');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'CyberVerse Linux Terminal Simulator v2.4(x86_64-pc-linux-gnu)', type: 'sys' },
    { text: 'Type "help" for a list of supported educational Linux commands.', type: 'sys' },
    { text: 'MISSION: Find the hidden incident report log to retrieve the secret flag.', type: 'info' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [unlockedHints, setUnlockedHints] = useState([]);
  const [earnedXP, setEarnedXP] = useState(100);
  const [isSolved, setIsSolved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 't1',
      text: 'View working directory files',
      actionGuide: 'Run command "pwd" or "ls" in terminal',
      completed: false
    },
    {
      id: 't2',
      text: 'Discover hidden `.incident_reports` directory',
      actionGuide: 'Run command "ls -la" to list hidden directories',
      completed: false
    },
    {
      id: 't3',
      text: 'Read `incident_report_2026.log` contents',
      actionGuide: 'Run command "cat .incident_reports/incident_report_2026.log"',
      completed: false
    },
    {
      id: 't4',
      text: 'Submit secret flag string',
      actionGuide: 'Paste CYBERV3RSE{LINUX_EXPLORER} into Flag Input box below',
      completed: false
    }
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const markTaskCompleted = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
  };

  // Simulated Command Executor
  const handleCommand = (e) => {
    e.preventDefault();
    const cmdLine = inputVal.trim();
    if (!cmdLine) return;

    const promptStr = `student@cyberverse:${currentPath === '/home/student' ? '~' : currentPath}$ ${cmdLine}`;
    const newHistory = [...terminalHistory, { text: promptStr, type: 'cmd' }];

    const parts = cmdLine.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    markTaskCompleted('t1');

    if (cmd === 'clear') {
      setTerminalHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      newHistory.push({
        text: `SUPPORTED EDUCATIONAL LINUX COMMANDS:
  pwd                   : Print current working directory
  ls [-la]              : List directory contents (use -la for hidden files)
  cd <folder>           : Change working directory (use 'cd ..' to go up)
  cat <file>            : View file contents
  find                  : Search for files in virtual filesystem
  grep <pattern> <file> : Search for text inside a file
  whoami                : Display current user handle
  clear                 : Clear terminal history
  help                  : Display this command reference`,
        type: 'output'
      });
    } else if (cmd === 'pwd') {
      newHistory.push({ text: currentPath, type: 'output' });
    } else if (cmd === 'whoami') {
      newHistory.push({ text: 'student', type: 'output' });
    } else if (cmd === 'ls') {
      const showHidden = args.includes('-la') || args.includes('-a') || args.includes('-al');
      if (showHidden) markTaskCompleted('t2');

      if (currentPath === '/home/student') {
        const files = showHidden
          ? '.  ..  .incident_reports/  Desktop/  Documents/  Downloads/'
          : 'Desktop/  Documents/  Downloads/';
        newHistory.push({ text: files, type: showHidden ? 'warning' : 'output' });
      } else if (currentPath === '/home/student/.incident_reports') {
        newHistory.push({ text: 'incident_report_2026.log', type: 'output' });
      } else if (currentPath === '/home/student/Documents') {
        newHistory.push({ text: 'notes.txt  project_plan.md', type: 'output' });
      } else if (currentPath === '/home/student/Downloads') {
        newHistory.push({ text: 'sample_capture.pcap', type: 'output' });
      } else if (currentPath === '/home/student/Desktop') {
        newHistory.push({ text: 'readme.txt', type: 'output' });
      } else if (currentPath === '/etc') {
        newHistory.push({ text: 'passwd  shadow_backup.txt', type: 'output' });
      } else if (currentPath === '/var/log') {
        newHistory.push({ text: 'syslog  auth.log', type: 'output' });
      } else {
        newHistory.push({ text: 'total 0', type: 'output' });
      }
    } else if (cmd === 'cd') {
      const target = args[0] || '~';

      if (target === '~' || target === '/home/student') {
        setCurrentPath('/home/student');
        newHistory.push({ text: '', type: 'output' });
      } else if (target === '..') {
        setCurrentPath('/home/student');
      } else if (target === '.incident_reports' || target === '/home/student/.incident_reports') {
        setCurrentPath('/home/student/.incident_reports');
        markTaskCompleted('t2');
      } else if (target === 'Documents' || target === '/home/student/Documents') {
        setCurrentPath('/home/student/Documents');
      } else if (target === 'Downloads' || target === '/home/student/Downloads') {
        setCurrentPath('/home/student/Downloads');
      } else if (target === 'Desktop' || target === '/home/student/Desktop') {
        setCurrentPath('/home/student/Desktop');
      } else if (target === '/etc') {
        setCurrentPath('/etc');
      } else if (target === '/var/log') {
        setCurrentPath('/var/log');
      } else {
        newHistory.push({ text: `bash: cd: ${target}: No such directory`, type: 'error' });
      }
    } else if (cmd === 'cat') {
      const filename = args[0] || '';
      if (!filename) {
        newHistory.push({ text: 'cat: missing filename argument', type: 'error' });
      } else if (filename.includes('incident_report_2026.log')) {
        newHistory.push({
          text: `[INCIDENT REPORT #2026-09-01]
Status: CRITICAL BREACH INVESTIGATION
Investigator: SOC Analyst Lead

SECRET FLAG: CYBERV3RSE{LINUX_EXPLORER}

Summary: Unencrypted HTTP POST payload intercepted on port 80.`,
          type: 'success'
        });
        markTaskCompleted('t3');
      } else if (filename === 'notes.txt') {
        newHistory.push({ text: 'Network Security Audit Notes\n- Check open ports on 192.168.1.50\n- Password policy enforced', type: 'output' });
      } else if (filename === 'project_plan.md') {
        newHistory.push({ text: '# Security Operations Plan\n1. Reconnaissance\n2. Log Analysis', type: 'output' });
      } else if (filename === 'readme.txt') {
        newHistory.push({ text: 'Welcome to CyberVerse Linux Shell Sandbox!', type: 'output' });
      } else if (filename === 'passwd') {
        newHistory.push({ text: 'root:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Student:/home/student:/bin/bash', type: 'output' });
      } else {
        newHistory.push({ text: `cat: ${filename}: No such file`, type: 'error' });
      }
    } else if (cmd === 'find') {
      markTaskCompleted('t2');
      newHistory.push({
        text: `/home/student/Desktop/readme.txt
/home/student/Documents/notes.txt
/home/student/Documents/project_plan.md
/home/student/Downloads/sample_capture.pcap
/home/student/.incident_reports/incident_report_2026.log`,
        type: 'warning'
      });
    } else if (cmd === 'grep') {
      const pattern = args[0] || '';
      if (pattern.toLowerCase().includes('flag') || pattern.toLowerCase().includes('cyberv3rse')) {
        newHistory.push({ text: 'SECRET FLAG: CYBERV3RSE{LINUX_EXPLORER}', type: 'success' });
        markTaskCompleted('t3');
      } else {
        newHistory.push({ text: 'Matching string found in /home/student/.incident_reports/incident_report_2026.log', type: 'output' });
      }
    } else {
      newHistory.push({ text: `bash: ${cmd}: command not found. Type "help" for supported commands.`, type: 'error' });
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  const handleUnlockHint = (tier, xpCost) => {
    if (!unlockedHints.includes(tier)) {
      setUnlockedHints([...unlockedHints, tier]);
      setEarnedXP(prev => Math.max(20, prev - xpCost));
    }
  };

  const handleSubmitFlag = (flagVal) => {
    if (flagVal.trim().toUpperCase() === labConfig.flag) {
      setIsSolved(true);
      markTaskCompleted('t4');
      setIsModalOpen(true);
      if (onCompleteLab) onCompleteLab(labConfig.id);
      return { success: true };
    }
    return { success: false };
  };

  const handleResetLab = () => {
    setCurrentPath('/home/student');
    setTerminalHistory([
      { text: 'CyberVerse Linux Terminal Simulator v2.4(x86_64-pc-linux-gnu)', type: 'sys' },
      { text: 'Type "help" for a list of supported educational Linux commands.', type: 'sys' },
      { text: 'MISSION: Find the hidden incident report log to retrieve the secret flag.', type: 'info' }
    ]);
    setInputVal('');
    setUnlockedHints([]);
    setEarnedXP(100);
    setIsSolved(false);
    setTasks(tasks.map(t => ({ ...t, completed: false })));
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <LabHeader
        lab={labConfig}
        completedTasksCount={completedTasksCount}
        totalTasksCount={tasks.length}
        onBack={onBack}
      />

      {/* Main 70% / 30% Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
        {/* 70% MAIN TERMINAL WORKSPACE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Terminal Window */}
          <div className="terminal-window" style={{ height: '480px', display: 'flex', flexDirection: 'column' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot dot-red" />
                <div className="terminal-dot dot-yellow" />
                <div className="terminal-dot dot-green" />
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                student@cyberverse: {currentPath === '/home/student' ? '~' : currentPath} (bash)
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setTerminalHistory([])} className="btn-cyber-ghost" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                  Clear
                </button>
                <button onClick={handleResetLab} className="btn-cyber-ghost" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                  <RotateCw size={12} /> Reset
                </button>
              </div>
            </div>

            <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
              {terminalHistory.map((item, idx) => {
                let col = '#00ff66';
                if (item.type === 'sys') col = '#00f3ff';
                if (item.type === 'cmd') col = '#ffffff';
                if (item.type === 'warning') col = '#ffd166';
                if (item.type === 'error') col = '#ff3366';
                if (item.type === 'info') col = '#c879ff';

                return (
                  <pre key={idx} style={{ color: col, whiteSpace: 'pre-wrap', margin: '0.25rem 0', lineHeight: 1.5, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {item.text}
                  </pre>
                );
              })}

              {/* Prompt Input Line */}
              <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ color: '#00f3ff', marginRight: '0.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  student@cyberverse:{currentPath === '/home/student' ? '~' : currentPath}$
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type ls -la, cd .incident_reports, cat incident_report_2026.log..."
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    width: '100%'
                  }}
                  autoFocus
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Educational Command Reference Cheatsheet */}
          <div className="cyber-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#00f3ff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={18} /> Essential Linux Commands Reference
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: '6px' }}>
                <strong style={{ color: '#00ff66', fontFamily: 'var(--font-mono)' }}>pwd</strong><br />
                <span style={{ color: '#94a3b8' }}>Print current working directory path.</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: '6px' }}>
                <strong style={{ color: '#00ff66', fontFamily: 'var(--font-mono)' }}>ls -la</strong><br />
                <span style={{ color: '#94a3b8' }}>List all files including hidden ones starting with `.`.</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: '6px' }}>
                <strong style={{ color: '#00ff66', fontFamily: 'var(--font-mono)' }}>cd &lt;folder&gt;</strong><br />
                <span style={{ color: '#94a3b8' }}>Change current working directory.</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: '6px' }}>
                <strong style={{ color: '#00ff66', fontFamily: 'var(--font-mono)' }}>cat &lt;file&gt;</strong><br />
                <span style={{ color: '#94a3b8' }}>Print file contents to terminal.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 30% INSTRUCTIONS & SIDEBAR */}
        <div className="cyber-card" style={{ padding: '1.25rem', background: '#090e1a' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.75rem' }}>
            Mission: Find Hidden Incident Log
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            Follow the step-by-step action guides below to locate the hidden directory, read the report, and extract the flag.
          </p>

          {/* Task Checklist */}
          <TaskChecklist
            tasks={tasks}
            onToggleTask={(id) => markTaskCompleted(id)}
          />

          {/* 3-Tier Hint System */}
          <HintPanel
            hints={[
              { tier: 1, text: 'Use command `ls -la` to list hidden directories starting with `.`.', xpCost: 10 },
              { tier: 2, text: 'Look inside the `.incident_reports` directory under `/home/student`.', xpCost: 15 },
              { tier: 3, text: 'Run `cat /home/student/.incident_reports/incident_report_2026.log` to view the flag.', xpCost: 25 }
            ]}
            unlockedHints={unlockedHints}
            onUnlockHint={handleUnlockHint}
          />

          {/* Flag Submission */}
          <FlagInput
            onSubmitFlag={handleSubmitFlag}
            isSolved={isSolved}
          />
        </div>
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={isModalOpen}
        lab={labConfig}
        xpEarned={earnedXP}
        timeSpent="10 mins"
        skills={labConfig.skillsLearned}
        onNextLab={onBack}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
