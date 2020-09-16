import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
// import './index.css';

import configureStore from './redux/store/configureStore';
import { startGetUser } from '../src/redux/actions/userAction';
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('root'));
