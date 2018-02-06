/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/HomePage/reducer';
import * as firebase from 'firebase';
import { updateUsersList } from 'containers/HomePage/actions';
import RoomsList from 'containers/RoomsList';
import Chat from 'containers/Chat';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    firebase.database().ref('users/').on('value', (snapshot) => {
      this.props.updateUsersList(snapshot.val());
    });
  }

  render() {
    return (
      <div>
        <RoomsList />
        <Chat />
        home
      </div>
    );
  }
}

HomePage.propTypes = {
  updateUsersList: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateUsersList: (usersById) => dispatch(updateUsersList(usersById)),
  };
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'users', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
