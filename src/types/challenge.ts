export type ChallengeCategory = 
  | 'Web Security' 
  | 'Linux & Bash' 
  | 'Cryptography' 
  | 'Forensics' 
  | 'Reverse Engineering' 
  | 'Network Security' 
  | 'Log Analysis';

export interface Challenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  description: string;
  scenario: string;
  hint: string;
  flag: string;
  solvedCount: number;
  author: string;
  interactiveLabId?: string;
}
