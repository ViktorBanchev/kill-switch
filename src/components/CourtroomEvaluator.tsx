// src/components/CourtroomEvaluator.tsx
import React, { useState } from 'react';
import type {
    EvidenceItem,
    CertaintyWeight,
    AssessmentVerdict,
} from '../types/engine';
import { evaluateThought } from '../engine/evaluateThought';
import { EvidenceInputList } from './EvidenceInputList';

export interface CourtroomEvaluatorProps {
    onVerdict?: (verdict: AssessmentVerdict, thought: string) => void;
}

export const CourtroomEvaluator: React.FC<CourtroomEvaluatorProps> = ({
    onVerdict,
}) => {
    const [thought, setThought] = useState('');
    const [facts, setFacts] = useState<EvidenceItem[]>([]);
    const [assumptions, setAssumptions] = useState<EvidenceItem[]>([]);
    const [isControllable, setIsControllable] = useState<boolean>(false);
    const [verdict, setVerdict] = useState<AssessmentVerdict | null>(null);

    const handleAddFact = (description: string, weight: CertaintyWeight) => {
        setFacts((prev) => [
            ...prev,
            { id: crypto.randomUUID(), description, weight },
        ]);
    };

    const handleRemoveFact = (id: string) => {
        setFacts((prev) => prev.filter((item) => item.id !== id));
    };

    const handleAddAssumption = (
        description: string,
        weight: CertaintyWeight
    ) => {
        setAssumptions((prev) => [
            ...prev,
            { id: crypto.randomUUID(), description, weight },
        ]);
    };

    const handleRemoveAssumption = (id: string) => {
        setAssumptions((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEvaluateDocket = () => {
        const trimmedThought = thought.trim();
        if (!trimmedThought) return;

        const result = evaluateThought({
            thought: trimmedThought,
            facts,
            assumptions,
            isControllable,
        });

        setVerdict(result);
        onVerdict?.(result, trimmedThought);
    };

    const handleClearDocket = () => {
        setThought('');
        setFacts([]);
        setAssumptions([]);
        setIsControllable(false);
        setVerdict(null);
    };

    const canEvaluate =
        thought.trim().length > 0 && (facts.length > 0 || assumptions.length > 0);

    return (
        <div className="mx-auto max-w-5xl space-y-6 p-4 text-slate-100">
            {/* Module Header */}
            <header className="rounded-xl border border-slate-800 bg-slate-900/90 p-6 shadow-md">
                <span className="inline-block rounded border border-indigo-500/40 bg-indigo-950/60 px-2.5 py-0.5 font-mono text-xs font-semibold text-indigo-300">
                    MODULE 1 // THE COURTROOM ENGINE
                </span>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                    Thought Docket & Evidence Stratification
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                    Separate observable physical reality from mind-reading and hallway
                    noise before granting any thought your energy.
                </p>
            </header>

            {/* Step 1: Intrusive Thought Input */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
                <label
                    htmlFor="intrusive-thought-input"
                    className="block text-sm font-bold uppercase tracking-wider text-slate-300"
                >
                    1. The Accusation / Intrusive Hypothesis
                </label>
                <input
                    id="intrusive-thought-input"
                    type="text"
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="e.g., Everyone is acting distant because of what happened last week..."
                    className="mt-2.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:border-indigo-400 focus:outline-none"
                />
            </section>

            {/* Evidence Stratification Columns (Two instances of #7) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <EvidenceInputList
                    title="Hard Empirical Facts"
                    subtitle="Observable physical reality, timestamps, or direct verbal confirmations."
                    placeholder="Add a verifiable fact..."
                    variant="facts"
                    items={facts}
                    onAdd={handleAddFact}
                    onRemove={handleRemoveFact}
                />

                <EvidenceInputList
                    title="Inadmissible Inferences & Hearsay"
                    subtitle="Perceived body language, whispers, mind-reading, or emotional projections."
                    placeholder="Add an assumption or hunch..."
                    variant="assumptions"
                    items={assumptions}
                    onAdd={handleAddAssumption}
                    onRemove={handleRemoveAssumption}
                />
            </div>

            {/* Step 2: Controllability / Jurisdiction Toggle */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    2. Jurisdiction Check (Controllability)
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                    Can I physically execute a concrete, productive action to resolve this
                    today?
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => setIsControllable(true)}
                        className={`rounded-lg border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${isControllable
                                ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                            }`}
                    >
                        YES — Within My Control
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsControllable(false)}
                        className={`rounded-lg border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${!isControllable
                                ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                                : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                            }`}
                    >
                        NO — External / Uncontrollable
                    </button>
                </div>
            </section>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={handleClearDocket}
                    className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:bg-slate-800"
                >
                    Clear Docket
                </button>

                <button
                    type="button"
                    disabled={!canEvaluate}
                    onClick={handleEvaluateDocket}
                    className="rounded-lg bg-indigo-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Deliver Court Verdict
                </button>
            </div>

            {/* Inline Verdict Preview (To be upgraded in #9 VerdictGavelCard) */}
            {verdict && (
                <div
                    data-testid="verdict-preview"
                    className="rounded-xl border border-slate-700 bg-slate-950 p-5"
                >
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-slate-400">
                            Reality Index: {verdict.realityIndex}%
                        </span>
                        <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-indigo-300">
                            {verdict.actionability}
                        </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-100">
                        {verdict.courtVerdict}
                    </p>
                </div>
            )}
        </div>
    );
};