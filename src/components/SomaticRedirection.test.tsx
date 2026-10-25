// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { SomaticRedirection } from './SomaticRedirection';

afterEach(() => {
    cleanup();
});

describe('SomaticRedirection Component (#16)', () => {
    it('triggers onSelectSomatic with "somatic-cold" when first biological reset is clicked', () => {
        const onSelectSomaticMock = vi.fn();

        render(
            <SomaticRedirection
                completedSomaticId={null}
                onSelectSomatic={onSelectSomaticMock}
                selectedRedirectionId={null}
                onSelectRedirection={vi.fn()}
            />
        );

        expect(screen.getByTestId('somatic-status').textContent).toBe(
            'Select 1 Protocol'
        );

        const engageButtons = screen.getAllByText('Engage Somatic Reset');
        fireEvent.click(engageButtons[0]);

        expect(onSelectSomaticMock).toHaveBeenCalledWith('somatic-cold');
    });

    it('filters redirection tasks by category and triggers onSelectRedirection with "redirect-code"', () => {
        const onSelectRedirectionMock = vi.fn();

        render(
            <SomaticRedirection
                completedSomaticId="somatic-cold"
                onSelectSomatic={vi.fn()}
                selectedRedirectionId={null}
                onSelectRedirection={onSelectRedirectionMock}
            />
        );

        // Filter to CODE_BUILD tasks only
        fireEvent.click(screen.getByText('Code / Build'));

        const commitButtons = screen.getAllByText('Commit to Task');
        expect(commitButtons.length).toBe(1);

        fireEvent.click(commitButtons[0]);
        expect(onSelectRedirectionMock).toHaveBeenCalledWith('redirect-code');
    });
});