import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import AuthProvider from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyle>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalStyle>
);
