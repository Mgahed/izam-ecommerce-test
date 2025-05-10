import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    Alert,
    CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await dispatch(register(name, email, password, passwordConfirmation));
            navigate('/');
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat();
                setError(errorMessages.join(', '));
            } else {
                setError(
                    error.response?.data?.message ||
                    'Failed to register. Please try again.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fafbfc', py: 6 }}>
            <Container maxWidth="xs">
                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)', minWidth: 350 }}>
                    <Typography variant="h4" component="h1" align="center" fontWeight={700} gutterBottom>
                        Create an Account
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
                        Please fill in the details to register
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoFocus
                            variant="outlined"
                            sx={{ borderRadius: 2, bgcolor: '#fafbfc' }}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            variant="outlined"
                            sx={{ borderRadius: 2, bgcolor: '#fafbfc' }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            variant="outlined"
                            sx={{ borderRadius: 2, bgcolor: '#fafbfc' }}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            variant="outlined"
                            sx={{ borderRadius: 2, bgcolor: '#fafbfc' }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', borderRadius: 2, fontWeight: 600, fontSize: 16, boxShadow: 'none', '&:hover': { bgcolor: '#222' } }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link component={RouterLink} to="/login" sx={{ fontWeight: 600, color: 'black' }}>
                                    Sign in
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterPage;
