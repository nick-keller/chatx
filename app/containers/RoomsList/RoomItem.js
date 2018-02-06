
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { makeSelectCurrentUserId } from 'containers/App/selectors';
import * as firebase from 'firebase';
import {
  makeSelectFirstFourPhotoURL, makeSelectIsCurrentRoom,
  makeSelectRoomName,
} from 'containers/RoomsList/selectors';
import { enterRoom } from 'containers/App/actions';

const Div = styled.div`
  padding: 10px;
  
  &.active {
    background: #F2F2F2;
  }
`;

const Preview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #404040;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  overflow: hidden;
  
  div {
    width: 50%;
    height: 50%;
    background-size: cover;
    display: inline-block;
    box-shadow: -1px -1px 0 white;
  }
  
  div:only-child {
    width: 100%;
    height: 100%;
  }
  
  div:first-child:nth-last-child(2),
  div:first-child:nth-last-child(2) ~ div {
    height: 100%;
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
        <Preview>
          { this.props.photosURL.map((url) => <div key={url} style={{ backgroundImage: `url(${url})` }} />) }
        </Preview>
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
