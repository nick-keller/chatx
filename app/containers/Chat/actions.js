
import { CLEAR_MESSAGES, RECEIVED_MESSAGE } from 'containers/Chat/constants';

/**
 * Dispatched when a message is received, yes the user receives his own messages
 */
export function receivedMessage(id, message) {
  return {
    type: RECEIVED_MESSAGE,
    id,
    message,
  };
}

/**
 * Dispatches to clear the messages list, typical used when leaving a room
 */
export function clearMessages() {
  return {
    type: CLEAR_MESSAGES,
  };
}
