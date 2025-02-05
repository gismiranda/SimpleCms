import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: theme.spacing(4),
}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
