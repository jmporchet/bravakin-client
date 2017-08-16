import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { hashtag } from '../actions';

import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class Preferences extends React.Component {

  renderHashtags () {
    return this.props.hashtags.map((el) => <li>{el}</li>)
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
  hashtag: () => dispatch(hashtag())
})

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
