import { Frame } from 'models/Frame/types';

export const createMockFrame = (overrides: Partial<Frame>): Frame => ({
    x: 1000,
    y: 1000,
    width: 200,
    height: 200,
    label: 'LABEL',
    frameId: 'FRAME_ID',
    annotationId: 'ANNOTATION_ID',
    ...overrides,
});
