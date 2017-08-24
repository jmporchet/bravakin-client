import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import reducer from './reducer';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let store = createStore(
  reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
