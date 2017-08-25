import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import HashtagList from './preferences/HashtagList'
import PeopleList from './preferences/PeopleList'
import UserSettings from './preferences/UserSettings'
import UserInfo from './preferences/UserInfo'

class Preferences extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://192.168.0.49:3000/me', {
      method: 'PUT',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.props.access_token
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        save: e.target.querySelector('input[type="password"]').value
      })
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <UserInfo />
            <UserSettings onSubmit={this.handleSubmit} />
          </Col>
          <Col xs="6">
            <h2>List of Hashtags</h2>
            <HashtagList />
            <br />
            <h2>List of People</h2>
            <PeopleList />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token
});


export default connect(mapStateToProps, null)(Preferences);
