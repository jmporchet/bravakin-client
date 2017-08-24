import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import conf from '../private/conf';
import FontAwesome from 'react-fontawesome';
import { Row, Col, Button } from 'reactstrap';
import  './style.css';

class Homepage extends React.Component {

  loginClick = () => {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${conf.INSTAGRAM_CLIENT_ID}&redirect_uri=${conf.OAUTH_CB_URL}&response_type=code`
  }

  render () {
    if (this.props.auth_token) {
      return <Redirect to="/preferences" />;
    } else {
      return (
          <Row>
            <Col xs="6" className="pic">
              <div className="hero">
                <h1> Bravaklin </h1>
                <h5> Grow Your Instagram Followers Responsibly. </h5>
              </div>
            </Col>
            <Col xs="6">
              <div className="signin">
                <Button color="secondary" size="lg" className="instagram" onClick={this.loginClick}>
                  <FontAwesome name="instagram" />
                  <span> Login with Instagram</span>
                </Button>{' '}

              </div>
            </Col>
          </Row>
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
