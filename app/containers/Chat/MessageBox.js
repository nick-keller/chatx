
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { makeSelectCurrentRoomId, makeSelectCurrentUserId } from 'containers/App/selectors';
import * as firebase from 'firebase';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 251px;
  right: 0;
  height: 50px;
  border-top: solid 1px #CCCCCC;
`;

const Input = styled.input`
  line-height: 50px;
  border: none;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
`;

export class MessageBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      firebase.database().ref(`messages/${this.props.currentRoomId}`).push().set({
        message: evt.target.value,
        user: this.props.currentUserId,
      });

      evt.preventDefault();
    }
  };

  render() {
    return (
      <Container>
        <Input placeholder="Type a message..." onKeyPress={this.onKeyPress} />
      </Container>
    );
  }
}

MessageBox.propTypes = {
  currentRoomId: PropTypes.string,
  currentUserId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentRoomId: makeSelectCurrentRoomId(),
  currentUserId: makeSelectCurrentUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(MessageBox);
