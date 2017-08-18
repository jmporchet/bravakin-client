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


const userProfile = (state = userProfileDefaultState, action) => {
  switch (action.type) {
    // case Types.SAVE_INSTAGRAM_TOKEN:
    //   return Object.assign({}, state, {
    //     id: action.data.id,
    //     username: action.data.username,
    //     full_name: action.data.full_name,
    //     profile_picture: action.data.profile_picture,
    //     access_token: action.data.access_token,
    //     like_tags: action.data.like_tags,
    //     be_like: action.data.be_like
    //   });
    default:
      return state;
  }
};

// This needs to be inside userProfile
const userProfileDefaultState = (state = {
  username: '',
  hashtags: [],
  interesting_people: []
}, action) => {
  console.log(state)
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
      return Object.assign({}, state, {
      username: state.username.concat(action.user)
    });
    default:
    console.log('state2', state);
    return state;
  }
}

const reducer = combineReducers({
  authorization,
  userProfileDefaultState,
  form: reduxFormReducer
});

export default reducer;
