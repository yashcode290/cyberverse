import type { LearningPath } from '../types/learning';

export const LEARNING_PATHS: LearningPath[] = [

  {
    id: 'foundations',
    title: 'Computer & Security Foundations',
    category: 'Foundations',
    tagline: 'Master operating systems, networking fundamentals, and CLI power',
    description: 'Build a rock-solid base in Linux, Windows internals, TCP/IP networking, bash scripting, and core computer science concepts essential for security engineering.',
    iconName: 'Terminal',
    difficulty: 'Beginner',
    estimatedHours: 14,
    moduleCount: 6,
    popular: true,
    badgeName: 'Foundation Specialist',
    topics: ['Linux CLI', 'Networking Basics', 'Windows Fundamentals', 'Bash Scripting', 'OSI Model', 'Permissions'],
    modules: [
      {
        id: 'linux-cli-101',
        pathId: 'foundations',
        title: 'Linux Navigation & Command Line Mastery',
        shortDescription: 'Navigate directory structures, inspect permissions, pipe commands, and inspect system logs using essential Linux CLI tools.',
        difficulty: 'Beginner',
        estimatedHours: 2.5,
        xpReward: 150,
        iconName: 'Terminal',
        lessons: [
          {
            id: 'linux-basics',
            title: 'Directory Traversal & File Viewing (ls, cd, cat, grep)',
            durationMinutes: 15,
            theorySummary: 'The Linux file system is arranged as a hierarchical directory tree starting at root (/). Terminal navigation requires understanding absolute and relative paths.',
            detailedTheory: 'In Linux systems, everything is represented as a file or stream. Master tools like `ls` to list contents, `cd` to change paths, `cat` to output file contents, and `grep` to filter text lines.',
            visualFlow: {
              title: 'Linux Command Pipeline Flow',
              description: 'How standard output flows from file reader to grep filter',
              steps: [
                { title: 'Source File', description: 'Raw log file located at /var/log/auth.log', codeSnippet: 'cat /var/log/auth.log' },
                { title: 'Pipe operator (|)', description: 'Passes output stream directly to the next process input', codeSnippet: '|' },
                { title: 'Filter matching lines', description: 'Grep searches for "Failed password" attempts', codeSnippet: 'grep "Failed password"' }
              ],
              comparisonText: {
                unsafe: 'cat /var/log/auth.log (floods screen with 10,000 lines)',
                safe: 'cat /var/log/auth.log | grep "Failed" | head -n 5 (precise targeted analysis)'
              }
            },
            hasInteractiveLab: true,
            labId: 'linux-terminal-lab'
          }
        ]
      },
      {
        id: 'networking-fundamentals',
        pathId: 'foundations',
        title: 'TCP/IP, HTTP & Network Protocols',

        shortDescription: 'Understand how data packets travel across networks, analyze IP routing, inspect DNS resolution, and decode packet headers.',
        difficulty: 'Beginner',
        estimatedHours: 3,
        xpReward: 200,
        iconName: 'Globe',
        lessons: [
          {
            id: 'tcp-ip-stack',
            title: 'The TCP/IP 4-Layer Architecture',
            durationMinutes: 20,
            theorySummary: 'Network communication relies on structured layers: Link, Internet (IP), Transport (TCP/UDP), and Application (HTTP/DNS).',
            hasInteractiveLab: true,
            labId: 'network-analyzer-lab'
          }
        ]
      }
    ]
  },
  {
    id: 'web-security',
    title: 'Web Application Security',
    category: 'Web Security',
    tagline: 'Understand HTTP, SQL Injection, XSS, CSRF, IDOR, SSRF & defensive coding',
    description: 'Learn how modern web applications break and how to secure them. Covers OWASP Top 10 vulnerabilities with interactive safe labs and secure code remediation.',
    iconName: 'ShieldAlert',
    difficulty: 'Beginner',
    estimatedHours: 18,
    moduleCount: 8,
    popular: true,
    badgeName: 'Web Security Engineer',
    topics: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'CSRF', 'IDOR', 'SSRF', 'File Upload Security'],
    modules: [
      {
        id: 'sql-injection-deep-dive',
        pathId: 'web-security',
        title: 'SQL Injection: Exploitation & Prepared Statements',
        shortDescription: 'Understand how unescaped user input alters SQL query logic, practice safe injections in a sandbox login, and implement parameterized queries.',
        difficulty: 'Beginner',
        estimatedHours: 3,
        xpReward: 250,
        iconName: 'Database',
        lessons: [
          {
            id: 'sqli-intro',
            title: 'Understanding SQL Injection Mechanics',
            durationMinutes: 25,
            theorySummary: 'SQL Injection occurs when untrusted user input is directly concatenated into dynamic database string queries without parameterization.',
            detailedTheory: 'When input contains SQL syntax delimiters like single quotes (\'), the SQL interpreter parses user input as structural commands rather than literal data string values.',
            visualFlow: {
              title: 'Vulnerable Query String Concatenation vs Parameterized Query',
              description: 'Comparing how SQL engines interpret malicious inputs',
              steps: [
                { title: 'User Input', description: "Attacker submits payload: ' OR '1'='1", codeSnippet: "username: ' OR '1'='1" },
                { title: 'Dynamic String Build', description: "Query string built: SELECT * FROM users WHERE user = '' OR '1'='1' AND pass = ''", highlight: true },
                { title: 'Execution Result', description: "'1'='1' always evaluates to TRUE, bypassing password authentication completely!" }
              ],
              comparisonText: {
                unsafe: "const query = `SELECT * FROM users WHERE name = '${input}'`;",
                safe: "const query = 'SELECT * FROM users WHERE name = $1'; db.query(query, [input]);"
              }
            },
            defenseRemediation: {
              vulnerabilityDescription: 'Direct dynamic string concatenation allows user inputs to break out of data literals into executable SQL statement clauses.',
              vulnerableCode: {
                language: 'javascript',
                code: `// DANGEROUS: Unsanitized SQL Query Concatenation
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  const result = await db.query(sql); // Vulnerable!
  if (result.rows.length > 0) res.send("Authenticated!");
});`
              },
              secureCode: {
                language: 'javascript',
                code: `// SECURE: Parameterized Query / Prepared Statements
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // Database driver treats $1 and $2 strictly as literal data strings!
  const sql = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const result = await db.query(sql, [username, password]);
  if (result.rows.length > 0) res.send("Authenticated!");
});`
              },
              keyTakeaways: [
                'Always use Parameterized Queries (Prepared Statements).',
                'Never concatenate raw HTTP input directly into SQL strings.',
                'Enforce Principle of Least Privilege on database user permissions.'
              ]
            },
            hasInteractiveLab: true,
            labId: 'sqli-lab'
          }
        ]
      },
      {
        id: 'xss-playground-module',
        pathId: 'web-security',
        title: 'Cross-Site Scripting (XSS) & Contextual HTML Encoding',
        shortDescription: 'Explore Reflected and DOM XSS vulnerabilities in a safe interactive environment. Learn contextual output encoding and CSP headers.',
        difficulty: 'Beginner',
        estimatedHours: 2.5,
        xpReward: 200,
        iconName: 'Code',
        lessons: [
          {
            id: 'xss-intro',
            title: 'Reflected vs Stored vs DOM XSS',
            durationMinutes: 20,
            theorySummary: 'XSS allows attackers to execute arbitrary JavaScript code within the browser context of victim users.',
            hasInteractiveLab: true,
            labId: 'xss-lab'
          }
        ]
      }
    ]
  },
  {
    id: 'blue-team',
    title: 'Blue Team & Cyber Defense',
    category: 'Blue Team',
    tagline: 'Log analysis, SIEM monitoring, firewalls, threat hunting & incident triage',
    description: 'Defend organizational assets against malicious actors. Learn how to parse server logs, configure firewalls, investigate intrusion alerts, and write SIEM detection rules.',
    iconName: 'Shield',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    moduleCount: 6,
    popular: true,
    badgeName: 'SOC Analyst / Defender',
    topics: ['Log Analysis', 'SIEM & Detection', 'Firewall Rules', 'Incident Triage', 'Threat Hunting'],
    modules: [
      {
        id: 'log-analysis-101',
        pathId: 'blue-team',
        title: 'Security Log Investigation & Incident Triage',
        shortDescription: 'Analyze web server logs and SSH authentication attempt logs to identify brute-force attacks and unauthorized file access.',
        difficulty: 'Beginner',
        estimatedHours: 3,
        xpReward: 220,
        iconName: 'FileText',
        lessons: [
          {
            id: 'web-log-triage',
            title: 'Investigating Apache / Nginx Access Logs',
            durationMinutes: 25,
            theorySummary: 'Web logs record IP addresses, timestamps, HTTP methods, URIs, status codes, and User-Agents. Anomalies like 404 floods indicate directory brute-forcing.',
            hasInteractiveLab: true,
            labId: 'log-analysis-lab'
          }
        ]
      }
    ]
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking & Reconnaissance',
    category: 'Ethical Hacking',
    tagline: 'Reconnaissance, service scanning, enumeration & vulnerability assessment',
    description: 'Learn ethical assessment methodologies to discover misconfigurations, enumerate running services, and audit security postures responsibly.',
    iconName: 'Target',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    moduleCount: 7,
    popular: false,
    badgeName: 'Security Auditor',
    topics: ['Passive Recon', 'Active Recon', 'Nmap Scanning', 'Service Enumeration', 'Vulnerability Assessment'],
    modules: []
  },
  {
    id: 'digital-forensics',
    title: 'Digital Forensics & Incident Response',
    category: 'Digital Forensics',
    tagline: 'File metadata analysis, hashing, memory inspection & timeline reconstruction',
    description: 'Investigate security incidents after they occur. Learn how to calculate cryptographic hashes, inspect digital evidence metadata, and reconstruct attack timelines.',
    iconName: 'Search',
    difficulty: 'Intermediate',
    estimatedHours: 15,
    moduleCount: 5,
    popular: false,
    badgeName: 'Forensics Investigator',
    topics: ['File Metadata', 'Hashing (MD5/SHA256)', 'Timeline Reconstruction', 'Artifact Extraction'],
    modules: []
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security & IAM Fundamentals',
    category: 'Cloud Security',
    tagline: 'AWS/GCP/Azure security concepts, identity management & bucket misconfigurations',
    description: 'Understand cloud security architecture, least-privilege Identity & Access Management (IAM), storage bucket permissions, and infrastructure-as-code hardening.',
    iconName: 'Cloud',
    difficulty: 'Advanced',
    estimatedHours: 16,
    moduleCount: 5,
    popular: false,
    badgeName: 'Cloud Security Architect',
    topics: ['AWS Security', 'IAM Policies', 'S3 Security', 'Cloud Audit Logs', 'Configuration Security'],
    modules: []
  }
];
