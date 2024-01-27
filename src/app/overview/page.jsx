import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {redirect} from 'next/navigation'

export default function Overview() {
    redirect('/liveView');

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
            <Typography>APP PAGE</Typography>
        </Container>
    );
}
