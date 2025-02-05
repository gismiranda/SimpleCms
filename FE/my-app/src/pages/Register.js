import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Divider, Card, CardContent } from '@mui/material';
import PostContext from '../context/PostContext';
import Metadata from '../components/Metadata';
import metadataConfig from '../metadataConfig';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const { registerUser } = useContext(PostContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      navigate('/');
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Metadata {...metadataConfig.createPost} />
      <Card>
        <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Register
            </Typography>
            <Divider />
            <Container component="main" maxWidth="sm">
              <form onSubmit={handleRegister}>
              <TextField
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                />
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
                  label="Title"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <ErrorMessage message={message} />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
              </form>
            </Container>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;