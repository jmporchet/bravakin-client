import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../actions';


class UserInfo extends React.Component {
// Trying to get data from fetch ?using props?
  render() {
    return(
      <div>
        <h1>{this.props.username}</h1>
        <img src='http://i2.cdn.cnn.com/cnnnext/dam/assets/161201115958-68-year-in-pictures-2016-restricted-super-169.jpg'/>
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
