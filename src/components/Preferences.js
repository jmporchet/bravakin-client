import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import HashtagList from './preferences/HashtagList'
import PeopleList from './preferences/PeopleList'
import UserSettings from './preferences/UserSettings'
import UserInfo from './preferences/UserInfo'

class Preferences extends React.Component {


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


export default Preferences;
