// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { EmergencyLockout, LOCKOUT_STORAGE_KEY } from './EmergencyLockout';

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
});

describe('EmergencyLockout Component (#15)', () => {
    it('starts in standby mode and activates the 30-minute timer when clicked', () => {
        const onLockoutChangeMock = vi.fn();
        render(
            <EmergencyLockout
                durationMinutes={30}
                onLockoutChange={onLockoutChangeMock}
            />
        );

        // Initially in standby mode
        expect(
            screen.getByText(/IMPULSIVE OUTREACH BLOCKER \/\/ STANDBY/i)
        ).toBeTruthy();

        // Click to engage lockout
        const engageBtn = screen.getByText('Engage 30m Lockout');
        fireEvent.click(engageBtn);

        // Timer appears at 30:00 and saves target timestamp to localStorage
        expect(screen.getByTestId('lockout-timer').textContent).toBe('30:00');
        expect(localStorage.getItem(LOCKOUT_STORAGE_KEY)).not.toBeNull();
        expect(onLockoutChangeMock).toHaveBeenLastCalledWith(true);
    });

    it('automatically resumes an active lockout from localStorage on page reload', () => {
        // Simulate a lockout set to expire 10 minutes (600,000 ms) in the future
        const tenMinutesFromNow = Date.now() + 10 * 60 * 1000;
        localStorage.setItem(LOCKOUT_STORAGE_KEY, String(tenMinutesFromNow));

        render(<EmergencyLockout durationMinutes={30} />);

        // Should immediately boot into active mode without clicking the button
        expect(
            screen.getByText(/OUTREACH LOCKOUT ACTIVE — DO NOT ENGAGE/i)
        ).toBeTruthy();
        expect(screen.getByTestId('lockout-timer').textContent).toBe('10:00');
    });

    it('requires acknowledging the override pledge before disarming early', () => {
        render(<EmergencyLockout durationMinutes={30} />);

        // 1. Activate lockout
        fireEvent.click(screen.getByText('Engage 30m Lockout'));
        expect(screen.getByTestId('lockout-timer')).toBeTruthy();

        // 2. Click Request Early Disarm -> reveals the dignity pledge
        fireEvent.click(screen.getByText('Request Early Disarm'));
        expect(
            screen.getByText(/I choose self-respect over temporary relief/i)
        ).toBeTruthy();

        // 3. Confirm pledge -> clears lockout and removes localStorage key
        fireEvent.click(screen.getByText('I Accept Pledge & Disarm'));
        expect(screen.queryByTestId('lockout-timer')).toBeNull();
        expect(localStorage.getItem(LOCKOUT_STORAGE_KEY)).toBeNull();
    });
});