import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import * as Types from './config/types';

const authorizationDefaultState = {
  access_token: null
};

const authorization = (state = authorizationDefaultState, action) => {
  switch (action.type) {

    case Types.SAVE_INSTAGRAM_TOKEN:
      return Object.assign({}, state, { access_token: action.access_token });
    case Types.LOGIN:
      return Object.assign({}, state, { loggedIn: true });
    default:
      return state;
  }
};

// This needs to be inside userProfile
const userProfile = (state = {
  username: '',
  hashtags: [],
  interesting_people: []
}, action) => {
  switch (action.type) {
    case Types.ADD_PEOPLE:
      return Object.assign({}, state, {
        interesting_people: state.interesting_people.concat(action.people)
      });
    case Types.ADD_HASHTAG:
      return Object.assign({}, state, {
        hashtags: state.hashtags.concat(action.hashtag)
      });
    case Types.ADD_USER:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}

const statsDefaultState = {
  performance: [],
  worldMap: [],
  followers: ''
}

const stats = (state = statsDefaultState, action) => {
  switch (action.type) {
    case Types.ADD_USER:
      return Object.assign({}, state, {
        followers: state.followers.concat(action.user.followers)
      });
    case Types.SET_PERFORMANCE_DATA:
      return {
        ...state,
        performance: action.data
      }

    case Types.SET_INFLUENCE_DATA:
      return {
        ...state,
        worldMap: action.data
      }

    default:
      return state;
  }
}

const reducer = combineReducers({
  authorization,
  userProfile,
  stats,
  form: reduxFormReducer
});

export default reducer;
