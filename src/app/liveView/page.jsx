"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {searchGamesData} from '@/actions';
import {
  GamesList,
  FiltersAndSearch
} from './components';
import {
  DEFAULTPAGINATION,
  ITEMSPERPAGE,
} from '../constants';

export default function LiveViewPage() {
  const [gamesData, setGamesData] = React.useState([]);
  const [formData, setFormData] = React.useState(null);
  const [isScreenshotsShown, setIsScreenshotsShown] = React.useState('0');
  const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState(DEFAULTPAGINATION);

  const handleFilterAndSearchChange = React.useCallback(async (newFormData) => {
    setGamesData([]);
    setPagination(DEFAULTPAGINATION);
    setIsBackdropOpen(true);
    const response = await searchGamesData(newFormData, DEFAULTPAGINATION);

    setFormData(newFormData);
    setGamesData(response.data);
    setPagination({
        page: 1,
        count: response.total > ITEMSPERPAGE ? Math.ceil(response.total / ITEMSPERPAGE) : 1,
        total: response.total
    });

    setIsBackdropOpen(false);
  }, []);

  const handlePaginationChange = React.useCallback(async (event, value) => {
    setIsBackdropOpen(true);
    const newPagination = {
        ...pagination,
        page: value
    }

    setPagination(newPagination);
    const response = await searchGamesData(formData, newPagination);

    setGamesData(response.data);
    setIsBackdropOpen(false);
  }, [formData, pagination]);

  return (
    <Container
      sx={{
        maxWidth: '1170px',
        margin: '0 auto',
        mt: '25px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'start',
        }}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isBackdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <FiltersAndSearch
            onFormsValueChange={handleFilterAndSearchChange}
            isScreenshotsShown={isScreenshotsShown}
            onIsScreenshotsShownChange={setIsScreenshotsShown}
        />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: '3',
            maxWidth: '1000px',
            marginBottom: '15px',
            paddingLeft: {xs: '0'},
            paddingRight: {xs: '0'}
          }}
        >
          <GamesList 
            gamesData={gamesData}
            isScreenshotsShown={!!Number(isScreenshotsShown)}
          />
         {gamesData && gamesData.length !== 0 
          ? (
            <Pagination
                sx={{marginBottom: '15px'}}
                variant="outlined" 
                shape="rounded"
                siblingCount={0}
                onChange={handlePaginationChange}
                count={pagination.count} 
                page={pagination.page}            
            />
          )
          : null}
        </Container>        
      </Container>
    </Container>
  );
}
