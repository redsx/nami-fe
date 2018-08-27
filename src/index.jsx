import React from 'react';
import {render} from 'react-dom';
import App from './app';
import './less/index';

if (module.hot) {
  module.hot.accept();
}

render(
  <App />
  ,
  document.getElementById('app')
);