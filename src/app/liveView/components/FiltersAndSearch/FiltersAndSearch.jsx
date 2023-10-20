"use client"

import * as React from 'react';
import {Global} from "@emotion/react";
import {styled} from "@mui/material/styles";
import {grey} from "@mui/material/colors";
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import {
    Search,
    DateRangePicker
} from '../index';

const categories = [
    {
        name: 'All',
        value: 'all'
    },
    {
        name: 'Game',
        value: 'Game'
    },
    {
        name: 'Action',
        value: 'Action'
    },
    {
        name: 'Board',
        value: 'Board'
    },
    {
        name: 'Card',
        value: 'Card'
    },
    {
        name: 'Casino',
        value: 'Casino'
    },
    {
        name: 'Casual',
        value: 'Casual'
    },
    {
        name: 'Family',
        value: 'Family'
    },
    {
        name: 'Arcade',
        value: 'Arcade'
    },
    {
        name: 'Music',
        value: 'Music'
    },
    {
        name: 'Puzzle',
        value: 'Puzzle'
    },
    {
        name: 'Racing',
        value: 'Racing'
    },
    {
        name: 'Role Playing',
        value: 'Role Playing'
    },
    {
        name: 'Simulation',
        value: 'Simulation'
    },
    {
        name: 'Sport',
        value: 'Sport'
    },
    {
        name: 'Strategy',
        value: 'Strategy'
    },
    {
        name: 'Trivia',
        value: 'Trivia'
    },
    {
        name: 'Word',
        value: 'Word'
    },
    {
        name: 'Entertainment',
        value: 'Entertainment'
    },
    {
        name: 'Adventure',
        value: 'Adventure'
    },
    {
        name: 'Education',
        value: 'Education'
    }
  ];

export const FiltersAndSearch = React.memo(function FiltersAndSearch ({
    onFormsValueChange = () => {},
    isScreenshotsShown,
    onIsScreenshotsShownChange,
}) {
    const [filterAndSearchData, setFilterAndSearchData] = React.useState({});
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const [storeType, setStoreType] = React.useState('all');
    const [category, setCategory] = React.useState('all');
    

    React.useEffect(() => {
        onFormsValueChange(filterAndSearchData);
    }, [filterAndSearchData, onFormsValueChange]);

    const handleSearchChange = React.useCallback((searchData) => {    
        const newSearchAndFilterData = {
            ...filterAndSearchData,
            ...searchData
        }

        setFilterAndSearchData(newSearchAndFilterData);
    }, [filterAndSearchData]);

    const handleFilterChange = React.useCallback((filterData) => {
        if (filterData.target.name === 'screenshots') return;

        setFilterAndSearchData({
            ...filterAndSearchData,
            [filterData.target.name]: filterData.target.value,
        });
       
    }, [filterAndSearchData]);
      
    const handleCategoryChange = React.useCallback((event) => {
        setCategory(event.target.value)
        handleFilterChange(event);
    }, [handleFilterChange]);

    const handleIsScreenShotsShownChange = React.useCallback((event) => {
        onIsScreenshotsShownChange(event.target.value);
    }, [onIsScreenshotsShownChange]);

    const toggleDrawer = () => (event) => {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //   return;
        // }
    
        setIsDrawerOpen(!isDrawerOpen);
    };

    const Puller = styled(Box)(({ theme }) => ({
        width: 6,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 3,
        backgroundColor: theme.palette.mode === "light" ? grey[200] : grey[900]
      }));

    const innerForms = React.useMemo(() => (
        <Paper
                sx={{
                    p: '10px 12px',
                    maxWidth: '300px',
                    height: '100%'
                }}
            >
                <Search onSearchChange={handleSearchChange} />

                <form onChange={handleFilterChange}>
                    {/* <FormControl sx={{m: 1, marginBottom: '25px'}}>
                        <FormLabel id="screenshots">Screenshots</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="screenshots"
                            name="screenshots"
                            value={isScreenshotsShown}
                            onChange={handleIsScreenShotsShownChange}
                        >
                            <FormControlLabel value={1} control={<Radio />} label="On" />
                            <FormControlLabel value={0} control={<Radio />} label="Off" />
                        </RadioGroup>
                    </FormControl> */}

                    <FormControl sx={{m: 1, marginBottom: '25px'}}>
                        <FormLabel id="storetype">Store Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="storetype"
                            name="storeType"
                            value={storeType}
                            onChange={(e) => setStoreType(e.target.value)}
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="appstore" control={<Radio />} label="App Store" />
                            <FormControlLabel value="googleplay" control={<Radio />} label="Google Play" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 250, marginBottom: '25px'}}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            name="category"
                            label="Category"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(({name, value}) => (
                                <MenuItem
                                    key={name}
                                    value={value}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <DateRangePicker onFilterChange={handleFilterChange}/>
                </form>
        </Paper>
    ), [
        category,
        handleCategoryChange,
        handleFilterChange,
        handleIsScreenShotsShownChange,
        handleSearchChange,
        isScreenshotsShown,
        storeType
    ]);
    
    return (
        <>
            <Global
                styles={{
                ".MuiDrawer-root > .MuiPaper-root": {
                    overflow: "visible"
                }
                }}
            />
            <Box sx={{display: {xs: 'none', md: 'block'}, flexGrow: '1'}}>
                {innerForms}
            </Box>
            <Box sx={{display: {xs: 'block', md: 'none'}, flexGrow: '1'}}>
                <Drawer
                    sx={{display: {md: 'none'}}}
                    open={isDrawerOpen}
                    onClose={toggleDrawer()}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            visibility: 'visible',
                            width: '100%',
                            right: 0,
                            left: 0
                        }}
                    >
                        <Button 
                            sx={{
                                padding: "9px 7px",
                                zIndex: '-1',
                                minWidth: 0,
                                position: 'absolute',
                                top: '80px',
                                right: '-18px'
                            }}
                            onClick={toggleDrawer()} 
                            variant="contained"
                        >
                            <Puller />
                        </Button>
                    </Box>
                    {innerForms}
                </Drawer>
            </Box>
        </>        
    );
});
