import { useState, useEffect } from 'react';
import type { UserProfile } from '../types/user';

import { userService } from '../services/userService';

export function useUserProgress() {
  const [profile, setProfile] = useState<UserProfile>(() => userService.getUserProfile());

  useEffect(() => {
    const p = userService.getUserProfile();
    setProfile(p);
  }, []);

  const addXP = (amount: number, reason: string) => {
    const updated = userService.addXP(amount, reason);
    setProfile(updated);
  };

  const completeLab = (labId: string, xpReward: number) => {
    const updated = userService.markLabCompleted(labId, xpReward);
    setProfile(updated);
  };

  const solveChallenge = (challengeId: string, xpReward: number) => {
    const updated = userService.markChallengeSolved(challengeId, xpReward);
    setProfile(updated);
  };

  return {
    profile,
    addXP,
    completeLab,
    solveChallenge
  };
}
