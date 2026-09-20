import type { LabEnvironment } from '../types/lab';


export const LABS_DATA: LabEnvironment[] = [
  {
    id: 'linux-terminal-lab',
    title: 'Linux Navigation & Shell Mission',
    type: 'terminal',
    description: 'Practice fundamental Linux terminal commands inside a simulated sandbox file system. Find hidden configuration files and extract secret flags.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    xpReward: 150,
    tasks: [
      {
        id: 'task-1',
        title: 'List Directory Contents',
        instructions: 'Use the `ls` command to inspect files in the current working directory.',
        completed: false
      },
      {
        id: 'task-2',
        title: 'Inspect Hidden System Config',
        instructions: 'Find the hidden file starting with a dot in `/home/student` using `ls -la` and view its contents using `cat`.',
        targetFlag: 'CYBER{l1nux_c1i_n4v1g4t0r}',
        completed: false
      },
      {
        id: 'task-3',
        title: 'Filter System Logs',
        instructions: 'Search `/var/log/auth.log` for lines containing "CRITICAL" using `grep`.',
        targetFlag: 'CYBER{gr3p_log_f1lt3r_m4st3r}',
        completed: false
      }
    ]
  },
  {
    id: 'sqli-lab',
    title: 'SQL Injection Sandbox & Remediation',
    type: 'sqli',
    description: 'Interact with a simulated vulnerable login form. Observe how unescaped quotes bypass password checks, inspect real-time SQL execution flows, and toggle secure parameterized query mode.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    xpReward: 200,
    tasks: [
      {
        id: 'sqli-task-1',
        title: 'Bypass Admin Authentication',
        instructions: "Inject `' OR '1'='1` into the username field to authenticate as admin without knowing the password.",
        targetFlag: 'CYBER{sq1i_byp4ss_4uth_5ucc3ss}',
        completed: false
      },
      {
        id: 'sqli-task-2',
        title: 'Test Parameterized Query Defense',
        instructions: "Switch the database driver mode to 'Prepared Statement (Secure)' and observe why the exact same payload fails safely.",
        completed: false
      }
    ]
  },
  {
    id: 'xss-lab',
    title: 'Cross-Site Scripting (XSS) & Output Encoding',
    type: 'xss',
    description: 'Test reflected input payloads in an interactive web application sandbox. Compare unescaped HTML reflection against contextual sanitization.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    xpReward: 180,
    tasks: [
      {
        id: 'xss-task-1',
        title: 'Trigger Script Execution',
        instructions: 'Submit a script payload `<script>alert("XSS")</script>` in the user search field to trigger the execution indicator.',
        targetFlag: 'CYBER{xss_script_3x3cut10n_d0m}',
        completed: false
      },
      {
        id: 'xss-task-2',
        title: 'Enable Contextual Sanitization',
        instructions: 'Toggle the output encoder from "Raw HTML" to "HTML Entity Escaping" to sanitize input characters into safe text entities (&lt;script&gt;).',
        completed: false
      }
    ]
  },
  {
    id: 'log-analysis-lab',
    title: 'Blue Team SIEM Log Triage',
    type: 'log_analysis',
    description: 'Filter simulated web server access logs to uncover unauthorized admin access, brute-force IP addresses, and malicious web scan attempts.',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    xpReward: 220,
    tasks: [
      {
        id: 'log-task-1',
        title: 'Identify Brute-Force Attacker IP',
        instructions: 'Filter logs for status code `401 Unauthorized` and identify the IP address with over 50 failed attempts.',
        targetFlag: 'CYBER{192.168.1.105_brut3_f0rc3}',
        completed: false
      },
      {
        id: 'log-task-2',
        title: 'Locate Malicious SQL Payload',
        instructions: 'Search the HTTP Request URI column for SQL injection keywords like `SELECT` or `UNION`.',
        targetFlag: 'CYBER{un10n_53l3ct_3xf1ltr4t10n}',
        completed: false
      }
    ]
  }
];
