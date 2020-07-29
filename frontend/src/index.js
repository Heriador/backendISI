import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import generateStore from './redux/store';

const store = generateStore();

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
  </Provider>
, document.getElementById('root'));

