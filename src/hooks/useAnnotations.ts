import { useEffect, useState } from 'react';
import data from 'mocks/annotations.json';
import { Frames } from 'models/Frame/types';

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
