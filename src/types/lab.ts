export type LabType = 'terminal' | 'sqli' | 'xss' | 'log_analysis' | 'network' | 'crypto';

export interface LabTask {
  id: string;
  title: string;
  instructions: string;
  hint?: string;
  targetFlag?: string;
  completed: boolean;
}

export interface LabEnvironment {
  id: string;
  title: string;
  type: LabType;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  xpReward: number;
  tasks: LabTask[];
  initialState?: Record<string, unknown>;
}
