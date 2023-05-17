import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useAnnotations from 'hooks/useAnnotations';
import _ from 'lodash';
import image from 'mocks/002_RgbMaster_69426.jpg';
import React, { useMemo, useState } from 'react';

const floatToPixel = (float: number) => `${Math.floor(float)}px`;

const frameId = '002_RgbMaster_69426';

function App() {
    const [selectedGroup, setSelectedGroup] = useState('');
    const data = useAnnotations();
    const groups = useMemo(() => _.groupBy(data, 'label'), [data]);
    const frames = useMemo(() => {
        if (!groups || !selectedGroup) {
            return [];
        }
        const framesGroupedByImage = _.groupBy(
            groups[selectedGroup],
            'frameId'
        );
        return framesGroupedByImage[frameId];
    }, [groups, selectedGroup]);

    return (
        <Box p="20px">
            <h2>Understand.ai Coding Challenge</h2>
            <FormControl sx={{ minWidth: 400, margin: '10px 0' }}>
                <InputLabel id="demo-simple-select-label">
                    Annotation Label
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedGroup}
                    label="Annotation Label"
                    onChange={event => setSelectedGroup(event.target.value)}
                >
                    {Object.keys(groups).map(groupKey => {
                        return <MenuItem value={groupKey}>{groupKey}</MenuItem>;
                    })}
                </Select>
            </FormControl>
            <Box gap="10px"></Box>
            <Box position="relative">
                {frames &&
                    frames.map(item => {
                        return (
                            <Box
                                position="absolute"
                                left={floatToPixel(item.x)}
                                top={floatToPixel(item.y)}
                                width={floatToPixel(item.width)}
                                height={floatToPixel(item.height)}
                                border="1px solid red"
                                color="red"
                            />
                        );
                    })}
                <img src={image} alt="source" />
            </Box>
        </Box>
    );
}

export default App;
