import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import useAnnotations from 'hooks/useAnnotations';
import _ from 'lodash';
import image from 'mocks/002_RgbMaster_69426.jpg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useFrameId from 'hooks/useFrameId';

const floatToPixel = (float: number, divisor: number) =>
    `${Math.floor(float / divisor)}px`;

function App() {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const imageRef = React.useRef<HTMLImageElement | null>(null);
    const [originalHeight, setOriginalHeight] = React.useState(0);
    const [originalWidth, setOriginalWidth] = React.useState(0);
    const [resizedHeight, setResizedHeight] = React.useState(0);
    const [resizedWidth, setResizedWidth] = React.useState(0);
    const [divisorWidth, setDivisorWidth] = React.useState(0);
    const [divisorHeight, setDivisorHeight] = React.useState(0);

    const data = useAnnotations();
    const frameId = useFrameId();
    const groups = useMemo(() => _.groupBy(data, 'label'), [data]);

    const frames = useMemo(() => {
        if (!groups || !selectedGroup) {
            return [];
        }
        const framesGroupedByImage = _.groupBy(
            groups[selectedGroup],
            'frameId'
        );
        setErrorMessage(
            !_.has(framesGroupedByImage, frameId)
                ? `No frames for frameId "${frameId}" were found.`
                : undefined
        );
        return framesGroupedByImage[frameId];
    }, [groups, selectedGroup, frameId]);

    const onResize = useCallback(() => {
        if (imageRef.current) {
            setResizedHeight(imageRef.current.clientHeight);
            setResizedWidth(imageRef.current?.clientWidth);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [onResize, imageRef]);

    useEffect(() => {
        setDivisorWidth(originalWidth / resizedWidth);
        setDivisorHeight(originalHeight / resizedHeight);
    }, [originalWidth, originalHeight, resizedWidth, resizedHeight]);

    return (
        <Box p="20px">
            <h2>Understand.ai Coding Challenge</h2>
            <Box
                display="flex"
                flexDirection="row"
                gap="10px"
                alignItems="center"
            >
                <FormControl sx={{ minWidth: 400, margin: '10px 0' }}>
                    <InputLabel id="annotation-label">
                        Annotation Label
                    </InputLabel>
                    <Select
                        labelId="annotation-select-label"
                        id="annotation-select"
                        value={selectedGroup}
                        label="Annotation Label"
                        onChange={event => setSelectedGroup(event.target.value)}
                    >
                        {Object.keys(groups).map(groupKey => {
                            return (
                                <MenuItem key={groupKey} value={groupKey}>
                                    {groupKey}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Typography color="red">{errorMessage}</Typography>
            </Box>
            <Box position="relative" display="grid" height="100%">
                {frames &&
                    frames.map(item => {
                        return (
                            <Box
                                data-testid="frame"
                                key={item.annotationId}
                                position="absolute"
                                left={floatToPixel(item.x, divisorWidth)}
                                top={floatToPixel(item.y, divisorHeight)}
                                width={floatToPixel(item.width, divisorWidth)}
                                height={floatToPixel(
                                    item.height,
                                    divisorHeight
                                )}
                                border="1px solid red"
                                color="red"
                            />
                        );
                    })}
                <Box
                    ref={imageRef}
                    component="img"
                    src={image}
                    alt="source"
                    maxHeight="100%"
                    maxWidth="100%"
                    onLoad={event => {
                        const image = event.target as HTMLImageElement;
                        setOriginalHeight(image.naturalHeight);
                        setOriginalWidth(image.naturalWidth);
                        setResizedHeight(image.clientHeight);
                        setResizedWidth(image.clientWidth);
                    }}
                />
            </Box>
        </Box>
    );
}

export default App;
