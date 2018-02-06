
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import NewRoomInput from 'containers/RoomsList/NewRoomInput';

import * as firebase from 'firebase';
import { updateRoomsList } from 'containers/RoomsList/actions';
import { makeSelectRoomsIds } from 'containers/RoomsList/selectors';
import RoomItem from 'containers/RoomsList/RoomItem';

import reducer from './reducer';
import RoomsListContainer from './RoomsListContainer';

/**
 * A side panel to the left of the screen that shows available rooms and lets the user create one
 */
export class RoomsList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    firebase.database().ref('rooms/').on('value', (snapshot) => {
      this.props.updateRoomsList(snapshot.val());
    });
  }

  render() {
    return (
      <RoomsListContainer>
        <NewRoomInput />
        { this.props.roomsIds.map((id) => <RoomItem key={id} id={id} />) }
      </RoomsListContainer>
    );
  }
}

RoomsList.propTypes = {
  updateRoomsList: PropTypes.func,
  roomsIds: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  roomsIds: makeSelectRoomsIds(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateRoomsList: (roomsById) => dispatch(updateRoomsList(roomsById)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'rooms', reducer });

export default compose(
  withReducer,
  withConnect,
)(RoomsList);
