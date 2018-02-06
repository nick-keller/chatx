/*
 *
 * Chat reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_MESSAGES_LIST } from 'containers/Chat/constants';

const initialState = fromJS({
  messages: [],
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGES_LIST:
      return state
        .set('messages', fromJS(action.messages));
    default:
      return state;
  }
}

export default chatReducer;
