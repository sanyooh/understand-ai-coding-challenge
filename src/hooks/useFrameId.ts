import { useEffect, useState } from 'react';

const useFrameId = (): string => {
    const [frameId, setFrameId] = useState('');

    useEffect(() => {
        setFrameId('002_RgbMaster_69426');
    }, []);

    return frameId;
};

export default useFrameId;
