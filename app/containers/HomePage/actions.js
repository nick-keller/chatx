import { UPDATE_USERS_LIST } from 'containers/HomePage/constants';

/**
 * Dispatched when the user list should be updated, typically when a new user joins
 */
export function updateUsersList(usersById) {
  return {
    type: UPDATE_USERS_LIST,
    usersById,
  };
}
