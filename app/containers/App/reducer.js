
import { fromJS } from 'immutable';
import * as firebase from 'firebase';

import { FACEBOOK_LOGIN, LOGGING_ERROR, USER_LOGGED_IN, USER_NOT_LOGGED_IN } from 'containers/App/constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  error: false,
  currentUser: false,
});

const facebookProvider = new firebase.auth.FacebookAuthProvider();

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN:
      firebase.auth().signInWithRedirect(facebookProvider);
      return state;
    case USER_NOT_LOGGED_IN:
      return state
        .set('error', false)
        .set('loading', false)
        .set('currentUser', false);
    case USER_LOGGED_IN:
      return state
        .set('error', false)
        .set('loading', false)
        .set('currentUser', fromJS(action.user));
    case LOGGING_ERROR:
      return state
        .set('error', action.message)
        .set('loading', false)
        .set('currentUser', false);
    default:
      return state;
  }
}

export default appReducer;
