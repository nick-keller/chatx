/*
 *
 * Chat actions
 *
 */

import { CLEAR_MESSAGES, RECEIVED_MESSAGE } from 'containers/Chat/constants';

export function receivedMessage(id, message) {
  return {
    type: RECEIVED_MESSAGE,
    id,
    message,
  };
}

export function clearMessages() {
  return {
    type: CLEAR_MESSAGES,
  };
}
