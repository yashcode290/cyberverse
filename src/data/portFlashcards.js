export const portFlashcards = [
  {
    id: 1,
    port: '21',
    protocol: 'FTP',
    name: 'File Transfer Protocol',
    layer: 'Layer 7 (Application)',
    transport: 'TCP',
    description: 'Used for transferring files between client and server. Sends credentials and commands in unencrypted plaintext by default.',
    vulnerabilityNote: 'Vulnerable to sniffing and brute-force attacks. Replace with SFTP (Port 22) or FTPS.',
    mnemonic: 'FTP = 21 (2-1 = File 1 to 1)'
  },
  {
    id: 2,
    port: '22',
    protocol: 'SSH / SFTP',
    name: 'Secure Shell / Secure FTP',
    layer: 'Layer 7 (Application)',
    transport: 'TCP',
    description: 'Provides encrypted command-line shell access, remote system administration, and secure file transfer via SFTP.',
    vulnerabilityNote: 'Common target for SSH brute-force botnets. Enforce key-based auth and disable root login.',
    mnemonic: 'SSH = Port 22 (Double 2s for 2-way Encrypted Shell)'
  },
  {
    id: 3,
    port: '23',
    protocol: 'Telnet',
    name: 'Telecommunication Network',
    layer: 'Layer 7 (Application)',
    transport: 'TCP',
    description: 'Legacy unencrypted text terminal protocol used for remote access prior to SSH.',
    vulnerabilityNote: 'CRITICAL RISK: Transmits passwords and commands in cleartext over the network.',
    mnemonic: 'Telnet = 23 (One step behind SSH 22, obsolete!)'
  },
  {
    id: 4,
    port: '25',
    protocol: 'SMTP',
    name: 'Simple Mail Transfer Protocol',
    layer: 'Layer 7 (Application)',
    transport: 'TCP',
    description: 'Standard protocol for routing and sending emails between mail servers.',
    vulnerabilityNote: 'Open SMTP relays allow spammers to send spoofed emails. Modern SMTP uses TLS (Port 587).',
    mnemonic: 'SMTP = 25 (Sends 25 emails a minute)'
  },
  {
    id: 5,
    port: '53',
    protocol: 'DNS',
    name: 'Domain Name System',
    layer: 'Layer 7 (Application)',
    transport: 'UDP / TCP',
    description: 'Translates human-readable domain names (e.g. google.com) into numerical IP addresses (e.g. 142.250.190.46). Uses UDP for queries, TCP for zone transfers.',
    vulnerabilityNote: 'Vulnerable to DNS Cache Poisoning, DNS Amplification DDoS, and DNS Tunneling exfiltration.',
    mnemonic: 'DNS = 53 (53 Domain trees)'
  },
  {
    id: 6,
    port: '67 / 68',
    protocol: 'DHCP',
    name: 'Dynamic Host Configuration Protocol',
    layer: 'Layer 7 (Application)',
    transport: 'UDP',
    description: 'Automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to network devices.',
    vulnerabilityNote: 'Rogue DHCP server attack can assign malicious gateway IP (MITM) to clients.',
    mnemonic: 'DHCP = 67 (Server) / 68 (Client)'
  },
  {
    id: 7,
    port: '80',
    protocol: 'HTTP',
    name: 'Hypertext Transfer Protocol',
    layer: 'Layer 7 (Application)',
    transport: 'TCP',
    description: 'Underlying foundation for unencrypted web pages and REST API communications.',
    vulnerabilityNote: 'Traffic is unencrypted. Subject to eavesdropping and session cookie theft. Enforce HTTPS.',
    mnemonic: 'HTTP = 80 (Standard Web Port)'
  },
  {
    id: 8,
    port: '443',
    protocol: 'HTTPS',
    name: 'HTTP Secure (TLS/SSL)',
    layer: 'Layer 7 (Application)',
    transport: 'TCP',
    description: 'Encrypted version of HTTP using Transport Layer Security (TLS) certificates to ensure privacy and data integrity.',
    vulnerabilityNote: 'Check for outdated TLS 1.0/1.1 protocols or weak cipher suites.',
    mnemonic: 'HTTPS = 443 (443 = 4 Secure Web)'
  },
  {
    id: 9,
    port: '3306',
    protocol: 'MySQL',
    name: 'MySQL Database Server',
    layer: 'Layer 7 (Application)',
    transport: 'TCP',
    description: 'Default listening port for open-source MySQL and MariaDB relational databases.',
    vulnerabilityNote: 'Never expose MySQL directly to the public Internet; bind to localhost or private subnet.',
    mnemonic: 'MySQL = 3306'
  },
  {
    id: 10,
    port: '3389',
    protocol: 'RDP',
    name: 'Remote Desktop Protocol',
    layer: 'Layer 7 (Application)',
    transport: 'TCP / UDP',
    description: 'Microsoft proprietary protocol allowing graphical remote desktop access to Windows workstations and servers.',
    vulnerabilityNote: 'Prime target for ransomware operators (e.g. BlueKeep vulnerability CVE-2019-0708). Require VPN + MFA.',
    mnemonic: 'RDP = 3389 (Windows Remote Desktop)'
  }
];
