import React from 'react';
import { connect } from 'react-redux';

import { addHashtag } from '../../actions';

import HashtagForm from './HashtagForm'
import { ListGroup, ListGroupItem } from 'reactstrap';

class HashtagList extends React.Component {

  renderHashtags () {
    return this.props.hashtags.map((el, index) => <li key={index}>#{el}</li>)
  };

  handleSubmit = (formData) => {
    const { hashtags } = formData;
    this.props.addHashtag(hashtags);

    var body = {
      'update': {
        'be_like': []
      },
      'add': {
        'like_tags': [
          hashtags
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
          {this.renderHashtags()}
        </ListGroup>
        <HashtagForm onSubmit={this.handleSubmit} />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token,
  hashtags: state.userProfile.hashtags,
  interesting_people: state.userProfile.interesting_people
})

const mapDispatchToProps = (dispatch) => ({
  addHashtag: (hashtag) => dispatch(addHashtag(hashtag))
})

export default connect(mapStateToProps, mapDispatchToProps)(HashtagList)
