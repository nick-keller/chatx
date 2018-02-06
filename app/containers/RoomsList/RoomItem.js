
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { makeSelectCurrentUserId } from 'containers/App/selectors';
import * as firebase from 'firebase';
import { makeSelectIsCurrentRoom, makeSelectRoomName } from 'containers/RoomsList/selectors';
import { enterRoom } from 'containers/App/actions';

const Div = styled.div`
  padding: 10px;
  
  &.active {
    background: #F2F2F2;
  }
`;

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
      <Div onClick={this.enterRoom} className={this.props.isCurrentRoom && 'active'} >
        { this.props.name }
      </Div>
    );
  }
}

RoomItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  enterRoom: PropTypes.func,
  isCurrentRoom: PropTypes.bool,
  currentUserId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectRoomName(),
  isCurrentRoom: makeSelectIsCurrentRoom(),
  currentUserId: makeSelectCurrentUserId(),
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
