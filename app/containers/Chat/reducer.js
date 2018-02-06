/*
 *
 * Chat reducer
 *
 */

import { fromJS } from 'immutable';
import { CLEAR_MESSAGES, RECEIVED_MESSAGE, UPDATE_MESSAGES_LIST } from 'containers/Chat/constants';

const initialState = fromJS({
  messages: [],
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGES:
      return state
        .set('messages', fromJS([]));
    case RECEIVED_MESSAGE:
      return state
        .update('messages', (messages) => messages.push(fromJS(action.message)));
    default:
      return state;
  }
}

export default chatReducer;
