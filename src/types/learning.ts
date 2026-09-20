export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type PathCategory = 
  | 'Foundations' 
  | 'Cybersecurity Core' 
  | 'Web Security' 
  | 'Ethical Hacking' 
  | 'Blue Team' 
  | 'Digital Forensics' 
  | 'Cloud Security' 
  | 'CTF & Missions';

export interface VisualStep {
  title: string;
  description: string;
  highlight?: boolean;
  codeSnippet?: string;
}

export interface VisualFlow {
  title: string;
  description: string;
  steps: VisualStep[];
  comparisonText?: {
    unsafe: string;
    safe: string;
  };
}

export interface DefenseRemediation {
  vulnerabilityDescription: string;
  vulnerableCode: {
    language: string;
    code: string;
  };
  secureCode: {
    language: string;
    code: string;
  };
  keyTakeaways: string[];
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  theorySummary: string;
  detailedTheory?: string;
  visualFlow?: VisualFlow;
  defenseRemediation?: DefenseRemediation;
  hasInteractiveLab: boolean;
  labId?: string;
  quizId?: string;
}

export interface Module {
  id: string;
  pathId: string;
  title: string;
  shortDescription: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  xpReward: number;
  iconName: string;
  lessons: Lesson[];
  prerequisites?: string[];
  isLocked?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  category: PathCategory;
  tagline: string;
  description: string;
  iconName: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  moduleCount: number;
  popular: boolean;
  topics: string[];
  badgeName: string;
  modules: Module[];
}
