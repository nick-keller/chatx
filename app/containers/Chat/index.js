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
import { clearMessages, receivedMessage, updateMessagesList } from 'containers/Chat/actions';
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
  overflow-y: auto;
`;

export class Chat extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.messagesRef = null;
  }


  componentDidMount() {
    this.getAllMessages(this.props.currentRoomId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoomId !== this.props.currentRoomId) {
      this.getAllMessages(nextProps.currentRoomId);
    }
  }

  getAllMessages(roomId) {
    this.props.clearMessages();

    if (this.messagesRef) {
      this.messagesRef.off('child_added');
    }

    this.messagesRef = firebase.database().ref(`messages/${roomId}`).limitToLast(10);

    this.messagesRef.on('child_added', (data) => {
      this.props.receivedMessage(data.key, data.val());
      setTimeout(() => { this.scrollToBottom() }, 0);
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <div>
        <MessagesContainer>
          { this.props.messages.map((bulk) => <MessageBulk key={bulk.id} {...bulk} />) }
          <div
            ref={(el) => { this.messagesEnd = el; }}
          />
        </MessagesContainer>
        <MessageBox />
      </div>
    );
  }
}

Chat.propTypes = {
  currentRoomId: PropTypes.string,
  updateMessagesList: PropTypes.func,
  receivedMessage: PropTypes.func,
  messages: PropTypes.array,
  clearMessages: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentRoomId: makeSelectCurrentRoomId(),
  messages: makeSelectMessagesBulked(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateMessagesList: (messages) => dispatch(updateMessagesList(messages)),
    receivedMessage: (id, message) => dispatch(receivedMessage(id, message)),
    clearMessages: () => dispatch(clearMessages()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chat', reducer });

export default compose(
  withReducer,
  withConnect,
)(Chat);
