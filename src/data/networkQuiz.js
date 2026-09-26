export const networkQuiz = [
  {
    id: 1,
    question: 'Which layer of the OSI model does a Layer 3 Network Switch or Router primarily operate at?',
    options: [
      'Layer 2 (Data Link)',
      'Layer 3 (Network Layer)',
      'Layer 4 (Transport Layer)',
      'Layer 7 (Application Layer)'
    ],
    correctIndex: 1,
    explanation: 'Routers and Layer 3 switches operate at Layer 3 (Network Layer) where IP addressing and routing decisions occur.'
  },
  {
    id: 2,
    question: 'What is the correct order of TCP flags sent during the standard 3-Way Handshake connection establishment?',
    options: [
      'ACK → SYN → SYN-ACK',
      'SYN → SYN-ACK → ACK',
      'FIN → ACK → RST',
      'SYN → ACK → FIN'
    ],
    correctIndex: 1,
    explanation: 'The TCP handshake sequence begins with SYN from client, SYN-ACK from server, and final ACK from client.'
  },
  {
    id: 3,
    question: 'An attacker sends unsolicited ARP responses mapping the gateway IP (192.168.1.1) to their own MAC address. What attack is taking place?',
    options: [
      'DNS Cache Poisoning',
      'ARP Spoofing / Poisoning (Man-in-the-Middle)',
      'SYN Flood DDoS',
      'SQL Injection'
    ],
    correctIndex: 1,
    explanation: 'ARP Spoofing misleads local devices into mapping IP addresses to the attacker MAC address, enabling traffic interception.'
  },
  {
    id: 4,
    question: 'Which Nmap scan flag performs a "SYN Stealth Scan" without completing the full TCP 3-way handshake?',
    options: [
      '-sT',
      '-sU',
      '-sS',
      '-sV'
    ],
    correctIndex: 2,
    explanation: '`-sS` performs a TCP SYN scan, which sends a SYN packet and waits for SYN-ACK or RST without sending the final ACK.'
  },
  {
    id: 5,
    question: 'Which port and protocol combination is used by default for secure encrypted web traffic (HTTPS)?',
    options: [
      'Port 80 / TCP',
      'Port 443 / TCP',
      'Port 53 / UDP',
      'Port 22 / TCP'
    ],
    correctIndex: 1,
    explanation: 'Port 443 with TCP is the universal standard for HTTPS (HTTP over TLS/SSL encryption).'
  },
  {
    id: 6,
    question: 'In Wireshark, which display filter will filter traffic to display ONLY HTTP POST request methods?',
    options: [
      'http.request.method == "POST"',
      'ip.addr == post',
      'tcp.port == 8080',
      'http contains "get"'
    ],
    correctIndex: 0,
    explanation: '`http.request.method == "POST"` filters Wireshark packets specifically for HTTP POST requests.'
  }
];
