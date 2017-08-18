import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../actions';


class UserInfo extends React.Component {
// Trying to get data from fetch ?using props?
  render() {
    return(
      <div>
        <h1>{this.props.username}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.userProfileDefaultState.username
})

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
