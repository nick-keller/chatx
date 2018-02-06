
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';
import NewRoomInput from 'containers/RoomsList/NewRoomInput';

import * as firebase from 'firebase';
import { updateRoomsList } from 'containers/RoomsList/actions';
import { makeSelectRoomsIds } from 'containers/RoomsList/selectors';
import RoomItem from 'containers/RoomsList/RoomItem';

import reducer from './reducer';

const Container = styled.div`
  position: absolute;
  width: 250px;
  height: 100vh;
  top: 0;
  left: 0;
  border-right: solid 1px #CCCCCC;
  box-sizing: border-box;
`;

export class RoomsList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    firebase.database().ref('rooms/').on('value', (snapshot) => {
      this.props.updateRoomsList(snapshot.val());
    });
  }

  render() {
    return (
      <Container>
        <NewRoomInput />
        { this.props.roomsIds.map((id) => <RoomItem key={id} id={id} />) }
      </Container>
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
