import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { login } from '../actions';

import Dashboard from '../components/Dashboard';
import Performance from '../components/Performance';
import Preferences from '../components/Preferences';

class Authenticated extends React.Component {
  constructor () {
    super();
    this.state = { loggedIn: false };
  }

  componentDidMount () {
    console.log(this.props.loggedIn);
  }

  render() {
    return <div>
      <Route exact path="/" component={Dashboard}/>
      <Route path="/performance" component={Performance}/>
      <Route path="/preferences" component={Preferences}/>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authorization.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
