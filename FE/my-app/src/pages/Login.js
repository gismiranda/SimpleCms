import React, { useContext, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import ErrorMessage from '../components/ErrorMessage';
import Metadata from '../components/Metadata';
import PostContext from '../context/PostContext';
import metadataConfig from '../metadataConfig';

const Login = () => {
    const { loginUser } = useContext(PostContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate('/');
        } catch (error) {
            setError('Login failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Metadata {...metadataConfig.login} />
            <Box mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <ErrorMessage message={error} />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;