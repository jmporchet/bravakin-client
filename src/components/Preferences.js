import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HashtagList from './preferences/HashtagList'
import PeopleList from './preferences/PeopleList'
import UserSettings from './preferences/UserSettings'
import UserInfo from './preferences/UserInfo'


import { login } from '../actions';
import { addHashtag } from '../actions';

import { ListGroup, ListGroupItem, Badge } from 'reactstrap';


class Preferences extends React.Component {

  handleSubmit = (formData) => {
    const {username, password} = formData;
    this.props.login(username, password);
  }

  render() {
    return (
      <div>
      <UserSettings onSubmit={this.handleSubmit} />
      <UserInfo />
        <h2>List of Hashtags</h2>
        <HashtagList></HashtagList>
        <br></br>
        <h2>List of People</h2>
        <PeopleList></PeopleList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authorization.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
