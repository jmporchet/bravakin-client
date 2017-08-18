import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveInstagramToken } from '../actions';

class Authorize extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  componentWillMount () {
    if (window.location.hash && window.location.hash.split('=').length > 1) {
      const access_token = window.location.hash.split('=')[1];
      this.props.saveInstagramToken(access_token);
    }
  }

  render () {
    if (this.props.access_token) {
      return <Redirect to="/preferences" />;
    } else {
      return (
        <div>
          <h2>Error</h2>
          <p>There has been an error with Instagram's authorization.</p>
          <p>Please <a href="/sign-in">try again</a>.</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token,
});

const mapDispatchToProps = (dispatch) => ({
  saveInstagramToken: (access_token) => dispatch(saveInstagramToken(access_token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
