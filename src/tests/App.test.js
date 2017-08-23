import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducer';

it('renders without crashing', () => {

  let store = createStore(reducer);

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}><App /></Provider>, div);
});
