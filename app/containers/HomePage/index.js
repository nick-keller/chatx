import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import injectReducer from 'utils/injectReducer';
import reducer from 'containers/HomePage/reducer';
import { updateUsersList } from 'containers/HomePage/actions';

import RoomsList from 'containers/RoomsList';
import Chat from 'containers/Chat';

/**
 * The homepage fetches the list of users and displays basic elements on the page
 */
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

const withConnect = connect(null, mapDispatchToProps);
const withReducer = injectReducer({ key: 'users', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
