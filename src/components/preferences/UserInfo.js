import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import './bootstrap.css';
import './style.css';

class UserInfo extends React.Component {
  render() {
    return(
      <div>
        <div className="text-center">
          <img id="img" src={this.props.user.profile_picture} alt="profile picture" />
        </div>
        <h1>{this.props.user.username}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userProfile
})

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
