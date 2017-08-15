import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../actions';

import LoginForm from './LoginForm';

class Homepage extends React.Component {

  handleSubmit = (formData) => {
    const {username, password} = formData;
    this.props.login(username, password);
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />
    } else {
      return (
        <div>
          <h1>Sign in</h1>
          <LoginForm onSubmit={this.handleSubmit} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authorization.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
