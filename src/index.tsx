import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';
import { worker } from './mocks/browser';

import './index.css';

if (process.env.REACT_APP_NODE_ENV === 'development') {
  worker.start();
} else {
  worker.stop();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
