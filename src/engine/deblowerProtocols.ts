// src/core/deblowerProtocols.ts
import type {
    DePedestalizationPrompt,
    GuardrailRule,
    SomaticResetItem,
    RedirectionTask,
    EmergencyLockoutConfig,
    GuardrailId,
} from '../types/deblower';

export const DE_PEDESTALIZATION_PROMPTS: DePedestalizationPrompt[] = [
    {
        id: 'dp-pedestal',
        projection: 'She is the ultimate referee of my value or social standing.',
        realityBaseline:
            'She is an ordinary classmate navigating her own chaotic routine, flaws, and distractions—not a judge in a courtroom.',
    },
    {
        id: 'dp-silence',
        projection: 'A shift in tone, space, or whispers means everything is ruined.',
        realityBaseline:
            'People get tired, overwhelmed, or awkward. Unverified silence or space is neutral data, not a personal indictment.',
    },
    {
        id: 'dp-fix-it',
        projection: 'I need to fix the atmosphere right now to feel okay.',
        realityBaseline:
            'Self-respect comes from holding your own center, never from auditing someone else’s micro-expressions.',
    },
];

export const ANTI_SPIRAL_GUARDRAILS: GuardrailRule[] = [
    {
        id: 'NO_SCRIPTING',
        title: 'No Scripting / Mental Rehearsals',
        prohibition:
            'Do not simulate multi-step conversational branches, hypothetical confrontations, or "if she says X, I will say Y" scenarios.',
        directive:
            'Kill the simulation immediately. Deal only with real-time physical reality when it actually happens.',
    },
    {
        id: 'STRICT_BASELINE',
        title: 'Strict Baseline Interaction',
        prohibition:
            'Zero hovering, zero waiting for micro-reactions, and zero checking peripheral vision to see if you were noticed.',
        directive:
            'Deliver a simple, calm "hey" with brief eye contact if paths cross naturally, then keep moving on your own trajectory.',
    },
    {
        id: 'ZERO_PROBLEM_SOLVING',
        title: 'Zero Unsolicited Problem-Solving',
        prohibition:
            'Hard ban on asking "are we cool?", addressing "last week’s weirdness," or bringing up unverified hallway whispers.',
        directive:
            'Never apologize for or troubleshoot an unconfirmed problem. Let silence stay silent.',
    },
    {
        id: 'NEVER_CHASE',
        title: 'Never Chase or Compete',
        prohibition:
            'Do not force engagement if the environment is loud, crowded, or she is occupied with others.',
        directive:
            'Disengage instantly without internal resentment. Conserve your energy and attention for your own docket.',
    },
];

export const SOMATIC_RESETS: SomaticResetItem[] = [
    {
        id: 'somatic-cold',
        category: 'THERMAL',
        title: 'Thermal Shock (Mammalian Dive Reflex)',
        instruction:
            'Go to the sink right now. Splash ice-cold water on your face and wrists for 30 seconds to force an immediate heart-rate drop.',
        durationSeconds: 30,
    },
    {
        id: 'somatic-vagus',
        category: 'AUTONOMIC',
        title: 'Physiological Sigh (Vagus Nerve Reset)',
        instruction:
            'Two quick inhales through the nose (one deep, one sharp top-off), followed by a slow, extended exhale through the mouth. Repeat 5 cycles.',
        durationSeconds: 60,
    },
    {
        id: 'somatic-spatial',
        category: 'SPATIAL',
        title: 'Hard Spatial Interrupt',
        instruction:
            'Stand up immediately, leave the current room, put the phone in another spot, and change your physical posture for 2 minutes.',
        durationSeconds: 120,
    },
];

export const HIGH_FRICTION_REDIRECTIONS: RedirectionTask[] = [
    {
        id: 'redirect-code',
        category: 'CODE_BUILD',
        title: 'Focused Coding Sprint',
        actionStep:
            'Open your IDE, pick a single component or failing test, and ship one clean commit with zero tab-switching.',
        minimumMinutes: 25,
    },
    {
        id: 'redirect-study',
        category: 'STUDY_ANALYTICAL',
        title: 'Analytical Problem Set',
        actionStep:
            'Work through a structured math exercise, language text summary, or technical documentation outline on paper.',
        minimumMinutes: 25,
    },
    {
        id: 'redirect-physical',
        category: 'PHYSICAL_TASK',
        title: 'Mechanical / Physical Execution',
        actionStep:
            'Execute a tangible hands-on task: organize hardware/tools, clean workspace surfaces, or knock out a quick mechanical maintenance check.',
        minimumMinutes: 20,
    },
];

export const EMERGENCY_LOCKOUT_CONFIG: EmergencyLockoutConfig = {
    defaultDurationMinutes: 30,
    prohibitedActions: [
        'Sending late-night texts or "just checking in" messages',
        'Asking for reassurance or emotional temperature checks',
        'Checking active status, stories, or last-seen timestamps',
        'Drafting long explanations in Notes',
    ],
    overridePledge:
        'I choose self-respect over temporary relief. I will not trade my dignity to soothe an unverified assumption.',
};

export function isReleaseValveComplete(
    acknowledgedGuardrails: GuardrailId[],
    completedSomaticId: string | null,
    selectedRedirectionId: string | null
): boolean {
    const allGuardrailsChecked = ANTI_SPIRAL_GUARDRAILS.every((rule) =>
        acknowledgedGuardrails.includes(rule.id)
    );
    const validSomatic = SOMATIC_RESETS.some((s) => s.id === completedSomaticId);
    const validRedirection = HIGH_FRICTION_REDIRECTIONS.some(
        (r) => r.id === selectedRedirectionId
    );

    return allGuardrailsChecked && validSomatic && validRedirection;
}