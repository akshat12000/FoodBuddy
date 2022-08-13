import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import {Provider as AlertProvider,positions,transitions} from 'react-alert';
import AlertTemplate  from 'react-alert-template-basic';
import store from './store';

const alertOptions={
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AlertProvider>
  </Provider>
);
