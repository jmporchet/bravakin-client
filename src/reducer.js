import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import * as Types from './config/types';

const authorizationDefaultState = {
  loggedIn: false
}

const authorization = (state = authorizationDefaultState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      console.log('reducer login :)');
      return Object.assign({}, state, { loggedIn: true });
    default:
      console.log('reducer not login :(', action);
      return state;
  }
}

const userProfileDefaultState = {

}

const userProfile = (state = userProfileDefaultState, action) => {
  return state;
}

const reducer = combineReducers({
  authorization,
  userProfile,
  form: reduxFormReducer
})

export default reducer;
