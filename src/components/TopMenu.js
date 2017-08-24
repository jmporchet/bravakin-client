import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

class TopMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="top-menu">
        <div className="container">
          <nav style={{flex:1}}>
            <Link to="/">Dashboard</Link>
            <Link to="/performance">Performance</Link>
            <Link to="/preferences">Preferences</Link>
          </nav>
          <div><span><strong>Bravakin</strong></span></div>
        </div>
      </div>
    )
  }
}

export default TopMenu;
