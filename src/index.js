import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import reducer from './reducer';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './style.css'

injectTapEventPlugin();

const persistedState = loadState();

let store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(throttle(() => {
  saveState({
    authorization: store.getState().authorization,
    userProfile: store.getState().userProfile
  })
}), 1000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
