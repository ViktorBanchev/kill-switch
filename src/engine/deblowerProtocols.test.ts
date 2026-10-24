// src/core/deblowerProtocols.test.ts
import { describe, it, expect } from 'vitest';
import {
    DE_PEDESTALIZATION_PROMPTS,
    ANTI_SPIRAL_GUARDRAILS,
    SOMATIC_RESETS,
    HIGH_FRICTION_REDIRECTIONS,
    isReleaseValveComplete,
} from './deblowerProtocols';
import type { GuardrailId } from '../types/deblower';

const ALL_GUARDRAILS: GuardrailId[] = [
    'NO_SCRIPTING',
    'STRICT_BASELINE',
    'ZERO_PROBLEM_SOLVING',
    'NEVER_CHASE',
];

describe('Pressure Deblower Protocol Engine', () => {
    it('loads all preset arrays and verifies all 4 guardrail IDs exist', () => {
        expect(DE_PEDESTALIZATION_PROMPTS.length).toBeGreaterThan(0);
        expect(SOMATIC_RESETS.length).toBeGreaterThan(0);
        expect(HIGH_FRICTION_REDIRECTIONS.length).toBeGreaterThan(0);

        // Explicitly verify the 4 guardrail IDs are in the array
        const guardrailIds = ANTI_SPIRAL_GUARDRAILS.map((item) => item.id);
        expect(guardrailIds).toEqual(ALL_GUARDRAILS);
    });

    it('returns false when some guardrails are still unchecked', () => {
        const partialGuardrails: GuardrailId[] = ['NO_SCRIPTING', 'STRICT_BASELINE'];
        expect(
            isReleaseValveComplete(partialGuardrails, 'somatic-cold', 'redirect-code')
        ).toBe(false);
    });

    it('returns false when no somatic reset is selected (null or invalid ID)', () => {
        expect(
            isReleaseValveComplete(ALL_GUARDRAILS, null, 'redirect-code')
        ).toBe(false);

        expect(
            isReleaseValveComplete(ALL_GUARDRAILS, 'fake-somatic-id', 'redirect-code')
        ).toBe(false);
    });

    it('returns false when no redirection task is selected (null or invalid ID)', () => {
        expect(
            isReleaseValveComplete(ALL_GUARDRAILS, 'somatic-cold', null)
        ).toBe(false);

        expect(
            isReleaseValveComplete(ALL_GUARDRAILS, 'somatic-cold', 'fake-redirect-id')
        ).toBe(false);
    });

    it('returns true only when all 4 guardrails, a valid somatic reset, and a valid redirection are selected', () => {
        expect(
            isReleaseValveComplete(ALL_GUARDRAILS, 'somatic-cold', 'redirect-code')
        ).toBe(true);
    });
});