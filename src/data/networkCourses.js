export const networkCourses = [
  {
    id: 'osi-tcpip',
    title: 'OSI 7-Layer & TCP/IP Protocol Stack',
    category: 'Fundamentals',
    level: 'Beginner',
    duration: '25 mins',
    icon: 'Layers',
    summary: 'Master the backbone of computer networks: The 7 layers of OSI and the 4 layers of TCP/IP.',
    description: `Computer networks rely on standard protocol stacks to transfer data across hardware, routers, and applications worldwide. 

### The OSI 7-Layer Model
1. **Application (Layer 7)**: Human-computer interaction layer (HTTP, HTTPS, DNS, SSH, FTP).
2. **Presentation (Layer 6)**: Data encryption, compression, and formatting (SSL/TLS, JPEG, ASCII).
3. **Session (Layer 5)**: Interhost communication management (NetBIOS, RPC, Sockets).
4. **Transport (Layer 4)**: End-to-end connection reliability and flow control (TCP, UDP).
5. **Network (Layer 3)**: Logical addressing and packet routing across networks (IPv4, IPv6, ICMP, IPsec).
6. **Data Link (Layer 2)**: Physical addressing and node-to-node framing (Ethernet, MAC addresses, ARP, VLANs).
7. **Physical (Layer 1)**: Raw bitstream transmission over physical medium (Cables, Fiber, Wi-Fi radio signals).

### The TCP/IP 4-Layer Model
Modern internet infrastructure uses the simplified TCP/IP model:
- **Application Layer**: Combines OSI L5, L6, and L7.
- **Transport Layer**: Corresponds to OSI L4 (TCP/UDP ports).
- **Internet Layer**: Corresponds to OSI L3 (IP routing).
- **Network Interface**: Combines OSI L1 and L2 (MAC & Physical).`,
    keyTakeaways: [
      'Data flows down the stack during transmission (Encapsulation) and up the stack during reception (Decapsulation).',
      'MAC addresses operate at Layer 2 (Data Link); IP addresses operate at Layer 3 (Network).',
      'TCP provides reliable, ordered data stream; UDP provides lightweight, fast, connectionless delivery.'
    ]
  },
  {
    id: 'tcp-handshake',
    title: 'TCP 3-Way Handshake & Flags Analysis',
    category: 'Traffic Analysis',
    level: 'Intermediate',
    duration: '30 mins',
    icon: 'GitCommit',
    summary: 'Understand how TCP connections are reliably established, maintained, and closed.',
    description: `Transmission Control Protocol (TCP) is a connection-oriented transport protocol. Before any application data is sent, client and server negotiate sequence numbers using the **TCP 3-Way Handshake**.

### The Handshake Sequence
1. **SYN (Synchronize)**: Client sends a TCP segment with \`SYN = 1\` and a random initial sequence number (e.g. \`ISN = 1000\`).
2. **SYN-ACK**: Server responds with \`SYN = 1\`, \`ACK = 1\`, acknowledges client's sequence number (\`ACK = 1001\`), and sends its own sequence number (\`ISN = 5000\`).
3. **ACK**: Client sends final segment with \`ACK = 1\`, acknowledging server's sequence (\`ACK = 5001\`). Connection established!

### Critical TCP Control Flags
- **SYN**: Initiate connection.
- **ACK**: Acknowledge received data.
- **FIN**: Gracefully terminate connection.
- **RST**: Reset connection forcibly (often seen in port scans or security firewall resets).
- **PSH**: Push buffered data immediately to application.
- **URG**: Mark segment as urgent payload.`,
    keyTakeaways: [
      'SYN Floods abuse the handshake by sending thousands of SYN packets without responding to SYN-ACK.',
      'Port scanners use TCP SYN scanning (Stealth Scan) to detect open ports without establishing full connections.',
      'RST flags are generated when connecting to a CLOSED port.'
    ]
  },
  {
    id: 'wireshark-basics',
    title: 'Wireshark Packet Inspection & PCAP Forensics',
    category: 'Packet Analysis',
    level: 'Intermediate',
    duration: '40 mins',
    icon: 'Search',
    summary: 'Learn how to capture, filter, and inspect raw network packets using Wireshark display filters.',
    description: `Wireshark is the industry-standard network packet analyzer. It captures live network traffic and allows deep-dive inspection into header fields and packet payloads.

### Essential Wireshark Display Filters
- **Filter by Protocol**: \`http\`, \`dns\`, \`tcp\`, \`udp\`, \`icmp\`, \`arp\`
- **Filter by IP Address**: \`ip.addr == 192.168.1.10\` or \`ip.src == 10.0.0.1\`
- **Filter by Port**: \`tcp.port == 80\` or \`udp.port == 53\`
- **Filter HTTP Requests**: \`http.request.method == "POST"\`
- **Filter TCP Flags**: \`tcp.flags.syn == 1 && tcp.flags.ack == 0\`
- **Search Plaintext Passwords**: \`frame contains "password"\` or \`http contains "login"\`

### Detecting Anomalies in Traffic
- Unencrypted HTTP credentials in POST payloads.
- High volume of SYN packets to non-standard ports (Port Scan).
- Unsolicited ARP replies mapping multiple IPs to 1 MAC address (ARP Poisoning).`,
    keyTakeaways: [
      'Display filters reduce noise from thousands of background packets.',
      'Right-click any TCP packet -> "Follow TCP Stream" to reconstruct entire unencrypted conversations.',
      'Always inspect payload bytes for sensitive data leaks.'
    ]
  },
  {
    id: 'nmap-scanning',
    title: 'Port Scanning & Nmap Command Mastery',
    category: 'Offensive Security',
    level: 'Intermediate',
    duration: '35 mins',
    icon: 'Radio',
    summary: 'Master Nmap flags, host discovery, OS fingerprinting, and NSE vulnerability scanning scripts.',
    description: `Nmap (Network Mapper) is an open-source utility for network discovery and vulnerability auditing.

### Core Nmap Scan Types
- \`nmap -sS <target>\`: **SYN Stealth Scan** (Fast, doesn't complete full 3-way handshake).
- \`nmap -sT <target>\`: **TCP Connect Scan** (Full handshake, leaves logs in target application).
- \`nmap -sU <target>\`: **UDP Scan** (Checks UDP services like DNS, SNMP, DHCP).
- \`nmap -sV <target>\`: **Service Version Detection** (Probes open ports to determine service name and version).
- \`nmap -O <target>\`: **OS Fingerprinting** (Analyzes TCP/IP stack implementation to guess target OS).
- \`nmap -A <target>\`: **Aggressive Scan** (Enables OS detection, version scanning, script scanning, and traceroute).

### Port Status Categories
1. **Open**: Service is listening and accepting connections.
2. **Closed**: Port is accessible, but no service is listening (responds with TCP RST).
3. **Filtered**: Firewall/filter is blocking probes; Nmap cannot determine state.`,
    keyTakeaways: [
      'Use `-p-` to scan all 65,535 ports instead of default top 1,000 ports.',
      'NSE (Nmap Scripting Engine) allows automated vulnerability testing using scripts (`--script vuln`).',
      'Port scanning without authorization is illegal on public networks.'
    ]
  },
  {
    id: 'network-attacks',
    title: 'Network Attacks: MITM, ARP Poisoning & DDoS',
    category: 'Defensive SOC',
    level: 'Advanced',
    duration: '45 mins',
    icon: 'ShieldAlert',
    summary: 'Analyze Man-in-the-Middle (MITM) attacks, ARP spoofing, DNS poisoning, and DDoS mitigation strategies.',
    description: `Network layer attacks target vulnerable protocol mechanics to intercept traffic, spoof identities, or disrupt services.

### 1. ARP Spoofing / Poisoning (Data Link Layer)
Address Resolution Protocol (ARP) lacks authentication. An attacker sends fake gratuitous ARP replies to the local network:
\`"Target IP 192.168.1.1 is at Attacker MAC 00:11:22:33:44:55"\`
This reroutes all local subnet traffic through the attacker's machine (Man-in-the-Middle).

### 2. DNS Spoofing / Cache Poisoning
Attacker feeds false DNS responses to a resolver or local machine, redirecting users seeking \`bank.com\` to a rogue phishing IP address.

### 3. Distributed Denial of Service (DDoS)
- **SYN Flood**: Exhausts server connection tables with unanswered SYN requests.
- **UDP Amplification**: Abuses open NTP/DNS servers with spoofed victim source IPs to reflect massive traffic.
- **HTTP Layer 7 Flood**: Overwhelms web server application logic with heavy GET requests.`,
    keyTakeaways: [
      'Mitigate ARP spoofing using Dynamic ARP Inspection (DAI) on managed switches.',
      'Enforce HTTPS with HSTS to prevent SSL Stripping during MITM attacks.',
      'Use DNSSEC to cryptographically sign DNS records and stop cache poisoning.'
    ]
  }
];
