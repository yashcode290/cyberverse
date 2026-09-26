export const modulesData = [
  {
    id: 'mod-sqli',
    title: 'SQL Injection & Secure Parameterized Queries',
    category: 'Web Security',
    difficulty: 'Intermediate',
    estimatedTime: '45 mins',
    prerequisites: ['HTTP Basics'],
    items: [
      {
        id: 'sqli-lesson-1',
        title: 'Lesson 1: SQL Injection Fundamentals',
        type: 'theory',
        duration: '10 mins',
        xp: 30,
        summary: 'Understand how unescaped user string concatenation allows attackers to manipulate database query logic.',
        content: `SQL Injection occurs when user input is concatenated directly into SQL command strings without validation or parameterization.

### Vulnerable Query Pattern
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = ''
\`\`\`

When the input \`admin' OR '1'='1\` is concatenated, the single quote breaks out of the string context, turning \`'1'='1'\` into an always-true boolean condition!`,
        takeaways: [
          'SQLi occurs at Layer 7 Application layer during database query assembly.',
          'Attackers can bypass authentication, exfiltrate data, or execute administrative tasks.',
          'Parameterized queries (Prepared Statements) separate SQL code from user data.'
        ]
      },
      {
        id: 'sqli-lab-1',
        title: 'Practice Lab: Interactive SQLi Sandbox',
        type: 'lab',
        duration: '15 mins',
        xp: 100,
        labTitle: 'SQL Injection Parameterization Sandbox',
        objectives: [
          'Test string concatenation payload in input field',
          'Observe SQL query boolean manipulation',
          'Compare vulnerable vs safe prepared statements'
        ]
      },
      {
        id: 'sqli-defense-1',
        title: 'Defense: Remediation & Prepared Statements',
        type: 'theory',
        duration: '10 mins',
        xp: 50,
        summary: 'Learn how to patch SQL injection vulnerabilities using parameterized prepared statements.',
        whatHappened: 'Untrusted user input was directly concatenated into SQL strings, allowing payload execution.',
        whyVulnerable: 'The database engine compiled user string characters as executable SQL tokens.',
        howToFix: 'Use prepared statements (parameterized queries) where place-holders (?) isolate data parameters from code.',
        fixCode: `// SECURE PARAMETERIZED QUERY (Node.js / MySQL)
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.query(query, [usernameInput, passwordInput], (err, results) => {
  // Query executed safely with placeholder parameters!
});`
      }
    ]
  },
  {
    id: 'mod-networking',
    title: 'Networking Fundamentals & TCP Handshake',
    category: 'Networking',
    difficulty: 'Beginner',
    estimatedTime: '40 mins',
    prerequisites: ['Computer Basics'],
    items: [
      {
        id: 'net-lesson-1',
        title: 'Lesson 1: TCP/IP Stack & 3-Way Handshake',
        type: 'theory',
        duration: '12 mins',
        xp: 30,
        summary: 'Understand SYN, SYN-ACK, and ACK flags establishing connection-oriented streams.',
        content: `TCP provides reliable, ordered data transport across computer networks using sequence numbers and control flags.

### 3-Way Handshake Flags
1. **SYN**: Client synchronizes sequence number.
2. **SYN-ACK**: Server acknowledges client and responds with own sequence number.
3. **ACK**: Client acknowledges server sequence number. Connection established!`,
        takeaways: [
          'TCP operates at Layer 4 (Transport Layer).',
          'SYN Floods exhaust server tables by leaving handshakes incomplete.'
        ]
      },
      {
        id: 'net-lab-1',
        title: 'Practice Lab: Wireshark Packet Inspection',
        type: 'lab',
        duration: '20 mins',
        xp: 100,
        labTitle: 'Wireshark PCAP Traffic Inspector',
        objectives: [
          'Inspect Frame 1 SYN packet',
          'Locate HTTP POST plaintext password payload',
          'Identify compromised IP addresses'
        ]
      }
    ]
  }
];
