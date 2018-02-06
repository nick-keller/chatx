import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import { loggingError, userLoggedIn, userNotLoggedIn } from 'containers/App/actions';
import { makeSelectLoading, makeSelectLoggedIn } from 'containers/App/selectors';
import LoadingScreen from 'containers/App/LoadingScreen';

import config from '../../../config.json';

/**
 * Main skeleton of our app, it simply shows either the login page or the home page
 */
export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  // Check if user is logged in or not using firebase
  componentDidMount() {
    firebase.initializeApp(config.firebase);

    firebase.auth().getRedirectResult().then((result) => {
      if (result.user) {
        this.props.userLoggedIn(result.user);
      } else {
        this.props.userNotLoggedIn();
      }
    }).catch((error) => {
      this.props.loggingError(error.message);
    });
  }

  render() {
    if (this.props.loading) {
      return <LoadingScreen />;
    }

    return this.props.loggedIn ?
      <HomePage /> :
      <LoginPage />;
  }
}

App.propTypes = {
  userNotLoggedIn: PropTypes.func,
  userLoggedIn: PropTypes.func,
  loggingError: PropTypes.func,
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    userNotLoggedIn: () => dispatch(userNotLoggedIn()),
    userLoggedIn: (user) => dispatch(userLoggedIn(user)),
    loggingError: (message) => dispatch(loggingError(message)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loggedIn: makeSelectLoggedIn(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(App);
