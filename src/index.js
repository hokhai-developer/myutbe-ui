import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import store from '~/redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyle>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyle>,
);
