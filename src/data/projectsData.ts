export interface SecurityProject {
  id: string;
  title: string;
  category: 'Defense' | 'Tooling' | 'Monitoring' | 'Cryptographic Security';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  xpReward: number;
  shortDescription: string;
  learningObjectives: string[];
  technologies: string[];
  architectureOverview: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    codeSnippet?: string;
  }[];
}

export const PROJECTS_DATA: SecurityProject[] = [
  {
    id: 'secure-login-system',
    title: 'Secure Authentication & Session Management System',
    category: 'Defense',
    difficulty: 'Beginner',
    estimatedHours: 4,
    xpReward: 350,
    shortDescription: 'Build a secure Node.js & Express login server featuring bcrypt password hashing, prepared SQL queries, HttpOnly JWT cookies, and rate-limiting.',
    learningObjectives: [
      'Implement salted bcrypt password hashing (cost factor 12)',
      'Use parameterized queries to prevent SQL Injection',
      'Store JWT access tokens in HttpOnly SameSite cookies',
      'Enforce express-rate-limit to prevent brute-force attacks'
    ],
    technologies: ['Node.js', 'Express.js', 'PostgreSQL / SQLite', 'bcrypt', 'jsonwebtoken'],
    architectureOverview: 'Client submits credentials → Express Rate Limiter checks IP → Controller queries database using prepared statements → Bcrypt compares hash → Express sets HttpOnly cookie.',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Express & Security Middleware',
        description: 'Set up Express app with Helmet security headers and CORS protection.',
        codeSnippet: `import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.use('/api/login', limiter);`
      },
      {
        stepNumber: 2,
        title: 'Implement Parameterized DB Query & Bcrypt Verification',
        description: 'Query database with positional parameters and verify hashes asynchronously.',
        codeSnippet: `import bcrypt from 'bcrypt';

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials' });
  
  const isValid = await bcrypt.compare(password, result.rows[0].password_hash);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
  
  res.json({ status: 'authenticated' });
});`
      }
    ]
  },
  {
    id: 'file-integrity-checker',
    title: 'Python Cryptographic File Integrity Monitor (FIM)',
    category: 'Cryptographic Security',
    difficulty: 'Beginner',
    estimatedHours: 3,
    xpReward: 300,
    shortDescription: 'Develop a Python utility that computes SHA-256 hashes for system configuration files and continuously monitors for unauthorized tampering or file modifications.',
    learningObjectives: [
      'Understand cryptographic hash functions (SHA-256)',
      'Create a baseline file hash manifest (baseline.txt)',
      'Implement real-time filesystem delta detection'
    ],
    technologies: ['Python 3', 'hashlib', 'pathlib', 'logging'],
    architectureOverview: 'Scanner reads target files → Computes SHA-256 digest → Compares against baseline dictionary → Triggers alert on hash mismatch or new file creation.',
    steps: [
      {
        stepNumber: 1,
        title: 'Generate Baseline SHA-256 Dictionary',
        description: 'Scan directory and compute digest for each configuration file.',
        codeSnippet: `import hashlib
from pathlib import Path

def calculate_sha256(filepath):
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()`
      }
    ]
  },
  {
    id: 'log-analysis-dashboard',
    title: 'Log Analysis & Threat Detection Dashboard',
    category: 'Monitoring',
    difficulty: 'Intermediate',
    estimatedHours: 5,
    xpReward: 400,
    shortDescription: 'Build an automated log parser that ingests web access logs, identifies brute-force IP addresses, maps status code distribution, and generates visual security metrics.',
    learningObjectives: [
      'Parse regex pattern matching for Common Log Format (CLF)',
      'Calculate failure threshold metrics for IP blocking',
      'Visualize attack trends over time'
    ],
    technologies: ['Node.js', 'Regex', 'Tailwind CSS', 'Chart.js'],
    architectureOverview: 'Log File Stream → Regex Line Parser → Aggregator Map → Alert Engine → Visual React Dashboard.',
    steps: [
      {
        stepNumber: 1,
        title: 'Create Regex Log Stream Parser',
        description: 'Parse IP address, timestamp, HTTP method, URI, and status code from standard log lines.',
        codeSnippet: `const LOG_REGEX = /^(\\S+) \\S+ \\S+ \\[(.*?)\\] "(.*?)" (\\d{3}) (\\d+)/;`
      }
    ]
  }
];
