// src/types/deblower.ts
import type { Actionability } from './engine';

export type GuardrailId =
    | 'NO_SCRIPTING'
    | 'STRICT_BASELINE'
    | 'ZERO_PROBLEM_SOLVING'
    | 'NEVER_CHASE';

export interface GuardrailRule {
    id: GuardrailId;
    title: string;
    prohibition: string; // What NOT to do
    directive: string;   // What to do instead
}

export interface DePedestalizationPrompt {
    id: string;
    projection: string;  // The distorted anxiety lens
    realityBaseline: string; // The grounded reality
}

export type SomaticCategory = 'THERMAL' | 'AUTONOMIC' | 'SPATIAL';

export interface SomaticResetItem {
    id: string;
    category: SomaticCategory;
    title: string;
    instruction: string;
    durationSeconds: number;
}

export type RedirectionCategory = 'CODE_BUILD' | 'STUDY_ANALYTICAL' | 'PHYSICAL_TASK';

export interface RedirectionTask {
    id: string;
    category: RedirectionCategory;
    title: string;
    actionStep: string;
    minimumMinutes: number;
}

export interface EmergencyLockoutConfig {
    defaultDurationMinutes: number;
    prohibitedActions: string[];
    overridePledge: string;
}

export interface DeblowerProtocolState {
    triggeredBy: Actionability;
    acknowledgedGuardrails: GuardrailId[];
    completedSomaticId: string | null;
    selectedRedirectionId: string | null;
    lockoutExpiresAt: number | null; // Unix timestamp in ms
}