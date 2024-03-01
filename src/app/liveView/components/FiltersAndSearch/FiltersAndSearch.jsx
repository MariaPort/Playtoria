'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
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

import { Search } from '../Search';
import { DateRangePicker } from '../DateRangePicker';

export const categories = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Games',
    value: 'Games',
  },
  {
    name: 'Action',
    value: 'Action',
  },
  {
    name: 'Board',
    value: 'Board',
  },
  {
    name: 'Card',
    value: 'Card',
  },
  {
    name: 'Casino',
    value: 'Casino',
  },
  {
    name: 'Casual',
    value: 'Casual',
  },
  {
    name: 'Family',
    value: 'Family',
  },
  {
    name: 'Arcade',
    value: 'Arcade',
  },
  {
    name: 'Music',
    value: 'Music',
  },
  {
    name: 'Puzzle',
    value: 'Puzzle',
  },
  {
    name: 'Racing',
    value: 'Racing',
  },
  {
    name: 'Role Playing',
    value: 'Role Playing',
  },
  {
    name: 'Simulation',
    value: 'Simulation',
  },
  {
    name: 'Sport',
    value: 'Sport',
  },
  {
    name: 'Strategy',
    value: 'Strategy',
  },
  {
    name: 'Trivia',
    value: 'Trivia',
  },
  {
    name: 'Word',
    value: 'Word',
  },
  {
    name: 'Entertainment',
    value: 'Entertainment',
  },
  {
    name: 'Adventure',
    value: 'Adventure',
  },
  {
    name: 'Education',
    value: 'Education',
  },
];

const removeEmptyAttributes = (obj) => {
  Object.keys(obj).forEach(
    // eslint-disable-next-line no-param-reassign
    (key) => !obj[key] && delete obj[key],
  );

  return obj;
};

export const FiltersAndSearch = React.memo(({
  onFormsValueChange = () => {},
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchParamsObj = React.useMemo(() => {
    const objFromEntries = Object.fromEntries([...searchParams]);
    return objFromEntries;
  }, [searchParams]);

  const [filterAndSearchData, setFilterAndSearchData] = React.useState(searchParamsObj || {});
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [storeType, setStoreType] = React.useState('all');
  const [category, setCategory] = React.useState('all');

  React.useEffect(() => {
    onFormsValueChange();
  }, [onFormsValueChange]);

  const handleFilterAndSearchDataChanged = React.useCallback((newFilterAndSearchData) => {
    const newSearchParams = new URLSearchParams(newFilterAndSearchData);

    if (newSearchParams.toString()) {
      router.push(`/liveView?${newSearchParams.toString()}`);
    } else {
      router.push('/liveView');
    }
    // onFormsValueChange();
  }, [router]);

  const handleSearchChange = React.useCallback((searchData) => {
    const newFilterAndSearchData = removeEmptyAttributes({
      ...filterAndSearchData,
      ...searchData,
    });

    setFilterAndSearchData(newFilterAndSearchData);
    handleFilterAndSearchDataChanged(newFilterAndSearchData);
  }, [filterAndSearchData, handleFilterAndSearchDataChanged]);

  const handleFilterChange = React.useCallback((filterData) => {
    if (filterData.target.name === 'screenshots') return;

    const newFilterAndSearchData = {
      ...filterAndSearchData,
      [filterData.target.name]: filterData.target.value,
    };
    setFilterAndSearchData(newFilterAndSearchData);
    handleFilterAndSearchDataChanged(newFilterAndSearchData);
  }, [filterAndSearchData, handleFilterAndSearchDataChanged]);

  const handleCategoryChange = React.useCallback((event) => {
    setCategory(event.target.value);
    handleFilterChange(event);
  }, [handleFilterChange]);

  const toggleDrawer = () => () => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    setIsDrawerOpen(!isDrawerOpen);
  };

  const Puller = styled(Box)(({ theme }) => ({
    width: 6,
    height: 30,
    borderRadius: 3,
    backgroundColor: theme.palette.mode === 'light' ? grey[200] : grey[900],
  }));

  const innerForms = React.useMemo(() => (
        <Paper
                sx={{
                  p: '10px 12px',
                  maxWidth: '300px',
                  height: '100%',
                }}
            >
                <Search
                  onSearchChange={handleSearchChange}
                  searchParams={searchParamsObj}
                />

                <form onChange={handleFilterChange}>
                    <FormControl sx={{ m: 1, marginBottom: '25px' }}>
                        <FormLabel id="storetype">Store Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="storetype"
                            name="storeType"
                            value={searchParamsObj.storeType || storeType}
                            onChange={(e) => setStoreType(e.target.value)}
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="appstore" control={<Radio />} label="App Store" />
                            <FormControlLabel value="googleplay" control={<Radio />} label="Google Play" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 250, marginBottom: '25px' }}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            name="category"
                            label="Category"
                            value={searchParamsObj.category || category}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(({ name, value }) => (
                                <MenuItem
                                    key={name}
                                    value={value}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <DateRangePicker
                      onFilterChange={handleFilterChange}
                      searchParams={searchParamsObj}
                    />
                </form>
        </Paper>
  ), [category,
    handleCategoryChange,
    handleFilterChange,
    handleSearchChange,
    searchParamsObj,
    storeType]);

  return (
        <>
            <Global
                styles={{
                  '.MuiDrawer-root > .MuiPaper-root': {
                    overflow: 'visible',
                  },
                }}
            />
            <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: '1' }}>
                {innerForms}
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' }, flexGrow: '1' }}>
                <Drawer
                    sx={{ display: { md: 'none' } }}
                    open={isDrawerOpen}
                    onClose={toggleDrawer()}
                    ModalProps={{
                      keepMounted: true,
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
                          left: 0,
                        }}
                    >
                        <Button
                            sx={{
                              padding: '9px 7px',
                              zIndex: '-1',
                              minWidth: 0,
                              position: 'absolute',
                              top: '80px',
                              right: '-18px',
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

FiltersAndSearch.displayName = 'FiltersAndSearch';
