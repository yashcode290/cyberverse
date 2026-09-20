export interface CyberTool {
  id: string;
  name: string;
  category: 'Cryptography' | 'Networking' | 'Encoding' | 'Cheat Sheet';
  description: string;
  iconName: string;
}

export const CYBER_TOOLS: CyberTool[] = [
  {
    id: 'hash-calculator',
    name: 'Cryptographic Hash Generator & Decoder',
    category: 'Cryptography',
    description: 'Compute MD5, SHA-1, SHA-256, and SHA-512 hashes instantly for text strings.',
    iconName: 'Hash'
  },
  {
    id: 'subnet-calculator',
    name: 'IPv4 Subnet & CIDR Calculator',
    category: 'Networking',
    description: 'Calculate subnet masks, broadcast addresses, usable host ranges, and total IPs from CIDR notation (/24, /16).',
    iconName: 'Network'
  },
  {
    id: 'base64-decoder',
    name: 'Base64 & URL Encoder / Decoder',
    category: 'Encoding',
    description: 'Convert raw strings to Base64, URL-encoded format, and hex bytes securely in the browser.',
    iconName: 'Binary'
  },
  {
    id: 'linux-cheatsheet',
    name: 'Linux Security CLI Cheat Sheet',
    category: 'Cheat Sheet',
    description: 'Quick reference for essential Linux commands: permissions (chmod/chown), networking (netstat/ss), process inspection (ps/top), and text filtering.',
    iconName: 'FileCode'
  }
];
