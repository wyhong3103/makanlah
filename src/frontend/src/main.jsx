import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@/store';
import theme from './theme';
import './style.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from '@/config';

const CLIENT_ID = config.googleId;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
