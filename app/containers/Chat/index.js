/**
 *
 * Chat
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import MessageBox from 'containers/Chat/MessageBox';
import * as firebase from 'firebase';
import { makeSelectCurrentRoomId } from 'containers/App/selectors';
import { updateMessagesList } from 'containers/Chat/actions';
import { makeSelectMessagesBulked } from 'containers/Chat/selectors';
import MessageBulk from 'containers/Chat/MessageBulk';
import styled from 'styled-components';

import reducer from './reducer';

const MessagesContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 251px;
  bottom: 51px;
`;

export class Chat extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.getAllMessages(this.props.currentRoomId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoomId !== this.props.currentRoomId) {
      this.getAllMessages(nextProps.currentRoomId);
    }
  }

  getAllMessages(roomId) {
    firebase.database().ref(`messages/${roomId}`).once('value', (snapshot) => {
      this.props.updateMessagesList(snapshot.val());
    });
  }

  render() {
    console.log(this.props.messages);
    return (
      <div>
        <MessagesContainer>
          { this.props.messages.map((bulk) => <MessageBulk {...bulk} />) }
        </MessagesContainer>
        <MessageBox />
      </div>
    );
  }
}

Chat.propTypes = {
  currentRoomId: PropTypes.string,
  updateMessagesList: PropTypes.func,
  messages: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  currentRoomId: makeSelectCurrentRoomId(),
  messages: makeSelectMessagesBulked(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateMessagesList: (messages) => dispatch(updateMessagesList(messages)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chat', reducer });

export default compose(
  withReducer,
  withConnect,
)(Chat);
