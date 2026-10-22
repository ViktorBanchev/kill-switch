import { describe, it, expect } from 'vitest';
import { evaluateThought } from './evaluateThought';
import type { ThoughtAssessment } from '../types/engine';

describe('Kill Switch Evaluation Engine', () => {
    it('dismisses thoughts backed solely by assumptions with zero facts', () => {
        const input: ThoughtAssessment = {
            thought: 'Everyone in the room thinks I am weird',
            facts: [],
            assumptions: [
                { id: '1', description: 'Nobody made direct eye contact', weight: 4 },
                { id: '2', description: 'I felt uncomfortable walking in', weight: 3 },
            ],
            isControllable: false,
        };

        const result = evaluateThought(input);

        expect(result.realityIndex).toBeLessThan(35);
        expect(result.actionability).toBe('LOGICAL_DISMISS');
        expect(result.courtVerdict).toContain('Case Dismissed');
    });

    it('flags controllable, fact-heavy situations as immediate action', () => {
        const input: ThoughtAssessment = {
            thought: 'I might fail the literature essay section tomorrow',
            facts: [
                { id: '1', description: 'Teacher announced essay format on syllabus', weight: 5 },
                { id: '2', description: 'I have not outlined my thesis arguments yet', weight: 4 },
            ],
            assumptions: [],
            isControllable: true,
        };

        const result = evaluateThought(input);

        expect(result.realityIndex).toBeGreaterThanOrEqual(70);
        expect(result.actionability).toBe('IMMEDIATE_ACTION');
        expect(result.courtVerdict).toContain('Valid Docket');
    });

    it('marks high-reality but uncontrollable situations as external constraints', () => {
        const input: ThoughtAssessment = {
            thought: 'The Jenkins build server might go down during evaluation',
            facts: [
                { id: '1', description: 'The lab network had an outage yesterday', weight: 5 },
            ],
            assumptions: [],
            isControllable: false,
        };

        const result = evaluateThought(input);

        expect(result.realityIndex).toBeGreaterThanOrEqual(70);
        expect(result.actionability).toBe('MONITOR_ONLY');
        expect(result.courtVerdict).toContain('Out of Jurisdiction');
    });

    it('recommends monitoring when controllable thought has moderate mixed evidence', () => {
        const input: ThoughtAssessment = {
            thought: 'My project partner might not finish their component on time',
            facts: [
                { id: '1', description: 'They have not pushed commits since Tuesday', weight: 3 },
            ],
            assumptions: [
                { id: '2', description: 'They probably abandoned the project', weight: 2 },
            ],
            isControllable: true,
        };

        const result = evaluateThought(input);

        expect(result.realityIndex).toBeGreaterThanOrEqual(35);
        expect(result.realityIndex).toBeLessThan(70);
        expect(result.actionability).toBe('MONITOR_ONLY');
    });
});