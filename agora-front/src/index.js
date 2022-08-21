import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './store/config';
import { Container } from './components';
import './index.global.css';

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Container/>
    </PersistGate>
  </Provider>
);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Root />);
