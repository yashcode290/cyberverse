export const labsData = [
  {
    id: 'linux-file-hunt',
    title: 'Linux File Hunt & Permission Inspection',
    category: 'System Administration',
    difficulty: 'Beginner',
    estimatedTime: '20 mins',
    xp: 100,
    type: 'terminal',
    flag: 'CyberVerse{SHADOW_FILE_ACCESS_2026}',
    skillsLearned: ['Linux CLI', 'File Permissions', 'grep Command', 'Privilege Verification'],
    nextLabId: 'packet-detective',
    overview: 'Navigate a simulated Linux file system to locate hidden administrative credential files and inspect file permission bits.',
    tasks: [
      { id: 't1', text: 'Execute `ls -la` to view hidden directory files', completed: false },
      { id: 't2', text: 'Locate the confidential file in `/etc/shadow_backup`', completed: false },
      { id: 't3', text: 'Use `cat` or `grep` to inspect file contents', completed: false },
      { id: 't4', text: 'Submit the extracted flag string below', completed: false }
    ],
    hints: [
      { tier: 1, text: 'Use command `ls -la /etc` to list system configuration directory files.', xpCost: 10 },
      { tier: 2, text: 'Look for `shadow_backup.txt` inside the `/etc` directory.', xpCost: 15 },
      { tier: 3, text: 'Run command `cat /etc/shadow_backup.txt` to print the flag!', xpCost: 25 }
    ]
  },
  {
    id: 'packet-detective',
    title: 'Packet Detective: Plaintext HTTP Forensics',
    category: 'Network Security',
    difficulty: 'Easy',
    estimatedTime: '15 mins',
    xp: 100,
    type: 'packet',
    flag: 'CyberVerse{SuperSecret2026!}',
    skillsLearned: ['Wireshark Inspection', 'HTTP POST Analysis', 'Payload Decoding', 'PCAP Forensics'],
    nextLabId: 'hash-investigator',
    overview: 'Inspect captured PCAP network frame streams to find unencrypted HTTP POST login credentials.',
    tasks: [
      { id: 't1', text: 'Filter packet stream for HTTP protocol traffic', completed: false },
      { id: 't2', text: 'Inspect Frame 4 (POST /login.php)', completed: false },
      { id: 't3', text: 'Read raw ASCII Form payload data', completed: false },
      { id: 't4', text: 'Submit the leaked password as the flag', completed: false }
    ],
    hints: [
      { tier: 1, text: 'Look for Frame 4 which contains the HTTP POST method request.', xpCost: 10 },
      { tier: 2, text: 'Click Frame 4 and inspect the Data Payload Inspector pane at the bottom right.', xpCost: 15 },
      { tier: 3, text: 'The password parameter value in Frame 4 is `SuperSecret2026!`.', xpCost: 25 }
    ]
  },
  {
    id: 'hash-investigator',
    title: 'Hash Investigator & Crypto Cracker',
    category: 'Cryptography',
    difficulty: 'Intermediate',
    estimatedTime: '25 mins',
    xp: 150,
    type: 'crypto',
    flag: 'CyberVerse{CTF_NET_PROT_2026}',
    skillsLearned: ['Base64 Decoding', 'SHA-256 Hashes', 'Ciphertext Analysis', 'Crypto Tools'],
    nextLabId: 'sql-login-lab',
    overview: 'Decode Base64 encoded tokens and calculate SHA-256 cryptographic hashes to verify message integrity.',
    tasks: [
      { id: 't1', text: 'Copy base64 string `Q0ZGX05FVF9QUk9UXzIwMjY=`', completed: false },
      { id: 't2', text: 'Paste into Base64 Decoder tool', completed: false },
      { id: 't3', text: 'Verify decoded string token', completed: false },
      { id: 't4', text: 'Wrap decoded token in CyberVerse{...} format', completed: false }
    ],
    hints: [
      { tier: 1, text: 'Use the Base64 Decoder utility tab in the crypto workspace.', xpCost: 10 },
      { tier: 2, text: 'Base64 decoding `Q0ZGX05FVF9QUk9UXzIwMjY=` yields `CTF_NET_PROT_2026`.', xpCost: 15 },
      { tier: 3, text: 'Format your submission as `CyberVerse{CTF_NET_PROT_2026}`.', xpCost: 25 }
    ]
  },
  {
    id: 'sql-login-lab',
    title: 'SQL Login Bypass & Parameterization',
    category: 'Web Security',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    xp: 150,
    type: 'browser',
    flag: 'CyberVerse{SQLI_PARAMETER_DEFENSE_OK}',
    skillsLearned: ['SQL Injection', 'Query Logic Bypass', 'Prepared Statements', 'Secure Coding'],
    nextLabId: 'xss-playground',
    overview: 'Demonstrate how string concatenation allows single quotes to alter SQL query boolean logic, then apply prepared statements.',
    tasks: [
      { id: 't1', text: 'Test input payload `admin\' OR \'1\'=\'1`', completed: false },
      { id: 't2', text: 'Observe vulnerable SQL string concatenation result', completed: false },
      { id: 't3', text: 'Switch to Safe Parameterized Query view', completed: false },
      { id: 't4', text: 'Submit flag `CyberVerse{SQLI_PARAMETER_DEFENSE_OK}`', completed: false }
    ],
    hints: [
      { tier: 1, text: 'Type payload `admin\' OR \'1\'=\'1` into the username input field.', xpCost: 10 },
      { tier: 2, text: 'Notice how single quotes break the string context into executable SQL.', xpCost: 15 },
      { tier: 3, text: 'Submit flag `CyberVerse{SQLI_PARAMETER_DEFENSE_OK}` to complete.', xpCost: 25 }
    ]
  }
];
