import React from 'react';
import { Route } from 'react-router-dom';

import Authenticated from '../containers/Authenticated'

import Homepage from '../components/Homepage';

const routes = [
  <Route key="1" exact path="/sign-in" component={Homepage}/>,
  <Route key="2" path="" component={Authenticated} />
]

export default routes;
