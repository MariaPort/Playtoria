import * as React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';

const DATEFORMATS = {
    ddmmyyyy: 'DD-MM-YYYY'
}

export function GameCard({data}) {
    const {
        id,
        name,
        publisherName,
        releaseDate,
        storeType,
        storeUrl,
        gallery,
        icon,
        isActive
    } = data;

    const parsedDate = React.useMemo(() => {
        return moment(releaseDate).format(DATEFORMATS.ddmmyyyy);
    }, [releaseDate]);

    const parsedGallery = React.useMemo(() => {
        return JSON.parse(gallery).flat();
    }, [gallery]);

    return (
        <Box
            sx={{
                width: '100%', 
                maxWidth: '850px'
            }}
        >
            <Card>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <CardContent>
                        <CardMedia
                            sx={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '5px'
                            }}                    
                            component="img"
                            alt={name}
                            image={icon}
                        />
                    </CardContent>
                    
                    <CardContent
                        sx={{flexGrow: '1'}}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'baseline'
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                {name}
                            </Typography>

                            {
                                !!isActive && (
                                    <Link
                                        target="_blank"
                                        variant="body2"
                                        href={storeUrl}
                                        // onClick={() => {
                                        //     console.info("To publisher's games list");
                                        // }}
                                    >
                                        {`View in ${storeType === 'appstore' ? 'App Store' : 'Google Play'}`}
                                    </Link>
                                )
                            }
                        </Box>
                        
                        {/* 
                        TODO: add publisher page
                        <Link
                            target="_blank"
                            variant="body1"
                            href="/"
                            // onClick={() => {
                            //     console.info("To publisher's games list");
                            // }}
                        >
                            {publisherName}
                        </Link> */}
                        <Typography variant="body1" gutterBottom>
                            {publisherName}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Release date: {parsedDate}
                        </Typography>
                    </CardContent>
                </Box>
                <CardContent>
                <ImageList
                    sx={{
                        gridAutoFlow: 'column',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(160px, 200px)) !important',
                        gridAutoColumns: 'minmax(160px, 200px)',
                        overflowX: 'auto'
                    }}
                    >
                        {parsedGallery.map((image, i) => (
                            <ImageListItem key={i}>
                                <img src={image} loading='lazy' />
                            </ImageListItem>
                        ))}
                </ImageList>

                </CardContent>
                
            </Card>    
        </Box>
    );
}
