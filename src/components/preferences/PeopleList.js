import React from 'react';
import { connect } from 'react-redux';

import { addPeople } from '../../actions';

import PeopleForm from './PeopleForm'
import { ListGroup, ListGroupItem } from 'reactstrap';


class PeopleList extends React.Component {


  renderinteresting_people () {
    return this.props.interesting_people.map((el, index) => <ListGroupItem key={index}>{el}</ListGroupItem>)
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

    fetch("https://localhost:3000/me", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.access_token
      },
      body: body
    });
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.renderinteresting_people()}
        </ListGroup>
        <PeopleForm onSubmit={this.handleSubmit} />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token,
  interesting_people: state.userProfile.interesting_people
})

const mapDispatchToProps = (dispatch) => ({
  addPeople: (people) => dispatch(addPeople(people))
})

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)
