
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';
import NewRoomInput from 'containers/RoomsList/NewRoomInput';

import reducer from './reducer';
import * as firebase from "firebase";
import { updateRoomsList } from 'containers/RoomsList/actions';

const Container = styled.div`
  position: absolute;
  width: 250px;
  height: 100vh;
  top: 0;
  left: 0;
  border-right: solid 1px #CCCCCC;
  padding: 10px;
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
      </Container>
    );
  }
}

RoomsList.propTypes = {
  updateRoomsList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
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
