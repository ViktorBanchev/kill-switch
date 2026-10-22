export type CertaintyWeight = 1 | 2 | 3 | 4 | 5;

export interface EvidenceItem {
  id: string;
  description: string;
  weight: CertaintyWeight; // 1 = pure hunch, 5 = undeniable physical proof / direct quote
}

export interface ThoughtAssessment {
  thought: string;
  facts: EvidenceItem[];       // Verifiable, external evidence
  assumptions: EvidenceItem[]; // Mind-reading, emotional projections, hunches
  isControllable: boolean;     // Can you physically take an action on this today?
}

export type Actionability = 
  | 'IMMEDIATE_ACTION' 
  | 'LOGICAL_DISMISS' 
  | 'MONITOR_ONLY';

export interface AssessmentVerdict {
  realityIndex: number;        // 0 to 100
  actionability: Actionability;
  courtVerdict: string;
}