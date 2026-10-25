// src/components/EmergencyLockout.tsx
import React, { useState, useEffect } from 'react';
import { EMERGENCY_LOCKOUT_CONFIG } from '../engine/deblowerProtocols';

export const LOCKOUT_STORAGE_KEY = 'kill_switch_lockout_expires_at';

export interface EmergencyLockoutProps {
    /**
     * Optional override duration in minutes (defaults to EMERGENCY_LOCKOUT_CONFIG.defaultDurationMinutes = 30)
     */
    durationMinutes?: number;
    onLockoutChange?: (isActive: boolean) => void;
}

export const EmergencyLockout: React.FC<EmergencyLockoutProps> = ({
    durationMinutes = EMERGENCY_LOCKOUT_CONFIG.defaultDurationMinutes,
    onLockoutChange,
}) => {
    const [expiresAt, setExpiresAt] = useState<number | null>(() => {
        const saved = localStorage.getItem(LOCKOUT_STORAGE_KEY);
        if (!saved) return null;
        const parsed = Number(saved);
        return parsed > Date.now() ? parsed : null;
    });

    const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
    const [showOverrideConfirm, setShowOverrideConfirm] = useState(false);

    // Sync countdown every second while active
    useEffect(() => {
        if (!expiresAt) {
            setRemainingSeconds(0);
            onLockoutChange?.(false);
            return;
        }

        const updateTimer = () => {
            const diffMs = expiresAt - Date.now();
            if (diffMs <= 0) {
                localStorage.removeItem(LOCKOUT_STORAGE_KEY);
                setExpiresAt(null);
                setRemainingSeconds(0);
                onLockoutChange?.(false);
            } else {
                setRemainingSeconds(Math.ceil(diffMs / 1000));
                onLockoutChange?.(true);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [expiresAt, onLockoutChange]);

    const handleEngageLockout = () => {
        const targetTime = Date.now() + durationMinutes * 60 * 1000;
        localStorage.setItem(LOCKOUT_STORAGE_KEY, String(targetTime));
        setExpiresAt(targetTime);
        setShowOverrideConfirm(false);
    };

    const handleConfirmPledgeDisarm = () => {
        localStorage.removeItem(LOCKOUT_STORAGE_KEY);
        setExpiresAt(null);
        setShowOverrideConfirm(false);
    };

    const formatTime = (totalSeconds: number): string => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const isActive = expiresAt !== null && remainingSeconds > 0;

    return (
        <section
            className={`rounded-xl border p-6 shadow-lg transition ${isActive
                    ? 'border-rose-500/60 bg-rose-950/25'
                    : 'border-slate-800 bg-slate-900/80'
                }`}
        >
            {/* Header & Countdown Display */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <span
                        className={`inline-block rounded px-2.5 py-0.5 font-mono text-xs font-bold uppercase ${isActive
                                ? 'bg-rose-600 text-white'
                                : 'border border-slate-700 bg-slate-950 text-slate-400'
                            }`}
                    >
                        {isActive
                            ? 'OUTREACH LOCKOUT ACTIVE — DO NOT ENGAGE'
                            : 'IMPULSIVE OUTREACH BLOCKER // STANDBY'}
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold text-white">
                        Emergency Communication Ceasefire
                    </h3>
                </div>

                {isActive ? (
                    <div className="flex items-center gap-3 self-start rounded-lg border border-rose-500/40 bg-slate-950 px-4 py-2 sm:self-auto">
                        <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                            Cooldown:
                        </span>
                        <span
                            data-testid="lockout-timer"
                            className="font-mono text-2xl font-black text-rose-300"
                        >
                            {formatTime(remainingSeconds)}
                        </span>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleEngageLockout}
                        className="self-start rounded-lg bg-rose-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-rose-500 sm:self-auto"
                    >
                        Engage {durationMinutes}m Lockout
                    </button>
                )}
            </div>

            {/* Prohibited Actions List */}
            <div className="mt-5 rounded-lg border border-slate-800/90 bg-slate-950/90 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Strictly Prohibited During Lockout:
                </h4>
                <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {EMERGENCY_LOCKOUT_CONFIG.prohibitedActions.map((action, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-2 text-xs text-slate-300"
                        >
                            <span className="font-bold text-rose-500">✕</span>
                            <span>{action}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Early Disarm / Self-Respect Pledge */}
            {isActive && (
                <div className="mt-4 flex flex-col justify-between gap-3 border-t border-rose-500/20 pt-4 sm:flex-row sm:items-center">
                    {!showOverrideConfirm ? (
                        <>
                            <p className="text-xs text-slate-400">
                                Do not trade your dignity to soothe an unverified assumption.
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowOverrideConfirm(true)}
                                className="self-start text-xs font-semibold text-slate-500 underline hover:text-slate-300 sm:self-auto"
                            >
                                Request Early Disarm
                            </button>
                        </>
                    ) : (
                        <div className="w-full space-y-3 rounded-lg border border-amber-500/40 bg-slate-950 p-4">
                            <p className="text-xs font-semibold text-amber-300">
                                PLEDGE REQUIRED TO DISARM:
                            </p>
                            <blockquote className="border-l-2 border-amber-500 pl-3 text-sm italic text-slate-200">
                                "{EMERGENCY_LOCKOUT_CONFIG.overridePledge}"
                            </blockquote>
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowOverrideConfirm(false)}
                                    className="rounded border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800"
                                >
                                    Keep Lockout Active
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmPledgeDisarm}
                                    className="rounded bg-amber-600 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-500"
                                >
                                    I Accept Pledge & Disarm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};