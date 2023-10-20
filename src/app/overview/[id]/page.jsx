"use client"

import * as React from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import {
    useParams,
    notFound,
} from 'next/navigation'
import {
    Container,
    Typography,
    Paper,
    Box,
    ImageList,
    ImageListItem,
    CardContent,
    CardMedia,
    Link,
    Backdrop,
    CircularProgress,
    Chip,
    Skeleton,
    Stack,
} from '@mui/material';
import {searchGameDataById} from '@/actions';
import {DATEFORMATS} from '../../constants';

function OverviewID() {
    const [isNoGameData, setIsNoGameData] = React.useState(false);
    const [gameData, setGameData] = React.useState(null);
    const [isBackdropOpen, setIsBackdropOpen] = React.useState(true);
    const {id} = useParams();

    React.useEffect(() => {
        const getGamesData = async () => {
            const response = await searchGameDataById(id);

            if (response.length === 0) {
                setIsNoGameData(true);
            }

            setGameData(response[0]);
            setIsBackdropOpen(false);
        }
        
        setIsBackdropOpen(true);
        getGamesData();
    }, []);

    const parsedDate = React.useMemo(() => {
        return gameData ? moment(gameData.releaseDate).format(DATEFORMATS.ddmmyyyy) : '';
    }, [gameData]);

    const parsedGallery = React.useMemo(() => {
        return gameData ? JSON.parse(gameData.gallery).flat() : [];
    }, [gameData]);

    const parsedDescription = React.useMemo(() => {
        return gameData ? parse(gameData.description) : '';
    }, [gameData]);

    if (isNoGameData) {
        return notFound()
    }

    return !isBackdropOpen 
        ? (
            <>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isBackdropOpen}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Container
                    sx={{
                        maxWidth: '1170px',
                        margin: '0 auto',
                        mt: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Paper
                        sx={{
                            marginBottom: '15px',
                            padding: '10px'
                        }}
                        elevation={6}
                    >
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
                                        width: {xs: '80px', md: '100px'},
                                        height:  {xs: '80px', md: '100px'},
                                        borderRadius: '5px'
                                    }}                    
                                    component="img"
                                    alt={gameData.name}
                                    image={gameData.icon}
                                />
                            </CardContent>
                            
                            <CardContent sx={{flexGrow: '1'}}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {xs: 'column', md: 'row'},
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline',
                                        marginBottom: {xs: '10px'}
                                    }}
                                >
                                    <Typography 
                                            sx={{
                                                maxWidth: '360px',
                                                paddingRight: '5px',
                                                marginBottom: {xs: '0'}
                                            }}
                                            variant="h5"
                                            gutterBottom
                                    >
                                        {gameData.name}
                                    </Typography>            

                                    {
                                        !!gameData.isActive
                                        ? (
                                            <Link
                                                sx={{width: '128px', textAlign: {xs: 'left', md: 'right'}}}
                                                target="_blank"
                                                variant="body2"
                                                href={gameData.storeUrl}
                                                // onClick={() => {
                                                //     console.info("To publisher's games list");
                                                // }}
                                            >
                                                {`View in ${gameData.storeType === 'appstore' ? 'App Store' : 'Google Play'}`}
                                            </Link>
                                        )
                                        : (
                                            <Chip label="Depricated" color="error" variant="outlined" />
                                        )
                                    }
                                </Box>
                                
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h7" gutterBottom>
                                        Publisher: {gameData.publisherName}
                                    </Typography>
                                   
                                    <Typography variant="h7" gutterBottom>
                                        Release date: {parsedDate}
                                    </Typography>
                                    
                                    <Typography variant="h7" gutterBottom>
                                        Category: {gameData.categoryName}
                                    </Typography>

                                    <Typography variant="h7" gutterBottom>
                                        Price: {gameData.price == '0' ? 'FREE' : gameData.price}
                                    </Typography>
                                </Stack>
                                
                            </CardContent>
                        </Box>
                    </Paper>

                    <Paper
                        sx={{
                            marginBottom: '15px',
                            padding: '20px'
                        }}
                        elevation={6}
                    >
                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Description:
                        </Typography>
                        <Typography
                            variant="body1"
                            gutterBottom
                        >
                            {parsedDescription}                    
                        </Typography>
                    </Paper>

                    <Paper
                        sx={{
                            marginBottom: '15px',
                            padding: '20px'
                        }}
                        elevation={6}
                    >
                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Screenshots:
                        </Typography>
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
                    </Paper>
                </Container>
            </>
        )
    : (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Skeleton
                sx={{
                    margin: '0 auto',
                    maxWidth: '1170px'
                }}
                style={{
                    marginBottom: '15px',
                    marginTop: '15px',
                }}
                variant="rounded"
                animation="vawe"
                height={215}
            />
            <Skeleton
                style={{
                    maxWidth: '1170px',
                    margin: '0 auto',
                    display: 'block'
                }}
                variant="rounded"
                animation="wave"
                height={350}
            />
        </>        
    )
};

export default OverviewID;

