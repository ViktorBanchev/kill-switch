import type { ThoughtAssessment, AssessmentVerdict } from '../types/engine';

export function evaluateThought(input: ThoughtAssessment): AssessmentVerdict {
	const { facts, assumptions, isControllable } = input;

	const factWeight = facts.reduce((sum, item) => sum + item.weight, 0);
	const assumptionWeight = assumptions.reduce((sum, item) => sum + item.weight, 0);
	const totalWeight = factWeight + assumptionWeight;

	let realityIndex = 0;
	if (factWeight > 0 && totalWeight > 0) {
		realityIndex = Math.round((factWeight / totalWeight) * 100);
	}

	if (realityIndex < 35) {
		return {
			realityIndex,
			actionability: 'LOGICAL_DISMISS',
			courtVerdict:
				'Case Dismissed: Speculative Noise / Inadmissible. Insufficient empirical facts to sustain this thought.',
		};
	}

	if (realityIndex >= 70) {
		if (isControllable) {
			return {
				realityIndex,
				actionability: 'IMMEDIATE_ACTION',
				courtVerdict:
					'Valid Docket: Substantiated by hard facts and within your direct control. Execute a concrete step now.',
			};
		} else {
			return {
				realityIndex,
				actionability: 'MONITOR_ONLY',
				courtVerdict:
					'Out of Jurisdiction: Factually grounded, but depends on external constraints outside your control. Detach and monitor.',
			};
		}
	}

	return {
		realityIndex,
		actionability: 'MONITOR_ONLY',
		courtVerdict:
			'Inconclusive Evidence: Mixed factual and speculative signals. Hold off on impulsive action and wait for verifiable data.',
	};
}