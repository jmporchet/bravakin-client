import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Authenticated from '../containers/Authenticated';
import Authorize from '../containers/Authorize';

import Homepage from '../components/Homepage';

const routes = (
  <Switch>
    <Route key="1" exact path="/sign-in" component={Homepage}/>
    <Route key="2" path="/authorize" component={Authorize} />
    <Route key="00" path="" component={Authenticated} />
  </Switch>
);

export default routes;
