import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import './bootstrap.css';
import './style.css';

class UserInfo extends React.Component {
  render() {
    return(
      <div>
        <div class="text-center">
          <img id="img" src="https://pbs.twimg.com/profile_images/788146002029150209/n3EHvo8D.jpg" class="rounded" alt="..." />
          </div>
          <h1>{this.props.username}</h1>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    username: state.userProfile.username
  })

  const mapDispatchToProps = (dispatch) => ({
    addUser: (user) => dispatch(addUser(user))
  })

  export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
