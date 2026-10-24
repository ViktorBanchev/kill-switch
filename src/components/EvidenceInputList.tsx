import React from "react";
import type { CertaintyWeight, EvidenceItem } from "../types/engine";

export const WEIGHT_LABELS: Record<CertaintyWeight, string> = {
    1: '1 - Pure Hunch / Vibe',
    2: '2 - Weak Inference',
    3: '3 - Plausible Observation',
    4: '4 - Strong Direct Signal',
    5: '5 - Undeniable Physical Proof',
};

export const EVIDENCE_LIST_UI = {
    weightLabel: 'Weight:',
    addButton: '+ Add Entry',
    emptyState: 'No entries logged yet.',
    removeButton: 'Remove',
} as const;

export interface EvidenceInputListProps {
    title: string;
    subtitle: string;
    placeholder: string;
    variant: 'facts' | 'assumptions';
    items: EvidenceItem[];
    onAdd: (description: string, weight: CertaintyWeight) => void;
    onRemove: (id: string) => void;
}

export const EvidenceInputList: React.FC<EvidenceInputListProps> = ({
    title,
    subtitle,
    placeholder,
    variant,
    items,
    onAdd,
    onRemove,
}) => {
    const handleAddAction = (formData: FormData) => {
        const rawDescription = formData.get('description');
        const rawWeight = formData.get('weight');

        const trimmed = typeof rawDescription === 'string' ? rawDescription.trim() : '';
        if (!trimmed) return;

        const parsedWeight = Number(rawWeight) as CertaintyWeight;
        const validWeight: CertaintyWeight = parsedWeight >= 1 && parsedWeight <= 5 ? parsedWeight : 3;

        onAdd(trimmed, validWeight)
    };

    const isFacts = variant === 'facts';
    const borderAccent = isFacts ? 'border-emerald-500/40' : 'border-amber-500/40';
    const badgeStyle = isFacts
        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
        : 'bg-amber-950/80 text-amber-300 border-amber-500/40';
    const buttonStyle = isFacts
        ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
        : 'bg-amber-600 hover:bg-amber-500 text-slate-950';

    return (
        <section
            className={`rounded-xl border ${borderAccent} bg-slate-900/70 p-5 shadow-lg`}
        >
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight text-slate-100">
                        {title}
                    </h3>
                    <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeStyle}`}
                    >
                        {items.length} {items.length === 1 ? 'entry' : 'entries'}
                    </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
            </div>

            {/* Input Form using React 19 Form Action */}
            <form action={handleAddAction} className="mb-4 space-y-3">
                <div>
                    <input
                        type="text"
                        name="description"
                        required
                        placeholder={placeholder}
                        aria-label={title}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-400 focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-400">
                            {EVIDENCE_LIST_UI.weightLabel}
                        </label>
                        <select
                            name="weight"
                            defaultValue={3}
                            aria-label="Certainty Weight"
                            className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 focus:border-slate-400 focus:outline-none"
                        >
                            {([1, 2, 3, 4, 5] as CertaintyWeight[]).map((w) => (
                                <option key={w} value={w}>
                                    {WEIGHT_LABELS[w]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${buttonStyle}`}
                    >
                        {EVIDENCE_LIST_UI.addButton}
                    </button>
                </div>
            </form>

            {/* Entries List */}
            {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-800 py-6 text-center text-xs text-slate-500">
                    {EVIDENCE_LIST_UI.emptyState}
                </div>
            ) : (
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/90 px-3.5 py-2.5 text-sm text-slate-200"
                        >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <span
                                    className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-xs font-bold ${badgeStyle}`}
                                    title={WEIGHT_LABELS[item.weight]}
                                >
                                    W:{item.weight}
                                </span>
                                <span className="truncate">{item.description}</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => onRemove(item.id)}
                                aria-label={`Remove ${item.description}`}
                                className="shrink-0 rounded px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-rose-950/60 hover:text-rose-400"
                            >
                                {EVIDENCE_LIST_UI.removeButton}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}