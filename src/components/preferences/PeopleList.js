import React from 'react';
import { connect } from 'react-redux';

import { addPeople } from '../../actions';

import PeopleForm from './PeopleForm'

class PeopleList extends React.Component {


  renderinteresting_people () {
    return this.props.interesting_people.map((el, index) => <li key={index}>{el}</li>)
  };

  handleSubmit = (formData) => {
    const { User } = formData;
    this.props.addPeople('@' + User);

    var body = {
      'update': {
        'be_like': [
          User
        ]
      },
      'add': {
        'like_tags': [
        ]
      }
    };

    fetch("https://private-cb530a-bravakin.apiary-mock.com/me", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ACCESS_TOKEN'
      },
      body: JSON.stringify(body)
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderinteresting_people()}
        </ul>
        <PeopleForm onSubmit={this.handleSubmit} />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  interesting_people: state.userProfile.interesting_people
})

const mapDispatchToProps = (dispatch) => ({
  addPeople: (people) => dispatch(addPeople(people))
})

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)
