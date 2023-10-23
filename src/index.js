import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {  configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';

import './styles/index.css';
import App from './components/App';
import devActions from './reducers/devReducers';
import rootSaga from './sagas';
import AuthContextProvider from './contexts/AuthContextProvider';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer:  devActions.reducer,
  middleware: [sagaMiddleware]
});



sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider >
      <Provider store={store} >
          <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
