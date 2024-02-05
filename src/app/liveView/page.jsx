'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { searchGamesData } from '../../actions';
import {
  GamesList,
  FiltersAndSearch,
} from './components';
import {
  DEFAULT_PAGINATION,
  ITEMS_PER_PAGE,
} from '../constants';

export default function LiveViewPage({
  searchParams,
}) {
  const [gamesData, setGamesData] = React.useState([]);
  const [isScreenshotsShown, setIsScreenshotsShown] = React.useState('0');
  const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState(DEFAULT_PAGINATION);

  const handleFilterAndSearchChange = React.useCallback(async () => {
    setGamesData([]);
    setPagination(DEFAULT_PAGINATION);
    setIsBackdropOpen(true);
    const response = await searchGamesData(DEFAULT_PAGINATION, searchParams);

    setGamesData(response.data);
    setPagination({
      page: 1,
      count: response.total > ITEMS_PER_PAGE ? Math.ceil(response.total / ITEMS_PER_PAGE) : 1,
      total: response.total,
    });

    setIsBackdropOpen(false);
  }, [searchParams]);

  React.useEffect(() => {
    handleFilterAndSearchChange();
  }, [handleFilterAndSearchChange]);

  const handlePaginationChange = React.useCallback(async (event, value) => {
    setIsBackdropOpen(true);
    const newPagination = {
      ...pagination,
      page: value,
    };

    setPagination(newPagination);
    window.scrollTo(0, 0);

    const response = await searchGamesData(newPagination, searchParams);

    setGamesData(response.data);
    setIsBackdropOpen(false);
  }, [pagination, searchParams]);

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
            paddingLeft: { xs: '0' },
            paddingRight: { xs: '0' },
          }}
        >
          <GamesList
            gamesData={gamesData}
            isScreenshotsShown={!!Number(isScreenshotsShown)}
          />
         {gamesData && gamesData.length !== 0
           ? (
            <Pagination
                sx={{ marginBottom: '15px' }}
                variant="outlined"
                shape="rounded"
                size="small"
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
