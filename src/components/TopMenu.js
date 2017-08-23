import React from 'react';

import { Link } from 'react-router-dom'

const TopMenu = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/performance">Performance</Link></li>
      <li><Link to="/preferences">Preferences</Link></li>
    </ul>

    <hr/>
  </div>
)

export default TopMenu;
