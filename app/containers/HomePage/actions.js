import { UPDATE_USERS_LIST } from 'containers/HomePage/constants';

export function updateUsersList(usersById) {
  return {
    type: UPDATE_USERS_LIST,
    usersById,
  };
}
