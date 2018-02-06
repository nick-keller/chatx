import { createSelector } from 'reselect';
import { makeSelectCurrentUserId } from 'containers/App/selectors';

const selectUsers = (state) => state.get('users');

const makeSelectUser = () => createSelector(
  selectUsers,
  (_, props) => props.user,
  (usersState, userId) => usersState.getIn(['usersById', userId]),
);

const makeSelectDisplayName = () => createSelector(
  makeSelectUser(),
  (user) => user.get('displayName'),
);

const makeSelectPhotoURL = () => createSelector(
  makeSelectUser(),
  (user) => user.get('photoURL'),
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
};
