import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HashtagList from './preferences/HashtagList'
import PeopleList from './preferences/PeopleList'

import { addHashtag } from '../actions';

import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class Preferences extends React.Component {

  render() {
    return (
      <div>
        <h2>List of Hashtags</h2>
        <HashtagList></HashtagList>
        <br></br>
        <h2>List of People</h2>
        <PeopleList></PeopleList>
      </div>
    );
  }
}

export default Preferences;
