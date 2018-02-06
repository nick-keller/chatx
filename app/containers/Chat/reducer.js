/*
 *
 * Chat reducer
 *
 */

import { fromJS } from 'immutable';
import { RECEIVED_MESSAGE, UPDATE_MESSAGES_LIST } from 'containers/Chat/constants';

const initialState = fromJS({
  messages: [],
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGES_LIST:
      return state
        .set('messages', fromJS(action.messages || {}));
    case RECEIVED_MESSAGE:
      return state
        .setIn(['messages', action.id], fromJS(action.message));
    default:
      return state;
  }
}

export default chatReducer;
