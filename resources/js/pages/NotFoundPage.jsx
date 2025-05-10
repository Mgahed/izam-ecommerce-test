import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
    return (
        <Box sx={{
            bgcolor: '#fafbfc',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
        }}>
            <Container maxWidth="md">
                <Paper elevation={0} sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 3,
                    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
                    textAlign: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '8px',
                            bgcolor: 'black'
                        }}
                    />

                    <Typography
                        variant="h1"
                        component="h1"
                        fontWeight={900}
                        sx={{
                            fontSize: { xs: '6rem', md: '10rem' },
                            lineHeight: 1,
                            color: 'black',
                            mb: 2
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h4"
                        component="h2"
                        fontWeight={700}
                        sx={{
                            mb: 3,
                            color: 'text.primary'
                        }}
                    >
                        Page Not Found
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            maxWidth: '500px',
                            mx: 'auto'
                        }}
                    >
                        The page you are looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </Typography>

                    <Button
                        component={RouterLink}
                        to="/"
                        variant="contained"
                        startIcon={<HomeIcon />}
                        size="large"
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#333' }
                        }}
                    >
                        Back to Home
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default NotFoundPage;
