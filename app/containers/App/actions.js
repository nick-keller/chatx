import { FACEBOOK_LOGIN, LOGGING_ERROR, USER_LOGGED_IN, USER_NOT_LOGGED_IN } from 'containers/App/constants';

export function userNotLoggedIn() {
  return {
    type: USER_NOT_LOGGED_IN,
  };
}

export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    user,
  };
}

export function loggingError(message) {
  return {
    type: LOGGING_ERROR,
    message,
  };
}

export function loginWithFacebook() {
  return {
    type: FACEBOOK_LOGIN,
  };
}
