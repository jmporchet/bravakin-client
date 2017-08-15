import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import routes from './config/routes';

import TopMenu from './components/TopMenu'

const App = () => (
  <div>
    <Router>
      <div>
        <TopMenu />
        {routes}
      </div>
    </Router>
  </div>
)

export default App;
