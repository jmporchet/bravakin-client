import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const userProfile = (state = {}, action) => {
  return state;
}

const reducer = combineReducers({
  userProfile,
  form: reduxFormReducer
})

export default reducer;
