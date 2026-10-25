// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { CourtroomEvaluator } from './CourtroomEvaluator';

afterEach(() => {
    cleanup()
})

describe('CourtroomEvaluator Component (#8)', () => {
    it('keeps submit button disabled until a thought and at least one evidence item exist', () => {
        render(<CourtroomEvaluator />);

        const submitBtn = screen.getByText(
            'Deliver Court Verdict'
        ) as HTMLButtonElement;
        expect(submitBtn.disabled).toBe(true);

        // 1. Enter thought only -> still disabled
        const thoughtInput = screen.getByLabelText(
            /1. The Accusation \/ Intrusive Hypothesis/i
        );
        fireEvent.change(thoughtInput, {
            target: { value: 'She is avoiding me' },
        });
        expect(submitBtn.disabled).toBe(true);

        // 2. Add an assumption via EvidenceInputList (#7) -> button unlocks
        const assumptionInput = screen.getByPlaceholderText(
            'Add an assumption or hunch...'
        );
        fireEvent.change(assumptionInput, {
            target: { value: 'She walked past quickly' },
        });
        fireEvent.click(screen.getAllByText('+ Add Entry')[1]);

        expect(submitBtn.disabled).toBe(false);
    });

    it('evaluates the docket and displays a dismissed verdict when only assumptions are logged', () => {
        const onVerdictMock = vi.fn();
        render(<CourtroomEvaluator onVerdict={onVerdictMock} />);

        // 1. Type the intrusive thought
        fireEvent.change(
            screen.getByLabelText(/1. The Accusation \/ Intrusive Hypothesis/i),
            { target: { value: 'People are talking behind my back' } }
        );

        // 2. Add an assumption
        const assumptionInput = screen.getByPlaceholderText(
            'Add an assumption or hunch...'
        );
        fireEvent.change(assumptionInput, {
            target: { value: 'Someone glanced over' },
        });
        fireEvent.click(screen.getAllByText('+ Add Entry')[1]);

        // 3. Click Deliver Court Verdict
        fireEvent.click(screen.getByText('Deliver Court Verdict'));

        // 4. Verify the verdict renders
        const preview = screen.getByTestId('verdict-preview');
        expect(preview.textContent).toContain('Reality Index: 0%');
        expect(preview.textContent).toContain('LOGICAL_DISMISS');
        expect(onVerdictMock).toHaveBeenCalledTimes(1);
    });
});