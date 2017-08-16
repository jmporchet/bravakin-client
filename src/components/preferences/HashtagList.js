import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addHashtag } from '../../actions';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

import HashtagForm from './HashtagForm'

class Preferences extends React.Component {

  renderHashtags () {
    return this.props.hashtags.map((el, index) => <li key={index}>{el}</li>)
  };

  handleSubmit = (formData) => {
    const { hashtags } = formData;
    this.props.addHashtag('#' + hashtags);
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
  hashtags: state.listHashtags.hashtags,
  interesting_people: state.listHashtags.interesting_people
})

const mapDispatchToProps = (dispatch) => ({
  addHashtag: (hashtag) => dispatch(addHashtag(hashtag))
})

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
