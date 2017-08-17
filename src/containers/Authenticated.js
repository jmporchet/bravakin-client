import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import { login, addUser } from '../actions';

import TopMenu from '../components/TopMenu'
import Dashboard from '../components/Dashboard';
import Performance from '../components/Performance';
import Preferences from '../components/Preferences';

class Authenticated extends React.Component {
  constructor () {
    super();
    this.state = { access_token: null };
  }

  componentWillMount() {
    fetch('https://private-cb530a-bravakin.apiary-mock.com/me')
    .then((response) => response.json())
    .then((response) => {
      this.props.addUser(response.data.username);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render () {
    if (!this.props.access_token) {
      return <Redirect to="/sign-in" />;
    } else {
      return (
        <div>
          <TopMenu />
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/performance" component={Performance}/>
            <Route path="/preferences" component={Preferences}/>
          </Switch>
        </div>;
      )
    }
  }
}

const mapStateToProps = (state) => ({
  username: state.userProfileDefaultState.username
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  addUser: (user) => dispatch(addUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
