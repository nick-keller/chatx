import { createSelector } from 'reselect';
import { makeSelectCurrentUserId } from 'containers/App/selectors';

const selectUsers = (state) => state.get('users');

const makeSelectUsersById = () => createSelector(
  selectUsers,
  (usersState) => usersState.get('usersById'),
);

const makeSelectUser = () => createSelector(
  makeSelectUsersById(),
  (_, props) => props.user,
  (usersById, userId) => usersById.get(userId),
);

const makeSelectDisplayName = () => createSelector(
  makeSelectUser(),
  (user) => user && user.get('displayName'),
);

const makeSelectPhotoURL = () => createSelector(
  makeSelectUser(),
  (user) => user && user.get('photoURL'),
);

const makeSelectIsMe = () => createSelector(
  makeSelectCurrentUserId(),
  (_, props) => props.user,
  (currentUserId, me) => currentUserId === me,
);

export {
  makeSelectDisplayName,
  makeSelectPhotoURL,
  makeSelectIsMe,
  makeSelectUsersById,
};
