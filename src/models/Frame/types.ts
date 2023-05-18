export interface Frame {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    frameId: string;
    annotationId: string;
}

export type Frames = Frame[];
