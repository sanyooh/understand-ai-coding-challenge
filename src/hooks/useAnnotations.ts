import { useEffect, useState } from 'react';
import data from 'mocks/annotations.json';

interface Frame {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    frameId: string;
    annotationId: string;
}

type Frames = Frame[];

interface AnnotationsResponse {
    result: Frames;
}

const useAnnotations = (): Frames => {
    const [annotations, setAnnotations] = useState<Frames>([]);

    useEffect(() => {
        setAnnotations((data as AnnotationsResponse).result);
    }, []);

    return annotations;
};

export default useAnnotations;
