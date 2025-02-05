import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import PostContext from '../context/PostContext';

const Authentication = () => {
    const { logoutUser, resetInitialLoading } = useContext(PostContext);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    });

    const handleLogoutClick  = async (e) => {
        e.preventDefault();
        try {
                const token = localStorage.getItem('token');
                await logoutUser(token);
                localStorage.removeItem('token');
                resetInitialLoading();
                navigate('/');
            } catch (error) {
                setError('Login failed');
            }
        };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            {isAuthenticated ? (
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogoutClick}
                >
                    Logout
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<LoginIcon />}
                    onClick={handleLoginClick}
                >
                    Login
                </Button>
            )}
        </div>
    );
};

export default Authentication;