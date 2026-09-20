import type { UserProfile } from '../types/user';


const USER_STORAGE_KEY = 'cyberverse_user_profile';

const INITIAL_PROFILE: UserProfile = {
  id: 'usr-student-01',
  username: 'student_defender',
  displayName: 'Alex Rivers',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  level: 3,
  xp: 450,
  xpToNextLevel: 1000,
  streakDays: 4,
  rank: 14,
  completedPaths: ['foundations'],
  completedModules: ['linux-cli-101'],
  completedLabs: ['linux-terminal-lab'],
  completedChallenges: ['ch-1'],
  completedProjects: [],
  achievements: [
    {
      id: 'ach-1',
      title: 'First Terminal Command',
      description: 'Executed your first command inside the CyberVerse Linux Terminal Sandbox.',
      icon: 'Terminal',
      unlockedAt: '2026-08-10',
      category: 'lab'
    },
    {
      id: 'ach-2',
      title: 'Flag Hunter',
      description: 'Successfully extracted your first CTF challenge flag.',
      icon: 'Flag',
      unlockedAt: '2026-08-12',
      category: 'challenge'
    },
    {
      id: 'ach-3',
      title: '4-Day Security Streak',
      description: 'Practiced cybersecurity concepts 4 days in a row.',
      icon: 'Zap',
      unlockedAt: '2026-08-14',
      category: 'streak'
    }
  ],
  joinDate: 'August 2026'
};

export const userService = {
  getUserProfile(): UserProfile {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(INITIAL_PROFILE));
      return INITIAL_PROFILE;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_PROFILE;
    }
  },

  addXP(amount: number, _reason?: string): UserProfile {

    const profile = this.getUserProfile();
    let newXp = profile.xp + amount;
    let newLevel = profile.level;
    let newXpToNextLevel = profile.xpToNextLevel;

    while (newXp >= newXpToNextLevel) {
      newLevel += 1;
      newXp -= newXpToNextLevel;
      newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5);
    }

    const updated: UserProfile = {
      ...profile,
      xp: newXp,
      level: newLevel,
      xpToNextLevel: newXpToNextLevel
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  markLabCompleted(labId: string, xpReward: number): UserProfile {
    const profile = this.getUserProfile();
    if (profile.completedLabs.includes(labId)) return profile;

    const updated: UserProfile = {
      ...profile,
      completedLabs: [...profile.completedLabs, labId]
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return this.addXP(xpReward, `Completed Lab: ${labId}`);
  },

  markChallengeSolved(challengeId: string, xpReward: number): UserProfile {
    const profile = this.getUserProfile();
    if (profile.completedChallenges.includes(challengeId)) return profile;

    const updated: UserProfile = {
      ...profile,
      completedChallenges: [...profile.completedChallenges, challengeId]
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return this.addXP(xpReward, `Solved Challenge: ${challengeId}`);
  }
};
