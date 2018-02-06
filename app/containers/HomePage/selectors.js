import { createSelector } from 'reselect';

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

export {
  makeSelectDisplayName,
  makeSelectPhotoURL,
};
