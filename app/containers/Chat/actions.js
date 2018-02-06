/*
 *
 * Chat actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';
import { RECEIVED_MESSAGE, UPDATE_MESSAGES_LIST } from 'containers/Chat/constants';

export function updateMessagesList(messages) {
  return {
    type: UPDATE_MESSAGES_LIST,
    messages,
  };
}

export function receivedMessage(id, message) {
  return {
    type: RECEIVED_MESSAGE,
    id,
    message,
  };
}
