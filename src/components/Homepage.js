import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InstagramLogin from 'react-instagram-login';
import { login } from '../actions';

import conf from '../private/conf';
import FontAwesome from 'react-fontawesome';

class Homepage extends React.Component {

  responseOK = (response) => {
    // response will be a user Object provided by bravakin-server
    // Save it into the state

    // Account for new/returning users to redirect the user to /dashboard

  }

  responseNotOK = (error) => {

  }

  loginClick = () => {
    // temporary solution to get the token without redirecting to bravakin-server
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${conf.INSTAGRAM_CLIENT_ID}&redirect_uri=${conf.OAUTH_CB_URL}&response_type=token`
  }

  render () {
    if (this.props.loggedIn) {
      return <Redirect to="/preferences" />;
    } else {
      return (
        <div>
          <h1>Sign in</h1>
          <hr />
          {/* <InstagramLogin
            clientId={conf.INSTAGRAM_CLIENT_ID}
            onSuccess={responseOK}
            onFailure={this.responseNotOK}
            redirectUri={conf.OAUTH_CB_URL}
          > */}
          <button onClick={this.loginClick} >
            <FontAwesome name="instagram" />
            <span> Login with Instagram</span>
          </button>
          {/* </InstagramLogin> */}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authorization.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
