'use client';

import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function Search({
  onSearchChange,
  searchParams,
}) {
  const ref = React.useRef(null);
  const [name, setName] = React.useState(searchParams.name || '');
  const [publisherName, setPublisherName] = React.useState(searchParams.publisherName || '');
  const [description, setDescription] = React.useState(searchParams.description || '');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSearchChange({
      name,
      publisherName,
      description,
    });
  };

  const handleResetForm = () => {
    setName('');
    setPublisherName('');
    setDescription('');

    onSearchChange({
      name: '',
      publisherName: '',
      description: '',
    });
  };

  return (
        <Box sx={{ marginBottom: '25px', paddingLeft: 0 }}>
            <form
                ref={ref}
                onSubmit={handleFormSubmit}
            >
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                    <FormControl sx={{ m: 1, width: 250 }} variant="outlined">
                        <InputLabel htmlFor="searchName">Name</InputLabel>
                        <OutlinedInput
                            id="searchName"
                            type="text"
                            name="name"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 250 }} variant="outlined">
                        <InputLabel htmlFor="searchPublisher">Publisher</InputLabel>
                        <OutlinedInput
                            id="searchPublisher"
                            type="text"
                            name="publisherName"
                            label="Publisher"
                            value={publisherName}
                            onChange={(e) => setPublisherName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 250 }} variant="outlined">
                        <InputLabel htmlFor="searchPublisher">Description</InputLabel>
                        <OutlinedInput
                            id="searchDescription"
                            type="text"
                            name="description"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                </Box>
                <Stack
                    sx={{
                      marginLeft: '10px',
                      marginTop: '15px',
                      justifyContent: 'start',
                    }}
                    spacing={2}
                    direction="row"
                >
                    <Button
                        variant="contained"
                        size="small"
                        type="submit"
                    >
                        Search
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleResetForm}
                    >
                        Reset
                    </Button>
                </Stack>
            </form>
        </Box>
  );
}
