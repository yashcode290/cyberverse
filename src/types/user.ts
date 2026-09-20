export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'learning' | 'lab' | 'challenge' | 'streak';
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  rank: number;
  completedPaths: string[];
  completedModules: string[];
  completedLabs: string[];
  completedChallenges: string[];
  completedProjects: string[];
  achievements: Achievement[];
  joinDate: string;
}
