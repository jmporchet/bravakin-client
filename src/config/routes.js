import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Authenticated from '../containers/Authenticated';
import Authorize from '../containers/Authorize';
import Homepage from '../components/Homepage';

const routes = (
  <Switch>
    <Route exact path="/sign-in" component={Homepage}/>
    <Route path="/authorize" component={Authorize} />
    <Route path="" component={Authenticated} />
  </Switch>
);

export default routes;
