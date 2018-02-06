import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const makeSelectLoading = () => createSelector(
  selectApp,
  (appState) => appState.get('loading')
);

const makeSelectCurrentRoomId = () => createSelector(
  selectApp,
  (appState) => appState.get('currentRoom')
);

const makeSelectCurrentUser = () => createSelector(
  selectApp,
  (appState) => appState.get('currentUser'),
);

const makeSelectLoggedIn = () => createSelector(
  makeSelectCurrentUser(),
  (currentUser) => currentUser !== false,
);

const makeSelectCurrentUserId = () => createSelector(
  makeSelectCurrentUser(),
  (currentUser) => currentUser && currentUser.uid,
);

export {
  makeSelectLoading,
  makeSelectLoggedIn,
  makeSelectCurrentUserId,
  makeSelectCurrentRoomId,
};
