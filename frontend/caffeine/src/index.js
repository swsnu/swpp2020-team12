import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store, { history } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.xsrfCookieName= 'csrftoken';
axios.defaults.xsrfHeaderName='X-CSRFToken';

ReactDOM.render(
  <Provider store={store}> <App history={history} /> </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
