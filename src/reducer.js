import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import * as Types from './config/types';

const authorizationDefaultState = {
  loggedIn: false
};

const authorization = (state = authorizationDefaultState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return Object.assign({}, state, { loggedIn: true });
    default:
      return state;
  }
};

const userProfileDefaultState = {

};

const userProfile = (state = userProfileDefaultState, action) => {
  switch (action.type) {
    case Types.GET_INSTAGRAM_DATA:
      return Object.assign({}, state, { username: action.username});
    default:
      return state;
  }
};

const reducer = combineReducers({
  authorization,
  userProfile,
  form: reduxFormReducer
});

export default reducer;
