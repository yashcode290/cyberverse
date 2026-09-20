import type { Challenge } from '../types/challenge';


export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'ch-1',
    title: 'The Unquoted Shell',
    category: 'Linux & Bash',
    difficulty: 'Beginner',
    xpReward: 100,
    description: 'An administrator left a flag hidden inside a restricted system directory.',
    scenario: 'You have shell access. Inspect the permissions and find the file located at /home/student/.secret_vault.',
    hint: 'Use `ls -la /home/student` to reveal hidden files beginning with a period.',
    flag: 'CYBER{l1nux_c1i_n4v1g4t0r}',
    solvedCount: 420,
    author: 'CyberVerse Lead'
  },
  {
    id: 'ch-2',
    title: 'Bypass the Gatekeeper',
    category: 'Web Security',
    difficulty: 'Beginner',
    xpReward: 150,
    description: 'The authentication page does not sanitize input before forming SQL queries.',
    scenario: 'Use dynamic SQL boolean evaluation (`\' OR \'1\'=\'1`) in the login prompt to force the database to evaluate the query clause as TRUE.',
    hint: 'Enter single quote followed by OR 1=1.',
    flag: 'CYBER{sq1i_byp4ss_4uth_5ucc3ss}',
    solvedCount: 380,
    author: 'WebSec Mentor'
  },
  {
    id: 'ch-3',
    title: 'Alert Injection',
    category: 'Web Security',
    difficulty: 'Beginner',
    xpReward: 150,
    description: 'The search parameter reflects user queries directly into the HTML DOM without sanitization.',
    scenario: 'Execute a client-side script tag payload in the search field to trigger the alert DOM event.',
    hint: 'Try standard `<script>` tags.',
    flag: 'CYBER{xss_script_3x3cut10n_d0m}',
    solvedCount: 310,
    author: 'Security Lead'
  },
  {
    id: 'ch-4',
    title: 'SSH Intruder Triage',
    category: 'Log Analysis',
    difficulty: 'Intermediate',
    xpReward: 200,
    description: 'A suspicious IP address attempted a brute-force SSH dictionary attack against the server.',
    scenario: 'Analyze the system auth log, identify the malicious IP address generating multiple 401 Unauthorized responses.',
    hint: 'Look for repeated failed logins from the 192.168.1.x subnet.',
    flag: 'CYBER{192.168.1.105_brut3_f0rc3}',
    solvedCount: 240,
    author: 'SOC Defense Team'
  }
];
