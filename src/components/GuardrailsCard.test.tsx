// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { GuardrailsCard } from './GuardrailsCard';

afterEach(() => {
    cleanup();
});

describe('GuardrailsCard Component (#14)', () => {
    it('flips a distorted projection card to its grounded baseline when clicked', () => {
        render(
            <GuardrailsCard
                acknowledgedGuardrails={[]}
                onToggleGuardrail={vi.fn()}
            />
        );

        const resetButtons = screen.getAllByText('Reset to Baseline →');
        expect(resetButtons.length).toBeGreaterThan(0);

        fireEvent.click(resetButtons[0]);

        expect(screen.getByText('Grounded Baseline')).toBeTruthy();
    });

    it('calls onToggleGuardrail when a behavioral guardrail checkbox is clicked', () => {
        const handleToggle = vi.fn();

        render(
            <GuardrailsCard
                acknowledgedGuardrails={['NO_SCRIPTING']}
                onToggleGuardrail={handleToggle}
            />
        );

        expect(screen.getByTestId('guardrail-progress').textContent).toContain(
            '1 / 4 Guardrails Locked'
        );

        const strictBaselineCheckbox = screen.getByLabelText(
            /Strict Baseline Interaction/i
        );
        fireEvent.click(strictBaselineCheckbox);

        expect(handleToggle).toHaveBeenCalledWith('STRICT_BASELINE');
    });
});