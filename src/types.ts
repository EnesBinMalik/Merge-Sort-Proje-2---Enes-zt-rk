export type PhaseType = 'initial' | 'divide' | 'base' | 'merge' | 'complete';

export interface StepSnapshot {
  id: number;
  title: string;
  phase: PhaseType;
  description: string;
  mathNote?: string;
  activeLevel: number;
  subarrays: number[][];
  comparing?: {
    leftVal: number;
    rightVal: number;
    winnerVal: number;
    leftIdx: number;
    rightIdx: number;
  };
  mergedSoFar?: number[];
  treeState: TreeNodeState[];
  explanationDetail: string;
}

export interface TreeNodeState {
  id: string;
  label: string;
  values: number[];
  level: number;
  status: 'idle' | 'dividing' | 'active' | 'merging' | 'sorted';
  parentId?: string;
  side?: 'left' | 'right' | 'root';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
