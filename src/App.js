import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import routes from './config/routes';

const App = () => (
  <div>
    <Router>
      <div>
        {routes}
      </div>
    </Router>
  </div>
)

export default App;
