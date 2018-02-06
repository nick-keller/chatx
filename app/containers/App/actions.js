import {
  ENTER_ROOM, FACEBOOK_LOGIN, LOGGING_ERROR, USER_LOGGED_IN,
  USER_NOT_LOGGED_IN,
} from 'containers/App/constants';

/**
 * Dispatched when we know for sure the user is not logged in
 */
export function userNotLoggedIn() {
  return {
    type: USER_NOT_LOGGED_IN,
  };
}

/**
 * Dispatched when the user just logged in
 */
export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    user,
  };
}

/**
 * Dispatched when an error occurs during logging in
 */
export function loggingError(message) {
  return {
    type: LOGGING_ERROR,
    message,
  };
}

/**
 * Dispatched when the user clicks on the facebook login button
 */
export function loginWithFacebook() {
  return {
    type: FACEBOOK_LOGIN,
  };
}

/**
 * Dispatched when the user enters a room
 */
export function enterRoom(id) {
  return {
    type: ENTER_ROOM,
    id,
  };
}
