/*
 *
 * Chat actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';
import { UPDATE_MESSAGES_LIST } from 'containers/Chat/constants';

export function updateMessagesList(messages) {
  return {
    type: UPDATE_MESSAGES_LIST,
    messages,
  };
}
