import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as firebase from 'firebase';

import { makeSelectCurrentUserId } from 'containers/App/selectors';
import {
  makeSelectFirstFourPhotoURL, makeSelectIsCurrentRoom,
  makeSelectRoomName,
} from 'containers/RoomsList/selectors';
import { enterRoom } from 'containers/App/actions';

import RoomPreview from 'components/RoomPreview';
import RoomListItem from 'components/RoomListItem';

/**
 * An basic item in the rooms list, enters the room when clicked
 */
export class RoomItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  enterRoom = () => {
    this.props.enterRoom();
    firebase.database().ref(`rooms/${this.props.id}/users/${this.props.currentUserId}`).set(true);
  };

  render() {
    return (
      <RoomListItem onClick={this.enterRoom} className={this.props.isCurrentRoom && 'active'} >
        <RoomPreview photosURL={this.props.photosURL} />
        { this.props.name }
      </RoomListItem>
    );
  }
}

RoomItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  enterRoom: PropTypes.func,
  isCurrentRoom: PropTypes.bool,
  currentUserId: PropTypes.string,
  photosURL: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectRoomName(),
  isCurrentRoom: makeSelectIsCurrentRoom(),
  currentUserId: makeSelectCurrentUserId(),
  photosURL: makeSelectFirstFourPhotoURL(),
});

function mapDispatchToProps(dispatch, props) {
  return {
    enterRoom: () => dispatch(enterRoom(props.id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(RoomItem);
