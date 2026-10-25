import React, { useState } from 'react';
import type { GuardrailId } from '../types/deblower';
import {
    DE_PEDESTALIZATION_PROMPTS,
    ANTI_SPIRAL_GUARDRAILS,
} from '../engine/deblowerProtocols';

export interface GuardrailsCardProps {
    acknowledgedGuardrails: GuardrailId[];
    onToggleGuardrail: (id: GuardrailId) => void;
}

export const GuardrailsCard: React.FC<GuardrailsCardProps> = ({
    acknowledgedGuardrails,
    onToggleGuardrail,
}) => {
    // Track which De-Pedestalization projections the user has flipped to baseline
    const [flippedPrompts, setFlippedPrompts] = useState<string[]>([]);

    const handleFlipPrompt = (id: string) => {
        setFlippedPrompts((prev) =>
            prev.includes(id) ? prev : [...prev, id]
        );
    };

    const totalGuardrails = ANTI_SPIRAL_GUARDRAILS.length;
    const completedCount = acknowledgedGuardrails.length;
    const allAcknowledged = completedCount === totalGuardrails;

    return (
        <section className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
            {/* Section Header */}
            <div className="flex flex-col justify-between gap-2 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
                <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                        STEP 1 // COGNITIVE GROUNDING
                    </span>
                    <h3 className="mt-1 text-xl font-extrabold text-white">
                        De-Pedestalization & Behavioral Guardrails
                    </h3>
                </div>

                <span
                    data-testid="guardrail-progress"
                    className={`self-start rounded-full border px-3 py-1 font-mono text-xs font-bold sm:self-auto ${allAcknowledged
                        ? 'border-emerald-500/40 bg-emerald-950/80 text-emerald-300'
                        : 'border-amber-500/40 bg-amber-950/80 text-amber-300'
                        }`}
                >
                    {completedCount} / {totalGuardrails} Guardrails Locked
                </span>
            </div>

            {/* Part A: De-Pedestalization Reality Flip Cards */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    A. Strip Idealized Projections (Click to Override)
                </h4>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {DE_PEDESTALIZATION_PROMPTS.map((item) => {
                        const isFlipped = flippedPrompts.includes(item.id);

                        return (
                            <div
                                key={item.id}
                                className={`flex flex-col justify-between rounded-lg border p-4 transition ${isFlipped
                                    ? 'border-emerald-500/40 bg-emerald-950/20'
                                    : 'border-rose-500/30 bg-slate-950'
                                    }`}
                            >
                                {!isFlipped ? (
                                    <>
                                        <div>
                                            <span className="inline-block rounded bg-rose-950/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-rose-300">
                                                Distorted Projection
                                            </span>
                                            <p className="mt-2 text-sm font-medium text-slate-200">
                                                "{item.projection}"
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleFlipPrompt(item.id)}
                                            className="mt-4 w-full rounded border border-slate-700 bg-slate-900 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 transition hover:border-amber-500/50 hover:bg-slate-800"
                                        >
                                            Reset to Baseline →
                                        </button>
                                    </>
                                ) : (
                                    <div>
                                        <span className="inline-block rounded bg-emerald-950/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-emerald-300">
                                            Grounded Baseline
                                        </span>
                                        <p className="mt-2 text-sm font-medium text-emerald-100">
                                            {item.realityBaseline}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Part B: The 4 Mandatory Anti-Spiral Guardrails */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    B. Mandatory Behavioral Guardrails (Acknowledge All 4 to Proceed)
                </h4>

                <div className="space-y-3">
                    {ANTI_SPIRAL_GUARDRAILS.map((rule) => {
                        const isChecked = acknowledgedGuardrails.includes(rule.id);

                        return (
                            <label
                                key={rule.id}
                                htmlFor={`guardrail-${rule.id}`}
                                className={`flex cursor-pointer items-start gap-3.5 rounded-lg border p-4 transition ${isChecked
                                    ? 'border-emerald-500/50 bg-emerald-950/20'
                                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                                    }`}
                            >
                                <input
                                    id={`guardrail-${rule.id}`}
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => onToggleGuardrail(rule.id)}
                                    className="mt-1 h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-0"
                                />

                                <div className="space-y-1 text-sm">
                                    <div className="font-bold text-slate-100">{rule.title}</div>
                                    <p className="text-xs text-rose-300/90">
                                        <span className="font-semibold uppercase">Prohibited: </span>
                                        {rule.prohibition}
                                    </p>
                                    <p className="text-xs text-emerald-300/90">
                                        <span className="font-semibold uppercase">Directive: </span>
                                        {rule.directive}
                                    </p>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};