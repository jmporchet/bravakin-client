import React from 'react';
import { connect } from 'react-redux';

import { addHashtag } from '../../actions';

import HashtagForm from './HashtagForm'

class HashtagList extends React.Component {

  renderHashtags () {
    return this.props.hashtags.map((el, index) => <li key={index}>{el}</li>)
  };

  handleSubmit = (formData) => {
    const { hashtags } = formData;
    this.props.addHashtag('#' + hashtags);

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
          {this.renderHashtags()}
        </ul>
        <HashtagForm onSubmit={this.handleSubmit} />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  hashtags: state.userProfile.hashtags,
  interesting_people: state.userProfile.interesting_people
})

const mapDispatchToProps = (dispatch) => ({
  addHashtag: (hashtag) => dispatch(addHashtag(hashtag))
})

export default connect(mapStateToProps, mapDispatchToProps)(HashtagList)
