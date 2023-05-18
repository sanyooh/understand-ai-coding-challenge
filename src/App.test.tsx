import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import useAnnotations from 'hooks/useAnnotations';
import { createMockFrame } from 'models/Frame/mocks';
import useFrameId from 'hooks/useFrameId';

jest.mock('hooks/useAnnotations');

const mockedUseAnnotations = useAnnotations as jest.Mock;

jest.mock('hooks/useFrameId');

const mockedUseFrameId = useFrameId as jest.Mock;
describe('App', () => {
    beforeEach(() => {
        mockedUseAnnotations.mockReturnValue([
            createMockFrame({ label: 'car' }),
            createMockFrame({ label: 'pedestrian' }),
        ]);
        mockedUseFrameId.mockReturnValue('FRAME_ID');
    });

    it('renders', () => {
        render(<App />);
        expect(
            screen.getByText('Understand.ai Coding Challenge')
        ).toBeInTheDocument();
    });

    it('has annotation label options', () => {
        render(<App />);

        fireEvent.mouseDown(screen.getByRole('button'));

        expect(screen.getByText('car')).toBeInTheDocument();
        expect(screen.getByText('pedestrian')).toBeInTheDocument();
    });

    it('select annotation label option', async () => {
        render(<App />);

        expect(screen.queryByTestId('frame')).not.toBeInTheDocument();

        fireEvent.mouseDown(screen.getByRole('button'));
        fireEvent.click(screen.getByText('car'));

        await waitFor(() => {
            expect(screen.getAllByTestId('frame').length).toBe(1);
        });
    });
});
