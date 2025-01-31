import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Metadata from '../components/Metadata';
import API_URLS from '../apiConfig';
import metadataConfig from '../metadataConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(API_URLS.LOGIN, { email, password });
        if (response.data.success) {
          localStorage.setItem('userId', response.data.userId);
          navigate('/');
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };
  
    return (
      <div>
        <Metadata {...metadataConfig.login} />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <ErrorMessage message={error} />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  };

export default Login;