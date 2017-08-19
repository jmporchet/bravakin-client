import React from 'react';

import HashtagList from './preferences/HashtagList'
import PeopleList from './preferences/PeopleList'
import UserSettings from './preferences/UserSettings'
import UserInfo from './preferences/UserInfo'

class Preferences extends React.Component {


  render() {
    return (
      <div>
        <UserInfo />
        <UserSettings onSubmit={this.handleSubmit} />
        <h2>List of Hashtags</h2>
        <HashtagList />
        <br />
        <h2>List of People</h2>
        <PeopleList />
      </div>
    );
  }
}


export default Preferences;
