export interface RoadmapLevelNode {
  id: string;
  level: number;
  title: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  theoryPercent: number;
  practicalPercent: number;
  labsCount: number;
  projectsCount: number;
  status: 'Completed' | 'In Progress' | 'Available' | 'Locked';
  prerequisites?: string[];
  topics: string[];
}

export const ROADMAP_LEVELS: RoadmapLevelNode[] = [
  {
    id: 'lvl-0',
    level: 0,
    title: 'Computer Fundamentals',
    category: 'Foundations',
    tagline: 'Binary arithmetic, CPU architecture, OS concepts & memory',
    description: 'Understand how computers process instructions, manage RAM memory, parse file systems, and execute low-level process threads.',
    iconName: 'Cpu',
    difficulty: 'Beginner',
    estimatedHours: 10,
    theoryPercent: 25,
    practicalPercent: 75,
    labsCount: 4,
    projectsCount: 1,
    status: 'Completed',
    topics: ['Binary & Hexadecimal', 'CPU Architecture', 'Memory Allocation', 'OS Kernel vs User Space']
  },
  {
    id: 'lvl-1',
    level: 1,
    title: 'Networking & Operating Systems',
    category: 'Foundations',
    tagline: 'TCP/IP stack, Linux CLI, Windows internals & DNS resolution',
    description: 'Master operating system command line tools, file system permissions, network packet routing, OSI layers, and socket connections.',
    iconName: 'Network',
    difficulty: 'Beginner',
    estimatedHours: 16,
    theoryPercent: 20,
    practicalPercent: 80,
    labsCount: 6,
    projectsCount: 2,
    status: 'In Progress',
    prerequisites: ['lvl-0'],
    topics: ['Linux CLI (bash)', 'TCP/IP 4-Layer Stack', 'DNS & Subnetting', 'Windows Permissions']
  },
  {
    id: 'lvl-2',
    level: 2,
    title: 'Programming for Security',
    category: 'Foundations',
    tagline: 'Python security automation, JavaScript DOM & Bash scripting',
    description: 'Learn to write custom security scripts in Python, parse web responses, manipulate DOM payloads, and automate system administration with Bash.',
    iconName: 'Code',
    difficulty: 'Beginner',
    estimatedHours: 18,
    theoryPercent: 15,
    practicalPercent: 85,
    labsCount: 8,
    projectsCount: 2,
    status: 'Available',
    prerequisites: ['lvl-1'],
    topics: ['Python Automation', 'JavaScript DOM', 'Bash Scripting', 'Regex Pattern Matching']
  },
  {
    id: 'lvl-3',
    level: 3,
    title: 'Cybersecurity Fundamentals',
    category: 'Core Security',
    tagline: 'CIA Triad, Authentication, Authorization & Threat Modeling',
    description: 'Explore core security engineering principles: Confidentiality, Integrity, Availability, least-privilege IAM, and threat vectors.',
    iconName: 'Shield',
    difficulty: 'Beginner',
    estimatedHours: 12,
    theoryPercent: 30,
    practicalPercent: 70,
    labsCount: 5,
    projectsCount: 1,
    status: 'Available',
    prerequisites: ['lvl-2'],
    topics: ['CIA Triad', 'Authentication (MFA)', 'Role-Based Access Control', 'Threat Modeling']
  },
  {
    id: 'lvl-4',
    level: 4,
    title: 'Web Application Security',
    category: 'Web Security',
    tagline: 'OWASP Top 10, SQL Injection, XSS, CSRF & Prepared Queries',
    description: 'Audit web applications for injection vulnerabilities, cross-site scripting, broken access control, and implement safe parameterized code fixes.',
    iconName: 'Globe',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    theoryPercent: 20,
    practicalPercent: 80,
    labsCount: 10,
    projectsCount: 3,
    status: 'Available',
    prerequisites: ['lvl-3'],
    topics: ['SQL Injection', 'Reflected & Stored XSS', 'CSRF Tokens', 'Parameterized DB Queries']
  },
  {
    id: 'lvl-5',
    level: 5,
    title: 'Cryptography & Hash Functions',
    category: 'Core Security',
    tagline: 'Symmetric/Asymmetric Ciphers, SHA-256, RSA & TLS Handshakes',
    description: 'Understand modern encryption standards (AES, RSA), cryptographic hashing (SHA-256/MD5), digital signatures, and HTTPS TLS protocol handshakes.',
    iconName: 'Lock',
    difficulty: 'Intermediate',
    estimatedHours: 14,
    theoryPercent: 25,
    practicalPercent: 75,
    labsCount: 6,
    projectsCount: 1,
    status: 'Locked',
    prerequisites: ['lvl-4'],
    topics: ['AES & RSA Encryption', 'Cryptographic Hashes', 'TLS/SSL Certificates', 'Digital Signatures']
  },
  {
    id: 'lvl-6',
    level: 6,
    title: 'Ethical Hacking & Auditing',
    category: 'Offensive Security',
    tagline: 'Reconnaissance, Nmap service scanning & vulnerability assessment',
    description: 'Learn ethical assessment methodologies to discover misconfigurations, scan open network ports with Nmap, and perform responsible security audits.',
    iconName: 'Target',
    difficulty: 'Intermediate',
    estimatedHours: 22,
    theoryPercent: 15,
    practicalPercent: 85,
    labsCount: 9,
    projectsCount: 2,
    status: 'Locked',
    prerequisites: ['lvl-5'],
    topics: ['Passive Reconnaissance', 'Active Nmap Scanning', 'Service Enumeration', 'Vulnerability Assessment']
  },
  {
    id: 'lvl-7',
    level: 7,
    title: 'Blue Team & SIEM Defense',
    category: 'Defensive Security',
    tagline: 'Log analysis, SIEM triage, firewall rules & threat hunting',
    description: 'Defend enterprise infrastructure. Parse web access logs, detect brute-force IP attacks, configure iptables firewalls, and triage SIEM alerts.',
    iconName: 'ShieldCheck',
    difficulty: 'Intermediate',
    estimatedHours: 18,
    theoryPercent: 20,
    practicalPercent: 80,
    labsCount: 7,
    projectsCount: 2,
    status: 'Locked',
    prerequisites: ['lvl-6'],
    topics: ['Web Server Log Triage', 'SIEM Alert Filtering', 'Firewall Rule Creation', 'Brute-Force IP Blocking']
  },
  {
    id: 'lvl-8',
    level: 8,
    title: 'Digital Forensics & Incident Response',
    category: 'Forensics',
    tagline: 'Artifact extraction, memory analysis & attack timeline building',
    description: 'Reconstruct security incidents. Calculate file SHA-256 digests, analyze suspicious file metadata, and build attack timeline chronologies.',
    iconName: 'Search',
    difficulty: 'Advanced',
    estimatedHours: 16,
    theoryPercent: 20,
    practicalPercent: 80,
    labsCount: 5,
    projectsCount: 1,
    status: 'Locked',
    prerequisites: ['lvl-7'],
    topics: ['File Metadata Analysis', 'SHA-256 Hashing', 'Timeline Reconstruction', 'Memory Artifacts']
  },
  {
    id: 'lvl-9',
    level: 9,
    title: 'Cloud Security & IAM Policies',
    category: 'Cloud Security',
    tagline: 'AWS/GCP/Azure security architecture, least-privilege & S3 hardening',
    description: 'Understand cloud security posture: Identity & Access Management (IAM) policies, secure bucket storage permissions, and cloud audit logs.',
    iconName: 'Cloud',
    difficulty: 'Advanced',
    estimatedHours: 16,
    theoryPercent: 25,
    practicalPercent: 75,
    labsCount: 6,
    projectsCount: 2,
    status: 'Locked',
    prerequisites: ['lvl-8'],
    topics: ['AWS IAM Policies', 'S3 Bucket Hardening', 'CloudTrail Audit Logs', 'Least Privilege']
  },
  {
    id: 'lvl-10',
    level: 10,
    title: 'CTF Missions & Security Engineering',
    category: 'CTF & Projects',
    tagline: 'Jeopardy CTF challenges, capstone projects & practical defense',
    description: 'Solve advanced multi-step CTF challenges, build open-source security tools, and publish complete defensive engineering writeups.',
    iconName: 'Trophy',
    difficulty: 'Advanced',
    estimatedHours: 25,
    theoryPercent: 10,
    practicalPercent: 90,
    labsCount: 12,
    projectsCount: 3,
    status: 'Locked',
    prerequisites: ['lvl-9'],
    topics: ['Jeopardy CTF Matrix', 'Capstone Security Project', 'Defensive Writeups', 'Full System Audit']
  }
];
