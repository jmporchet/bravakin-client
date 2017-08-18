import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import { login, saveInstagramToken } from '../actions';



// {/* Authorize will parse the access token from the query string,
//   will save it in the store/dispatching the action to the reducer and will
//   redirect to Dashboard */}

class Authorize extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  componentWillMount () {
    const access_token = window.location.hash.split('=')[1];
    this.props.saveInstagramToken(access_token);
    this.props.login('','');
  }

  render () {
    if (this.props.access_token) {
      return <Redirect to="/preferences" />;
    } else {
      return (
        <div>
          <h2>test {this.props.access_token}</h2>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token,
  loggedIn: state.authorization.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  saveInstagramToken: (access_token) => dispatch(saveInstagramToken(access_token)),
  login: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
