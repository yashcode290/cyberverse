export const packetCaptures = [
  {
    id: 'capture-1',
    title: 'Plaintext Credential Leak (HTTP POST)',
    description: 'User logging into an unencrypted HTTP web portal. Find the leaked username and password!',
    difficulty: 'Easy',
    challengeQuestion: 'What is the leaked password submitted in Frame 4?',
    correctAnswer: 'SuperSecret2026!',
    hint: 'Look for Frame 4 (HTTP POST request) and check the HTTP Form Data payload.',
    packets: [
      {
        id: 1,
        time: '0.000000',
        source: '192.168.1.105',
        destination: '10.0.4.15',
        protocol: 'TCP',
        length: 74,
        info: '54210 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
        details: {
          frame: 'Frame 1: 74 bytes on wire',
          ethernet: 'Src: 00:11:22:33:44:55, Dst: 00:aa:bb:cc:dd:ee',
          ip: 'Internet Protocol Version 4, Src: 192.168.1.105, Dst: 10.0.4.15',
          tcp: 'Transmission Control Protocol, Src Port: 54210, Dst Port: 80, Flags: [SYN]',
          payload: 'No Payload Data (Handshake Segment)'
        }
      },
      {
        id: 2,
        time: '0.012430',
        source: '10.0.4.15',
        destination: '192.168.1.105',
        protocol: 'TCP',
        length: 74,
        info: '80 → 54210 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0',
        details: {
          frame: 'Frame 2: 74 bytes on wire',
          ethernet: 'Src: 00:aa:bb:cc:dd:ee, Dst: 00:11:22:33:44:55',
          ip: 'Internet Protocol Version 4, Src: 10.0.4.15, Dst: 192.168.1.105',
          tcp: 'Transmission Control Protocol, Src Port: 80, Dst Port: 54210, Flags: [SYN, ACK]',
          payload: 'No Payload Data (Handshake Segment)'
        }
      },
      {
        id: 3,
        time: '0.012890',
        source: '192.168.1.105',
        destination: '10.0.4.15',
        protocol: 'TCP',
        length: 66,
        info: '54210 → 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
        details: {
          frame: 'Frame 3: 66 bytes on wire',
          ethernet: 'Src: 00:11:22:33:44:55, Dst: 00:aa:bb:cc:dd:ee',
          ip: 'Internet Protocol Version 4, Src: 192.168.1.105, Dst: 10.0.4.15',
          tcp: 'Transmission Control Protocol, Src Port: 54210, Dst Port: 80, Flags: [ACK]',
          payload: 'Handshake Complete'
        }
      },
      {
        id: 4,
        time: '0.045120',
        source: '192.168.1.105',
        destination: '10.0.4.15',
        protocol: 'HTTP',
        length: 312,
        info: 'POST /login.php HTTP/1.1 (application/x-www-form-urlencoded)',
        details: {
          frame: 'Frame 4: 312 bytes on wire',
          ethernet: 'Src: 00:11:22:33:44:55, Dst: 00:aa:bb:cc:dd:ee',
          ip: 'Internet Protocol Version 4, Src: 192.168.1.105, Dst: 10.0.4.15',
          tcp: 'Transmission Control Protocol, Src Port: 54210, Dst Port: 80, Flags: [PSH, ACK]',
          http: 'POST /login.php HTTP/1.1\\r\\nHost: 10.0.4.15\\r\\nContent-Type: application/x-www-form-urlencoded\\r\\nContent-Length: 42',
          payload: 'username=admin_sec&password=SuperSecret2026!&submit=Login'
        }
      },
      {
        id: 5,
        time: '0.089400',
        source: '10.0.4.15',
        destination: '192.168.1.105',
        protocol: 'HTTP',
        length: 450,
        info: 'HTTP/1.1 200 OK (text/html)',
        details: {
          frame: 'Frame 5: 450 bytes on wire',
          ethernet: 'Src: 00:aa:bb:cc:dd:ee, Dst: 00:11:22:33:44:55',
          ip: 'Internet Protocol Version 4, Src: 10.0.4.15, Dst: 192.168.1.105',
          tcp: 'Transmission Control Protocol, Src Port: 80, Dst Port: 54210',
          http: 'HTTP/1.1 200 OK\\r\\nSet-Cookie: SESSIONID=9f8e7d6c5b4a\\r\\n',
          payload: '<html><body>Welcome Admin! Login successful.</body></html>'
        }
      }
    ]
  },
  {
    id: 'capture-2',
    title: 'ARP Poisoning / Spoofing MITM Attack',
    description: 'Suspicious network behavior detected on local Ethernet segment. Identify the attacker MAC address!',
    difficulty: 'Intermediate',
    challengeQuestion: 'What is the MAC address of the malicious node performing ARP poisoning?',
    correctAnswer: '00:c0:ca:99:88:77',
    hint: 'Look for duplicate unsolicited ARP replies claiming 192.168.1.1 is at a new MAC.',
    packets: [
      {
        id: 1,
        time: '0.000000',
        source: '00:11:22:33:44:55',
        destination: 'ff:ff:ff:ff:ff:ff',
        protocol: 'ARP',
        length: 42,
        info: 'Who has 192.168.1.1? Tell 192.168.1.105',
        details: {
          frame: 'Frame 1: 42 bytes on wire',
          ethernet: 'Src: 00:11:22:33:44:55, Dst: Broadcast (ff:ff:ff:ff:ff:ff)',
          arp: 'Address Resolution Protocol (request), Sender MAC: 00:11:22:33:44:55, Sender IP: 192.168.1.105, Target IP: 192.168.1.1',
          payload: 'ARP Request for Gateway IP'
        }
      },
      {
        id: 2,
        time: '0.001200',
        source: '00:aa:bb:cc:dd:ee',
        destination: '00:11:22:33:44:55',
        protocol: 'ARP',
        length: 42,
        info: '192.168.1.1 is at 00:aa:bb:cc:dd:ee',
        details: {
          frame: 'Frame 2: 42 bytes on wire',
          ethernet: 'Src: 00:aa:bb:cc:dd:ee (Legitimate Gateway), Dst: 00:11:22:33:44:55',
          arp: 'Address Resolution Protocol (reply), Sender IP: 192.168.1.1, Sender MAC: 00:aa:bb:cc:dd:ee',
          payload: 'Legitimate ARP Reply'
        }
      },
      {
        id: 3,
        time: '2.140000',
        source: '00:c0:ca:99:88:77',
        destination: '00:11:22:33:44:55',
        protocol: 'ARP',
        length: 42,
        info: '192.168.1.1 is at 00:c0:ca:99:88:77 (Gratuitous ARP)',
        details: {
          frame: 'Frame 3: 42 bytes on wire [MALICIOUS ANOMALY]',
          ethernet: 'Src: 00:c0:ca:99:88:77 (Attacker NIC), Dst: 00:11:22:33:44:55',
          arp: 'Address Resolution Protocol (gratuitous reply), Sender IP: 192.168.1.1, Sender MAC: 00:c0:ca:99:88:77',
          payload: 'POISONED ARP: Rerouting victim traffic to 00:c0:ca:99:88:77'
        }
      }
    ]
  },
  {
    id: 'capture-3',
    title: 'DNS Exfiltration & Tunneling Anomaly',
    description: 'Suspicious subdomains detected in outbound DNS TXT query records. Decrypt the secret exfiltrated flag!',
    difficulty: 'Advanced',
    challengeQuestion: 'What is the secret word hidden in the base64 DNS query prefix in Frame 2?',
    correctAnswer: 'CTF_NET_PROT_2026',
    hint: 'Inspect Frame 2 info: Q0ZGX05FVF9QUk9UXzIwMjY=.exfil.malware.com. Decode the base64 prefix!',
    packets: [
      {
        id: 1,
        time: '0.000000',
        source: '10.0.2.15',
        destination: '8.8.8.8',
        protocol: 'DNS',
        length: 84,
        info: 'Standard query 0x1a2b A google.com',
        details: {
          frame: 'Frame 1: 84 bytes',
          ethernet: 'Src: 00:0c:29:1f:2e:3b, Dst: 00:50:56:ea:21:01',
          ip: 'Src: 10.0.2.15, Dst: 8.8.8.8',
          dns: 'Domain Name System (query), Query: google.com: type A, class IN',
          payload: 'Normal DNS Query'
        }
      },
      {
        id: 2,
        time: '1.204500',
        source: '10.0.2.15',
        destination: '8.8.8.8',
        protocol: 'DNS',
        length: 124,
        info: 'Standard query 0x9f8e TXT Q0ZGX05FVF9QUk9UXzIwMjY=.exfil.malware.com',
        details: {
          frame: 'Frame 2: 124 bytes [DNS TUNNELING ANOMALY]',
          ethernet: 'Src: 00:0c:29:1f:2e:3b, Dst: 00:50:56:ea:21:01',
          ip: 'Src: 10.0.2.15, Dst: 8.8.8.8',
          dns: 'Domain Name System (query), Query: Q0ZGX05FVF9QUk9UXzIwMjY=.exfil.malware.com: type TXT, class IN',
          payload: 'Base64 Encoded Payload: Q0ZGX05FVF9QUk9UXzIwMjY='
        }
      }
    ]
  }
];
