"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

// TODO: Add validation
export function DateRangePicker({onFilterChange}) {
    const [validationMessage, setValidationMessage] = React.useState('');
    const [startDate, setStartDate] = React.useState(moment(new Date('2010-04-01T00:00:00.000Z')));
    const [endDate, setEndDate] = React.useState(moment(new Date()));

    const handleDateChange = React.useCallback((name, value) => {
        const newDate = new Date(value.toDate().setHours(0, 0, 0, 0)).toISOString();

        name === 'startDate' ? setStartDate(value) : setEndDate(value);

        onFilterChange({
            target: {
                name,
                value: newDate
            }
        }); 
    }, [onFilterChange]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <FormLabel sx={{ marginBottom: '5px'}} id="releaseDate">Release Date</FormLabel>
            <FormControl sx={{ m: 1, width: 250}}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="From"
                            value={startDate}
                            onChange={(e) => handleDateChange('startDate', e)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ m: 1, width: 250, marginBottom: '25px'}}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="To"
                            value={endDate}
                            onChange={(e) => handleDateChange('endDate', e)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
        </Box>
    );
}
