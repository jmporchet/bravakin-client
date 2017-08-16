import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addHashtag } from '../actions';

import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class Preferences extends React.Component {

  componentWillMount() {
    setTimeout(() => this.props.addHashtag('#postureo'), 2000);
  }

  renderHashtags () {
    return this.props.hashtags.map((el, index) => <li key={index}>{el}</li>)
  };

  render() {
    return (
      <div>
        <h2>List of Hashtags</h2>
        <ul>
          {this.renderHashtags()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hashtags: state.listHashtags.hashtags
})

const mapDispatchToProps = (dispatch) => ({
  addHashtag: (hashtag) => dispatch(addHashtag(hashtag))
})

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
