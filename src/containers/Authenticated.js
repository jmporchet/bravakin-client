import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import TopMenu from '../components/TopMenu';
import Dashboard from '../components/Dashboard';
import Performance from '../components/Performance';
import Preferences from '../components/Preferences';

class Authenticated extends React.Component {
  constructor () {
    super();
    this.state = { access_token: null };
  }

  componentWillMount() {
    const URL = "https://private-cb530a-bravakin.apiary-mock.com/user";
    return fetch(URL, { method: 'GET'})
       .then((response) => response.json)
       .then((json) => console.log('...........', json))
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
  access_token: state.authorization.access_token
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
