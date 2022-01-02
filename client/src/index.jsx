import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppContainer } from './containers/AppContainer';

ReactDOM.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.getElementById('app'),
);
