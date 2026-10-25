// src/components/SomaticRedirection.tsx
import React, { useState } from 'react';
import type { RedirectionCategory } from '../types/deblower';
import {
    SOMATIC_RESETS,
    HIGH_FRICTION_REDIRECTIONS,
} from '../engine/deblowerProtocols';

export interface SomaticRedirectionProps {
    completedSomaticId: string | null;
    onSelectSomatic: (id: string) => void;
    selectedRedirectionId: string | null;
    onSelectRedirection: (id: string) => void;
}

const CATEGORY_FILTERS: Array<{
    label: string;
    value: RedirectionCategory | 'ALL';
}> = [
        { label: 'All Tasks', value: 'ALL' },
        { label: 'Code / Build', value: 'CODE_BUILD' },
        { label: 'Study / Analytical', value: 'STUDY_ANALYTICAL' },
        { label: 'Physical Task', value: 'PHYSICAL_TASK' },
    ];

export const SomaticRedirection: React.FC<SomaticRedirectionProps> = ({
    completedSomaticId,
    onSelectSomatic,
    selectedRedirectionId,
    onSelectRedirection,
}) => {
    const [activeCategory, setActiveCategory] = useState<
        RedirectionCategory | 'ALL'
    >('ALL');

    const filteredTasks =
        activeCategory === 'ALL'
            ? HIGH_FRICTION_REDIRECTIONS
            : HIGH_FRICTION_REDIRECTIONS.filter(
                (task) => task.category === activeCategory
            );

    return (
        <div className="space-y-6 text-slate-100">
            {/* Step 2: Biological / Somatic State Interruption */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                            STEP 2 // BIOLOGICAL NERVOUS SYSTEM OVERRIDE
                        </span>
                        <h3 className="mt-1 text-xl font-extrabold text-white">
                            Somatic State Interruption
                        </h3>
                    </div>
                    <span
                        data-testid="somatic-status"
                        className={`self-start rounded-full border px-3 py-1 font-mono text-xs font-bold sm:self-auto ${completedSomaticId
                                ? 'border-emerald-500/40 bg-emerald-950/80 text-emerald-300'
                                : 'border-slate-700 bg-slate-950 text-slate-400'
                            }`}
                    >
                        {completedSomaticId ? 'Protocol Engaged' : 'Select 1 Protocol'}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {SOMATIC_RESETS.map((item) => {
                        const isSelected = completedSomaticId === item.id;

                        return (
                            <div
                                key={item.id}
                                className={`flex flex-col justify-between rounded-lg border p-4 transition ${isSelected
                                        ? 'border-cyan-500 bg-cyan-950/25 shadow-md'
                                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                                    }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-cyan-300">
                                            {item.category}
                                        </span>
                                        <span className="font-mono text-xs font-semibold text-slate-400">
                                            {item.durationSeconds}s
                                        </span>
                                    </div>

                                    <h4 className="mt-2 text-sm font-bold text-white">
                                        {item.title}
                                    </h4>

                                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                                        {item.instruction}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onSelectSomatic(item.id)}
                                    className={`mt-4 w-full rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition ${isSelected
                                            ? 'bg-cyan-500 text-slate-950'
                                            : 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                                        }`}
                                >
                                    {isSelected ? '✓ Protocol Locked' : 'Engage Somatic Reset'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Step 3: High-Friction Cognitive / Physical Redirection */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
                <div className="flex flex-col justify-between gap-2 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-400">
                            STEP 3 // HIGH-FRICTION REDIRECTION
                        </span>
                        <h3 className="mt-1 text-xl font-extrabold text-white">
                            Tangible Execution Lock-In
                        </h3>
                    </div>

                    <span
                        data-testid="task-status"
                        className={`self-start rounded-full border px-3 py-1 font-mono text-xs font-bold sm:self-auto ${selectedRedirectionId
                                ? 'border-emerald-500/40 bg-emerald-950/80 text-emerald-300'
                                : 'border-slate-700 bg-slate-950 text-slate-400'
                            }`}
                    >
                        {selectedRedirectionId
                            ? 'Execution Target Locked'
                            : 'Select 1 Target'}
                    </span>
                </div>

                {/* Category Filter Tabs */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {CATEGORY_FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() => setActiveCategory(filter.value)}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${activeCategory === filter.value
                                    ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Redirection Task Cards */}
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {filteredTasks.map((task) => {
                        const isSelected = selectedRedirectionId === task.id;

                        return (
                            <div
                                key={task.id}
                                className={`flex flex-col justify-between rounded-lg border p-4 transition ${isSelected
                                        ? 'border-indigo-500 bg-indigo-950/25 shadow-md'
                                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                                    }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-indigo-300">
                                            {task.category}
                                        </span>
                                        <span className="font-mono text-xs font-semibold text-slate-400">
                                            {task.minimumMinutes}m min
                                        </span>
                                    </div>

                                    <h4 className="mt-2 text-sm font-bold text-white">
                                        {task.title}
                                    </h4>

                                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                                        {task.actionStep}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onSelectRedirection(task.id)}
                                    className={`mt-4 w-full rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition ${isSelected
                                            ? 'bg-indigo-500 text-white'
                                            : 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                                        }`}
                                >
                                    {isSelected ? '✓ Target Locked' : 'Commit to Task'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};