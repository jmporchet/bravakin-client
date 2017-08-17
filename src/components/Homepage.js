import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InstagramLogin from 'react-instagram-login';
import { login } from '../actions';

import LoginForm from './LoginForm';

import conf from '../private/conf';
import FontAwesome from 'react-fontawesome';

class Homepage extends React.Component {

  handleSubmit = (formData) => {
    const {username, password} = formData;
    this.props.login(username, password);
  }

  responseInstagramOK = (response) => {
    // response will be a user Object provided by bravakin-server
    // Save it into the state
    this.props.getInstagramData(response);

    // sets this.props.loggedIn, will need to be refactored to account for
    // new/returning users to redirect the user to the /dashboard
    this.props.login('','');

  }

  responseInstagramNotOK = (error) => {
    //handle error
  }

  render () {
    if (this.props.loggedIn) {
      return <Redirect to="/preferences" />;
    } else {
      return (
        <div>
          <h1>Sign in</h1>
          <LoginForm onSubmit={this.handleSubmit} />
          <hr />
          <InstagramLogin
            clientId={conf.INSTAGRAM_CLIENT_ID}
            onSuccess={this.responseInstagramOK}
            onFailure={this.responseInstagramNotOK}
          >
            <FontAwesome name="instagram" />
            <span> Login with Instagram</span>
          </InstagramLogin>
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
