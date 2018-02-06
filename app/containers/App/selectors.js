import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const makeSelectLoading = () => createSelector(
  selectApp,
  (appState) => appState.get('loading')
);

const makeSelectLoggedIn = () => createSelector(
  selectApp,
  (appState) => appState.get('currentUser') !== false,
);

export {
  makeSelectLoading,
  makeSelectLoggedIn,
};
