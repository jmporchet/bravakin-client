import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import conf from '../private/conf-EXAMPLE';
import FontAwesome from 'react-fontawesome';

class Homepage extends React.Component {

  loginClick = () => {
    // temporary solution to get the token without redirecting to bravakin-server
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${conf.INSTAGRAM_CLIENT_ID}&redirect_uri=${conf.OAUTH_CB_URL}&response_type=token`
  }

  render () {
    if (this.props.auth_token) {
      return <Redirect to="/preferences" />;
    } else {
      return (
        <div>
          <h1>Sign in</h1>
          <button onClick={this.loginClick} >
            <FontAwesome name="instagram" />
            <span> Login with Instagram</span>
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth_token: state.authorization.auth_token
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
